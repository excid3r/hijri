import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request) {
  const {page} = request.params;
  console.log(request)
  console.log("hi", page)
  const filePath = path.resolve(".", "images/01.png");
  const imageBuffer = fs.readFileSync(filePath);
  // console.log(request)
  return new Response(imageBuffer, {
    status: 200,
    headers: { 'Content-Type': `image/png` },
  })
}
