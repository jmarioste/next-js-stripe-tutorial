"use client";

import { CheckoutSubscriptionBody } from "@/app/checkout-sessions/route";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const MonthlySubscriptionCard = () => {
  const handleClick = async () => {
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);

    const body: CheckoutSubscriptionBody = {
      interval: "month",
      amount: 2000,
      plan: "Monthly",
      planDescription: "Subscribe for $20 per month",
    };

    const result = await fetch("/checkout-sessions", {
      method: "post",
      body: JSON.stringify(body, null),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = (await result.json()) as Stripe.Checkout.Session;
    const sessionId = data.id!;
    stripe?.redirectToCheckout({ sessionId });
  };
  return (
    <div className="border border-gray-100 rounded-md p-8 flex flex-col gap-2 items-start">
      <h2 className="text-xl font-bold text-gray-700">Monthly Subscription</h2>
      <p className="text-gray-400">$20 per month</p>
      <button
        onClick={() => handleClick()}
        className="border border-violet-200 text-violet-500 rounded-md px-4 py-2 w-full hover:bg-violet-500 hover:text-violet-200 transition-colors"
      >
        Subscribe
      </button>
    </div>
  );
};
export default MonthlySubscriptionCard;
