import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Target, TrendingUp, Clock, DollarSign, Users, BarChart3, Sparkles, Brain, Rocket, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AIAdsLanding() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Clock,
      title: "15x Faster Testing",
      description: "Test 15 new ads per week without the traditional time investment",
      highlight: "Save 90% time"
    },
    {
      icon: DollarSign,
      title: "Cost-Efficient",
      description: "Eliminate expensive creative agency fees and reduce testing costs",
      highlight: "Cut costs by 70%"
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Smart algorithms analyze performance and optimize automatically",
      highlight: "Data-driven"
    },
    {
      icon: TrendingUp,
      title: "Higher ROI",
      description: "Achieve better conversion rates with AI-optimized creative strategies",
      highlight: "3x better ROI"
    }
  ];

  const features = [
    "AI-generated ad copy and visuals",
    "Automated A/B testing workflows",
    "Real-time performance optimization",
    "Multi-platform campaign management",
    "Advanced audience targeting",
    "Creative variation generation"
  ];

  const stats = [
    { value: "15+", label: "Ads per week" },
    { value: "70%", label: "Cost reduction" },
    { value: "3x", label: "Better ROI" },
    { value: "90%", label: "Time saved" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-6 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Creative Workflow
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6 leading-tight">
              Create Winning Ads with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Top creative strategists test <span className="text-primary font-semibold">15 new ads per week</span>. 
              Now, that's one budget-intensive, time-consuming hassle. An AI-powered, cost-efficient creative workflow sounds like magic, but it's not.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/launch-ads')}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Creating AI Ads
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/30 hover:bg-primary/5 transition-all duration-300"
                onClick={() => navigate('/campaigns')}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Campaign Analytics
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Creative Strategy
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop burning budget on inefficient testing. Let AI revolutionize your ad creation process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20 group">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">
                  {benefit.highlight}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Everything You Need to Win
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive AI tools designed for modern creative strategists
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {features.slice(3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
          <Target className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Integrate with AI Ads?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creative strategists who've revolutionized their workflow with AI-powered ad creation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/launch-ads')}
            >
              <Zap className="w-5 h-5 mr-2" />
              Launch Your First AI Campaign
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/5"
              onClick={() => navigate('/pricing')}
            >
              <Users className="w-5 h-5 mr-2" />
              View Pricing Plans
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}