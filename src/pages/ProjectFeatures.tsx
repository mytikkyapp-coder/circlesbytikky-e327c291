import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Crown, 
  Zap, 
  Check, 
  Settings, 
  Bot, 
  Target, 
  Link, 
  Database, 
  Mail, 
  Webhook, 
  ExternalLink,
  Phone,
  Clock
} from "lucide-react";

const ProjectFeatures = () => {
  const features = {
    standard: {
      name: "Standard",
      color: "from-blue-500 to-blue-600",
      icon: MessageCircle,
      description: "Essential business setup and core features",
      sections: [
        {
          title: "Business Setup",
          items: [
            "WhatsApp Business API Setup",
            "Business Profile Configuration",
            "Contact Management",
            "Basic Templates Library"
          ]
        },
        {
          title: "Core Features",
          items: [
            "Manual Message Broadcasting",
            "Basic Campaign Management",
            "Member Directory",
            "Standard Analytics Dashboard",
            "Email Support"
          ]
        }
      ]
    },
    pro: {
      name: "Pro",
      color: "from-purple-500 to-purple-600",
      icon: Crown,
      description: "AI-powered tools and advanced integrations",
      sections: [
        {
          title: "ChatBot Builder",
          items: [
            "Drag & Drop Flow Designer",
            "AI-Powered Response Generation",
            "Multi-Step Conversation Flows",
            "Conditional Logic & Branching",
            "Custom Variables & Context"
          ]
        },
        {
          title: "Meta Ads AI",
          items: [
            "AI Ad Copy Generation",
            "Automated Audience Targeting",
            "Performance Optimization",
            "Cross-Platform Campaign Sync",
            "ROI Analytics & Insights"
          ]
        },
        {
          title: "App Integrations",
          items: [
            "Facebook Business Integration",
            "Instagram Messaging",
            "Google Sheets Sync",
            "Calendar Booking Systems",
            "E-commerce Platform Connectors"
          ]
        }
      ]
    },
    enterprise: {
      name: "Enterprise",
      color: "from-orange-500 to-orange-600",
      icon: Zap,
      description: "Complete enterprise solution with API integrations",
      sections: [
        {
          title: "Advanced API Integrations",
          items: [
            "ZOHO CRM Full Integration",
            "Mailchimp Email Automation",
            "Zapier Workflow Automation",
            "Custom REST API Endpoints",
            "Webhook Management System"
          ]
        },
        {
          title: "Enterprise Settings",
          items: [
            "Advanced User Permissions",
            "White-Label Configuration",
            "Custom Domain Setup",
            "Enterprise Security Controls",
            "Audit Logs & Compliance"
          ]
        },
        {
          title: "Coming Soon",
          items: [
            "Voice Call API by Meta",
            "AI Voice Assistants",
            "Advanced Call Analytics",
            "Multi-Language Voice Support"
          ],
          isComingSoon: true
        }
      ]
    }
  };

  const integrations = [
    {
      name: "ZOHO CRM",
      description: "Complete customer relationship management",
      icon: Database,
      plan: "enterprise",
      features: ["Lead Management", "Sales Pipeline", "Contact Sync", "Custom Fields"]
    },
    {
      name: "Mailchimp",
      description: "Email marketing automation",
      icon: Mail,
      plan: "enterprise", 
      features: ["Email Campaigns", "Audience Segmentation", "Automation", "Analytics"]
    },
    {
      name: "Zapier",
      description: "Workflow automation platform",
      icon: Webhook,
      plan: "enterprise",
      features: ["1000+ App Connections", "Custom Triggers", "Multi-Step Workflows", "Real-time Sync"]
    },
    {
      name: "Meta Ads",
      description: "AI-powered advertising platform",
      icon: Target,
      plan: "pro",
      features: ["AI Ad Creation", "Smart Targeting", "Performance Optimization", "Campaign Management"]
    },
    {
      name: "ChatBot Builder",
      description: "AI-powered conversation flows",
      icon: Bot,
      plan: "pro",
      features: ["Visual Flow Builder", "AI Responses", "Conditional Logic", "Multi-Channel Support"]
    }
  ];

  const getPlanColor = (planId: string) => {
    return features[planId as keyof typeof features]?.color || "from-gray-500 to-gray-600";
  };

  const getPlanIcon = (planId: string) => {
    return features[planId as keyof typeof features]?.icon || Settings;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Project Features Overview</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the comprehensive features available across our Standard, Pro, and Enterprise plans
        </p>
      </div>

      {/* Features by Plan */}
      <div className="space-y-8">
        {Object.entries(features).map(([planId, plan]) => {
          const IconComponent = plan.icon;
          return (
            <Card key={planId} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{plan.name} Plan</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plan.sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{section.title}</h3>
                        {section.isComingSoon && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            <Clock className="w-3 h-3 mr-1" />
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            {section.isComingSoon ? (
                              <div className="w-4 h-4 flex-shrink-0 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                              </div>
                            ) : (
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={`text-sm ${section.isComingSoon ? 'text-primary font-medium' : ''}`}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Integration Showcase */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Available Integrations</h2>
          <p className="text-muted-foreground">
            Powerful integrations to supercharge your business workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            const PlanIcon = getPlanIcon(integration.plan);
            
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                      </div>
                    </div>
                    <Badge 
                      className={`bg-gradient-to-r ${getPlanColor(integration.plan)} text-white`}
                    >
                      {features[integration.plan as keyof typeof features]?.name}
                    </Badge>
                  </div>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {integration.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Voice Call API Preview */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <Phone className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Voice Call API by Meta</CardTitle>
          <CardDescription className="text-base">
            Revolutionary voice communication features coming to Enterprise plans
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">AI Voice Assistants</h4>
              <p className="text-sm text-muted-foreground">Intelligent voice bots for customer support</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Call Analytics</h4>
              <p className="text-sm text-muted-foreground">Advanced insights from voice interactions</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Multi-Language</h4>
              <p className="text-sm text-muted-foreground">Support for global communications</p>
            </div>
          </div>
          
          <Badge className="bg-primary text-primary-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Coming Q2 2025
          </Badge>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
        <p className="text-muted-foreground">
          Choose the plan that best fits your business needs
        </p>
        <Button className="px-8" asChild>
          <a href="/pricing">
            View Pricing Plans
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProjectFeatures;