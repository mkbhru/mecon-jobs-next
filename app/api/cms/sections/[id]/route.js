import db from "@/utils/db";
import { NextResponse } from "next/server";


export async function PUT(req, { params }) {
  const {id} = await params;

  try {
    const { name, isVisible } = await req.json();

    // Validate input
    if (!name || !id) {
      return NextResponse.json(
        { error: "name and visibility are required" },
        { status: 400 }
      );
    }

    // Update the item in the database
    const query =
      "UPDATE sections SET name = ? , is_visible = ? WHERE id = ?";
    await db.execute(query, [name, isVisible, id]);
    return NextResponse.json(
      { message: "Item updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}


export async function GET(req, context) {
  const params = await context.params; // Await the params object
  const { id } = params; // Now safely access `id`

  try {

    // Validate `id`
    if (!id) {
      return new Response(JSON.stringify({ error: "Invalid section ID" }), {
        status: 400,
        headers: { "name-Type": "application/json" },
      });
    }

    // Query the database for the section with the given `id`
    const query = "SELECT * FROM sections WHERE id = ? Order By id DESC";
    const [rows] = await db.execute(query, [id]);
    // Check if the section exists
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Section not found" }), {
        status: 404,
        headers: { "name-Type": "application/json" },
      });
    }

    // Return the section details
    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { "name-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching section:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch section details" }),
      {
        status: 500,
        headers: { "name-Type": "application/json" },
      }
    );
  }
}
