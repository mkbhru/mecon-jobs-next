import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/utils/db";

export async function POST(req) {
  const { email, password } = await req.json();
  console.log(email, password);
  try {
    // Find the user by email
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = rows[0];

    const isPasswordValid =  (password === user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // Add JWT secret to .env file
      { expiresIn: "10m" } // Token expiry time
    );


    // Return the token
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
