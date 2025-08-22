import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  ArrowRight, 
  MessageCircle, 
  Users, 
  Zap, 
  CheckCircle, 
  Settings, 
  BarChart3,
  Video,
  Plus,
  Pause,
  Play,
  Square,
  RefreshCw,
  ExternalLink,
  Facebook,
  Globe,
  Shield,
  Crown,
  MoreHorizontal,
  TrendingUp,
  Calendar
} from "lucide-react";

export default function Home() {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
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
      status: "Live",
      apiStatus: "Connected",
      lastActive: "2 hours ago",
      whatsappConnected: true,
      facebookConnected: true
    },
    {
      id: 2,
      name: "Tech Startup Hub",
      description: "B2B SaaS community",
      avatar: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=100&h=100",
      plan: "Basic",
      members: 89,
      campaigns: 5,
      status: "Paused",
      apiStatus: "Connected",
      lastActive: "3 days ago",
      whatsappConnected: true,
      facebookConnected: false
    },
    {
      id: 3,
      name: "Cooking Masterclass",
      description: "Culinary education platform",
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=100&h=100",
      plan: "Pro",
      members: 156,
      campaigns: 8,
      status: "Live",
      apiStatus: "Disconnected",
      lastActive: "1 hour ago",
      whatsappConnected: false,
      facebookConnected: true
    }
  ];

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Pro": return "bg-gradient-to-r from-purple-500 to-purple-600 text-white";
      case "Basic": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live": return "bg-green-100 text-green-800 border-green-200";
      case "Paused": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getApiStatusColor = (status: string) => {
    switch (status) {
      case "Connected": return "text-green-600";
      case "Disconnected": return "text-red-600";
      default: return "text-gray-600";
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

  const projectLimit = 10;
  const currentProjectCount = projects.length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 lg:p-12 border border-primary/20">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl opacity-50"></div>
        
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
                ✨ WhatsApp Business Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Manage Your Business
                <span className="text-primary"> Projects</span> Seamlessly
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Connect WhatsApp API, integrate Facebook Login, and manage up to 10 business projects with advanced automation and analytics.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90" disabled={currentProjectCount >= projectLimit}>
                    <Plus className="w-4 h-4" />
                    Create Project ({currentProjectCount}/{projectLimit})
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button size="lg" variant="outline" className="gap-2">
                <Video className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Project Limit Warning */}
            {currentProjectCount >= projectLimit && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <p className="text-sm font-medium text-amber-800">Project Limit Reached</p>
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  You've reached the maximum of {projectLimit} projects. Upgrade to Pro for unlimited projects.
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{currentProjectCount}/{projectLimit}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">API Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Integration Status Display */}
          <div className="space-y-4">
            <Card className="border border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Platform Integrations</h3>
                  
                  {/* WhatsApp API Status */}
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-medium">WhatsApp API</p>
                        <p className="text-sm text-muted-foreground">Business messaging</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>

                  {/* Facebook Login Status */}
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Facebook className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-medium">Facebook Login</p>
                        <p className="text-sm text-muted-foreground">Social authentication</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Connected</Badge>
                  </div>

                  {/* Quick Stats */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Active Projects</p>
                        <p className="font-bold text-green-600">{projects.filter(p => p.status === 'Live').length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Members</p>
                        <p className="font-bold text-primary">{projects.reduce((sum, p) => sum + p.members, 0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Connected Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Connected Projects</h2>
            <p className="text-muted-foreground mt-1">Manage your business projects and their status</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              View Analytics
            </Button>
            <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" disabled={currentProjectCount >= projectLimit}>
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
                      <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Plan & Status */}
                <div className="flex items-center justify-between">
                  <Badge className={getPlanColor(project.plan)}>
                    {project.plan === "Pro" && <Crown className="w-3 h-3 mr-1" />}
                    {project.plan}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                {/* API Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">API Status:</span>
                    <span className={`font-medium ${getApiStatusColor(project.apiStatus)}`}>
                      {project.apiStatus}
                    </span>
                  </div>
                  
                  {/* Integration Status */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <MessageCircle className={`w-4 h-4 ${project.whatsappConnected ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-xs text-muted-foreground">WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Facebook className={`w-4 h-4 ${project.facebookConnected ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="text-xs text-muted-foreground">Facebook</span>
                    </div>
                  </div>
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

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {project.status === "Live" ? (
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Pause className="w-3 h-3" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" className="flex-1 gap-1">
                      <Play className="w-3 h-3" />
                      Resume
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="gap-1">
                    <RefreshCw className="w-3 h-3" />
                    Renew
                  </Button>
                  <Button size="sm" variant="destructive" className="gap-1">
                    <Square className="w-3 h-3" />
                    Stop
                  </Button>
                </div>

                {/* Last Active */}
                <div className="text-xs text-muted-foreground border-t pt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Last active: {project.lastActive}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Project Card */}
          {currentProjectCount < projectLimit && (
            <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
              <DialogTrigger asChild>
                <Card className="border-dashed border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer group">
                  <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Plus className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">Create New Project</h3>
                      <p className="text-sm text-muted-foreground">Start your next business venture</p>
                    </div>
                    <Button>Get Started</Button>
                  </CardContent>
                </Card>
              </DialogTrigger>
            </Dialog>
          )}
        </div>
      </div>

      {/* Create Project Dialog */}
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
}