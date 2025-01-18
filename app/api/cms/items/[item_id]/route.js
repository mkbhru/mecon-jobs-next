import { NextResponse } from "next/server";
import db from "@/utils/db";

const formatToMySQLDateTime = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
export async function PUT(req, { params }) {
  const { item_id } = params;

  try {
    const { content, isVisible, startDate, endDate, applyOnline } = await req.json();

    // Validate input
    if (!content || !item_id) {
      return NextResponse.json(
        { error: "Content and visibility are required" },
        { status: 400 }
      );
    }

    // Format dates for MySQL
    const formattedStartDate = formatToMySQLDateTime(startDate);
    const formattedEndDate = formatToMySQLDateTime(endDate);

    // Update the item in the database
    const query =
      "UPDATE section_items SET content = ?, is_visible = ?, start_date = ?, end_date = ?, apply_online = ? WHERE id = ? ";
    await db.execute(query, [
      content,
      isVisible,
      formattedStartDate,
      formattedEndDate,
      applyOnline,
      item_id
    ]);

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


import fs from "fs";
import path from "path";
import { start } from "repl";

export async function DELETE(req, { params }) {
  const { item_id } = params; // 'params' is already an object, no need to 'await' it
  const pdf_url = req.pdf_url; // Make sure pdf_url is being passed correctly from the request body or query

  try {
    // Validate input
    if (!item_id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // If pdf_url exists, attempt to delete the file
    if (pdf_url) {
      const filePath = path.join("/var/www/uploads", pdf_url); // Adjust the file path if needed
      // Check if the file exists before trying to delete
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log(`File deleted: ${filePath}`);
        }
      });
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
      { message: "Item and associated file deleted successfully" },
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