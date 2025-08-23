import { useState } from "react";
import { Plus, Search, Users, BarChart3, Settings, Crown, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { WorkspaceCard } from "@/components/WorkspaceCard";

export default function Workspaces() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Mock workspace data
  const workspaces = [
    {
      id: "ws-1",
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
    },
    {
      id: "ws-2",
      name: "GrowthCo Marketing",
      category: "marketing",
      categoryName: "Marketing",
      description: "Campaign management and lead generation",
      avatar: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=100&h=100",
      plan: "Enterprise",
      status: "Active",
      members: 8,
      campaigns: 28,
      revenue: "$32,850",
      lastActive: "1 day ago",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "ws-3",
      name: "PeopleFirst HR",
      category: "hr-management",
      categoryName: "HR Management",
      description: "Human resources and employee management",
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=100&h=100",
      plan: "Pro",
      status: "Active",
      members: 6,
      employees: 156,
      revenue: "$8,950",
      lastActive: "3 hours ago",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workspace.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Workspaces</h1>
          <p className="text-muted-foreground">Manage your business workspaces and teams</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/billing")}>
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </Button>
          <Button onClick={() => navigate("/workspace/create")}>
            <Plus className="w-4 h-4 mr-2" />
            New Workspace
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Workspaces</p>
                <p className="text-2xl font-bold">{workspaces.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">{workspaces.reduce((acc, ws) => acc + ws.members, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">$57,220</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upgrade Available</p>
                <p className="text-xl font-bold text-primary">Enterprise</p>
              </div>
              <Crown className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search workspaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            All Workspaces
          </Badge>
        </div>
      </div>

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
        
        {/* Add New Workspace Card */}
        <Card 
          className="border-dashed border-2 hover:border-primary/50 cursor-pointer transition-all duration-200 hover:shadow-lg"
          onClick={() => navigate("/workspace/create")}
        >
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Create New Workspace</h3>
              <p className="text-muted-foreground text-sm">
                Set up a new workspace for your business needs
              </p>
            </div>
            <Button variant="outline">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {filteredWorkspaces.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No workspaces found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or create a new workspace
          </p>
          <Button onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}