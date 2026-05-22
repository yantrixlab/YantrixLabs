import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "home_animated_logos");
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => ALLOWED_EXT.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b));

    return NextResponse.json({ success: true, data: files });
  } catch {
    return NextResponse.json({ success: true, data: [] });
  }
}

