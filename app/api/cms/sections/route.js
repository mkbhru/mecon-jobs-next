import { NextResponse } from "next/server";
import db from "@/utils/db"; // Database connection utility
import { getSession } from "@/utils/auth"; // Session authentication utility

// POST Handler (Add section)
export async function POST(req) {
  try {
    // Check authentication
    const session = await getSession(req.headers.get("cookie"));
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const { name } = await req.json();
    // Validate input
    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Section name is required." },
        { status: 400 }
      );
    }

    // Insert section into the database
    const [rows] = await db.query(
      "SELECT COALESCE(MAX(sort_order), 0) AS max_sort_order FROM sections"
    );

    const maxSortOrder = rows[0].max_sort_order + 1; // Get the next sort_order

    const query = "INSERT INTO sections (name, sort_order) VALUES (?, ?)";
    const [result] = await db.execute(query, [name, maxSortOrder]);

    // Return success response
    return NextResponse.json(
      { message: "Section added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding section:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET Handler (Fetch sections)
export async function GET(req) {
  try {
    // Check authentication (Optional, depending on your use case)
    const session = await getSession(req.headers.get("cookie"));
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch sections from the database
    const query = "SELECT * FROM sections order by sort_order DESC";
    const [rows] = await db.execute(query);

    // Return success response with sections data
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
