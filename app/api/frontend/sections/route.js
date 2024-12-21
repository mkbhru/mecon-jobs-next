// app/api/frontend/sections/route.js

import { NextResponse } from "next/server";
import db from "@/utils/db";
// import mysql from "mysql2/promise";

// Create the database connection
// const db = mysql.createPool({
//   host: "localhost", // Your database host
//   user: "root", // Your database user
//   //password: "your_db_pass", // Your database password
//   database: "jobs_cms", // The database name you are using
// });

export async function GET() {
  try {
    // Query to fetch sections and their items
    const [sections] = await db.query("SELECT * FROM sections");
    console.log([sections]);
    console.log("sections");
    const sectionsWithItems = [];

    // Fetch items for each section
    for (const section of sections) {
      const [items] = await db.query(
        "SELECT * FROM section_items WHERE section_id = ?",
        [section.id]
      );
      sectionsWithItems.push({
        ...section,
        items: items,
      });
    }

    return NextResponse.json(sectionsWithItems);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Error fetching sections and items" },
      { status: 500 }
    );
  }
}
