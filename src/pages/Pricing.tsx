

import PricingPlans from "@/components/PricingPlans";
import OffersBanner from "@/components/OffersBanner";

export default function Pricing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Offers and Referrals</h1>
        <p className="text-muted-foreground">Discover exclusive deals, special offers, and earn rewards through our referral program</p>
      </div>

      {/* Offers Banner */}
      <OffersBanner />

      {/* Pricing Plans Component */}
      <PricingPlans />
    </div>
  );
}

