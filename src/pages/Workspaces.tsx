import { useState } from "react";
import { Plus, HeadphonesIcon, Megaphone, UserCheck, Truck, ShoppingBag, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Workspaces = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
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

  return (
    <div className="flex min-h-screen w-full">
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">My Workspaces</h1>
          <p className="text-xl text-muted-foreground">Choose your business category and start building</p>
        </div>

        {/* Create New Workspace Section */}
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Create New Workspace</CardTitle>
            <p className="text-muted-foreground">Select a category that best fits your business needs</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Currency Selector */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 bg-background/50 rounded-lg p-1 border">
                {Object.entries(currencies).map(([code, currency]) => (
                  <Button
                    key={code}
                    variant={selectedCurrency === code ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCurrency(code)}
                    className="gap-2"
                  >
                    {currency.symbol} {currency.label.split(" ")[0]}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Workspace Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaceCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card 
                    key={category.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/30"
                    onClick={() => handleSectorSelect(category)}
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
                          {formatPrice(category.basePrice)}/month
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

                      <Button 
                        className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white border-0`}
                        disabled
                      >
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Custom Workspace Option */}
            <div className="text-center pt-6 border-t">
              <p className="text-muted-foreground mb-4">Need a custom solution?</p>
              <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="px-8">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Custom Workspace
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Custom Workspace</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Workspace Name</Label>
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

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateProject}>
                        Create Workspace
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l bg-muted/30 p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 h-12"
            onClick={() => window.location.href = '/my-projects'}
          >
            <Building className="w-5 h-5" />
            My Workspaces
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>Manage your existing workspaces and projects</p>
          </div>
        </div>
        
        {/* Help & Support */}
        <div className="space-y-4 pt-6 border-t">
          <h4 className="font-medium text-foreground">Need Help?</h4>
          <div className="space-y-3 text-sm">
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              📚 Documentation
            </Button>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              💬 Contact Support
            </Button>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              🎥 Video Tutorials
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspaces;