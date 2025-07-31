import {
  stripeGet,
  StripePaymentIntentWithCharges,
} from "@/utils/stripe-api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  _request: NextRequest,
  context: unknown
) {
  const { params } = context as { params?: Promise<Record<string, string | string[] | undefined>> };
  const resolvedParams = await params;
  const paymentIntentId = resolvedParams?.paymentIntentId;
  if (!paymentIntentId) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const paymentIntent = await stripeGet<StripePaymentIntentWithCharges>(
      `/payment_intents/${paymentIntentId}?expand[]=charges`
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
