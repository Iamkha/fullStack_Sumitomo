import { connectToDB } from "@/backEnd/lib/connectMongoDb";
import { UserModel } from "@/backEnd/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleGetPriority } from "@/backEnd/utils/rolesPriority";
import { GUEST_TOKEN } from "@/backEnd/utils/messages";

export const PUT = async (request: Request) => {
  try {
    await connectToDB();
    const id = request.url.split("/")[6];
    const { email, password, firstname, isActive, isAdmin, lastname }: any =
      await request.json();
    const user: any = jwt.decode(
      request.headers.get("authorization")?.split(" ")[1] || ""
    );
    const { roles, _id } = user;
    const resultFind: any = await UserModel.findById(id);

    const priorityUserE = handleGetPriority(roles);
    const priorityUserRequest = handleGetPriority(resultFind.roles);
    if (
      priorityUserRequest < priorityUserE ||
      user.email === resultFind.email
    ) {
      try {
        await UserModel.findByIdAndUpdate(
          { _id: id },
          {
            email,
            password: password
              ? bcrypt.hashSync(password, 10)
              : resultFind.password,
            firstname,
            isActive,
            isAdmin,
            lastname,
          }
        );

        return NextResponse.json(
          {
            error: false,
            message: "success",
          },
          {
            status: 200,
          }
        );
      } catch (error: any) {
        return NextResponse.json(
          {
            error: false,
            message: error.message,
          },
          {
            status: 400,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          error: false,
          message: GUEST_TOKEN,
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: false,
        message: "Not found user!",
      },
      {
        status: 400,
      }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    await connectToDB();
    const id = request.url.split("/")[6];
    // const id = request.url.split("/").reverse()[0];
    const user: any = jwt.decode(
      request.headers.get("authorization")?.split(" ")[1] || ""
    );
    const { roles } = user;
    const resultFind: any = await UserModel.findById(id);
    const priorityUserDeleted = handleGetPriority(roles);
    const priorityUserRequest = handleGetPriority(resultFind.roles);
    if (priorityUserRequest < priorityUserDeleted) {
      try {
        await UserModel.deleteOne({ _id: id });
        return NextResponse.json(
          {
            error: false,
            message: "success",
          },
          {
            status: 200,
          }
        );
      } catch (error) {
        return NextResponse.json(
          {
            error: false,
            message: "Cannot delete user!",
          },
          {
            status: 400,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          error: false,
          message: GUEST_TOKEN,
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: false,
        message: "Not found user!",
      },
      {
        status: 400,
      }
    );
  }
};
