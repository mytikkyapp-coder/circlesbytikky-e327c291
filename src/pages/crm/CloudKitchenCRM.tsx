
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChefHat, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  MapPin, 
  Clock,
  Star,
  Phone,
  MessageSquare,
  Package
} from "lucide-react";

export default function CloudKitchenCRM() {
  const [activeTab, setActiveTab] = useState('orders');

  const recentOrders = [
    { id: 'ORD001', customer: 'John Doe', items: 3, amount: '$24.99', status: 'preparing', time: '10 min ago' },
    { id: 'ORD002', customer: 'Sarah Wilson', items: 2, amount: '$18.50', status: 'ready', time: '15 min ago' },
    { id: 'ORD003', customer: 'Mike Chen', items: 1, amount: '$12.99', status: 'delivered', time: '25 min ago' },
  ];

  const customers = [
    { id: 1, name: 'John Doe', phone: '+1234567890', orders: 15, spent: '$189.50', rating: 4.8 },
    { id: 2, name: 'Sarah Wilson', phone: '+1234567891', orders: 8, spent: '$124.30', rating: 4.9 },
    { id: 3, name: 'Mike Chen', phone: '+1234567892', orders: 12, spent: '$156.80', rating: 4.7 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-100 text-yellow-700';
      case 'ready': return 'bg-green-100 text-green-700';
      case 'delivered': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Cloud Kitchen CRM</h1>
            <p className="text-muted-foreground">Food delivery and restaurant management</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Orders</p>
                <p className="text-3xl font-bold">47</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold">$1,247</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-3xl font-bold">234</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                <p className="text-3xl font-bold">4.8</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Package className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{order.id} - {order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.items} items • {order.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{order.amount}</span>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{customer.orders}</p>
                        <p className="text-muted-foreground">Orders</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{customer.spent}</p>
                        <p className="text-muted-foreground">Spent</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {customer.rating}
                        </p>
                      </div>
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

        <TabsContent value="menu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Menu Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Menu management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Delivery tracking features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
