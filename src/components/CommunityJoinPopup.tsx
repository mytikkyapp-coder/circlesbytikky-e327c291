import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TikkyLogo } from "./TikkyLogo";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Crown, 
  Zap, 
  Gift, 
  X,
  Mail,
  ArrowRight
} from "lucide-react";

interface CommunityJoinPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommunityJoinPopup({ open, onOpenChange }: CommunityJoinPopupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const benefits = [
    {
      icon: Crown,
      title: "Exclusive Access",
      description: "Get early access to new features and tools"
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Connect with industry professionals and experts"
    },
    {
      icon: Zap,
      title: "Premium Resources",
      description: "Access exclusive guides, templates, and resources"
    },
    {
      icon: Gift,
      title: "Special Perks",
      description: "Monthly giveaways and exclusive discounts"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    
    // Show success and close
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-gradient-to-br from-background via-background to-muted border-2 border-primary/20">
        {/* Header Section */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <TikkyLogo size="lg" />
            </div>
            
            <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-primary/20">
              <Crown className="w-3 h-3 mr-1" />
              EXCLUSIVE INVITE
            </Badge>
            
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Join TIKKY HUB Exclusive
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Become part of an elite community of professionals and unlock premium benefits
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-4 text-center">What You'll Get</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-sm text-foreground">{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Join Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 border-2 focus:border-primary"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Joining...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Join Exclusive Community</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By joining, you agree to receive exclusive updates and offers. Unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}