import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  Circle, 
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Bell,
  Shield,
  Zap
} from "lucide-react";

export default function CoreFeatures() {
  const { projectId } = useParams();

  const features = [
    {
      id: "dashboard",
      title: "Project Dashboard",
      description: "Central hub for monitoring project metrics and activities",
      icon: LayoutDashboard,
      enabled: true,
      plan: "Standard",
      stats: {
        activeUsers: "2.4k",
        messagesHandled: "15.2k",
        automationRate: "87%"
      }
    },
    {
      id: "circles",
      title: "Circles Management",
      description: "Organize members into targeted groups for better engagement",
      icon: Circle,
      enabled: true,
      plan: "Standard",
      stats: {
        totalCircles: "12",
        averageSize: "85",
        engagement: "92%"
      }
    },
    {
      id: "members",
      title: "Member Management",
      description: "Comprehensive member database with advanced filtering",
      icon: Users,
      enabled: true,
      plan: "Standard",
      stats: {
        totalMembers: "1,024",
        activeMembers: "892",
        growthRate: "+12%"
      }
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      description: "Deep insights into member behavior and campaign performance",
      icon: BarChart3,
      enabled: true,
      plan: "Pro",
      stats: {
        dataPoints: "50k+",
        reports: "24",
        accuracy: "98.5%"
      }
    },
    {
      id: "automation",
      title: "Smart Automation",
      description: "AI-powered message routing and response automation",
      icon: Zap,
      enabled: true,
      plan: "Pro",
      stats: {
        workflows: "8",
        efficiency: "94%",
        timeSaved: "15hrs/week"
      }
    },
    {
      id: "notifications",
      title: "Real-time Notifications",
      description: "Instant alerts for important events and member activities",
      icon: Bell,
      enabled: false,
      plan: "Enterprise",
      stats: {
        alertTypes: "15+",
        responseTime: "<30s",
        reliability: "99.9%"
      }
    },
    {
      id: "security",
      title: "Advanced Security",
      description: "Enterprise-grade security with role-based access control",
      icon: Shield,
      enabled: false,
      plan: "Enterprise",
      stats: {
        securityLayers: "5",
        compliance: "100%",
        threats: "0"
      }
    },
    {
      id: "conversations",
      title: "Conversation Intelligence",
      description: "AI-powered conversation analysis and sentiment tracking",
      icon: MessageSquare,
      enabled: false,
      plan: "Enterprise",
      stats: {
        conversations: "5k+",
        sentiment: "85% positive",
        insights: "120+"
      }
    }
  ];

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Standard":
        return "bg-blue-100 text-blue-800";
      case "Pro":
        return "bg-purple-100 text-purple-800";
      case "Enterprise":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const enabledFeatures = features.filter(f => f.enabled);
  const availableFeatures = features.filter(f => !f.enabled);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Core Features</h1>
        <p className="text-muted-foreground mt-2">
          Explore and manage your project's core functionality and capabilities
        </p>
      </div>

      {/* Enabled Features */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Active Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enabledFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge className={getPlanColor(feature.plan)}>
                      {feature.plan}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" size="sm">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Available Features */}
      {availableFeatures.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Available Upgrades</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="hover:shadow-md transition-shadow opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <Badge className={getPlanColor(feature.plan)}>
                        {feature.plan}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-muted-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {Object.entries(feature.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="font-medium text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      Upgrade to {feature.plan}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}