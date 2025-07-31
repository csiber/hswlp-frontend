import {
  stripeGet,
  StripePaymentIntentWithCharges,
} from "@/utils/stripe-api";
import { NextResponse } from "next/server";
import type { AppRouteHandlerFnContext } from "next/dist/server/route-modules/app-route/module";

export async function GET(
  _request: Request,
  context: AppRouteHandlerFnContext
) {
  const params = await context.params;
  const paymentIntentId = params?.paymentIntentId;
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
