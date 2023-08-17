import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { InvoiceModel } from "@/backEnd/models/invoice";
import { get } from "lodash";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectToDB();
    const req = await request.json();
    const page = get(req, ["pagination", "page"], 1);
    const rowsPerPage = get(req, ["pagination", "rowsPerPage"], 10);

    const filters = get(req, ["filters"], []);
    const isSearch = get(req, ["isSearch"], false);

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
    const rows = await InvoiceModel.aggregate(
      [
        {
          $match: match,
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: (+page - 1) * rowsPerPage,
        },
        {
          $limit: +rowsPerPage,
        },
      ],
      { allowDiskUse: true }
    );

    const count = await InvoiceModel.aggregate([
      {
        $match: match,
      },
      {
        $count: "total",
      },
    ]);

    const total = count[0] ? count[0].total : 0;
    return NextResponse.json(
      {
        error: false,
        message: "success",
        data: {
          rows,
          pagination: {
            page: isSearch ? 0 : page,
            rowsPerPage,
            total,
          },
        },
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
