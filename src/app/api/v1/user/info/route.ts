import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (request: Request) => {
  try {
    await connectToDB();
    const user: any = jwt.decode(
      request.headers.get("authorization")?.split(" ")[1] || ""
    );

    return NextResponse.json(
      {
        error: false,
        message: "success",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        massege: "The system crashed, please try again in a few minutes",
      },
      {
        status: 500,
      }
    );
  }
};
