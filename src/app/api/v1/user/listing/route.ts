import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { UserModel } from "@/backEnd/models/user";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectToDB();
    // const { searchParams } = new URL(request.url);
    // const rowsPerPage = searchParams.get("rowsPerPage") || 10;
    // const page = searchParams.get("page") || 1;
    const { pagination }: any = await request.json();
    const { rowsPerPage, page } = pagination;
    const match = {};

    const rows = await UserModel.aggregate(
      [
        {
          $match: match,
        },
        {
          $skip: (+(page || 1) - 1) * (Number(rowsPerPage) || 10),
        },
        {
          $limit: +rowsPerPage || 10,
        },
      ],
      { allowDiskUse: true }
    );

    const count = await UserModel.aggregate([
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
          rows: rows.map((row) => ({
            ...row,
            password: undefined,
          })),
          pagination: {
            page: page || 1,
            rowsPerPage: rowsPerPage || 10,
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
