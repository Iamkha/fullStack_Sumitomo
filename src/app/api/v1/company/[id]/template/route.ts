import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { NextResponse } from "next/server";
import { TemplateModel } from "@/backEnd/models/template";

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const data = await TemplateModel.find({
      referenceId: request.url.split("/")[6],
    });

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
