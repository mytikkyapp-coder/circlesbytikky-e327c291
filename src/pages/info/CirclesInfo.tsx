
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, MessageCircle, Shield, Share2, UserPlus, Settings, Crown, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CirclesInfo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      title: "Create Your Circle",
      description: "Set up a private community space with custom branding and settings",
      icon: UserPlus,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "02", 
      title: "Invite Members",
      description: "Add team members, clients, or community members with role-based access",
      icon: Users,
      color: "from-green-500 to-green-600"
    },
    {
      step: "03",
      title: "Collaborate & Share",
      description: "Share resources, communicate, and work together in real-time",
      icon: Share2,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "04",
      title: "Manage & Grow",
      description: "Monitor activity, manage permissions, and scale your community",
      icon: Settings,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const features = [
    { icon: Shield, title: "Private & Secure", description: "End-to-end encryption for all communications" },
    { icon: MessageCircle, title: "Real-time Chat", description: "Instant messaging with file sharing capabilities" },
    { icon: Crown, title: "Admin Controls", description: "Granular permissions and moderation tools" },
    { icon: Globe, title: "Global Access", description: "Access from anywhere, on any device" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Community Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6">
              How Circles Work
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create private communities for your team, clients, or interest groups. Collaborate, share, and grow together in secure digital spaces.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/circles')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Create Your Circle
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/members')}
              >
                Join Existing Circle
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
              Simple process to create and manage your community circles
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Powerful Circle Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to build and manage thriving communities
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
            <h2 className="text-4xl font-bold mb-6">Perfect for Every Community</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Business Teams", description: "Collaborate on projects, share updates, and maintain team communication", icon: "👥" },
              { title: "Client Communities", description: "Provide exclusive access to resources and build stronger relationships", icon: "🤝" },
              { title: "Interest Groups", description: "Connect like-minded individuals around shared passions and hobbies", icon: "💡" }
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
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Community?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start connecting with your audience in meaningful ways
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/circles')}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8"
          >
            Create Your First Circle
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CirclesInfo;
