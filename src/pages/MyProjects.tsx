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

const MyProjects = () => {
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
      plan: "Basic",
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
    // This would integrate with Supabase for secure storage
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
    // This would create a new project with sector-specific configurations
  };


  const handleWhatsAppConnect = () => {
    // WhatsApp Business API integration would go here
    console.log("Connecting WhatsApp Business API");
    setNewProject(prev => ({ ...prev, whatsappConnected: true }));
  };

  const handleFacebookConnect = () => {
    // Facebook Login API integration would go here
    console.log("Connecting Facebook Login");
    setNewProject(prev => ({ ...prev, facebookConnected: true }));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Manage your business profiles</p>
        </div>
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogTrigger asChild>
            <Button className="px-6">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
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

                {/* Note about Supabase */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Building className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Connect Supabase for Full Features</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        To securely store API keys and enable authentication, connect your project to Supabase.
                      </p>
                    </div>
                  </div>
                </div>
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

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Connected Projects Billing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            WhatsApp Connected Projects
          </CardTitle>
          <p className="text-muted-foreground">Billing details and status for WhatsApp integrations</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* E-commerce Store Project */}
            <div className="p-6 bg-muted/50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">E-commerce Store</h4>
                    <p className="text-sm text-muted-foreground">Customer support & order updates</p>
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current Plan</p>
                  <p className="font-medium">Pro Plan</p>
                  <p className="text-sm text-muted-foreground">$49/month</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Next Billing</p>
                  <p className="font-medium">Dec 25, 2024</p>
                  <p className="text-sm text-green-600">Auto-renew ON</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Renew Now
                </Button>
                <Button size="sm" variant="outline">
                  View Usage
                </Button>
              </div>
            </div>

            {/* Marketing Campaign Project */}
            <div className="p-6 bg-muted/50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Marketing Campaign</h4>
                    <p className="text-sm text-muted-foreground">Promotional broadcasts & engagement</p>
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current Plan</p>
                  <p className="font-medium">Starter Plan</p>
                  <p className="text-sm text-muted-foreground">$19/month</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Next Billing</p>
                  <p className="font-medium">Jan 5, 2025</p>
                  <p className="text-sm text-green-600">Auto-renew ON</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Renew Now
                </Button>
                <Button size="sm" variant="outline">
                  Upgrade Plan
                </Button>
              </div>
            </div>

            {/* Lead Generation Project */}
            <div className="p-6 bg-muted/50 rounded-lg space-y-4 opacity-75">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Lead Generation</h4>
                    <p className="text-sm text-muted-foreground">Automated follow-ups & nurturing</p>
                  </div>
                </div>
                <Badge variant="outline">Payment Required</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Selected Plan</p>
                  <p className="font-medium">Pro Plan</p>
                  <p className="text-sm text-muted-foreground">$49/month</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-medium text-yellow-600">Setup Required</p>
                  <p className="text-sm text-muted-foreground">Payment pending</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="bg-primary">
                  Complete Setup
                </Button>
                <Button size="sm" variant="outline">
                  Change Plan
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Total Monthly Cost</p>
                <p className="text-sm text-muted-foreground">2 active projects + 1 pending</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$68</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
            </div>

            <Button className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              Manage All Billing
            </Button>
          </div>
        </CardContent>
      </Card>

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

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
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

      {/* Create New Project Card */}
      <Card className="border-dashed border-2 border-primary/30 hover:border-primary/50 transition-all duration-200 hover:shadow-lg group cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center p-8 h-full min-h-[200px]">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-center">Create New Workspace</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Choose across business sectors with customized features
          </p>
          <Button 
            onClick={() => setIsSectorSelectionOpen(true)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Plus className="w-4 h-4 mr-2" />
            Across Sectors
          </Button>
        </CardContent>
      </Card>

      {/* Sector Selection Dialog */}
      <SectorSelection
        isOpen={isSectorSelectionOpen}
        onClose={() => setIsSectorSelectionOpen(false)}
        onSelect={handleSectorSelect}
      />

      {/* Legacy Create New Project Dialog */}
      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                placeholder="Describe your project"
              />
            </div>
            <div>
              <Label htmlFor="project-industry">Industry</Label>
              <Select value={newProject.industry} onValueChange={(value) => setNewProject({...newProject, industry: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloud-kitchen">Cloud Kitchen</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="automobiles">Automobiles</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreateProject} className="w-full">
              Create Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProjects;