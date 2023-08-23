import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { get } from "lodash";
import { CompanyModel } from "@/backEnd/models/company";

export const POST = async (request: Request) => {
  console.log(request.headers.get("authorization"), "kha");

  try {
    await connectToDB();
    const req = await request.json();
    const page = get(req, ["pagination", "page"], 1);
    const rowsPerPage = get(req, ["pagination", "rowsPerPage"], 10);
    const filters = get(req, ["filters"], []).filter((ft: any) => !!ft.value);
    const totalTemplatesFilter =
      filters.find((el: any) => el.field == "totalTemplates") || {};
    const min = totalTemplatesFilter?.value?.min || 0;
    const max = totalTemplatesFilter?.value?.max;
    console.log(page, rowsPerPage, filters, totalTemplatesFilter, min, max);

    const conditionMinMax = [
      {
        $lookup: {
          from: "templates",
          localField: "_id",
          foreignField: "referenceId",
          as: "result",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          no: 1,
          name2: 1,
          searchName: 1,
          address: 1,
          refId: "$result.referenceId",
          totalTemplates: {
            $size: "$result.referenceId",
          },
        },
      },
      {
        $match: {
          totalTemplates: {
            $gte: Number(min),
            $lte: Number(max),
          },
        },
      },
    ];

    const match = filters.reduce((a: any, b: any) => {
      if (b.field != "totalTemplates") {
        return {
          ...a,
          [b.field]: {
            $regex: `^.*${b.value}.*$`,
            $options: "i",
          },
        };
      }
      return a;
    }, {});

    const rows = await CompanyModel.aggregate(
      [
        {
          $match: match,
        },
        {
          $lookup: {
            from: "templates",
            localField: "_id",
            foreignField: "referenceId",
            as: "result",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            no: 1,
            name2: 1,
            searchName: 1,
            address: 1,
            totalTemplates: {
              $size: "$result.referenceId",
            },
          },
        },
        ...(min && max
          ? [
              {
                $match: {
                  totalTemplates: {
                    $gte: Number(min),
                    $lte: Number(max),
                  },
                },
              },
            ]
          : []),
        {
          $skip: (+page - 1) * rowsPerPage,
        },
        {
          $limit: +rowsPerPage,
        },
      ],
      { allowDiskUse: true }
    );

    const count = await CompanyModel.aggregate([
      {
        $match: match,
      },
      ...(min && max ? conditionMinMax : []),
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
            page,
            rowsPerPage,
            total,
          },
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
        massege:
          error.message ||
          "The system crashed, please try again in a few minutes",
      },
      {
        status: 400,
      }
    );
  }
};
