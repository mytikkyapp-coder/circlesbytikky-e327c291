
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, MessageSquare, Zap, Users, Eye, Edit, Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TemplatesInfo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      title: "Choose Template Type",
      description: "Select from marketing, support, or custom message templates",
      icon: FileText,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "02", 
      title: "Customize Content",
      description: "Add your branding, personalize messages, and set variables",
      icon: Edit,
      color: "from-green-500 to-green-600"
    },
    {
      step: "03",
      title: "Preview & Test",
      description: "Preview your template and test with sample data",
      icon: Eye,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "04",
      title: "Deploy & Use",
      description: "Activate your template and start using it in campaigns",
      icon: Send,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const templateTypes = [
    { icon: MessageSquare, title: "Marketing Templates", description: "Promotional messages and campaigns" },
    { icon: Users, title: "Support Templates", description: "Customer service and FAQ responses" },
    { icon: CheckCircle, title: "Transactional Templates", description: "Order confirmations and receipts" },
    { icon: Zap, title: "Automated Templates", description: "Triggered messages and workflows" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Message Templates
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6">
              How to Create Templates
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create professional message templates for WhatsApp Business. Streamline your communication with pre-approved templates that comply with WhatsApp policies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/templates')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Create Template
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/whatsapp-setup')}
              >
                WhatsApp Setup
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
              Simple 4-step process to create and deploy WhatsApp message templates
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
              Choose from various template types for different use cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templateTypes.map((template, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <template.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Template Best Practices</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Keep It Personal", description: "Use customer names and personalized content to increase engagement", icon: "👤" },
              { title: "Clear Call-to-Action", description: "Include specific actions you want customers to take", icon: "🎯" },
              { title: "Comply with Policies", description: "Follow WhatsApp Business API policies for template approval", icon: "✅" }
            ].map((practice, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{practice.icon}</div>
                  <CardTitle className="text-xl">{practice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Templates?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start building professional message templates for your business
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/templates')}
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

export default TemplatesInfo;
