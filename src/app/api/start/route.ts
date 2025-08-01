import { NextResponse } from "next/server";
import { createRequest } from "@/db/request";
import { sendStartRequestEmail } from "@/utils/email";

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      project_name,
      description,
      domain_type,
    } = (await request.json()) as {
      name?: string;
      email?: string;
      project_name?: string;
      description?: string;
      domain_type?: string;
    };

    if (!name || !email || !description || !domain_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const createdAt = new Date();

    await createRequest({
      name,
      email,
      projectName: project_name ?? null,
      description,
      domainType: domain_type,
      createdAt,
      status: "pending",
    });

    await sendStartRequestEmail({
      name,
      email,
      projectName: project_name ?? undefined,
      description,
      domainType: domain_type,
      createdAt,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
  }
}
