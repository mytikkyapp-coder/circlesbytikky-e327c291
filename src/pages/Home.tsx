import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  MessageCircle, 
  Users, 
  Zap, 
  CheckCircle, 
  Settings, 
  BarChart3,
  Smartphone,
  Send,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile
} from "lucide-react";

export default function Home() {
  const [activePlugins] = useState([
    {
      id: "1",
      name: "Auto Reply",
      description: "Automatically respond to common questions",
      status: "active",
      icon: MessageCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      id: "2", 
      name: "Contact Sync",
      description: "Sync contacts with your CRM system",
      status: "active",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: "3",
      name: "Analytics Tracker",
      description: "Track message performance and engagement",
      status: "active", 
      icon: BarChart3,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      id: "4",
      name: "Broadcast Scheduler",
      description: "Schedule messages for optimal delivery times",
      status: "inactive",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ]);

  const whatsappMessages = [
    {
      id: 1,
      sender: "You",
      message: "Welcome to our VIP Circle! 🌟",
      time: "2:30 PM",
      isOutgoing: true
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      message: "Thank you! Excited to be part of this community",
      time: "2:32 PM", 
      isOutgoing: false
    },
    {
      id: 3,
      sender: "You",
      message: "Here's your exclusive discount code: VIP20",
      time: "2:35 PM",
      isOutgoing: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 lg:p-12 border border-primary/20">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl opacity-50"></div>
        
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
                ✨ WhatsApp Business Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Connect with your
                <span className="text-primary"> circles</span> like never before
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Manage your WhatsApp Business communications, create member circles, and engage with your audience through powerful automation tools.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Watch Demo
                <Video className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2.5K+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Delivery Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Auto Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">WhatsApp Business</h3>
                  <p className="text-sm text-muted-foreground">Connected & Ready</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Plugins Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Active Plugins</h2>
              <p className="text-muted-foreground mt-1">Enhance your WhatsApp Business experience</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Manage All
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {activePlugins.map((plugin) => (
              <Card key={plugin.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="relative pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${plugin.bgColor}`}>
                        <plugin.icon className={`w-5 h-5 ${plugin.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{plugin.name}</CardTitle>
                        <Badge 
                          variant={plugin.status === "active" ? "default" : "secondary"}
                          className={plugin.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {plugin.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {plugin.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {plugin.status === "active" ? (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-500 font-medium">Running</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Inactive</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant={plugin.status === "active" ? "outline" : "default"}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {plugin.status === "active" ? "Configure" : "Activate"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Discover More Plugins</h3>
                  <p className="text-sm text-muted-foreground">Enhance your workflow with additional integrations</p>
                </div>
                <Button className="gap-2">
                  Browse Plugin Store
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp Business Preview */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">WhatsApp Preview</h2>
            <p className="text-muted-foreground mt-1">Live conversation preview</p>
          </div>

          <Card className="overflow-hidden">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">VIP Circle</h3>
                <p className="text-xs text-white/80">Online • 234 members</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-[#ECE5DD] p-4 space-y-3 max-h-80 overflow-y-auto">
              {whatsappMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOutgoing ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.isOutgoing 
                      ? 'bg-[#DCF8C6] text-gray-800' 
                      : 'bg-white text-gray-800'
                  }`}>
                    {!msg.isOutgoing && (
                      <p className="text-xs font-semibold text-[#075E54] mb-1">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t">
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                  <p className="text-sm text-muted-foreground">Type a message...</p>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button size="icon" className="h-8 w-8 bg-[#075E54] hover:bg-[#075E54]/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Connection Status */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">WhatsApp Connected</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Business verified</p>
                  <p>• API rate limit: 1000/hour</p>
                  <p>• Last sync: 2 minutes ago</p>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  <Settings className="w-3 h-3 mr-2" />
                  Manage Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}