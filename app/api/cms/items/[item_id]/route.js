import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function PUT(req, { params }) {
  const { item_id } = await params;

  try {
    const { content, isVisible } = await req.json();

    // Validate input
    if (!content || !item_id) {
      return NextResponse.json(
        { error: "Content and visibility are required" },
        { status: 400 }
      );
    }

    // Update the item in the database
    const query = "UPDATE section_items SET content = ? , is_visible = ? WHERE id = ?";
    await db.execute(query, [content, isVisible, item_id]);

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
export async function GET(req, { params }) {
  const { item_id } = await params;

  try {
    // Validate input
    if (!item_id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Fetch the item from the database
    const query = "SELECT * FROM section_items WHERE id = ?";
    const [rows] = await db.execute(query, [item_id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { item_id } = await params;

  try {
    // Validate input
    if (!item_id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Delete the item from the database
    const query = "DELETE FROM section_items WHERE id = ?";
    const [result] = await db.execute(query, [item_id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Item not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
