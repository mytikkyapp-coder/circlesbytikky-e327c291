
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Users, 
  MapPin, 
  TrendingUp, 
  Phone,
  MessageSquare,
  Calendar,
  DollarSign,
  Eye,
  Target,
  BarChart3
} from "lucide-react";

export default function RealEstateCRM() {
  const [activeTab, setActiveTab] = useState('properties');

  const properties = [
    { 
      id: 1, 
      address: '123 Oak Street', 
      price: '$450,000', 
      type: 'House', 
      status: 'available', 
      bedrooms: 3, 
      bathrooms: 2,
      views: 45
    },
    { 
      id: 2, 
      address: '456 Pine Avenue', 
      price: '$325,000', 
      type: 'Condo', 
      status: 'pending', 
      bedrooms: 2, 
      bathrooms: 1,
      views: 32
    },
    { 
      id: 3, 
      address: '789 Maple Drive', 
      price: '$750,000', 
      type: 'House', 
      status: 'sold', 
      bedrooms: 4, 
      bathrooms: 3,
      views: 78
    },
  ];

  const leads = [
    { id: 1, name: 'John Smith', budget: '$400k-500k', interest: 'House', contact: '+1234567890', status: 'hot' },
    { id: 2, name: 'Sarah Johnson', budget: '$300k-400k', interest: 'Condo', contact: '+1234567891', status: 'warm' },
    { id: 3, name: 'Mike Wilson', budget: '$600k+', interest: 'Luxury', contact: '+1234567892', status: 'cold' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'sold': return 'bg-blue-100 text-blue-700';
      case 'hot': return 'bg-red-100 text-red-700';
      case 'warm': return 'bg-yellow-100 text-yellow-700';
      case 'cold': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Real Estate CRM</h1>
            <p className="text-muted-foreground">Property management and real estate agencies</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                <p className="text-3xl font-bold">247</p>
              </div>
              <Home className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-3xl font-bold">189</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Sales</p>
                <p className="text-3xl font-bold">$2.4M</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Virtual Tours</p>
                <p className="text-3xl font-bold">89</p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="leads">Lead Generation</TabsTrigger>
          <TabsTrigger value="tours">Virtual Tours</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="support">Tech Support</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Home className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{property.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {property.type} • {property.bedrooms} bed, {property.bathrooms} bath
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {property.views} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">{property.price}</span>
                      <Badge className={getStatusColor(property.status)}>
                        {property.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">Budget: {lead.budget}</p>
                        <p className="text-sm text-muted-foreground">Interest: {lead.interest}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Tours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Virtual Tour Builder
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Create immersive virtual property tours</p>
                  <Button size="sm">Create Tour</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Tour Analytics</h4>
                  <p className="text-sm text-muted-foreground mb-3">Track virtual tour engagement</p>
                  <Button size="sm">View Analytics</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Lead Campaigns
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Create targeted marketing campaigns</p>
                  <Button size="sm">Create Campaign</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Market Analytics
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Track market trends and ROI</p>
                  <Button size="sm">View Reports</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tech Support Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Client Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">Technical support for clients</p>
                  <Button size="sm">Open Support</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Agent Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">Technical assistance for agents</p>
                  <Button size="sm">Agent Help</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
