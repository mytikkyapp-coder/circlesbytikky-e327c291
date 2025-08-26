
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Target, Zap, BarChart3, Sparkles, Rocket, TrendingUp, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIAdsInfo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      title: "Set Your Objective",
      description: "Choose your campaign goal - leads, sales, traffic, or engagement",
      icon: Target,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "02", 
      title: "Describe Your Offer",
      description: "Tell AI about your product, audience, and desired tone of voice",
      icon: Brain,
      color: "from-green-500 to-green-600"
    },
    {
      step: "03",
      title: "AI Generates Ads",
      description: "Watch as AI creates multiple ad variations with copy and visuals",
      icon: Sparkles,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "04",
      title: "Launch & Optimize",
      description: "Deploy your ads and let AI continuously optimize performance",
      icon: Rocket,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const features = [
    { icon: Brain, title: "AI-Generated Copy", description: "Compelling ad copy created by advanced AI models" },
    { icon: Target, title: "Smart Targeting", description: "AI-powered audience targeting for better reach" },
    { icon: BarChart3, title: "Real-time Optimization", description: "Continuous performance monitoring and adjustment" },
    { icon: TrendingUp, title: "Performance Insights", description: "Deep analytics and actionable recommendations" }
  ];

  const benefits = [
    { stat: "15x", label: "Faster Testing", description: "Test 15 new ads per week automatically" },
    { stat: "70%", label: "Cost Reduction", description: "Eliminate expensive creative agency fees" },
    { stat: "3x", label: "Better ROI", description: "AI optimization delivers superior returns" },
    { stat: "90%", label: "Time Saved", description: "Automate creative workflow completely" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Advertising
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6">
              How to Launch AI Ads
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create winning ad campaigns with AI that tests 15 new ads per week. Transform your creative workflow from time-consuming to automated and cost-efficient.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/launch-ads')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Launch AI Ads Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/campaigns')}
              >
                View Campaign Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl font-bold text-primary mb-2">{benefit.stat}</div>
                  <CardTitle className="text-lg">{benefit.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How AI Ads Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to conversion in minutes, not weeks
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

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">AI-Powered Features</h2>
            <p className="text-xl text-muted-foreground">
              Advanced AI technology that outperforms traditional advertising methods
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Perfect for Every Business</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "E-commerce", description: "Drive sales with product-focused AI ads that convert browsers into buyers", icon: "🛒" },
              { title: "Service Businesses", description: "Generate quality leads with AI ads that highlight your expertise", icon: "💼" },
              { title: "SaaS Companies", description: "Acquire users with AI ads optimized for trial signups and conversions", icon: "💻" }
            ].map((useCase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Ad Strategy?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using AI to create winning ad campaigns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/launch-ads')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Your First AI Campaign
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/pricing')}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              View Pricing Plans
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIAdsInfo;
