"use client";

import Stripe from "stripe";

type Props = {
  customer: Stripe.Customer | null;
};
const SignUpForm = ({ customer }: Props) => {
  const email = customer?.email ?? "";
  const customerId = customer?.id ?? "";
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        // save user to your own database
      }}
    >
      <label>Email</label>
      <input
        className="border border-violet-200 rounded-md px-4 py-2 w-full"
        type="text"
        value={email}
        placeholder="Email"
        name="email"
        id="email"
      />
      <input type="hidden" value={customerId} name="stripe_customer_id" />
      <label htmlFor="password">Password</label>
      <input
        className="border border-violet-200 rounded-md px-4 py-2 w-full"
        type="password"
        name="password"
        id="password"
        placeholder="password"
      ></input>
      <button
        className="border border-violet-200 text-violet-100 bg-violet-500 rounded-md px-4 py-2 w-full hover:bg-violet-700 hover:text-violet-100 transition-colors"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
};
export default SignUpForm;
