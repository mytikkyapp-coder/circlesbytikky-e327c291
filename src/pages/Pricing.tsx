import PricingPlans from "@/components/PricingPlans";

export default function Pricing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Pricing & Payments</h1>
        <p className="text-muted-foreground">Choose the plan that works best for your business</p>
      </div>

      {/* Pricing Plans Component */}
      <PricingPlans />
    </div>
  );
}