
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  ChefHat,
  GraduationCap,
  Car,
  Heart,
  ShoppingBag,
  Home,
  HeadphonesIcon,
  UserCheck,
  Truck,
  Store,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const workspaceCategories = [
  {
    id: 'tech-support',
    name: 'Tech Support Hub',
    description: 'Customer service and technical support management',
    icon: HeadphonesIcon,
    gradient: 'from-blue-500 to-cyan-500',
    projects: 3,
    lastUsed: '2 hours ago',
    sectors: ['Technology', 'SaaS', 'E-commerce', 'Healthcare']
  },
  {
    id: 'marketing',
    name: 'Marketing Hub',
    description: 'Campaign management and lead generation tools',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500',
    projects: 5,
    lastUsed: '1 hour ago',
    sectors: ['Retail', 'Real Estate', 'Education', 'Finance']
  },
  {
    id: 'sales',
    name: 'Sales Operations',
    description: 'Lead management and sales tracking',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    projects: 2,
    lastUsed: '3 hours ago',
    sectors: ['B2B Services', 'Manufacturing', 'Consulting', 'Insurance']
  },
  {
    id: 'hr-management',
    name: 'HR Management',
    description: 'Human resources and employee management system',
    icon: UserCheck,
    gradient: 'from-green-500 to-emerald-500',
    projects: 1,
    lastUsed: '1 day ago',
    sectors: ['Corporate', 'Startups', 'Non-profit', 'Government']
  },
  {
    id: 'business',
    name: 'Business Intelligence',
    description: 'Analytics, reporting, and business insights',
    icon: Building,
    gradient: 'from-green-500 to-emerald-500',
    projects: 4,
    lastUsed: '2 days ago',
    sectors: ['Enterprise', 'Analytics', 'Data Science', 'Consulting']
  },
  {
    id: 'dealers',
    name: 'Dealer Network',
    description: 'Dealer network management and coordination',
    icon: Truck,
    gradient: 'from-orange-500 to-amber-500',
    projects: 2,
    lastUsed: '4 hours ago',
    sectors: ['Automotive', 'Electronics', 'Appliances', 'Machinery']
  }
];

const businessSectors = [
  {
    id: 'cloud-kitchen',
    name: 'Cloud Kitchen',
    description: 'Food delivery and restaurant management',
    icon: ChefHat,
    gradient: 'from-orange-500 to-red-500',
    features: ['Menu Management', 'Order Processing', 'Delivery Tracking']
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational institutions and online learning',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-purple-500',
    features: ['Student Management', 'Course Creation', 'Assessment Tools']
  },
  {
    id: 'automobiles',
    name: 'Automobiles',
    description: 'Auto dealerships and service centers',
    icon: Car,
    gradient: 'from-gray-600 to-blue-600',
    features: ['Inventory Management', 'Service Booking', 'Customer CRM']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical practices and healthcare providers',
    icon: Heart,
    gradient: 'from-green-500 to-teal-500',
    features: ['Patient Management', 'Appointments', 'Medical Records']
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Online and offline retail businesses',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-rose-500',
    features: ['Product Catalog', 'Order Processing', 'Inventory']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property management and real estate agencies',
    icon: Home,
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Property Listings', 'Lead Generation', 'Virtual Tours']
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
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [step, setStep] = useState('category'); // 'category' | 'sector' | 'details'

  const handleCreateWorkspace = () => {
    setShowCreateDialog(true);
    setStep('category');
    setSelectedCategory(null);
    setSelectedSector(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep('sector');
  };

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector);
    setStep('details');
  };

  const handleCreateProject = () => {
    console.log('Creating workspace:', { category: selectedCategory, sector: selectedSector });
    setShowCreateDialog(false);
    navigate('/create-project');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            My Workspace
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects and collaborate with your team
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateWorkspace} className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Create New Workspace
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {step === 'category' && 'Choose Workspace Category'}
                {step === 'sector' && 'Select Business Sector'}
                {step === 'details' && 'Workspace Details'}
              </DialogTitle>
            </DialogHeader>

            {step === 'category' && (
              <div className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Select the type of workspace that best fits your business needs
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workspaceCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Card 
                        key={category.id}
                        className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                        onClick={() => handleCategorySelect(category)}
                      >
                        <CardHeader className="text-center">
                          <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-xl">{category.name}</CardTitle>
                          <CardDescription className="text-center">{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Supported Sectors:</span>
                              <Badge variant="secondary">{category.sectors.length}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {category.sectors.slice(0, 3).map((sector, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {sector}
                                </Badge>
                              ))}
                              {category.sectors.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{category.sectors.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 'sector' && selectedCategory && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className={`w-12 h-12 bg-gradient-to-r ${selectedCategory.gradient} rounded-lg flex items-center justify-center`}>
                    <selectedCategory.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedCategory.name}</h3>
                    <p className="text-muted-foreground text-sm">Select your business sector</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {businessSectors.map((sector) => {
                    const IconComponent = sector.icon;
                    return (
                      <Card 
                        key={sector.id}
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
                        onClick={() => handleSectorSelect(sector)}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${sector.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{sector.name}</CardTitle>
                              <CardDescription>{sector.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Key Features:</h4>
                            <div className="space-y-1">
                              {sector.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                  <span className="text-xs text-muted-foreground">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep('category')}>
                    Back to Categories
                  </Button>
                </div>
              </div>
            )}

            {step === 'details' && selectedCategory && selectedSector && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className={`w-16 h-16 bg-gradient-to-r ${selectedSector.gradient} rounded-xl flex items-center justify-center`}>
                    <selectedSector.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedSector.name} Workspace</h3>
                    <p className="text-muted-foreground">Category: {selectedCategory.name}</p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Workspace Configuration</CardTitle>
                    <CardDescription>
                      Your workspace will be optimized for {selectedSector.name} businesses using {selectedCategory.name} tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Included Features</h4>
                        <div className="space-y-1">
                          {selectedSector.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Category Benefits</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <span className="text-sm">Specialized {selectedCategory.name} tools</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">Advanced analytics dashboard</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">Team collaboration features</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep('sector')}>
                    Back to Sectors
                  </Button>
                  <Button onClick={handleCreateProject} className={`bg-gradient-to-r ${selectedSector.gradient} text-white hover:opacity-90`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workspace
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workspaces">My Workspaces</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={action.action}
                      variant="outline"
                      className="h-20 flex-col gap-2 hover:bg-muted/50 transition-all duration-200 hover:scale-105"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-xs">{action.title}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Workspace Categories Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workspaceCategories.slice(0, 3).map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary">{category.projects} projects</Badge>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last used: {category.lastUsed}</span>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="workspaces" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">All Workspaces</h2>
            <Button onClick={handleCreateWorkspace} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Workspace
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaceCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <CardDescription className="mt-1">{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-muted">
                        {category.projects} active projects
                      </Badge>
                      <span className="text-sm text-muted-foreground">Last used {category.lastUsed}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        Open
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
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
  );
}
