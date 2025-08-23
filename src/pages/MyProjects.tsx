import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Settings, Users, BarChart3, ExternalLink, MoreHorizontal, Facebook, MessageCircle, Globe, Building, RefreshCw, AlertCircle, Phone, IndianRupee, Star, DollarSign, Euro, ArrowRight, HeadphonesIcon, Megaphone, UserCheck, Truck, ShoppingBag, CreditCard, MessageSquare } from "lucide-react";
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isSectorSelectionOpen, setIsSectorSelectionOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    whatsappConnected: false,
    facebookConnected: false
  });

  // Currency configurations
  const currencies = {
    USD: { symbol: "$", label: "Dollar (USD)", multiplier: 1 },
    INR: { symbol: "₹", label: "Rupee (INR)", multiplier: 83 },
    EUR: { symbol: "€", label: "Euro (EUR)", multiplier: 0.92 },
    AED: { symbol: "د.إ", label: "Dirham (AED)", multiplier: 3.67 }
  };

  // Workspace categories with pricing
  const workspaceCategories = [
    {
      id: "tech-support",
      name: "Tech Support",
      icon: HeadphonesIcon,
      description: "Customer service and technical support management",
      basePrice: 99,
      features: ["Ticket Management", "Live Chat", "Knowledge Base", "SLA Tracking"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: Megaphone,
      description: "Campaign management and lead generation tools",
      basePrice: 149,
      features: ["Campaign Builder", "Lead Tracking", "Analytics", "Social Media Integration"],
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "hr-management",
      name: "HR Management",
      icon: UserCheck,
      description: "Human resources and employee management system",
      basePrice: 129,
      features: ["Employee Database", "Payroll", "Performance Tracking", "Recruitment"],
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "dealers",
      name: "Dealers",
      icon: Truck,
      description: "Dealer network management and coordination",
      basePrice: 199,
      features: ["Dealer Portal", "Inventory Tracking", "Commission Management", "Performance Analytics"],
      color: "from-orange-500 to-amber-500"
    },
    {
      id: "distributors",
      name: "Distributors",
      icon: ShoppingBag,
      description: "Distribution network and supply chain management",
      basePrice: 249,
      features: ["Supply Chain Tracking", "Order Management", "Territory Management", "Reporting"],
      color: "from-purple-500 to-violet-500"
    }
  ];

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

  const handleSectorSelect = (category: any) => {
    console.log("Selected category:", category);
    // Navigate to workspace setup for the selected category
    window.location.href = `/workspace/${category.id}/setup`;
  };

  const formatPrice = (basePrice: number) => {
    const currency = currencies[selectedCurrency as keyof typeof currencies];
    const convertedPrice = Math.round(basePrice * currency.multiplier);
    return `${currency.symbol}${convertedPrice.toLocaleString()}`;
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
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">My Projects</h1>
        <p className="text-xl text-muted-foreground">Manage your business projects and workspaces</p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workspaces Card */}
        <Card 
          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/30"
          onClick={() => window.location.href = "/workspaces"}
        >
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <Building className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">My Workspaces</h3>
              <p className="text-muted-foreground">
                Manage business workspaces with team collaboration and sector-specific tools
              </p>
            </div>

            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="font-bold text-lg text-primary">3</div>
                <div>Active Workspaces</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-green-500">25</div>
                <div>Team Members</div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white border-0">
              Manage Workspaces
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Legacy Projects Card */}
        <Card 
          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/30"
          onClick={() => window.location.href = "/projects/legacy"}
        >
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Legacy Projects</h3>
              <p className="text-muted-foreground">
                View and manage your existing standalone business projects
              </p>
            </div>

            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="font-bold text-lg text-primary">{projects.length}</div>
                <div>Legacy Projects</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-green-500">{projects.filter(p => p.status === 'Active').length}</div>
                <div>Active</div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:opacity-90 text-white border-0">
              View Legacy Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/workspaces")}>
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <h4 className="font-medium mb-1">Team Management</h4>
          <p className="text-sm text-muted-foreground">Manage teams across workspaces</p>
        </Card>
        
        <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/billing")}>
          <CreditCard className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h4 className="font-medium mb-1">Billing & Plans</h4>
          <p className="text-sm text-muted-foreground">Manage subscriptions and usage</p>
        </Card>
        
        <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/whatsapp-setup")}>
          <MessageSquare className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h4 className="font-medium mb-1">WhatsApp Setup</h4>
          <p className="text-sm text-muted-foreground">Configure WhatsApp integration</p>
        </Card>
      </div>

      {/* Recent Activity & Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">New workspace "TechCorp Support" created</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Team member added to Marketing workspace</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">WhatsApp campaign launched successfully</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Active Workspaces</div>
              </div>
              <div className="text-center p-3 bg-green-500/5 rounded-lg">
                <div className="text-2xl font-bold text-green-500">25</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-500/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-500">$57K</div>
                <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              </div>
              <div className="text-center p-3 bg-purple-500/5 rounded-lg">
                <div className="text-2xl font-bold text-purple-500">98.5%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProjects;