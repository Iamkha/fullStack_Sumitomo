import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function middleware(request: NextRequest) {
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

export const config = {
  matcher: ["/api/v1/:path*"],
};
