import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { UserModel, userRole } from "@/backEnd/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  try {
    await connectToDB();
    const { email, password, isAdmin, firstname, lastname, isActive }: any =
      await request.json();
    await UserModel.validate({ email, password, firstname, lastname, isAdmin });
    try {
      const info = await UserModel.create({
        email: email,
        firstname: firstname,
        lastname: lastname,
        isActive,
        roles: isAdmin ? [userRole.ADMIN] : [userRole.USER],
        password: bcrypt.hashSync(password, 10),
      });
      return NextResponse.json(
        {
          error: false,
          message: "success",
          info,
        },
        {
          status: 201,
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
  } catch (error: any) {
    const err = error.errors;
    const keys = Object.keys(err);
    const errorsObj: any = {};
    keys.map((key) => {
      errorsObj[key] = err[key].message;
    });
    return NextResponse.json(
      {
        error: true,
        message: errorsObj,
      },
      {
        status: 400,
      }
    );
  }
};
