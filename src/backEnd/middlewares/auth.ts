import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function auth({ request }: any) {
  try {
    const user: any = jwt.decode(
      request.headers.get("authorization")?.split(" ")[1] || ""
    );

    if (Date.now() >= user.exp * 1000) {
      return NextResponse.json(
        {
          error: true,
          message: "Your token has expired login permission",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.next();
  } catch (error) {}
  return NextResponse.json(
    {
      error: true,
      message: "You are not allowed to perform this action.",
    },
    {
      status: 400,
    }
  );
}
