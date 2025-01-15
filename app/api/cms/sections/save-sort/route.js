import db from "@/utils/db";

// Save sort order of sections
export async function POST(req) {
  try {
    // Parse the incoming request body
    const { sectionsArray } = await req.json();

    // Validate the input
    if (!Array.isArray(sectionsArray) || sectionsArray.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Invalid input data. Expected a non-empty array.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }


    // Update each section's sort_order in the database
    for (const section of sectionsArray) {
      const { id, sort_order } = section;

      // Validate id and sort_order
      if (typeof id !== "number" || typeof sort_order !== "number") {
        throw new Error(
          "Invalid data format. `id` and `sort_order` must be numbers."
        );
      }

      const query = "UPDATE sections SET sort_order = ? WHERE id = ?";
      await db.execute(query, [sort_order , id]);
    }


    return new Response(
      JSON.stringify({ message: "Sort order updated successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Rollback the transaction in case of an error

    console.error("Error saving sort order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save sort order." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
