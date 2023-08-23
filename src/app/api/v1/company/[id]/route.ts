import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CompanyModel } from "@/backEnd/models/company";
import { stringify } from "querystring";

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const data = await CompanyModel.findById(request.url.split("/")[6]);

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
