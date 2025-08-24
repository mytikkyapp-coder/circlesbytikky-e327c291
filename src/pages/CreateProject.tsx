import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChefHat, 
  GraduationCap, 
  Car, 
  Heart, 
  ShoppingBag, 
  Home, 
  Briefcase,
  Building,
  Users,
  TrendingUp,
  Crown,
  ArrowLeft,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Sector {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
  pricing: { starter: number; pro: number; enterprise: number };
}

const sectors: Sector[] = [
  {
    id: 'cloud-kitchen',
    name: 'Cloud Kitchen',
    description: 'Food delivery and restaurant management',
    icon: ChefHat,
    gradient: 'from-orange-500 to-red-500',
    features: ['Online Menu Management', 'Order Processing System', 'Delivery Integration'],
    pricing: { starter: 2499, pro: 6499, enterprise: 16499 }
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational institutions and online learning',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-purple-500',
    features: ['Student Management System', 'Course Creation Tools', 'Assignment Tracking'],
    pricing: { starter: 3199, pro: 8199, enterprise: 20499 }
  },
  {
    id: 'automobiles',
    name: 'Automobiles',
    description: 'Auto dealerships and service centers',
    icon: Car,
    gradient: 'from-gray-600 to-blue-600',
    features: ['Inventory Management', 'Service Booking System', 'Customer Relationship Management'],
    pricing: { starter: 4099, pro: 10699, enterprise: 24999 }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical practices and healthcare providers',
    icon: Heart,
    gradient: 'from-green-500 to-teal-500',
    features: ['Patient Management', 'Appointment Scheduling', 'Medical Records System'],
    pricing: { starter: 4899, pro: 12299, enterprise: 28999 }
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Online and offline retail businesses',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-rose-500',
    features: ['Product Catalog Management', 'Order Processing', 'Inventory Tracking'],
    pricing: { starter: 2799, pro: 7399, enterprise: 18199 }
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property management and real estate agencies',
    icon: Home,
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Property Listings Management', 'Lead Generation Tools', 'Virtual Tour Integration'],
    pricing: { starter: 3699, pro: 9899, enterprise: 23199 }
  }
];

const workspaceCategories = [
  {
    id: "tech-support",
    name: "Tech Support",
    icon: Users,
    description: "Customer service and technical support management",
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    description: "Campaign management and lead generation tools",
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: "hr-management",
    name: "HR Management",
    icon: Users,
    description: "Human resources and employee management system",
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: "dealers",
    name: "Dealers",
    icon: Building,
    description: "Dealer network management and coordination",
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: "distributors",
    name: "Distributors",
    icon: Building,
    description: "Distribution network and supply chain management",
    gradient: 'from-purple-500 to-violet-500'
  }
];

