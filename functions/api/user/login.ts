import { SignJWT } from "jose";

export const onRequestPost: PagesFunction<CloudflareEnv> = async ({ request, env }) => {
  const data = (await request.json()) as any;
  const { email, password } = data;
  const db = env.DB;
  const { results } = await db
    .prepare("SELECT id FROM users WHERE email=? AND password=?")
    .bind(email, password)
    .all();
  if (!results.length) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }
  const token = await new SignJWT({ id: results[0].id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(env.JWT_SECRET));
  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" },
  });
};
