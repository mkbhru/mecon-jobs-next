import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function POST(req) {
  const { section_id, content } = await req.json();

  try {
    await db.query(
      "INSERT INTO section_items (section_id, content) VALUES (?, ?)",
      [section_id, content]
    );
    return NextResponse.json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ message: "Error adding item" }, { status: 500 });
  }
}
