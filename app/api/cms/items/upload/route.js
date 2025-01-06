import { NextResponse } from "next/server";
import db from "@/utils/db";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file") || null; // Safely get the file field
  const section_id = formData.get("section_id");
  const content = formData.get("content");
  const now = new Date();
  const timestamp =
    now
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 8) +
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0");
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  let pdf_url = null; // Initialize pdf_url as null

  const dirPath = `/var/www/uploads/${year}/${month}/${day}`;

  if (file) {
    if (file.type !== "application/pdf") {
      return new Response(JSON.stringify({ error: "Invalid file type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      await fs.mkdir(dirPath, { recursive: true });

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(dirPath, `${timestamp}_${file.name}`);

      await fs.writeFile(filePath, buffer);
      console.log(`File uploaded: ${filePath}`);
      pdf_url = filePath.replace("/var/www/uploads", "");
      // Set the PDF URL after successful upload
    } catch (error) {
      console.error("File upload error:", error);
      return new Response(JSON.stringify({ error: "Failed to save file" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    console.log("pdf file not uploaded");
  }

  try {
    await db.query(
      "INSERT INTO section_items (section_id, content, pdf_url) VALUES (?, ?, ?)",
      [section_id, content, pdf_url]
    );
    return NextResponse.json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ message: "Error adding item" }, { status: 500 });
  }
}
