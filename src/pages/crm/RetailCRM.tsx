
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp, 
  Phone,
  MessageSquare,
  Star,
  BarChart3,
  Target,
  Truck
} from "lucide-react";

export default function RetailCRM() {
  const [activeTab, setActiveTab] = useState('customers');

  const customers = [
    { id: 1, name: 'Emma Wilson', orders: 12, spent: '$1,247', lastOrder: '2024-01-20', tier: 'gold', phone: '+1234567890' },
    { id: 2, name: 'David Brown', orders: 8, spent: '$685', lastOrder: '2024-01-18', tier: 'silver', phone: '+1234567891' },
    { id: 3, name: 'Lisa Chen', orders: 25, spent: '$2,890', lastOrder: '2024-01-22', tier: 'platinum', phone: '+1234567892' },
  ];

  const products = [
    { id: 1, name: 'Wireless Headphones', stock: 45, price: '$199', sales: 123, rating: 4.8 },
    { id: 2, name: 'Smartphone Case', stock: 18, price: '$29', sales: 89, rating: 4.6 },
    { id: 3, name: 'Laptop Stand', stock: 5, price: '$79', sales: 67, rating: 4.9 },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-700';
      case 'gold': return 'bg-yellow-100 text-yellow-700';
      case 'silver': return 'bg-gray-100 text-gray-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock > 20) return { color: 'bg-green-100 text-green-700', label: 'In Stock' };
    if (stock > 5) return { color: 'bg-yellow-100 text-yellow-700', label: 'Low Stock' };
    return { color: 'bg-red-100 text-red-700', label: 'Critical' };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Retail & E-commerce CRM</h1>
            <p className="text-muted-foreground">Online and offline retail businesses</p>
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
                <p className="text-3xl font-bold">2,847</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-3xl font-bold">$89k</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Orders Today</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                <p className="text-3xl font-bold">4.7</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
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
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.orders} orders • Total spent: {customer.spent}
                        </p>
                        <p className="text-sm text-muted-foreground">Last order: {customer.lastOrder}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getTierColor(customer.tier)}>
                        {customer.tier}
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

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Package className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sales} sold • Rating: {product.rating}
                          <Star className="w-3 h-3 inline ml-1 text-yellow-500" />
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{product.price}</span>
                      <Badge className={getStockStatus(product.stock).color}>
                        {getStockStatus(product.stock).label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{product.stock} left</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Order Fulfillment
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Manage orders and shipping</p>
                  <Button size="sm">View Orders</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Inventory Management</h4>
                  <p className="text-sm text-muted-foreground mb-3">Track stock levels and reorders</p>
                  <Button size="sm">Manage Inventory</Button>
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
                    Campaign Management
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Create and manage marketing campaigns</p>
                  <Button size="sm">Create Campaign</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Analytics & ROI
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Track campaign performance and ROI</p>
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
                  <p className="text-sm text-muted-foreground mb-3">24/7 support for customers</p>
                  <Button size="sm">Open Support</Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">E-commerce Help</h4>
                  <p className="text-sm text-muted-foreground mb-3">Technical help for online store</p>
                  <Button size="sm">Store Support</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
