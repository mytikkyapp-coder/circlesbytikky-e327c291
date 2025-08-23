import { useState } from "react";
import { Plus, ArrowRight, HeadphonesIcon, Megaphone, UserCheck, Truck, ShoppingBag, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const MyWorkspace = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchTerm, setSearchTerm] = useState("");

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
    window.location.href = `/workspace/${category.id}/setup`;
  };

  const formatPrice = (basePrice: number) => {
    const currency = currencies[selectedCurrency as keyof typeof currencies];
    const convertedPrice = Math.round(basePrice * currency.multiplier);
    return `${currency.symbol}${convertedPrice.toLocaleString()}`;
  };

  const filteredCategories = workspaceCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">My Workspace</h1>
        <p className="text-xl text-muted-foreground">Create and manage your business workspaces</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search workspace categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Currency Selector */}
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

      {/* Create New Workspace Section */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">Create New Workspace</CardTitle>
          <p className="text-muted-foreground">Select a category that best fits your business needs</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Workspace Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
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
                      Create Workspace
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Access Section */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4 text-center">Quick Actions</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Import Existing Data
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                View Templates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help Getting Started?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Our workspace system is designed to help you organize your business operations efficiently. 
            Choose a category that matches your business type and get access to specialized tools and features.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">
              View Documentation
            </Button>
            <Button>
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyWorkspace;