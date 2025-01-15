// GET Handler (Fetch sections)

import db from "@/utils/db";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Check authentication (Optional, depending on your use case)
    // const session = await getSession(req.headers.get("cookie"));
    // if (!session) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // Fetch sections from the database
    const query = "SELECT * FROM sections ORDER BY sort_order DESC";
    const [rows] = await db.execute(query);

    // Ensure rows is always an array
    const sections = Array.isArray(rows) ? rows : [];

    // Return success response with sorted sections data
    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
