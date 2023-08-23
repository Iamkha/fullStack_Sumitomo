import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { UserModel } from "@/backEnd/models/user";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const response = await axios.get(
      "https://m62jwkiukc.execute-api.ap-southeast-1.amazonaws.com/sumitomo/documents",
      {
        headers: {
          "security-code": process.env.ADMIN_SECRET,
        },
        params: {
          id: request.url.split("/")[6],
        },
      }
    );
    return NextResponse.json(
      {
        error: true,
        data: response.data,
      },
      {
        status: 400,
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
