
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Rocket, 
  X,
  User,
  Phone,
  Mail,
  CheckCircle,
  Zap
} from "lucide-react";

interface LaunchOfferSignupPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LaunchOfferSignupPopup({ open, onOpenChange }: LaunchOfferSignupPopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to claim your offer",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    
    toast({
      title: "Offer Claimed Successfully! 🎉",
      description: "We'll contact you shortly with your exclusive discount",
    });
    
    // Reset form and close
    setFormData({ name: "", mobile: "", email: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 bg-gradient-to-br from-background via-background to-primary/5 border-2 border-primary/20">
        {/* Header Section */}
        <div className="relative px-8 pt-6 pb-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-4 p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                🚀 Launch Offer - 60% OFF!
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                Limited time offer! Get exclusive access to our Pro plan at an unbeatable price.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Content Section - Horizontal Layout */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Benefits */}
            <div className="space-y-6">
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold text-primary">What You Get:</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Pro plan access for 12 months
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Save ₹5,398 on your subscription
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Priority customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Advanced features unlock
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">₹2,999</div>
                <div className="text-lg text-muted-foreground line-through">₹8,397</div>
                <div className="text-sm text-green-600 font-medium">You save ₹5,398!</div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Claim Your Offer Now</h3>
                <p className="text-muted-foreground">Fill in your details to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10 h-12 border-2 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium">
                    Mobile Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      className="pl-10 h-12 border-2 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 h-12 border-2 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold text-lg mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Claim 60% OFF Now</span>
                    </div>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to our terms. Offer expires in 48 hours.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
