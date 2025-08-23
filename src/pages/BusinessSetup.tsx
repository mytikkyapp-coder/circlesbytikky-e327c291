import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Shield, 
  Wallet, 
  Plug, 
  Phone,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export default function BusinessSetup() {
  const { projectId } = useParams();

  const setupSteps = [
    {
      id: "whatsapp-api",
      title: "WhatsApp Business API",
      description: "Connect your WhatsApp Business account for messaging",
      icon: MessageSquare,
      status: "completed",
      priority: "high"
    },
    {
      id: "whatsapp-chat",
      title: "WhatsApp Chat Setup",
      description: "Configure chat settings and automated responses",
      icon: MessageSquare,
      status: "pending",
      priority: "high"
    },
    {
      id: "calling-crm",
      title: "WhatsApp Calling CRM",
      description: "Set up voice calling integration with CRM",
      icon: Phone,
      status: "pending",
      priority: "medium"
    },
    {
      id: "kyc",
      title: "Business KYC Verification",
      description: "Complete business verification for compliance",
      icon: Shield,
      status: "in-progress",
      priority: "high"
    },
    {
      id: "wallet",
      title: "Payment Wallet Setup",
      description: "Configure payment methods and billing",
      icon: Wallet,
      status: "pending",
      priority: "medium"
    },
    {
      id: "integrations",
      title: "Third-party Integrations",
      description: "Connect with external tools and services",
      icon: Plug,
      status: "pending",
      priority: "low"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Medium</Badge>;
      default:
        return <Badge variant="outline">Low Priority</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Business Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete these essential steps to get your business ready for operations
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Setup Progress
          </CardTitle>
          <CardDescription>
            Track your business setup completion status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              {setupSteps.filter(step => step.status === "completed").length} of {setupSteps.length} steps completed
            </span>
            <span className="text-sm font-medium">
              {Math.round((setupSteps.filter(step => step.status === "completed").length / setupSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ 
                width: `${(setupSteps.filter(step => step.status === "completed").length / setupSteps.length) * 100}%` 
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <div className="grid gap-4">
        {setupSteps.map((step) => {
          const Icon = step.icon;
          return (
            <Card key={step.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(step.status)}
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(step.status)}
                        {getPriorityBadge(step.priority)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant={step.status === "completed" ? "outline" : "default"}
                      size="sm"
                      className="min-w-[100px]"
                    >
                      {step.status === "completed" ? "Configure" : "Set Up"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}