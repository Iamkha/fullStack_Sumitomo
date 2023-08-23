import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { TemplateModel } from "@/backEnd/models/template";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectToDB();

    const req = await request.json();
    const data = await TemplateModel.create(req);

    return NextResponse.json(
      {
        error: false,
        message: "success",
        // data: data._id.toString(),
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        massege: error.message,
      },
      {
        status: 400,
      }
    );
  }
};
