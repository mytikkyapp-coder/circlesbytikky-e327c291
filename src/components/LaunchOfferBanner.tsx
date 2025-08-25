
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Rocket, 
  X,
  Zap,
  Clock,
  ArrowRight
} from "lucide-react";

export function LaunchOfferBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();

  const dismissBanner = () => {
    setIsVisible(false);
    toast({
      title: "Banner dismissed",
      description: "You can find offers anytime in the pricing section",
      duration: 2000,
    });
  };

  const handleLaunchOffer = () => {
    toast({
      title: "Launching offer!",
      description: "Redirecting you to our special launch offer...",
      duration: 3000,
    });
  };

  if (!isVisible) return null;

  return (
    <Card className="border-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">🚀 Launch Offer</h3>
                  <Badge variant="secondary" className="bg-primary/20 text-primary font-bold">
                    Limited Time
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get 60% off on Pro plan - Transform your business communication today!
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Ends in 48 hours</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Save: </span>
                <span className="font-bold text-primary">₹5,398</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              onClick={handleLaunchOffer}
              className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 gap-2"
            >
              <Zap className="w-4 h-4" />
              Claim Offer
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={dismissBanner}
              className="h-8 w-8 hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
