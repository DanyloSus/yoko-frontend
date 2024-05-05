// external imports
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

// secret key from .env.local
const secretKey = process.env.SECRET;
// this line encodes the `secretKey` string using UTF-8 encoding
const key = new TextEncoder().encode(secretKey);

// encrypt our session from cookies
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 days")
    .sign(key);
}

// decrypt our session from cookies
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(token: string) {
  // create the session
  const expires = new Date(Date.now() + 2629743 * 1000); //for one month
  const session = await encrypt({ token, expires });

  // save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

// get decrypted session from cookies
export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

// refresh the session so it doesn't expire
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 2629743 * 1000); //for one month
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
