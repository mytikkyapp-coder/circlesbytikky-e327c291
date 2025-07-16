import { useState } from "react";
import { Zap, Instagram, MessageCircle, Camera, Target, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const LaunchAds = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [adCopy, setAdCopy] = useState({
    headline: "",
    body: "",
    cta: "",
    imageUrl: "",
  });

  const handleGenerateAd = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setAdCopy({
        headline: "🚀 Become an AI Expert in 7 Days!",
        body: "Join 1,000+ professionals using Tikky to master AI. Get hands-on training, real projects, and community support. Start your AI journey today!",
        cta: "Sign Up Now",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=600",
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ad Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Campaign Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="objective">Campaign Objective</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select objective" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="traffic">Traffic</SelectItem>
                      <SelectItem value="leads">Lead Generation</SelectItem>
                      <SelectItem value="conversions">Conversions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input placeholder="e.g., Startup founders, AI enthusiasts" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Platforms</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="instagram" defaultChecked />
                    <Label htmlFor="instagram" className="flex items-center">
                      <Instagram className="w-4 h-4 mr-1" />
                      Instagram
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="threads" />
                    <Label htmlFor="threads" className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Threads
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="whatsapp" defaultChecked />
                    <Label htmlFor="whatsapp" className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Creative Prompt</Label>
                <Textarea
                  placeholder="Describe what you want to advertise: e.g., 'Promote our AI course for solopreneurs who want to automate their business'"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly & Casual</SelectItem>
                      <SelectItem value="bold">Bold & Inspiring</SelectItem>
                      <SelectItem value="urgent">Urgent & Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Daily Budget (₹)</Label>
                  <Input type="number" placeholder="2000" />
                </div>
              </div>

              <Button onClick={handleGenerateAd} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating AI Ad...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate AI Ad
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Audience Targeting */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Audience Targeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Age Range</Label>
                  <div className="flex items-center space-x-2">
                    <Input type="number" placeholder="21" className="w-20" />
                    <span>to</span>
                    <Input type="number" placeholder="45" className="w-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Interests</Label>
                  <Input placeholder="AI, Marketing, SaaS" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ad Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>📱 Ad Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {adCopy.headline ? (
                <div className="space-y-4">
                  {adCopy.imageUrl && (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={adCopy.imageUrl} 
                        alt="Ad creative" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{adCopy.headline}</h3>
                    <p className="text-sm text-muted-foreground">{adCopy.body}</p>
                    <Button className="w-full mt-3">
                      {adCopy.cta}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generate an ad to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          {adCopy.headline && (
            <Card>
              <CardHeader>
                <CardTitle>🚀 Publish Ad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Estimated Reach</span>
                    <span className="font-medium">50K - 80K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per Click</span>
                    <span className="font-medium">₹12 - ₹18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Clicks</span>
                    <span className="font-medium">110 - 165</span>
                  </div>
                </div>
                <Button className="w-full">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Publish Campaign
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchAds;