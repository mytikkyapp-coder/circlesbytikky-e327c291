import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Building, 
  Settings, 
  MoreVertical,
  Calendar,
  Activity,
  Target,
  Briefcase,
  Filter,
  Search,
  ChefHat,
  GraduationCap,
  Car,
  Heart,
  ShoppingBag,
  Home,
  MessageSquare,
  Bot,
  Database,
  Crown,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sectors = [
  {
    id: 'automobiles',
    name: 'Automobiles',
    description: 'Auto dealerships and service centers',
    icon: Car,
    gradient: 'from-gray-600 to-blue-600',
    projects: 2,
    lastUsed: '1 hour ago',
    tags: ['D2C', 'CRM', 'Inventory'],
    isActive: true
  },
  {
    id: 'cloud-kitchen',
    name: 'Cloud Kitchen',
    description: 'Food delivery and restaurant management',
    icon: ChefHat,
    gradient: 'from-orange-500 to-red-500',
    projects: 1,
    lastUsed: '3 hours ago',
    tags: ['D2C', 'Orders', 'Delivery'],
    isActive: true
  },
  {
    id: 'retail',
    name: 'D2C Retail',
    description: 'Direct-to-consumer e-commerce',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-rose-500',
    projects: 4,
    lastUsed: '30 min ago',
    tags: ['D2C', 'E-commerce', 'Analytics'],
    isActive: true
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational institutions and online learning',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-purple-500',
    projects: 0,
    lastUsed: 'Never',
    tags: ['SaaS', 'Learning'],
    isActive: false
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical practices and healthcare providers',
    icon: Heart,
    gradient: 'from-green-500 to-teal-500',
    projects: 0,
    lastUsed: 'Never',
    tags: ['CRM', 'Compliance'],
    isActive: false
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property management and agencies',
    icon: Home,
    gradient: 'from-yellow-500 to-orange-500',
    projects: 0,
    lastUsed: 'Never',
    tags: ['CRM', 'Listings'],
    isActive: false
  }
];

const workspaceCategories = sectors.filter(s => s.isActive);

const integrationBlocks = [
  {
    id: 'whatsapp',
    name: 'WhatsApp API',
    description: 'Connect with customers on WhatsApp',
    icon: MessageSquare,
    status: 'connected',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Knowledge Base',
    description: 'AI-powered customer support',
    icon: Bot,
    status: 'pending',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'crm',
    name: 'CRM Integration',
    description: 'Sync customer data and interactions',
    icon: Database,
    status: 'available',
    gradient: 'from-blue-500 to-cyan-500'
  }
];

const recentActivity = [
  { action: 'Updated Marketing Campaign', workspace: 'Marketing Hub', time: '2 hours ago' },
  { action: 'Added new team member', workspace: 'Sales Operations', time: '5 hours ago' },
  { action: 'Generated quarterly report', workspace: 'Business Intelligence', time: '1 day ago' },
];

const quickActions = [
  { title: 'Create Campaign', icon: Target, action: 'campaign' },
  { title: 'Add Team Member', icon: Users, action: 'member' },
  { title: 'View Analytics', icon: Activity, action: 'analytics' },
  { title: 'Schedule Meeting', icon: Calendar, action: 'meeting' },
];

