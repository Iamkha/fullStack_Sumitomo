import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { PdfHeaderModel } from "@/backEnd/models/pdfHeader";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectToDB();
    const data = await PdfHeaderModel.find({
      documentId: request.url.split("/")[6],
    });
    if (data.length) {
      return NextResponse.json(
        {
          error: false,
          data: data,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          error: false,
          data: [],
        },
        {
          status: 200,
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
        status: 400,
      }
    );
  }
};
