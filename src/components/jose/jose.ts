import { jwtVerify, type JWTPayload, SignJWT } from "jose";

export async function verify(
  token: string,
  secret: string
): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return { payload };
}

export async function sign(payload: any, secret: any): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);

  return new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}
