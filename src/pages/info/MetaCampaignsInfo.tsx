
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Users, BarChart3, Zap, MessageSquare, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MetaCampaignsInfo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      title: "Connect Your Meta Account",
      description: "Link your Facebook Business account to access Meta's advertising platform",
      icon: Target,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "02", 
      title: "Define Your Audience",
      description: "Set targeting parameters including demographics, interests, and behaviors",
      icon: Users,
      color: "from-green-500 to-green-600"
    },
    {
      step: "03",
      title: "Create Campaign Content",
      description: "Design compelling ads with images, videos, and persuasive copy",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "04",
      title: "Launch & Optimize",
      description: "Deploy your campaign and monitor performance with real-time analytics",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const benefits = [
    { icon: DollarSign, title: "Cost Effective", description: "Optimize ad spend with smart bidding" },
    { icon: TrendingUp, title: "High ROI", description: "Track conversions and maximize returns" },
    { icon: Clock, title: "Time Saving", description: "Automated campaign management tools" },
    { icon: Zap, title: "Quick Setup", description: "Launch campaigns in minutes" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Meta Advertising Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6">
              How Meta Campaigns Work
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Reach billions of users across Facebook, Instagram, and WhatsApp with targeted advertising campaigns that drive real business results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/campaigns')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Start Your Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/meta-api-integration')}
              >
                Connect Meta Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process to launch successful Meta advertising campaigns
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="outline" className="mb-2 w-fit mx-auto">
                      Step {step.step}
                    </Badge>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{step.description}</p>
                  </CardContent>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose Meta Campaigns?</h2>
            <p className="text-xl text-muted-foreground">
              Leverage the power of the world's largest social media platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Meta Campaign?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses growing with Meta advertising
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/campaigns')}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MetaCampaignsInfo;
