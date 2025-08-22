import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Check, 
  Crown, 
  Zap, 
  Users, 
  MessageCircle, 
  BarChart3,
  CreditCard,
  Smartphone,
  Shield
} from "lucide-react";

interface PricingPlansProps {
  currentPlan?: "basic" | "pro" | "enterprise";
}

export default function PricingPlans({ currentPlan = "basic" }: PricingPlansProps) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for small businesses starting with WhatsApp automation",
      price: "₹999",
      period: "/month",
      icon: MessageCircle,
      color: "from-blue-500 to-blue-600",
      features: [
        "Up to 5 projects",
        "1,000 WhatsApp messages/month",
        "Basic templates",
        "Campaign analytics",
        "Email support",
        "Facebook integration"
      ],
      limitations: [
        "Limited AI templates",
        "Basic analytics only"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      description: "Advanced features for growing businesses with enhanced automation",
      price: "₹2,999",
      period: "/month",
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      popular: true,
      features: [
        "Up to 20 projects",
        "10,000 WhatsApp messages/month",
        "AI-powered templates",
        "Advanced analytics & insights",
        "Live chat support",
        "Multi-platform integration",
        "Custom CTAs",
        "A/B testing"
      ],
      limitations: []
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Complete solution for large enterprises with unlimited access",
      price: "₹9,999",
      period: "/month",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      features: [
        "Unlimited projects",
        "Unlimited WhatsApp messages",
        "Custom AI model training",
        "Enterprise analytics suite",
        "24/7 priority support",
        "Custom integrations",
        "White-label solution",
        "Dedicated account manager",
        "Custom compliance features"
      ],
      limitations: []
    }
  ];

  const paymentMethods = [
    {
      id: "phonepe",
      name: "PhonePe",
      icon: Smartphone,
      color: "bg-purple-600",
      description: "Pay instantly with PhonePe UPI"
    },
    {
      id: "razorpay",
      name: "Razorpay",
      icon: CreditCard,
      color: "bg-blue-600",
      description: "Credit/Debit Cards, UPI, Net Banking"
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setIsPaymentOpen(true);
  };

  const handlePayment = (paymentMethod: string) => {
    console.log(`Processing payment for ${selectedPlan} plan via ${paymentMethod}`);
    // Here you would integrate with actual payment gateway
    setIsPaymentOpen(false);
  };

  const getPlanIcon = (IconComponent: any, color: string) => {
    return (
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-full flex items-center justify-center`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
          💎 Pricing Plans
        </Badge>
        <h2 className="text-3xl font-bold text-foreground">
          Choose Your Perfect Plan
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Scale your WhatsApp business with our flexible pricing. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Current Plan Indicator */}
      {currentPlan && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">
              You're currently on the {plans.find(p => p.id === currentPlan)?.name} plan
            </span>
          </div>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              plan.popular ? 'border-primary shadow-lg scale-105' : ''
            } ${currentPlan === plan.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              {getPlanIcon(plan.icon, plan.color)}
              <CardTitle className="text-2xl font-bold mt-4">{plan.name}</CardTitle>
              <CardDescription className="text-sm">{plan.description}</CardDescription>
              
              <div className="mt-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Limitations
                  </p>
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 flex-shrink-0 bg-muted rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4">
                {currentPlan === plan.id ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {currentPlan && plans.findIndex(p => p.id === currentPlan) < plans.findIndex(p => p.id === plan.id)
                      ? "Upgrade to " + plan.name
                      : currentPlan && plans.findIndex(p => p.id === currentPlan) > plans.findIndex(p => p.id === plan.id)
                      ? "Downgrade to " + plan.name
                      : "Choose " + plan.name
                    }
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Complete Your {plans.find(p => p.id === selectedPlan)?.name} Plan Purchase
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Plan Summary */}
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-lg">
                {plans.find(p => p.id === selectedPlan)?.name} Plan
              </h3>
              <p className="text-2xl font-bold text-primary mt-1">
                {plans.find(p => p.id === selectedPlan)?.price}
                <span className="text-sm text-muted-foreground">/month</span>
              </p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <h4 className="font-medium text-center">Choose Payment Method</h4>
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  variant="outline"
                  className="w-full h-16 flex items-center gap-4 hover:border-primary"
                  onClick={() => handlePayment(method.id)}
                >
                  <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </Button>
              ))}
            </div>

            {/* Security Note */}
            <div className="text-center text-xs text-muted-foreground">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="w-3 h-3" />
                <span>Secure Payment</span>
              </div>
              Your payment information is encrypted and secure
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Features Comparison */}
      <div className="mt-12 text-center">
        <Button variant="outline" className="gap-2">
          <BarChart3 className="w-4 h-4" />
          View Detailed Features Comparison
        </Button>
      </div>
    </div>
  );
}