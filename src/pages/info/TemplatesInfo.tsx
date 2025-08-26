
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Edit3, Save, Share2, Layout, Palette, Zap, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TemplatesInfo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      title: "Choose Template Type",
      description: "Select from message templates, email layouts, or custom designs",
      icon: Layout,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "02", 
      title: "Customize Content",
      description: "Edit text, images, and styling to match your brand identity",
      icon: Edit3,
      color: "from-green-500 to-green-600"
    },
    {
      step: "03",
      title: "Preview & Test",
      description: "Preview your template and test functionality before saving",
      icon: FileText,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "04",
      title: "Save & Deploy",
      description: "Save your template and use it across campaigns and communications",
      icon: Save,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const templateTypes = [
    { icon: "📱", title: "WhatsApp Templates", description: "Pre-approved message templates for WhatsApp Business" },
    { icon: "📧", title: "Email Templates", description: "Professional email layouts for marketing campaigns" },
    { icon: "🎨", title: "Creative Templates", description: "Visual templates for social media and advertising" },
    { icon: "📋", title: "Form Templates", description: "Customizable forms for lead generation and surveys" }
  ];

  const features = [
    { icon: Palette, title: "Brand Customization", description: "Match your brand colors, fonts, and style" },
    { icon: Copy, title: "Reusable Components", description: "Save time with reusable template elements" },
    { icon: Zap, title: "Quick Deployment", description: "Deploy templates instantly across platforms" },
    { icon: Share2, title: "Team Collaboration", description: "Share and collaborate on template designs" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Template Builder
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6">
              How to Create Templates
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Build professional, reusable templates for WhatsApp, email, and social media. Save time and maintain consistency across all your communications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/templates')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Start Creating Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/template-builder')}
              >
                Try Template Builder
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
              Create professional templates in minutes with our intuitive builder
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

      {/* Template Types Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Template Types</h2>
            <p className="text-xl text-muted-foreground">
              Choose from various template types for different communication needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templateTypes.map((type, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Powerful Template Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to create professional templates
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

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Use Templates?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Save Time", description: "Create once, use everywhere. No need to recreate content from scratch", icon: "⏰" },
              { title: "Ensure Consistency", description: "Maintain brand consistency across all communications and platforms", icon: "🎯" },
              { title: "Scale Efficiently", description: "Easily scale your messaging across multiple campaigns and channels", icon: "📈" }
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
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
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your First Template?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start building professional templates that save time and boost engagement
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/template-builder')}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8"
          >
            Open Template Builder
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TemplatesInfo;
