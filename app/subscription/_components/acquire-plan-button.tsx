"use client";

import { Button } from "@/app/_components/ui/button";
import { createCheckout } from "../_actions/create-checkout";

import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquarePlanButton = () => {
  const { user } = useUser();
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

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPlan) {
    return (
      <Button asChild className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

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
