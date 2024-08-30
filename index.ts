import { db } from "./lib/drizzle/db";
import { users } from "./lib/drizzle/schema";

// Example route handler function
async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "/users") {
    // Example query to fetch all users
    const usersList = await db.select().from(users).all();
    return new Response(JSON.stringify(usersList), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Not found", { status: 404 });
}

// Set up the Cloudflare Worker to listen to incoming requests
addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
