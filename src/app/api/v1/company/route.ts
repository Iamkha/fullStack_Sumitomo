import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CompanyModel } from "@/backEnd/models/company";
import { stringify } from "querystring";

export const POST = async (request: Request) => {
  try {
    await connectToDB();

    const req = await request.json();
    const data = await CompanyModel.create(req);

    return NextResponse.json(
      {
        error: false,
        message: "success",
        // data: data._id.toString(),
        id: data._id,
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
