"use client";

import { Button } from "@/app/_components/ui/button";
import { createCheckout } from "../_actions/create-checkout";

import { loadStripe } from "@stripe/stripe-js";

const AcquarePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publish key not available");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    );

    if (!stripe) {
      throw new Error("Failed to load Stripe");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AcquarePlanButton;
