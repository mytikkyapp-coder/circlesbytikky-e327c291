import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Plus,
  TrendingUp,
  Activity,
  Calendar,
  Phone,
  Mail,
  HeadphonesIcon,
  Megaphone,
  UserCheck,
  Truck,
  ShoppingBag,
  Bell,
  DollarSign
} from "lucide-react";

export default function WorkspaceDashboard() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock workspace data - in real app this would come from API
  const workspace = {
    id: workspaceId,
    name: "TechCorp Support Hub",
    category: "tech-support",
    categoryName: "Tech Support",
    description: "Customer service and technical support management",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=100&h=100",
    plan: "Pro",
    status: "Active",
    members: 12,
    tickets: 245,
    revenue: "$15,420",
    lastActive: "2 hours ago",
    color: "from-blue-500 to-cyan-500"
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tech-support": return HeadphonesIcon;
      case "marketing": return Megaphone;
      case "hr-management": return UserCheck;
      case "dealers": return Truck;
      case "distributors": return ShoppingBag;
      default: return Settings;
    }
  };

  const IconComponent = getCategoryIcon(workspace.category);

  // Mock team members data
  const teamMembers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      role: "Support Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      status: "Online",
      joinedAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@techcorp.com",
      role: "Senior Support Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      status: "Away",
      joinedAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily@techcorp.com",
      role: "Support Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      status: "Online",
      joinedAt: "2024-02-01"
    }
  ];

  // Mock WhatsApp Marketing data
  const whatsappStats = {
    totalMessages: 1250,
    deliveryRate: 98.5,
    openRate: 87.2,
    clickRate: 23.4,
    activeCampaigns: 5
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
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${workspace.color} rounded-xl flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{workspace.name}</h1>
                  <p className="text-muted-foreground">{workspace.description}</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {workspace.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate(`/workspace/${workspaceId}/team`)}>
                <Users className="w-4 h-4 mr-2" />
                Team ({workspace.members})
              </Button>
              <Button variant="outline" onClick={() => navigate("/billing")}>
                <DollarSign className="w-4 h-4 mr-2" />
                Billing
              </Button>
              <Button onClick={() => navigate(`/workspace/${workspaceId}/settings`)}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp Marketing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tickets</p>
                      <p className="text-2xl font-bold">245</p>
                    </div>
                    <HeadphonesIcon className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Resolved Today</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="text-2xl font-bold">2.5h</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Satisfaction</p>
                      <p className="text-2xl font-bold">4.8/5</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">New ticket assigned</p>
                      <p className="text-sm text-muted-foreground">Ticket #1245 assigned to Sarah Johnson</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">WhatsApp campaign launched</p>
                      <p className="text-sm text-muted-foreground">Support updates sent to 150 customers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Badge variant={member.status === "Online" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* WhatsApp Marketing Tab */}
          <TabsContent value="whatsapp" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                    WhatsApp Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Messages</span>
                    <span className="font-bold">{whatsappStats.totalMessages.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Rate</span>
                    <span className="font-bold text-green-500">{whatsappStats.deliveryRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open Rate</span>
                    <span className="font-bold text-blue-500">{whatsappStats.openRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Click Rate</span>
                    <span className="font-bold text-purple-500">{whatsappStats.clickRate}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-primary">{whatsappStats.activeCampaigns}</div>
                    <p className="text-muted-foreground">Running campaigns</p>
                  </div>
                  <Button className="w-full" onClick={() => navigate("/campaigns/create")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Broadcast
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Contacts
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Team Members ({teamMembers.length})</h3>
              <Button onClick={() => navigate(`/workspace/${workspaceId}/team/invite`)}>
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="grid gap-4">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{member.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={member.status === "Online" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Joined {new Date(member.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground">
                      Detailed analytics and reporting will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}