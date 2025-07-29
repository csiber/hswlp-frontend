export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const data = (await request.json()) as any;
  const { email, password } = data;
  const db = (env as any).DB;
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }
  await db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").bind(email, password).run();
  return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" }, status: 201 });
};
