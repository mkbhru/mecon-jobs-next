import db from "@/utils/db";

// Get all items for a specific section
export async function GET(req, context) {
  const params = await context.params; // Await the params object
  const { id } = params; // Access the section ID from params

  try {
    // Validate `id`
    if (!id) {
      return new Response(JSON.stringify({ error: "Section ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Query the database for items belonging to the section with the given `id`
    const query = "SELECT * FROM section_items WHERE section_id = ?";
    const [rows] = await db.execute(query, [id]);



    // Return the list of items
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch items" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Add a new item to a specific section
export async function POST(req, context) {
  const params = await context.params; // Await the params object
  const { id } = params; // Access the section ID from params

  try {
    // Parse the incoming request body (new item data)
    const { name, description } = await req.json();

    // Validate the input fields
    if (!name || !description) {
      return new Response(
        JSON.stringify({ error: "Name and description are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert the new item into the database
    const query =
      "INSERT INTO items (section_id, name, description) VALUES (?, ?, ?)";
    const [result] = await db.execute(query, [id, name, description]);

    // Return success response
    return new Response(
      JSON.stringify({ id: result.insertId, name, description }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding item:", error);
    return new Response(JSON.stringify({ error: "Failed to add item" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
