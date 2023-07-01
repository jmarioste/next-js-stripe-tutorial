import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export interface CheckoutSubscriptionBody {
  plan: string;
  planDescription: string;
  amount: number;
  interval: "month" | "year";
}

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutSubscriptionBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: {
              interval: body.interval,
              interval_count: 1,
            },
            unit_amount: body.amount,
            product_data: {
              name: body.plan,
              description: body.planDescription,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/signup?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
