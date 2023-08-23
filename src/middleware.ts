import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { verify } from "./components/jose/jose";
export async function middleware(request: NextRequest) {
  try {
    const user: any = await verify(
      request.headers.get("authorization")?.split(" ")[1] || "",
      process.env.JWT_SECRET || ""
    );

    const users: any = jwt.decode(
      request.headers.get("authorization")?.split(" ")[1] || ""
    );

    // if (Date.now() >= user.exp * 1000) {
    if (Date.now() >= users.exp * 1000) {
      console.log("dung ");

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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";
// export async function middleware(request: NextRequest) {
//   try {
//     const user: any = jwt.decode(
//       request.headers.get("authorization")?.split(" ")[1] || ""
//     );

//     if (Date.now() >= user.exp * 1000) {
//       return NextResponse.json(
//         {
//           error: true,
//           message: "Your token has expired login permission",
//         },
//         {
//           status: 400,
//         }
//       );
//     }
//     return NextResponse.next();
//   } catch (error) {}
//   return NextResponse.json(
//     {
//       error: true,
//       message: "You are not allowed to perform this action.",
//     },
//     {
//       status: 400,
//     }
//   );
// }

// export const config = {
//   matcher: ["/api/v1/:path*"],
// };
