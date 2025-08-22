import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Users, MoreHorizontal, Edit, Trash2, TrendingUp, Activity, Eye, Settings, Zap, Clock, ArrowRight, Tag, MessageSquare, Send } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Circle {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tags: string[];
  status: "active" | "paused";
  createdAt: string;
  growthRate: number;
  engagementRate: number;
  lastActivity: string;
  isOnline?: boolean;
  memberLimit?: number;
  contactTags: string[];
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  addedAt: string;
  status: "active" | "inactive";
}

export default function Circles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [isBroadcastDialogOpen, setIsBroadcastDialogOpen] = useState(false);
  const [selectedCircleId, setSelectedCircleId] = useState("");
  const [newCircle, setNewCircle] = useState({
    name: "",
    description: "",
    contactTags: [] as string[]
  });
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    tags: [] as string[]
  });
  const [broadcastMessage, setBroadcastMessage] = useState({
    message: "",
    circleId: ""
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const availableTags = ["Premium", "VIP", "New", "Active", "Inactive", "Subscriber", "Customer", "Lead", "High-Value", "Regular"];

  const contacts: Contact[] = [
    {
      id: "1",
      name: "John Doe",
      phone: "+1234567890",
      email: "john@example.com",
      tags: ["Premium", "VIP"],
      addedAt: "2024-01-15",
      status: "active"
    },
    {
      id: "2", 
      name: "Jane Smith",
      phone: "+1234567891",
      email: "jane@example.com",
      tags: ["Customer", "Active"],
      addedAt: "2024-01-16",
      status: "active"
    }
  ];

  const circles: Circle[] = [
    {
      id: "1",
      name: "VIP Customers",
      description: "High-value customers with premium access",
      memberCount: 342,
      tags: ["Paid", "Premium"],
      status: "active",
      contactTags: ["Premium", "VIP"],
      createdAt: "2024-01-15",
      growthRate: 12.5,
      engagementRate: 89,
      lastActivity: "2 mins ago",
      isOnline: true,
      memberLimit: 500
    },
    {
      id: "2", 
      name: "Newsletter Subscribers",
      description: "Weekly newsletter and updates circle",
      memberCount: 1247,
      tags: ["Free", "Newsletter"],
      status: "active",
      contactTags: ["Subscriber", "Active"],
      createdAt: "2024-01-10",
      growthRate: 8.3,
      engagementRate: 67,
      lastActivity: "5 mins ago",
      isOnline: true,
      memberLimit: 2000
    },
    {
      id: "3",
      name: "Beta Testers",
      description: "Early access to new features and testing",
      memberCount: 89,
      tags: ["Beta", "Testing"],
      status: "active",
      contactTags: ["Beta", "New"],
      createdAt: "2024-01-08",
      growthRate: 25.7,
      engagementRate: 94,
      lastActivity: "1 min ago",
      isOnline: true,
      memberLimit: 100
    },
    {
      id: "4",
      name: "Inactive Users",
      description: "Users who haven't engaged in 30+ days",
      memberCount: 523,
      tags: ["Inactive", "Re-engagement"],
      status: "paused",
      contactTags: ["Inactive"],
      createdAt: "2024-01-05",
      growthRate: -2.1,
      engagementRate: 12,
      lastActivity: "3 hours ago",
      isOnline: false,
      memberLimit: 1000
    }
  ];

  const filteredCircles = circles.filter(circle => {
    const matchesSearch = circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
      (selectedFilter === "active" && circle.status === "active") ||
      (selectedFilter === "paused" && circle.status === "paused") ||
      (selectedFilter === "high-engagement" && circle.engagementRate > 80);
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      "Paid": "bg-primary/10 text-primary",
      "Premium": "bg-purple-100 text-purple-800",
      "Free": "bg-blue-100 text-blue-800",
      "Newsletter": "bg-indigo-100 text-indigo-800",
      "Beta": "bg-orange-100 text-orange-800",
      "Testing": "bg-yellow-100 text-yellow-800",
      "Inactive": "bg-red-100 text-red-800",
      "Re-engagement": "bg-pink-100 text-pink-800"
    };
    return colors[tag] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Stats */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Circles</h1>
            <p className="text-lg text-muted-foreground mt-2">Manage your member circles and segments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <div className="flex gap-2">
              <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4" />
                Create Circle
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => setIsBroadcastDialogOpen(true)}>
                <MessageSquare className="w-4 h-4" />
                Broadcast
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Circles</p>
                  <p className="text-3xl font-bold text-foreground">{circles.length}</p>
                  <p className="text-xs text-green-500 font-medium mt-1">+2 this week</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                  <p className="text-3xl font-bold text-foreground">{circles.reduce((acc, circle) => acc + circle.memberCount, 0).toLocaleString()}</p>
                  <p className="text-xs text-green-500 font-medium mt-1">+45 today</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Engagement</p>
                  <p className="text-3xl font-bold text-foreground">{Math.round(circles.reduce((acc, circle) => acc + circle.engagementRate, 0) / circles.length)}%</p>
                  <p className="text-xs text-blue-500 font-medium mt-1">+5% this month</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Activity className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                  <p className="text-3xl font-bold text-foreground">{circles.filter(c => c.isOnline).length}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs text-green-500 font-medium">Live updates</p>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Zap className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <Card className="border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search circles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {["all", "active", "paused", "high-engagement"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter === "high-engagement" ? "High Engagement" : filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Circles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCircles.map((circle, index) => (
          <Card 
            key={circle.id} 
            className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-border ${
              circle.isOnline ? 'ring-2 ring-primary/20' : ''
            }`}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Online Indicator */}
            {circle.isOnline && (
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-500 font-medium">Live</span>
              </div>
            )}

            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <CardHeader className="relative pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{circle.name}</CardTitle>
                  <CardDescription className="leading-relaxed">{circle.description}</CardDescription>
                  
                  {/* Real-time Activity */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Last activity: {circle.lastActivity}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Circle
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="w-4 h-4 mr-2" />
                      Manage Members
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Circle
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="relative pt-0 space-y-4">
              {/* Enhanced Member Count with Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {circle.memberCount.toLocaleString()} members
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {circle.memberLimit ? `/ ${circle.memberLimit.toLocaleString()}` : ''}
                  </span>
                </div>
                {circle.memberLimit && (
                  <Progress 
                    value={(circle.memberCount / circle.memberLimit) * 100} 
                    className="h-2"
                  />
                )}
              </div>

              {/* Dynamic Stats */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className={`w-3 h-3 ${circle.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm font-bold ${circle.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {circle.growthRate > 0 ? '+' : ''}{circle.growthRate}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Activity className="w-3 h-3 text-primary" />
                    <span className="text-sm font-bold text-foreground">{circle.engagementRate}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
              </div>

              {/* Enhanced Tags */}
              <div className="flex flex-wrap gap-2">
                {circle.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className={`${getTagColor(tag)} text-xs font-medium hover:scale-105 transition-transform duration-200`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Enhanced Status and Action */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(circle.status)} font-medium`}
                  >
                    {circle.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(circle.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10"
                >
                  Manage
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {filteredCircles.length === 0 && (
        <Card className="text-center py-16 border-dashed border-2 border-border">
          <CardContent>
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {searchQuery || selectedFilter !== "all" ? "No circles match your criteria" : "No circles found"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery || selectedFilter !== "all" 
                ? "Try adjusting your search terms or filters to find what you're looking for" 
                : "Get started by creating your first circle to organize and manage your members"
              }
            </p>
            <div className="flex gap-3 justify-center">
              {(searchQuery || selectedFilter !== "all") && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Circle
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Circle Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Circle</DialogTitle>
            <DialogDescription>
              Create a circle with specific contact tags for targeted messaging
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="circleName">Circle Name *</Label>
              <Input
                id="circleName"
                value={newCircle.name}
                onChange={(e) => setNewCircle({...newCircle, name: e.target.value})}
                placeholder="Enter circle name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="circleDescription">Description</Label>
              <Textarea
                id="circleDescription"
                value={newCircle.description}
                onChange={(e) => setNewCircle({...newCircle, description: e.target.value})}
                placeholder="Describe this circle"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Contact Tags *</Label>
              <p className="text-sm text-muted-foreground">
                Select tags to automatically include contacts in this circle
              </p>
              <div className="grid grid-cols-3 gap-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={newCircle.contactTags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewCircle({
                            ...newCircle,
                            contactTags: [...newCircle.contactTags, tag]
                          });
                        } else {
                          setNewCircle({
                            ...newCircle,
                            contactTags: newCircle.contactTags.filter(t => t !== tag)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={tag} className="text-sm">{tag}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                console.log("Creating circle:", newCircle);
                setIsCreateDialogOpen(false);
                setNewCircle({ name: "", description: "", contactTags: [] });
              }}>
                Create Circle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Broadcast Message Dialog */}
      <Dialog open={isBroadcastDialogOpen} onOpenChange={setIsBroadcastDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Broadcast Message</DialogTitle>
            <DialogDescription>
              Send a message to all members in the selected circle
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="broadcastCircle">Select Circle</Label>
              <Select value={broadcastMessage.circleId} onValueChange={(value) => 
                setBroadcastMessage({...broadcastMessage, circleId: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a circle" />
                </SelectTrigger>
                <SelectContent>
                  {circles.map((circle) => (
                    <SelectItem key={circle.id} value={circle.id}>
                      {circle.name} ({circle.memberCount} members)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="broadcastMessage">Message</Label>
              <Textarea
                id="broadcastMessage"
                value={broadcastMessage.message}
                onChange={(e) => setBroadcastMessage({...broadcastMessage, message: e.target.value})}
                placeholder="Type your message here..."
                rows={6}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsBroadcastDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                console.log("Broadcasting message:", broadcastMessage);
                setIsBroadcastDialogOpen(false);
                setBroadcastMessage({ message: "", circleId: "" });
              }}>
                <Send className="w-4 h-4 mr-2" />
                Send Broadcast
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}