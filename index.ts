// wrangler dev index.ts --d1=DB

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/data") {
      const users = await env.DB.prepare("SELECT * FROM user").all();
      const accounts = await env.DB.prepare("SELECT * FROM account").all();
      const sessions = await env.DB.prepare("SELECT * FROM session").all();

      return Response.json({
        users: users.results,
        accounts: accounts.results,
        sessions: sessions.results,
      });
    }

    return new Response(
      "Call /api/data to see data from users, accounts, and sessions tables",
    );
  },
} satisfies ExportedHandler<Env>;