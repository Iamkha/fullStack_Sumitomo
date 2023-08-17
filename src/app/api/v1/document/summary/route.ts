import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { NextResponse } from "next/server";
import { DocumentModel } from "@/backEnd/models/document";

export const POST = async (request: Request) => {
  try {
    await connectToDB();
    const { from, to } = await request.json();
    let newTo;

    if (to) {
      const date = new Date(to);
      const formatDate = new Date(date);
      formatDate.setDate(date.getDate() + 1);
      newTo = formatDate.toISOString();
    }
    const data = await DocumentModel.aggregate([
      ...(from && to
        ? [
            {
              $match: {
                createdAt: {
                  $gt: new Date(from),
                  $lt: new Date(newTo || ""),
                },
              },
            },
          ]
        : []),
      { $group: { _id: "$analyzedStatus", count: { $sum: 1 } } },
    ]);

    const total = data.reduce((a: any, b: any) => a + b.count, 0);

    const result = data.reduce(
      (a: any, b: any) => {
        return {
          ...a,
          [b._id]: b.count,
        };
      },
      { total }
    );

    return NextResponse.json(
      {
        error: false,
        message: "success",
        data: result,
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
