
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gift, 
  Clock, 
  Star, 
  Zap, 
  X,
  Users,
  Heart
} from "lucide-react";

export default function OffersBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const upcomingOffers = [
    {
      id: "early-bird",
      title: "Early Bird Special",
      description: "Get 50% off Pro plan for first 3 months",
      discount: "50% OFF",
      validUntil: "Dec 31, 2024",
      icon: Clock,
      gradient: "from-orange-500 to-red-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: "referral-bonus",
      title: "Referral Rewards",
      description: "Refer 3 friends and get 1 month free",
      discount: "FREE MONTH",
      validUntil: "Ongoing",
      icon: Users,
      gradient: "from-blue-500 to-purple-500",
      textColor: "text-blue-600", 
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "loyalty-program",
      title: "Loyalty Rewards",
      description: "Stay subscribed for 6 months, get 2 months free",
      discount: "2 MONTHS FREE",
      validUntil: "Limited Time",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      textColor: "text-pink-600",
      bgColor: "bg-pink-50", 
      borderColor: "border-pink-200"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="relative">
      {/* Main Banner */}
      <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">🎉 Upcoming Offers & Rewards</h3>
                <p className="text-sm text-muted-foreground">Limited time special deals and referral programs</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingOffers.map((offer) => (
              <div 
                key={offer.id}
                className={`${offer.bgColor} ${offer.borderColor} border rounded-lg p-4 relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${offer.gradient} rounded-full transform translate-x-6 -translate-y-6`}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 bg-gradient-to-r ${offer.gradient} rounded-full flex items-center justify-center`}>
                      <offer.icon className="w-3 h-3 text-white" />
                    </div>
                    <Badge variant="secondary" className={`${offer.textColor} bg-white text-xs font-bold`}>
                      {offer.discount}
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-1">{offer.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Until {offer.validUntil}</span>
                    </div>
                    <Star className={`w-4 h-4 ${offer.textColor} animate-pulse`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Zap className="w-4 h-4" />
                Notify Me of New Offers
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary text-white">
                <Gift className="w-4 h-4" />
                View All Offers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
