import { useState } from "react";
import { Plus, MessageCircle, Facebook, ArrowRight, HeadphonesIcon, Megaphone, UserCheck, Truck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectorSelection } from "@/components/SectorSelection";

const CreateProjects = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isSectorSelectionOpen, setIsSectorSelectionOpen] = useState(false);
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
  const projectCategories = [
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

  const handleSectorSelect = (category: any) => {
    console.log("Selected category:", category);
    window.location.href = `/workspace/${category.id}/setup`;
  };

  const formatPrice = (basePrice: number) => {
    const currency = currencies[selectedCurrency as keyof typeof currencies];
    const convertedPrice = Math.round(basePrice * currency.multiplier);
    return `${currency.symbol}${convertedPrice.toLocaleString()}`;
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
        <h1 className="text-4xl font-bold text-foreground">Create New Project</h1>
        <p className="text-xl text-muted-foreground">Choose your business category and start building</p>
      </div>

      {/* Create New Project Section */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">Select Business Category</CardTitle>
          <p className="text-muted-foreground">Choose a category that best fits your business needs</p>
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
          
          {/* Project Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectCategories.map((category) => {
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

                    <Button className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white border-0`}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Custom Project Option */}
          <div className="text-center pt-6 border-t">
            <p className="text-muted-foreground mb-4">Need a custom solution?</p>
            <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="px-8">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Custom Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Custom Project</DialogTitle>
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
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsNewProjectOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleCreateProject} className="flex-1">
                      Create Project
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProjects;