import { useState } from "react";
import { Plus, Settings, Users, BarChart3, ExternalLink, MoreHorizontal, Search, FolderOpen, Building, Phone, MessageCircle, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    whatsappConnected: false,
    facebookConnected: false
  });
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

  const handleCreateProject = () => {
    console.log("Creating project:", newProject);
    setIsNewProjectOpen(false);
    setNewProject({
      name: "",
      description: "",
      industry: "",
      website: "",
      whatsappConnected: false,
      facebookConnected: false
    });
  };

  const handleWhatsAppConnect = () => {
    console.log("Connecting WhatsApp Business API");
    setNewProject(prev => ({ ...prev, whatsappConnected: true }));
  };

  const handleFacebookConnect = () => {
    console.log("Connecting Facebook Login");
    setNewProject(prev => ({ ...prev, facebookConnected: true }));
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">My Projects</h1>
        <p className="text-xl text-muted-foreground">Manage your existing projects and create new workspaces</p>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            My Projects
          </TabsTrigger>
          <TabsTrigger value="workspaces" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Create Workspace
          </TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          {/* Search */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Projects</h2>
            <div className="max-w-md">
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-medium transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={project.avatar} alt={project.name} />
                        <AvatarFallback>{project.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/project/${project.id}/dashboard`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Project
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status & Plan */}
                  <div className="flex items-center justify-between">
                    <Badge className={getPlanColor(project.plan)}>
                      {project.plan}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>

                  {/* Sector */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sector:</span>
                    <span className="font-medium">{project.sector}</span>
                  </div>

                  {/* Integration Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 text-green-600" />
                        <span className="text-muted-foreground">WhatsApp API:</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-muted-foreground">Mobile Number:</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Connected
                      </Badge>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Members:</span>
                      <span className="font-medium">{project.members}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Campaigns:</span>
                      <span className="font-medium">{project.campaigns}</span>
                    </div>
                  </div>

                  {/* Last Active */}
                  <div className="text-xs text-muted-foreground border-t pt-3">
                    Last active: {project.lastActive}
                  </div>

                  {/* Action Button */}
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`/project/${project.id}/dashboard`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Project
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching "{searchTerm}"</p>
            </div>
          )}
        </TabsContent>

        {/* Workspaces Tab */}
        <TabsContent value="workspaces" className="space-y-6">
          <div className="text-center">
            <Button 
              onClick={() => navigate('/workspaces')}
              className="w-full max-w-md bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Plus className="w-4 h-4 mr-2" />
              Go to Workspaces
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Create new workspaces with sector-specific features and multi-currency pricing
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create New Project Dialog */}
      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Fitness Coach Pro"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={newProject.industry} onValueChange={(value) => setNewProject(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fitness">Fitness & Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="business">Business Services</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your business"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  placeholder="https://yourwebsite.com"
                  value={newProject.website}
                  onChange={(e) => setNewProject(prev => ({ ...prev, website: e.target.value }))}
                />
              </div>
            </div>

            {/* Integration Setup */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect Your Platforms</h3>
              
              {/* WhatsApp Business */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">WhatsApp Business API</h4>
                      <p className="text-sm text-muted-foreground">Connect to send messages and manage contacts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {newProject.whatsappConnected ? (
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    ) : (
                      <Button variant="outline" size="sm" onClick={handleWhatsAppConnect}>
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Facebook Login */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Facebook className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Facebook Login</h4>
                      <p className="text-sm text-muted-foreground">Enable social authentication for members</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {newProject.facebookConnected ? (
                      <Badge className="bg-blue-100 text-blue-800">Connected</Badge>
                    ) : (
                      <Button variant="outline" size="sm" onClick={handleFacebookConnect}>
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} disabled={!newProject.name}>
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProjects;