
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Gift, 
  Clock, 
  Star, 
  Zap, 
  X,
  Users,
  Heart,
  Bell,
  CheckCircle,
  AlertCircle,
  Calendar,
  Share2
} from "lucide-react";

export default function OffersBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<'notify' | 'claim' | 'share'>('notify');
  const { toast } = useToast();

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
      borderColor: "border-orange-200",
      terms: "Valid for new subscribers only. Cannot be combined with other offers.",
      savings: "₹4,497",
      originalPrice: "₹8,997"
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
      borderColor: "border-blue-200",
      terms: "Friends must complete payment to qualify. Reward credited after 30 days.",
      savings: "₹2,999",
      originalPrice: "₹2,999"
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
      borderColor: "border-pink-200",
      terms: "Must maintain continuous subscription. Reward applied automatically.",
      savings: "₹5,998",
      originalPrice: "₹17,994"
    }
  ];

  const handleNotificationToggle = (offerId: string) => {
    setSelectedOffer(offerId);
    setActionType('notify');
    setShowConfirmDialog(true);
  };

  const handleClaimOffer = (offerId: string) => {
    setSelectedOffer(offerId);
    setActionType('claim');
    setShowConfirmDialog(true);
  };

  const handleShareOffer = (offerId: string) => {
    setSelectedOffer(offerId);
    setActionType('share');
    setShowConfirmDialog(true);
  };

  const confirmAction = () => {
    const offer = upcomingOffers.find(o => o.id === selectedOffer);
    if (!offer) return;

    switch (actionType) {
      case 'notify':
        if (notificationSettings.includes(offer.id)) {
          setNotificationSettings(prev => prev.filter(id => id !== offer.id));
          toast({
            title: "Notifications Disabled",
            description: `You'll no longer receive notifications for ${offer.title}`,
            variant: "default"
          });
        } else {
          setNotificationSettings(prev => [...prev, offer.id]);
          toast({
            title: "Notifications Enabled",
            description: `We'll notify you about updates for ${offer.title}`,
            variant: "default"
          });
        }
        break;

      case 'claim':
        toast({
          title: "Offer Claimed Successfully!",
          description: `${offer.title} has been applied to your account. You saved ${offer.savings}!`,
          variant: "default"
        });
        // Here you would integrate with your backend to apply the offer
        console.log(`Claiming offer: ${offer.id}`);
        break;

      case 'share':
        if (navigator.share) {
          navigator.share({
            title: `Check out this amazing offer: ${offer.title}`,
            text: `${offer.description} - Save ${offer.savings}!`,
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(
            `Check out this amazing offer: ${offer.title} - ${offer.description}. Save ${offer.savings}! ${window.location.href}`
          );
          toast({
            title: "Link Copied!",
            description: "Offer details copied to clipboard",
            variant: "default"
          });
        }
        break;
    }
    setShowConfirmDialog(false);
    setSelectedOffer(null);
  };

  const getActionButtonText = () => {
    const offer = upcomingOffers.find(o => o.id === selectedOffer);
    if (!offer) return '';

    switch (actionType) {
      case 'notify':
        return notificationSettings.includes(offer.id) 
          ? 'Disable Notifications' 
          : 'Enable Notifications';
      case 'claim':
        return `Claim Offer - Save ${offer.savings}`;
      case 'share':
        return 'Share This Offer';
      default:
        return 'Confirm';
    }
  };

  const dismissBanner = () => {
    setIsVisible(false);
    toast({
      title: "Banner Dismissed",
      description: "You can always find offers in your account settings",
      variant: "default"
    });
  };

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
              onClick={dismissBanner}
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
                className={`${offer.bgColor} ${offer.borderColor} border rounded-lg p-4 relative overflow-hidden transition-all hover:shadow-md`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${offer.gradient} rounded-full transform translate-x-6 -translate-y-6`}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 bg-gradient-to-r ${offer.gradient} rounded-full flex items-center justify-center`}>
                        <offer.icon className="w-3 h-3 text-white" />
                      </div>
                      <Badge variant="secondary" className={`${offer.textColor} bg-white text-xs font-bold`}>
                        {offer.discount}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNotificationToggle(offer.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Bell className={`w-3 h-3 ${notificationSettings.includes(offer.id) ? offer.textColor : 'text-muted-foreground'}`} />
                    </Button>
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-1">{offer.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Until {offer.validUntil}</span>
                      </div>
                      <Star className={`w-4 h-4 ${offer.textColor} animate-pulse`} />
                    </div>
                    
                    <div className="text-xs">
                      <span className="text-muted-foreground">Save: </span>
                      <span className={`font-bold ${offer.textColor}`}>{offer.savings}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs h-7"
                      onClick={() => handleClaimOffer(offer.id)}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Claim
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => handleShareOffer(offer.id)}
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="w-4 h-4" />
                Manage All Notifications
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary text-white">
                <Gift className="w-4 h-4" />
                View Complete Offers Library
              </Button>
            </div>
            
            {/* Active Notifications Count */}
            {notificationSettings.length > 0 && (
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>You have {notificationSettings.length} active notification{notificationSettings.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === 'notify' && <Bell className="w-5 h-5" />}
              {actionType === 'claim' && <Gift className="w-5 h-5" />}
              {actionType === 'share' && <Share2 className="w-5 h-5" />}
              Confirm Action
            </DialogTitle>
            <DialogDescription>
              {(() => {
                const offer = upcomingOffers.find(o => o.id === selectedOffer);
                if (!offer) return '';

                switch (actionType) {
                  case 'notify':
                    return notificationSettings.includes(offer.id)
                      ? `Stop receiving notifications about "${offer.title}"?`
                      : `Get notified about updates and changes to "${offer.title}"?`;
                  case 'claim':
                    return `Are you ready to claim "${offer.title}"? This will apply the discount to your account immediately.`;
                  case 'share':
                    return `Share "${offer.title}" with others so they can also benefit from this amazing offer.`;
                  default:
                    return '';
                }
              })()}
            </DialogDescription>
          </DialogHeader>

          {selectedOffer && actionType === 'claim' && (
            <div className="space-y-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Original Price:</span>
                    <span className="line-through text-muted-foreground">
                      {upcomingOffers.find(o => o.id === selectedOffer)?.originalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>You Save:</span>
                    <span>{upcomingOffers.find(o => o.id === selectedOffer)?.savings}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                <AlertCircle className="w-3 h-3 inline mr-1" />
                {upcomingOffers.find(o => o.id === selectedOffer)?.terms}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>
              {getActionButtonText()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
