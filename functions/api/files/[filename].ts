import "server-only";

function inferContentType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    case "avif":
      return "image/avif";
    default:
      return "application/octet-stream";
  }
}

export const onRequestGet: PagesFunction = async ({ params, env }) => {
  const filename = params?.filename as string | undefined;
  if (!filename) {
    return new Response("Bad Request", { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const object = await env.hswlp_r2.get(filename);

  if (!object) {
    return new Response("Not Found", { status: 404, headers: { "Cache-Control": "no-store" } });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);

  const contentType = object.httpMetadata?.contentType ?? inferContentType(filename);
  headers.set("Content-Type", contentType);

  if (contentType.startsWith("image/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    headers.set("Cache-Control", "no-store");
  }
  if (object.httpEtag) {
    headers.set("ETag", object.httpEtag);
  }
  if (object.uploaded) {
    headers.set("Last-Modified", object.uploaded.toUTCString());
  }

  return new Response(object.body, { status: 200, headers });
};
