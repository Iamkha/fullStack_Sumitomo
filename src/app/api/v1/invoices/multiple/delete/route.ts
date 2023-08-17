import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { NextResponse } from "next/server";
import { InvoiceModel } from "@/backEnd/models/invoice";

export const DELETE = async (request: Request) => {
  try {
    await connectToDB();
    const { list }: any = await request.json();

    await InvoiceModel.deleteMany({ _id: { $in: list } });

    return NextResponse.json(
      {
        error: false,
        message: "success",
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
};
