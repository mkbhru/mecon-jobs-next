import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");
  const year = file.slice(0, 4);
  const month = file.slice(4, 6);
  const day = file.slice(6, 8);

  if (!file || !year || !month || !day) {
    return NextResponse.json(
      { success: false, message: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    // Construct the file path
    const filePath = path.join("/var/www/uploads", year, month, day, file);
    const fileData = await readFile(filePath);

    return new NextResponse(fileData, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; file="${file}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "File not found" },
      { status: 404 }
    );
  }
}
