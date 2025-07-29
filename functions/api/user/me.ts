import { jwtVerify } from "jose";

export const onRequestGet: PagesFunction<CloudflareEnv> = async ({ request, env }) => {
  const auth = request.headers.get("Authorization");
  if (!auth) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const token = auth.split(" ")[1];
    const { payload } = await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
    return new Response(JSON.stringify({ id: payload.id }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
};
