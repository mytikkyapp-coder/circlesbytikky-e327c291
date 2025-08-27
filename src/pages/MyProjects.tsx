
import { useState } from "react";
import { Plus, Settings, Users, BarChart3, ExternalLink, MoreHorizontal, RefreshCw, FolderOpen, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      name: "Fitness Coach Pro",
      description: "Personal training business",
      avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=100&h=100",
      plan: "Pro",
      members: 245,
      campaigns: 12,
      status: "Active",
      lastActive: "2 hours ago",
      value: "₹49,999",
      sector: "Health & Fitness"
    },
    {
      id: 2,
      name: "Tech Startup Hub",
      description: "B2B SaaS community",
      avatar: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=100&h=100",
      plan: "Enterprise",
      members: 1250,
      campaigns: 28,
      status: "Active",
      lastActive: "1 day ago",
      value: "₹2,49,999",
      sector: "Technology"
    },
    {
      id: 3,
      name: "Cooking Masterclass",
      description: "Culinary education platform",
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=100&h=100",
      plan: "Basic",
      members: 89,
      campaigns: 5,
      status: "Paused",
      lastActive: "3 days ago",
      value: "₹19,999",
      sector: "Education"
    },
    {
      id: 4,
      name: "Cloud Kitchen Express",
      description: "Food delivery & cloud kitchen",
      avatar: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=100&h=100",
      plan: "Pro",
      members: 156,
      campaigns: 8,
      status: "Active",
      lastActive: "30 minutes ago",
      value: "₹39,999",
      sector: "Food & Beverages"
    },
    {
      id: 5,
      name: "AutoCare Solutions",
      description: "Automotive service center",
      avatar: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=100&h=100",
      plan: "Enterprise",
      members: 78,
      campaigns: 15,
      status: "Active",
      lastActive: "1 hour ago",
      value: "₹89,999",
      sector: "Automotive"
    },
    {
      id: 6,
      name: "Real Estate Pro",
      description: "Property management & sales",
      avatar: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&h=100",
      plan: "Pro",
      members: 234,
      campaigns: 22,
      status: "Active",
      lastActive: "4 hours ago",
      value: "₹1,29,999",
      sector: "Real Estate"
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise": return "bg-primary text-primary-foreground";
      case "Pro": return "bg-accent text-accent-foreground";
      case "Basic": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Paused": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">My Projects</h1>
        <p className="text-xl text-muted-foreground">Manage and organize your existing projects</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={project.avatar} alt={project.name} />
                <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/project/${project.id}/dashboard`)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/project/${project.id}/settings`)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getPlanColor(project.plan)}>{project.plan}</Badge>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{project.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span>{project.campaigns} campaigns</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Value: {project.value}</span>
                <span className="text-xs text-muted-foreground">{project.lastActive}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {project.sector}
                </Badge>
                <Button 
                  size="sm" 
                  onClick={() => navigate(`/project/${project.id}/dashboard`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Create your first project to get started"}
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
