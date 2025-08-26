
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MessageSquare, Brain, Workflow, Zap, Settings, Bot, Users, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatbotInfo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      title: "Design Your Flow",
      description: "Create conversation flows using our visual drag-and-drop builder",
      icon: Workflow,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "02", 
      title: "Add AI Intelligence",
      description: "Integrate GPT models and knowledge bases for smart responses",
      icon: Brain,
      color: "from-green-500 to-green-600"
    },
    {
      step: "03",
      title: "Configure Actions",
      description: "Set up API calls, integrations, and automated responses",
      icon: Settings,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "04",
      title: "Deploy & Monitor",
      description: "Launch your chatbot and track performance with analytics",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const nodeTypes = [
    { icon: MessageSquare, title: "Message Nodes", description: "Send text, images, and rich media messages" },
    { icon: Brain, title: "AI Nodes", description: "GPT-powered responses with knowledge base integration" },
    { icon: Workflow, title: "Condition Nodes", description: "Branch conversations based on user input" },
    { icon: Zap, title: "Action Nodes", description: "API calls, webhooks, and system integrations" }
  ];

  const features = [
    { icon: Bot, title: "Visual Builder", description: "Drag-and-drop interface for easy chatbot creation" },
    { icon: Brain, title: "AI Integration", description: "Connect GPT models for intelligent conversations" },
    { icon: Users, title: "Multi-Platform", description: "Deploy on WhatsApp, web, and social platforms" },
    { icon: BarChart3, title: "Analytics", description: "Track conversations and optimize performance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Bot className="w-4 h-4 mr-2" />
              Chatbot Builder
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6">
              How to Build Chatbots
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create intelligent chatbots with visual flow builder, AI integration, and powerful automation. No coding required - just drag, drop, and deploy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/chatbot-builder')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Bot className="w-5 h-5 mr-2" />
                Start Building Chatbot
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/templates')}
              >
                Browse Templates
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
              Build sophisticated chatbots in minutes with our visual flow builder
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

      {/* Node Types Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Powerful Node Types</h2>
            <p className="text-xl text-muted-foreground">
              Build complex conversation flows with our comprehensive node library
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nodeTypes.map((node, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <node.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{node.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{node.description}</p>
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
            <h2 className="text-4xl font-bold mb-6">Advanced Chatbot Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to create professional chatbots
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
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Perfect for Every Business</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Customer Support", description: "Automate common queries and provide 24/7 support to your customers", icon: "🎧" },
              { title: "Lead Generation", description: "Qualify leads and collect contact information through interactive conversations", icon: "📈" },
              { title: "E-commerce", description: "Help customers find products, process orders, and handle returns", icon: "🛒" }
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
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your First Chatbot?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start creating intelligent chatbots that engage customers and automate workflows
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/chatbot-builder')}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Open Chatbot Builder
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ChatbotInfo;
