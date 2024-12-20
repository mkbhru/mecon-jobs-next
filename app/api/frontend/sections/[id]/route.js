import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "your_db_user",
  password: "your_db_pass",
  database: "jobs_cms",
});

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const [sectionResult] = await db.query(
      "SELECT * FROM sections WHERE id = ?",
      [id]
    );
    if (sectionResult.length === 0) {
      return NextResponse.json(
        { message: "Section not found" },
        { status: 404 }
      );
    }

    const section = sectionResult[0];
    const [itemsResult] = await db.query(
      "SELECT * FROM section_items WHERE section_id = ?",
      [id]
    );

    return NextResponse.json({ section, items: itemsResult });
  } catch (error) {
    console.error("Error fetching section items:", error);
    return NextResponse.json(
      { message: "Error fetching section items" },
      { status: 500 }
    );
  }
}
