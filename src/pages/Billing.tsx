import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  CreditCard, 
  Crown, 
  Check, 
  DollarSign, 
  Calendar, 
  Download,
  Receipt,
  AlertCircle,
  Zap,
  Shield,
  Users,
  BarChart3,
  Headphones
} from "lucide-react";

export default function Billing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock billing data
  const subscription = {
    plan: "Pro",
    status: "Active",
    amount: 149,
    currency: "USD",
    billingCycle: "monthly",
    nextBilling: "2024-03-15",
    workspaces: 3,
    maxWorkspaces: 10,
    teamMembers: 25,
    maxTeamMembers: 50
  };

  const plans = [
    {
      name: "Basic",
      price: 49,
      billing: "monthly",
      features: [
        "Up to 2 workspaces",
        "5 team members",
        "Basic analytics",
        "Email support",
        "WhatsApp integration"
      ],
      current: false
    },
    {
      name: "Pro",
      price: 149,
      billing: "monthly",
      features: [
        "Up to 10 workspaces",
        "50 team members",
        "Advanced analytics",
        "Priority support",
        "WhatsApp Marketing",
        "Custom integrations"
      ],
      current: true,
      popular: true
    },
    {
      name: "Enterprise",
      price: 299,
      billing: "monthly",
      features: [
        "Unlimited workspaces",
        "Unlimited team members",
        "Enterprise analytics",
        "24/7 dedicated support",
        "WhatsApp Marketing Pro",
        "Custom development",
        "SLA guarantee"
      ],
      current: false
    }
  ];

  const invoices = [
    {
      id: "INV-001",
      date: "2024-02-15",
      amount: 149,
      status: "Paid",
      plan: "Pro Monthly"
    },
    {
      id: "INV-002",
      date: "2024-01-15", 
      amount: 149,
      status: "Paid",
      plan: "Pro Monthly"
    },
    {
      id: "INV-003",
      date: "2023-12-15",
      amount: 149,
      status: "Paid",
      plan: "Pro Monthly"
    }
  ];

  const usage = {
    workspaces: { current: 3, limit: 10, percentage: 30 },
    teamMembers: { current: 25, limit: 50, percentage: 50 },
    whatsappMessages: { current: 1250, limit: 5000, percentage: 25 },
    apiCalls: { current: 8500, limit: 25000, percentage: 34 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/workspaces")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Workspaces
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Billing & Subscription</h1>
                <p className="text-muted-foreground">Manage your subscription and billing</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              <Button>
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Current Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Current Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Plan</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/10 text-primary">
                          {subscription.plan}
                        </Badge>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {subscription.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="text-2xl font-bold">
                        ${subscription.amount}/{subscription.billingCycle}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Next Billing</span>
                      <span className="font-medium">
                        {new Date(subscription.nextBilling).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                      <h4 className="font-medium mb-2">Quick Stats</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Workspaces</p>
                          <p className="font-bold">{subscription.workspaces}/{subscription.maxWorkspaces}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Team Members</p>
                          <p className="font-bold">{subscription.teamMembers}/{subscription.maxTeamMembers}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
              <p className="text-muted-foreground">Upgrade or downgrade your subscription at any time</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.name} className={`relative ${plan.current ? 'ring-2 ring-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-lg font-normal text-muted-foreground">/{plan.billing}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.current ? "outline" : "default"}
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : "Upgrade to " + plan.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Workspaces Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Workspaces Used</span>
                      <span>{usage.workspaces.current} / {usage.workspaces.limit}</span>
                    </div>
                    <Progress value={usage.workspaces.percentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Team Members</span>
                      <span>{usage.teamMembers.current} / {usage.teamMembers.limit}</span>
                    </div>
                    <Progress value={usage.teamMembers.percentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    API Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>WhatsApp Messages</span>
                      <span>{usage.whatsappMessages.current.toLocaleString()} / {usage.whatsappMessages.limit.toLocaleString()}</span>
                    </div>
                    <Progress value={usage.whatsappMessages.percentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>API Calls</span>
                      <span>{usage.apiCalls.current.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}</span>
                    </div>
                    <Progress value={usage.apiCalls.percentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Usage Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Team Members at 50% capacity</p>
                      <p className="text-sm text-yellow-700">Consider upgrading your plan or removing inactive members</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Billing History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Receipt className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">{invoice.plan}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold">${invoice.amount}</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {invoice.status}
                        </Badge>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}