import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plug, 
  Smartphone, 
  Database, 
  ShoppingCart, 
  Mail, 
  BarChart3,
  ExternalLink,
  Settings,
  CheckCircle
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  status: "connected" | "available" | "coming-soon";
  features: string[];
  pricing?: string;
}

export default function Integrations() {
  const integrations: Integration[] = [
    {
      id: "whatsapp",
      name: "WhatsApp Business API",
      description: "Send campaigns directly through WhatsApp Business",
      icon: Smartphone,
      category: "Communication",
      status: "connected",
      features: ["Message Templates", "Bulk Messaging", "Delivery Reports", "Media Support"],
      pricing: "Free"
    },
    {
      id: "shopify", 
      name: "Shopify",
      description: "Sync customer data and order information",
      icon: ShoppingCart,
      category: "E-commerce",
      status: "available",
      features: ["Customer Sync", "Order Updates", "Product Catalogs", "Abandoned Cart"],
      pricing: "Free"
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Import email lists and subscriber data",
      icon: Mail,
      category: "Email Marketing",
      status: "available", 
      features: ["List Import", "Subscriber Sync", "Campaign Analytics", "Audience Segmentation"],
      pricing: "Free"
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Track campaign performance and user behavior",
      icon: BarChart3,
      category: "Analytics",
      status: "available",
      features: ["Campaign Tracking", "Conversion Goals", "Audience Insights", "Custom Reports"],
      pricing: "Free"
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect with 5000+ apps through automated workflows",
      icon: Plug,
      category: "Automation",
      status: "available",
      features: ["Automated Workflows", "Data Sync", "Event Triggers", "Custom Integrations"],
      pricing: "Free tier available"
    },
    {
      id: "hubspot",
      name: "HubSpot CRM",
      description: "Sync contacts and track customer interactions",
      icon: Database,
      category: "CRM",
      status: "coming-soon",
      features: ["Contact Sync", "Deal Tracking", "Activity Logging", "Lead Scoring"],
      pricing: "Coming Soon"
    }
  ];

  const categories = ["All", "Communication", "E-commerce", "Email Marketing", "Analytics", "Automation", "CRM"];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "connected": "bg-green-100 text-green-800",
      "available": "bg-blue-100 text-blue-800",
      "coming-soon": "bg-gray-100 text-gray-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string) => {
    const texts: { [key: string]: string } = {
      "connected": "Connected",
      "available": "Available",
      "coming-soon": "Coming Soon"
    };
    return texts[status] || status;
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      "Communication": Smartphone,
      "E-commerce": ShoppingCart,
      "Email Marketing": Mail,
      "Analytics": BarChart3,
      "Automation": Plug,
      "CRM": Database
    };
    return icons[category] || Plug;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground mt-1">Connect Circles with your favorite tools and platforms</p>
        </div>
        <Button variant="outline" className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Browse All
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connected Integrations */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Connected Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations
            .filter(integration => integration.status === "connected")
            .map((integration) => {
              const CategoryIcon = getCategoryIcon(integration.category);
              return (
                <Card key={integration.id} className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <integration.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <CategoryIcon className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{integration.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <Switch checked={true} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(integration.status)}>
                        {getStatusText(integration.status)}
                      </Badge>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Settings className="w-3 h-3" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Available Integrations */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Available Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations
            .filter(integration => integration.status !== "connected")
            .map((integration) => {
              const CategoryIcon = getCategoryIcon(integration.category);
              return (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <integration.icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <CategoryIcon className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{integration.category}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={getStatusColor(integration.status)}
                      >
                        {getStatusText(integration.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    
                    {/* Features */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Features</p>
                      <div className="space-y-1">
                        {integration.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                        {integration.features.length > 3 && (
                          <p className="text-xs text-muted-foreground">+{integration.features.length - 3} more</p>
                        )}
                      </div>
                    </div>

                    {/* Pricing and Connect */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">{integration.pricing}</span>
                      <Button 
                        size="sm" 
                        disabled={integration.status === "coming-soon"}
                        className="gap-2"
                      >
                        {integration.status === "coming-soon" ? (
                          "Coming Soon"
                        ) : (
                          <>
                            <Plug className="w-3 h-3" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}