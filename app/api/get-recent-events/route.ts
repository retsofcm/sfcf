import client from "./../../../tina/__generated__/client";

export async function GET(req: Request) {
  try {
    const tinaClient = client;
    const events = await tinaClient.queries.eventConnectionQuery({
      first: 3,  // Limit to 3 most recent events
      sort: [{ field: "startDate", order: "desc" }],
    });

    const formattedEvents = Array.isArray(events.data.eventConnection.edges)
      ? events.data.eventConnection.edges.map((edge) => ({
          eventName: edge.node.eventName,
          heroImg: typeof edge.node.heroImg === "string" ? edge.node.heroImg : edge.node.heroImg?.src || "",
          startDate: edge.node.startDate,
          endDate: edge.node.endDate,
          id: edge.node.id,
      }))
      : [];

    return new Response(JSON.stringify(formattedEvents), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(JSON.stringify({ error: "Error fetching events" }), {
      status: 500,
    });
  }
}
