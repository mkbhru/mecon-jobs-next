import { NextResponse } from "next/server";
import db from "@/utils/db";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  // const { section_id, content} = await req.json();
  const section_id = formData.get("section_id");
  const content = formData.get("content");
// const pdfFileName = pdf.name;

  if (!file || file.type !== "application/pdf") {
    return new Response(JSON.stringify({ error: "Invalid file type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

   const fileData = await file.arrayBuffer();
   const filePath = path.join(process.cwd(), "public/uploads", file.name);
   try {
     await fs.writeFile(filePath, Buffer.from(fileData));
     console.log(`File uploaded: ${file.name}`);
    //  return new Response(
    //    JSON.stringify({ success: true, fileName: file.name }),
    //    {
    //      status: 200,
    //      headers: { "Content-Type": "application/json" },
    //    }
    //  );
    console.log("uploaded successfuly");
   } catch (error) {
     console.error("File upload error:", error);
     return new Response(JSON.stringify({ error: "Failed to save file" }), {
       status: 500,
       headers: { "Content-Type": "application/json" },
     });
   }
  

  const pdf_url = `/uploads/${file.name}`;

  try {
    await db.query(
      "INSERT INTO section_items (section_id, content, pdf_url) VALUES (?, ?, ?)",
      [section_id, content,pdf_url]
    );
    return NextResponse.json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ message: "Error adding item" }, { status: 500 });
  }
}
