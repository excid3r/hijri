import fs from "fs";
import path from "path";

export async function GET(request) {
  const { pathname } = new URL(request.url)
  const parts = pathname.split("/");
  const page = parts[parts.length - 1];
  const filePath = path.resolve(".", `images/page-${page}.png`);
  const imageBuffer = fs.readFileSync(filePath);
  return new Response(imageBuffer, {
    status: 200,
    headers: { 'Content-Type': `image/png` },
  })
}
