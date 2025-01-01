import db from "@/utils/db";

export async function GET(req, context) {
  const params = await context.params; // Await the params object
  const { id } = params; // Now safely access `id`

  try {

    // Validate `id`
    if (!id) {
      return new Response(JSON.stringify({ error: "Invalid section ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Query the database for the section with the given `id`
    const query = "SELECT * FROM sections WHERE id = ? Order By id DESC";
    const [rows] = await db.execute(query, [id]);



    // Check if the section exists
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Section not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the section details
    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching section:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch section details" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
