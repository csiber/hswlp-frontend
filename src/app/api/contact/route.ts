import { NextResponse } from "next/server";
import { sendContactEmail } from "@/utils/email";
import { validateTurnstileToken } from "@/utils/validate-captcha";
import { isTurnstileEnabled } from "@/flags";

export async function POST(request: Request) {
  try {
    const { fullName, email, subject, message, captchaToken } = await request.json();

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (await isTurnstileEnabled()) {
      const success = await validateTurnstileToken(captchaToken);
      if (!success) {
        return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });
      }
    }

    await sendContactEmail({ fullName, email, subject, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
