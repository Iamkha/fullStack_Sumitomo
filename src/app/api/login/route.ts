import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { UserModel } from "@/backEnd/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
  const { email, password }: any = await request.json();

  if (email === undefined || password === undefined) {
    return NextResponse.json(
      {
        message: "Email or password is empty",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await connectToDB();
    const user: any = await UserModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        {
          error: true,
          message: "Email and password are not valid.",
        },
        {
          status: 400,
        }
      );
    }

    const { firstname, lastname, active, roles, _id } = user;
    const info = { email, firstname, lastname, active, roles, _id };

    return NextResponse.json(
      {
        error: false,
        message: "success",
        token: jwt.sign(info, process.env.JWT_SECRET || ""),
        info,
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
