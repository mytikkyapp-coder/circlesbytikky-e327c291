import { useState } from "react";
import { Phone, CheckCircle, Star, ArrowRight, Play, Headphones, Shield, Clock, Users, Zap, Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CallingAPILanding = () => {
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    useCase: "",
    message: ""
  });
  const { toast } = useToast();

  const features = [
    {
      icon: Phone,
      title: "Voice Calls via WhatsApp",
      description: "Make high-quality voice calls directly through WhatsApp Business API platform"
    },
    {
      icon: Headphones,
      title: "Crystal Clear Audio",
      description: "HD voice quality with noise cancellation and advanced audio processing"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption with enterprise-grade security protocols"
    },
    {
      icon: Clock,
      title: "Real-time Analytics",
      description: "Track call duration, quality metrics, and conversation insights"
    },
    {
      icon: Users,
      title: "Multi-agent Support",
      description: "Support for multiple agents with call routing and queue management"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Make calls to customers worldwide with local number support"
    }
  ];

  const useCases = [
    {
      title: "Customer Support",
      description: "Provide instant voice support through WhatsApp",
      icon: Headphones,
      stats: "50% faster resolution"
    },
    {
      title: "Sales Calls",
      description: "Convert WhatsApp leads into voice conversations",
      icon: Phone,
      stats: "3x higher conversion"
    },
    {
      title: "Appointment Booking",
      description: "Schedule and confirm appointments via voice",
      icon: Clock,
      stats: "90% attendance rate"
    }
  ];

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Demo request:", demoForm);
    toast({
      title: "Demo Request Submitted!",
      description: "Our team will contact you within 24 hours to schedule your personalized demo.",
    });
    
    // Reset form
    setDemoForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      useCase: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Coming Q2 2025
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Meta Calling API
              <span className="block text-primary mt-2">Revolutionize Customer Communication</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Make voice calls directly through WhatsApp Business platform. Transform your customer 
              engagement with seamless voice communication integrated into your existing WhatsApp workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo Video
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Join Waitlist
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>HD Voice Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Global Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Enterprise Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to provide exceptional voice support through WhatsApp
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Transform Your Business Operations
            </h2>
            <p className="text-lg text-muted-foreground">
              See how businesses are using Meta Calling API to improve customer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {useCase.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Request Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Request Your Personalized Demo
            </h2>
            <p className="text-lg text-muted-foreground">
              See Meta Calling API in action. Our team will show you how it can transform your business communication.
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Schedule Your Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDemoSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({...demoForm, name: e.target.value})}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={demoForm.company}
                      onChange={(e) => setDemoForm({...demoForm, company: e.target.value})}
                      placeholder="Your Company"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({...demoForm, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="useCase">Primary Use Case *</Label>
                  <Select value={demoForm.useCase} onValueChange={(value) => setDemoForm({...demoForm, useCase: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary use case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="sales">Sales & Lead Conversion</SelectItem>
                      <SelectItem value="appointments">Appointment Booking</SelectItem>
                      <SelectItem value="consultations">Consultations</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">Tell us about your requirements</Label>
                  <Textarea
                    id="message"
                    value={demoForm.message}
                    onChange={(e) => setDemoForm({...demoForm, message: e.target.value})}
                    placeholder="Tell us about your current communication challenges and how you plan to use Meta Calling API..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full py-3 text-lg">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Request Demo
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  Our team will contact you within 24 hours to schedule your personalized demo.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Customer Communication?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join the waitlist and be among the first to experience Meta Calling API when it launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4">
              <Star className="w-5 h-5 mr-2" />
              Join Waitlist
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallingAPILanding;