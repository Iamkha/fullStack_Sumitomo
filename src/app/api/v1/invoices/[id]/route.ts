import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { InvoiceModel } from "@/backEnd/models/invoice";
import { get } from "lodash";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectToDB();
    const req = await request.json();
    const filters = get(req, ["body", "filters"], []);

    const match: any = {};
    for (let filter of filters) {
      if (filter.dataType === "date") {
        const from = get(filter, ["value", "from"]);
        const to = get(filter, ["value", "to"]);
        if (from || to) {
          let newTo;
          if (to) {
            const date = new Date(to);
            const formatDate = new Date(date);
            formatDate.setDate(date.getDate() + 1);
            newTo = formatDate.toISOString();
          }
          match[filter.field] = {
            ...(from
              ? {
                  $gte: new Date(from),
                }
              : {}),
            ...(to
              ? {
                  $lte: new Date(newTo || ""),
                }
              : {}),
          };
        }
      } else if (filter.operator === "like" && filter.value) {
        match[filter.field] = new RegExp(filter.value);
      } else if (filter.operator === "is" && filter.value) {
        match[filter.field] = filter.value;
      }
    }

    try {
      let nextId = null,
        prevId = null;
      const invoice: any = await InvoiceModel.findById(
        request.url.split("/")[6]
      );
      const result = await InvoiceModel.aggregate(
        [
          {
            $match: match,
          },
          {
            $setWindowFields: {
              partitionBy: null,
              sortBy: {
                createdAt: -1,
              },
              output: {
                nearIds: {
                  $addToSet: "$_id",
                  window: {
                    documents: [-1, 1],
                  },
                },
              },
            },
          },
          {
            $match: {
              _id: invoice._id,
            },
          },
          {
            $lookup: {
              from: "invoices",
              localField: "nearIds",
              foreignField: "_id",
              as: "nearDocs",
            },
          },
          {
            $unwind: "$nearDocs",
          },
          {
            $replaceRoot: {
              newRoot: "$nearDocs",
            },
          },
        ],
        { allowDiskUse: true }
      );

      const index = (result || []).findIndex(
        ({ _id }) => _id == request.url.split("/")[6]
      );
      if (index != -1) {
        nextId = result[index + 1]?._id || null;
        prevId = result[index - 1]?._id || null;
      }
      return NextResponse.json(
        {
          error: false,
          message: "success",
          data: {
            ...invoice.toJSON(),
            nextId,
            prevId,
          },
        },
        {
          status: 200,
        }
      );
    } catch (error: any) {
      return NextResponse.json(
        {
          error: true,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  } catch (e: any) {
    return NextResponse.json(
      {
        error: true,
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    await connectToDB();
    await InvoiceModel.deleteOne({ _id: request.url.split("/")[6] });
    return NextResponse.json(
      {
        error: false,
        message: "success",
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        error: true,
        message: e.message,
      },
      {
        status: 400,
      }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    await connectToDB();
    const req = await request.json();
    await InvoiceModel.findByIdAndUpdate(request.url.split("/")[6], {
      req,
    });
    return NextResponse.json(
      {
        error: false,
        message: "success",
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        error: true,
        message: e.message,
      },
      {
        status: 400,
      }
    );
  }
};
