import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  console.log("middleware");
  const token = req.cookies.get("token")?.value; // Get the JWT token from cookies

  if (!token) {
    // Redirect to the login page if no token is present
    return NextResponse.redirect(new URL("/cms/login", req.url));
  }

  try {
    // Verify the token using the secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Pass user data to the request by adding it to the headers
    const response = NextResponse.next();
    response.headers.set("X-User-Data", JSON.stringify(payload)); // Attach the decoded payload
    return response;
  } catch (error) {
    console.error("Token verification failed:", error);
    // Redirect to the login page if verification fails
    return NextResponse.redirect(new URL("/cms/login", req.url));
  }
}
