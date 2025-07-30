import { getAllApps } from "@/lib/db/apps";
import { NextResponse } from "next/server";

export async function GET() {
  const apps = await getAllApps();
  return NextResponse.json(apps);
}
