import { stripeGet } from "@/utils/stripe-api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { paymentIntentId: string } }
) {
  try {
    const paymentIntent = await stripeGet<any>(
      `/payment_intents/${params.paymentIntentId}?expand[]=charges`
    );
    const receiptUrl = paymentIntent?.charges?.data?.[0]?.receipt_url;
    if (receiptUrl) {
      return NextResponse.redirect(receiptUrl, { status: 302 });
    }
    return new NextResponse(null, { status: 404 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