export default function MyWorkspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('workspace');
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectSector, setProjectSector] = useState('');

  const handleCreateProject = () => {
    // Handle project creation
    console.log('Creating project:', { name: projectName, sector: projectSector });
    setIsCreateSheetOpen(false);
    setProjectName('');
    setProjectSector('');
  };

  const filteredSectors = sectors.filter(sector => {
    const matchesSearch = sector.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'all' || sector.id === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              My Workspace
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your projects across different business sectors
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 rounded-xl">
            <TabsTrigger value="workspace" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">My Workspace</TabsTrigger>
            <TabsTrigger value="sectors" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Browse Sectors</TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Integrations</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="workspace" className="space-y-6">
            {/* Active Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {workspaceCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl border-0 shadow-md bg-gradient-to-br from-background to-muted/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-14 h-14 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex gap-1">
                          {category.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-2 py-1 rounded-full">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <CardDescription className="text-sm">{category.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {category.projects} active projects
                        </span>
                        <span className="text-muted-foreground">
                          {category.lastUsed}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 rounded-lg" size="sm">
                          Open Dashboard
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sectors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-[200px] rounded-xl">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="automobiles">Automobiles</SelectItem>
                  <SelectItem value="cloud-kitchen">Cloud Kitchen</SelectItem>
                  <SelectItem value="retail">D2C Retail</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSectors.map((sector) => {
                const IconComponent = sector.icon;
                return (
                  <Card key={sector.id} className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl border-0 shadow-md cursor-pointer ${sector.isActive ? 'bg-gradient-to-br from-background to-muted/20' : 'opacity-75 bg-gradient-to-br from-muted/50 to-muted/30'}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-14 h-14 bg-gradient-to-r ${sector.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                          {sector.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-2 py-1 rounded-full">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-xl flex items-center gap-2">
                          {sector.name}
                          {sector.isActive && <Crown className="w-4 h-4 text-yellow-500" />}
                        </CardTitle>
                        <CardDescription className="text-sm">{sector.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {sector.projects} projects
                        </span>
                        <span className="text-muted-foreground">
                          {sector.lastUsed}
                        </span>
                      </div>
                      <Button 
                        className={`w-full rounded-lg ${sector.isActive ? '' : 'opacity-50'}`} 
                        size="sm"
                        disabled={!sector.isActive}
                      >
                        {sector.isActive ? 'Explore Sector' : 'Coming Soon'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Integration Hub</h2>
              <p className="text-muted-foreground">Connect your favorite tools and services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {integrationBlocks.map((integration) => {
                const IconComponent = integration.icon;
                const statusColor = integration.status === 'connected' ? 'text-green-500' : 
                                  integration.status === 'pending' ? 'text-yellow-500' : 'text-blue-500';
                const statusText = integration.status === 'connected' ? 'Connected' : 
                                 integration.status === 'pending' ? 'Setup Required' : 'Available';
                
                return (
                  <Card key={integration.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl border-0 shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-14 h-14 bg-gradient-to-r ${integration.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <Badge variant="outline" className={`${statusColor} border-current`}>
                          {statusText}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{integration.name}</CardTitle>
                        <CardDescription className="text-sm">{integration.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full rounded-lg" 
                        size="sm"
                        variant={integration.status === 'connected' ? 'outline' : 'default'}
                      >
                        {integration.status === 'connected' ? 'Manage' : 
                         integration.status === 'pending' ? 'Complete Setup' : 'Connect'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            
            <Card className="rounded-xl border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="w-3 h-3 bg-primary rounded-full shadow-sm"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">in {activity.workspace}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Persistent Create Project Sidebar */}
      <div className="w-80 border-l bg-muted/30 p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          
          <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
            <SheetTrigger asChild>
              <Button className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/80">
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Create New Project</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="Enter project name..."
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-sector">Business Sector</Label>
                  <Select value={projectSector} onValueChange={setProjectSector}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select a sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automobiles">Automobiles</SelectItem>
                      <SelectItem value="cloud-kitchen">Cloud Kitchen</SelectItem>
                      <SelectItem value="retail">D2C Retail</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateProject} className="w-full rounded-xl">
                  Create Project
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.action}
                  variant="outline"
                  className="h-16 flex-col gap-2 hover:bg-muted/50 transition-all duration-200 hover:scale-105 rounded-xl"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{action.title}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Featured Sectors for D2C/Auto Focus */}
        <Card className="rounded-xl border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Featured for You</CardTitle>
            <CardDescription className="text-sm">Popular among D2C brands & Auto dealers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sectors.filter(s => s.id === 'automobiles' || s.id === 'retail').map((sector) => {
              const IconComponent = sector.icon;
              return (
                <div key={sector.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 bg-gradient-to-r ${sector.gradient} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{sector.name}</p>
                    <p className="text-xs text-muted-foreground">{sector.projects} projects</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}