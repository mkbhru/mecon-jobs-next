import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  // Check if 'file' parameter is missing
  if (!file) {
    return NextResponse.json(
      { success: false, message: "Missing required parameters" },
      { status: 400 }
    );
  }

  const year = file.slice(0, 4);
  const month = file.slice(4, 6);
  const day = file.slice(6, 8);

  try {
    // Construct the file path
    const filePath = path.join("/var/www/uploads", year, month, day, file);

    // Check if the file exists before attempting to read it
    const fileData = await readFile(filePath);

    // Return the file content
    return new NextResponse(fileData, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; file="${file}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "File not found", error: error.message },
      { status: 404 }
    );
  }
}

