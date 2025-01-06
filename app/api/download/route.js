import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");

  if (!file || !year || !month || !day) {
    return NextResponse.json(
      { success: false, message: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    // Construct the file path
    const filePath = path.join("/var/www/uploads", year, month, day, file);
    const fileData = await readFile(filePath+'.pdf');

    return new NextResponse(fileData, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; file="${file}"`,
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
