
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  Users, 
  Calendar, 
  Wrench, 
  Phone,
  MessageSquare,
  TrendingUp,
  Package,
  UserCheck,
  BarChart3,
  Truck
} from "lucide-react";

export default function AutomotiveCRM() {
  const [activeTab, setActiveTab] = useState('customers');

  const customers = [
    { id: 1, name: 'John Smith', vehicle: '2023 Honda Civic', service: 'Oil Change', nextService: '2024-04-15', phone: '+1234567890' },
    { id: 2, name: 'Sarah Davis', vehicle: '2022 Toyota Camry', service: 'Brake Inspection', nextService: '2024-03-20', phone: '+1234567891' },
    { id: 3, name: 'Mike Johnson', vehicle: '2021 Ford F-150', service: 'Tire Rotation', nextService: '2024-05-10', phone: '+1234567892' },
  ];

  const inventory = [
    { id: 1, model: '2024 Honda Accord', stock: 15, price: '$28,500', status: 'available' },
    { id: 2, model: '2024 Toyota Prius', stock: 8, price: '$32,200', status: 'low-stock' },
    { id: 3, model: '2024 Ford Mustang', stock: 3, price: '$45,800', status: 'critical' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'low-stock': return 'bg-yellow-100 text-yellow-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Automotive CRM</h1>
            <p className="text-muted-foreground">Auto dealerships and service centers</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-3xl font-bold">1,547</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Service Bookings</p>
                <p className="text-3xl font-bold">89</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vehicle Sales</p>
                <p className="text-3xl font-bold">34</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inventory</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="service">Service Center</TabsTrigger>
          <TabsTrigger value="dealers">Dealer Network</TabsTrigger>
          <TabsTrigger value="support">Tech Support</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.vehicle}</p>
                        <p className="text-sm text-muted-foreground">Last service: {customer.service}</p>
                        <p className="text-sm text-muted-foreground">Next service: {customer.nextService}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Car className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{vehicle.model}</p>
                        <p className="text-sm text-muted-foreground">Stock: {vehicle.stock} units</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{vehicle.price}</span>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Service Appointments
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Manage service bookings and schedules</p>
                  <Button size="sm">View Schedule</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Maintenance Tracking</h4>
                  <p className="text-sm text-muted-foreground mb-3">Track vehicle maintenance history</p>
                  <Button size="sm">View Records</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dealers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dealer Network Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Dealer Portal
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Manage dealer relationships and inventory</p>
                  <Button size="sm">Open Portal</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Performance Analytics</h4>
                  <p className="text-sm text-muted-foreground mb-3">Track dealer performance and sales</p>
                  <Button size="sm">View Analytics</Button>
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
                  <h4 className="font-medium mb-2">Customer Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">Technical support for customers</p>
                  <Button size="sm">Open Support</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Dealer Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">Support for dealer network</p>
                  <Button size="sm">Dealer Help</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
