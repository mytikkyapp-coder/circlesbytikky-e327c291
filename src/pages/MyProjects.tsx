import { useState } from "react";
import { Plus, Settings, Users, BarChart3, ExternalLink, MoreHorizontal, Facebook, MessageCircle, Globe, Building, RefreshCw, AlertCircle } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { SectorSelection } from "@/components/SectorSelection";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isSectorSelectionOpen, setIsSectorSelectionOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    whatsappConnected: false,
    facebookConnected: false
  });

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
      lastActive: "2 hours ago"
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
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Cooking Masterclass",
      description: "Culinary education platform",
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=100&h=100",
      plan: "Standard",
      members: 89,
      campaigns: 5,
      status: "Paused",
      lastActive: "3 days ago"
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
      case "Standard": return "bg-secondary text-secondary-foreground";
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

  const handleSectorSelect = (sector: any) => {
    console.log("Selected sector:", sector);
    setIsSectorSelectionOpen(false);
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Manage your business profiles across sectors</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsSectorSelectionOpen(true)}
            className="px-6"
          >
            <Globe className="w-4 h-4 mr-2" />
            Across Sectors
          </Button>
          <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
            <DialogTrigger asChild>
              <Button className="px-6">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Projects Grid with INR Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={project.avatar} alt={project.name} />
                  <AvatarFallback>{project.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {/* Project Value in INR */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Project Value</span>
                  <span className="text-lg font-bold text-primary">₹{(project.members * 25).toLocaleString()}</span>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2">
                    <p className="text-lg font-bold text-foreground">{project.members}</p>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                  <div className="text-center p-2">
                    <p className="text-lg font-bold text-foreground">{project.campaigns}</p>
                    <p className="text-xs text-muted-foreground">Campaigns</p>
                  </div>
                </div>
                
                {/* Plan & Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <Badge variant="outline" className={`text-xs ${getPlanColor(project.plan)}`}>
                    {project.plan} Plan
                  </Badge>
                  <Button 
                    size="sm" 
                    onClick={() => navigate(`/project-dashboard?id=${project.id}`)}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No projects found matching "{searchTerm}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms</p>
        </div>
      )}

      {/* Sector Selection Dialog */}
      <SectorSelection 
        isOpen={isSectorSelectionOpen} 
        onClose={() => setIsSectorSelectionOpen(false)}
        onSelect={handleSectorSelect}
      />

      {/* Create New Project Dialog */}
      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Basic Info */}
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

            {/* Actions */}
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