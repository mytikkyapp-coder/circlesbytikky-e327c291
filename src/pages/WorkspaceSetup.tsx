import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Star, HeadphonesIcon, MessageSquare, BarChart3, Settings, Calendar, Users, Shield } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function WorkspaceSetup() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const workspaceDetails = {
    "tech-support": {
      name: "Tech Support Workspace",
      icon: HeadphonesIcon,
      description: "Complete customer service and technical support solution",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Advanced Ticket Management System",
        "Live Chat with Customer History",
        "Knowledge Base Builder",
        "SLA Tracking & Automation",
        "Performance Analytics Dashboard",
        "Multi-channel Support (WhatsApp, Email, Chat)"
      ],
      setupSteps: [
        "Configure support channels",
        "Set up ticket categories",
        "Create knowledge base",
        "Configure SLA rules",
        "Setup team permissions"
      ]
    },
    "marketing": {
      name: "Marketing Workspace",
      icon: "Megaphone",
      description: "Complete marketing automation and campaign management",
      color: "from-pink-500 to-rose-500",
      features: [
        "Campaign Builder & Automation",
        "Lead Scoring & Tracking",
        "Advanced Analytics & ROI",
        "Social Media Integration",
        "Email Marketing Campaigns",
        "WhatsApp Broadcast Management"
      ],
      setupSteps: [
        "Connect marketing channels",
        "Setup campaign templates",
        "Configure lead scoring",
        "Setup analytics tracking",
        "Create automation rules"
      ]
    },
    "hr-management": {
      name: "HR Management Workspace",
      icon: "UserCheck",
      description: "Comprehensive human resources management system",
      color: "from-green-500 to-emerald-500",
      features: [
        "Employee Database Management",
        "Payroll Processing & Reports",
        "Performance Tracking System",
        "Recruitment & Onboarding",
        "Leave Management Portal",
        "Employee Self-Service Portal"
      ],
      setupSteps: [
        "Setup employee database",
        "Configure payroll system",
        "Create performance metrics",
        "Setup recruitment pipeline",
        "Configure employee portal"
      ]
    },
    "dealers": {
      name: "Dealers Workspace",
      icon: "Truck",
      description: "Dealer network management and coordination platform",
      color: "from-orange-500 to-amber-500",
      features: [
        "Dealer Portal & Dashboard",
        "Inventory Tracking System",
        "Commission Management",
        "Performance Analytics",
        "Order Management System",
        "Territory Management Tools"
      ],
      setupSteps: [
        "Setup dealer hierarchy",
        "Configure inventory system",
        "Setup commission structure",
        "Create performance dashboards",
        "Configure territory mapping"
      ]
    },
    "distributors": {
      name: "Distributors Workspace",
      icon: "ShoppingBag",
      description: "Distribution network and supply chain management",
      color: "from-purple-500 to-violet-500",
      features: [
        "Supply Chain Tracking",
        "Order Management System",
        "Territory Management",
        "Distribution Analytics",
        "Inventory Optimization",
        "Multi-location Management"
      ],
      setupSteps: [
        "Setup distribution network",
        "Configure supply chain tracking",
        "Setup territory management",
        "Create analytics dashboards",
        "Configure inventory rules"
      ]
    }
  };

  const workspace = workspaceDetails[categoryId as keyof typeof workspaceDetails];

  if (!workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Workspace Not Found</h1>
          <Button onClick={() => navigate("/my-projects")}>
            Back to Workspaces
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = workspace.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/my-projects")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Workspaces
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${workspace.color} rounded-xl flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{workspace.name}</h1>
                <p className="text-muted-foreground">{workspace.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Overview Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Included Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {workspace.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Setup Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Setup Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {workspace.setupSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">Real-time</div>
              <div className="text-sm text-muted-foreground">Analytics</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">Unlimited</div>
              <div className="text-sm text-muted-foreground">Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">Enterprise</div>
              <div className="text-sm text-muted-foreground">Security</div>
            </CardContent>
          </Card>
        </div>

        {/* Setup Actions */}
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-8 text-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Get Started?</h3>
              <p className="text-muted-foreground">
                Set up your {workspace.name.toLowerCase()} in just a few minutes
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className={`bg-gradient-to-r ${workspace.color} hover:opacity-90 text-white border-0 px-8`}
              >
                Start Setup Process
              </Button>
              <Button 
                size="lg" 
                variant="outline"
              >
                Schedule Demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>5-minute setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise security</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>24/7 support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}