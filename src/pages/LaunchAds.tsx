import { useState } from "react";
import { Zap, Instagram, MessageCircle, Camera, Target, DollarSign, Sparkles, Wallet, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const LaunchAds = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [objective, setObjective] = useState("");
  const [prompt, setPrompt] = useState("");
  const [adSets, setAdSets] = useState([]);
  
  const objectives = [
    { id: "leads", label: "Lead Generation", icon: Target, description: "Generate qualified leads for your business" },
    { id: "sales", label: "Sales & Conversions", icon: DollarSign, description: "Drive sales and conversions" },
    { id: "visits", label: "Website Visits", icon: Camera, description: "Increase traffic to your website" },
    { id: "whatsapp", label: "WhatsApp Messages", icon: MessageCircle, description: "Get direct messages on WhatsApp" }
  ];

  const handleGenerateAdSets = async () => {
    setIsGenerating(true);
    // Simulate AI ad generation
    setTimeout(() => {
      setAdSets([
        {
          id: 1,
          platform: "Instagram",
          headline: "🚀 Scale Your Business with AI",
          body: "Join 1,000+ entrepreneurs using AI to automate their marketing. Get personalized strategies that work.",
          cta: "Start Free Trial",
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=600"
        },
        {
          id: 2,
          platform: "WhatsApp",
          headline: "💡 AI Marketing Made Simple",
          body: "Transform your business with AI-powered marketing that actually converts. No tech skills needed.",
          cta: "Get Started Now",
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=600"
        },
        {
          id: 3,
          platform: "Threads",
          headline: "⚡ Automate Your Success",
          body: "Stop struggling with manual marketing. Our AI creates campaigns that scale your business automatically.",
          cta: "Learn More",
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=600"
        }
      ]);
      setIsGenerating(false);
      setCurrentStep(3);
    }, 3000);
  };

  const handleLaunchCampaign = () => {
    setCurrentStep(4);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">⚡ Launch AI Ads</h1>
          <p className="text-muted-foreground">Create and publish Meta ads across Instagram, Threads & WhatsApp</p>
        </div>
        <Badge variant="secondary" className="text-accent">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[
          { step: 1, label: "Objective" },
          { step: 2, label: "AI Prompt" },
          { step: 3, label: "Preview" },
          { step: 4, label: "Launch" }
        ].map((item) => (
          <div key={item.step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= item.step 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            }`}>
              {item.step}
            </div>
            <span className={`ml-2 text-sm ${
              currentStep >= item.step ? "text-foreground" : "text-muted-foreground"
            }`}>
              {item.label}
            </span>
            {item.step < 4 && <div className="w-8 h-px bg-border ml-4" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Objective */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>🎯 Select Your Campaign Objective</CardTitle>
            <p className="text-muted-foreground">Choose what you want to achieve with your campaign</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectives.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setObjective(obj.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    objective === obj.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <obj.icon className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">{obj.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{obj.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={() => setCurrentStep(2)} 
                disabled={!objective}
                className="px-8"
              >
                Continue to Prompt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: AI Prompt */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>🪄 Write Your Creative Prompt</CardTitle>
            <p className="text-muted-foreground">Describe your offer, tone, and target audience. Our AI will create multiple ad variations.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt">Describe what you want to advertise</Label>
              <Textarea
                id="prompt"
                placeholder={`Example: "Promote our AI marketing course for busy entrepreneurs who want to automate their lead generation. Use an inspiring tone that emphasizes time-saving and results. Target small business owners aged 25-45."`}
                className="min-h-[120px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Selected Objective</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="font-medium">
                    {objectives.find(obj => obj.id === objective)?.label}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Target Platforms</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Instagram</Badge>
                  <Badge variant="secondary">WhatsApp</Badge>
                  <Badge variant="secondary">Threads</Badge>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button 
                onClick={handleGenerateAdSets} 
                disabled={!prompt.trim() || isGenerating}
                className="px-8"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Ad Sets...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Ad Sets
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preview & Edit */}
      {currentStep === 3 && adSets.length > 0 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>📱 Review Your AI-Generated Ads</CardTitle>
              <p className="text-muted-foreground">Review and edit your ads before launching</p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adSets.map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{ad.platform}</Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={ad.imageUrl} 
                      alt="Ad creative" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm">{ad.headline}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ad.body}</p>
                    <Button size="sm" className="w-full">
                      {ad.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>💰 Budget & Launch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Daily Budget (₹)</Label>
                  <Input type="number" placeholder="2000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Campaign Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back to Edit
                </Button>
                <Button onClick={handleLaunchCampaign} className="px-8">
                  Launch Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Launch & Recharge */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Launch & Payment</CardTitle>
              <p className="text-muted-foreground">Connect your Meta Business Account and fund your campaign</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Campaign Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Ad Sets:</span>
                    <span>{adSets.length} platforms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Budget:</span>
                    <span>₹2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>7 days</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Total Cost:</span>
                    <span>₹14,000</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Connect Meta Business Account
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Wallet className="w-4 h-4 mr-2" />
                    Use Wallet Balance (₹5,200)
                  </Button>
                  <Button className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Recharge & Launch
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LaunchAds;