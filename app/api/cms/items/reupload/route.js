import { NextResponse } from "next/server";
import db from "@/utils/db";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file") || null;
  const item_id = formData.get("item_id");

  let pdf_url = null;

  if (!item_id) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  let existingItem;
  try {
    const [rows] = await db.query(
      "SELECT pdf_url FROM section_items WHERE id = ?",
      [item_id]
    );
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Item not found with the given ID" },
        { status: 404 }
      );
    }
    existingItem = rows[0];
    pdf_url = existingItem.pdf_url;
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { error: "Failed to fetch item details" },
      { status: 500 }
    );
  }

  const dirPath = `/var/www/uploads${pdf_url}`;

  if (file) {
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = dirPath;

      await fs.writeFile(filePath, buffer);
      console.log(`File reuploaded: ${filePath}`);
    } catch (error) {
      console.error("File reupload error:", error);
      return NextResponse.json(
        { error: "Failed to resave file" },
        { status: 500 }
      );
    }
  }

  // Success response
  return NextResponse.json(
    { message: "PDF reuploaded successfully", pdf_url },
    { status: 200 }
  );
}
