// GET Handler (Fetch sections)

import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // Extract the `id` parameter from the request URL
  const params = await context.params; // Await the params object
  const { id } = params; // Now safely access `id`

  if (!id) {
    return NextResponse.json(
      { message: "Section ID is required" },
      { status: 400 }
    );
  }

  // Fetch sections from the database
  const query = `SELECT * FROM section_items WHERE section_id = ? ORDER BY sort_order DESC`;
  const [rows] = await db.execute(query, [id]); // Use prepared statements to prevent SQL injection

  // Ensure rows is always an array
  const sections = Array.isArray(rows) ? rows : [];

  // Return success response with sorted sections data
  return NextResponse.json(sections, { status: 200 });
}