export default function CreateProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'workspace' | 'sector' | 'form'>('workspace');
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    plan: 'pro'
  });

  const handleWorkspaceSelect = (workspace: any) => {
    setSelectedWorkspace(workspace);
    setStep('sector');
  };

  const handleSectorSelect = (sector: Sector) => {
    setSelectedSector(sector);
    setStep('form');
  };

  const handleCreateProject = () => {
    console.log('Creating project:', { workspace: selectedWorkspace, sector: selectedSector, ...formData });
    navigate('/my-projects');
  };

  const resetFlow = () => {
    setStep('workspace');
    setSelectedWorkspace(null);
    setSelectedSector(null);
    setFormData({ projectName: '', description: '', plan: 'pro' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/my-projects')} className="hover:scale-105 transition-transform">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Create New Project
              </h1>
              <p className="text-muted-foreground">
                Set up your workspace and choose your business sector
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={resetFlow} size="sm">
            Reset
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {['Workspace', 'Sector', 'Details'].map((label, index) => {
              const stepMap = { 'workspace': 0, 'sector': 1, 'form': 2 };
              const currentStepIndex = stepMap[step];
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={label} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isActive ? 'bg-primary text-primary-foreground shadow-lg scale-110' :
                    isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-primary' : isCompleted ? 'text-primary/70' : 'text-muted-foreground'
                  }`}>
                    {label}
                  </span>
                  {index < 2 && (
                    <div className={`w-12 h-0.5 mx-4 transition-colors duration-300 ${
                      isCompleted ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-fade-in">
          {step === 'workspace' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">Choose Your Workspace</h2>
                <p className="text-muted-foreground">Select the type of workspace that best fits your project needs</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaceCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.id}
                      className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group hover:scale-105"
                      onClick={() => handleWorkspaceSelect(category)}
                    >
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <CardDescription className="text-center">{category.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
              
              {/* New Workspace Categories from My Projects */}
              <div className="mt-12 space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Business Category Workspaces</h3>
                  <p className="text-muted-foreground">Specialized workspaces for different business sectors</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      id: "tech-support-business",
                      name: "Tech Support",
                      icon: Users,
                      description: "Customer service and technical support management",
                      basePrice: 8199,
                      features: ["Ticket Management", "Live Chat", "Knowledge Base", "SLA Tracking"],
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      id: "marketing-business",
                      name: "Marketing",
                      icon: TrendingUp,
                      description: "Campaign management and lead generation tools",
                      basePrice: 12299,
                      features: ["Campaign Builder", "Lead Tracking", "Analytics", "Social Media Integration"],
                      color: "from-pink-500 to-rose-500"
                    },
                    {
                      id: "hr-management-business",
                      name: "HR Management",
                      icon: Users,
                      description: "Human resources and employee management system",
                      basePrice: 10699,
                      features: ["Employee Database", "Payroll", "Performance Tracking", "Recruitment"],
                      color: "from-green-500 to-emerald-500"
                    },
                    {
                      id: "dealers-business",
                      name: "Dealers",
                      icon: Building,
                      description: "Dealer network management and coordination",
                      basePrice: 16499,
                      features: ["Dealer Portal", "Inventory Tracking", "Commission Management", "Performance Analytics"],
                      color: "from-orange-500 to-amber-500"
                    },
                    {
                      id: "distributors-business",
                      name: "Distributors",
                      icon: Building,
                      description: "Distribution network and supply chain management",
                      basePrice: 20499,
                      features: ["Supply Chain Tracking", "Order Management", "Territory Management", "Reporting"],
                      color: "from-purple-500 to-violet-500"
                    }
                  ].map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Card 
                        key={category.id} 
                        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/30"
                        onClick={() => handleWorkspaceSelect(category)}
                      >
                        <CardContent className="p-6 text-center space-y-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
                            <p className="text-muted-foreground text-sm">{category.description}</p>
                          </div>

                          <div className="space-y-3">
                            <div className="text-2xl font-bold text-primary">
                              ₹{category.basePrice.toLocaleString()}/month
                            </div>
                            
                            <div className="space-y-2">
                              {category.features.map((feature, index) => (
                                <div key={index} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white border-0`}>
                            Get Started
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 'sector' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">Select Your Business Sector</h2>
                <p className="text-muted-foreground">
                  Choose the sector for your <span className="font-semibold text-primary">{selectedWorkspace?.name}</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectors.map((sector) => {
                  const IconComponent = sector.icon;
                  return (
                    <Card 
                      key={sector.id}
                      className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
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
                            {sector.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span className="text-xs text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Starting from</span>
                            <Badge className={`bg-gradient-to-r ${sector.gradient} text-white`}>
                              ₹{sector.pricing.starter}/mo
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {step === 'form' && selectedSector && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
                <p className="text-muted-foreground">
                  Complete your <span className="font-semibold text-primary">{selectedSector.name}</span> project setup
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card className="shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg">
                      <div className={`w-16 h-16 bg-gradient-to-r ${selectedSector.gradient} rounded-xl flex items-center justify-center`}>
                        <selectedSector.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{selectedSector.name}</h3>
                        <p className="text-muted-foreground">{selectedWorkspace?.name}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input 
                          id="projectName"
                          placeholder="Enter your project name"
                          value={formData.projectName}
                          onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                          className="text-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description"
                          placeholder="Describe your project (optional)"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Choose Plan</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(selectedSector.pricing).map(([planType, price]) => (
                            <Card 
                              key={planType}
                              className={`cursor-pointer transition-all duration-200 ${
                                formData.plan === planType ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-md'
                              }`}
                              onClick={() => setFormData({...formData, plan: planType})}
                            >
                              <CardContent className="p-4 text-center">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-semibold capitalize">{planType}</span>
                                  {planType === 'pro' && <Crown className="w-4 h-4 text-primary" />}
                                </div>
                                <div className="text-xl font-bold">₹{price}</div>
                                <div className="text-xs text-muted-foreground">/month</div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6">
                      <Button variant="outline" onClick={() => setStep('sector')} className="flex-1">
                        Back to Sectors
                      </Button>
                      <Button 
                        onClick={handleCreateProject} 
                        className={`flex-1 bg-gradient-to-r ${selectedSector.gradient} text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200`}
                        disabled={!formData.projectName.trim()}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}