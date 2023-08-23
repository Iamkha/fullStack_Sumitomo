import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { TemplateModel } from "@/backEnd/models/template";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const data = await TemplateModel.findById(request.url.split("/")[6]);

    return NextResponse.json(
      {
        error: false,
        message: "success",
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
