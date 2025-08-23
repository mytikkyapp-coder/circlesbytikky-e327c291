import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Edit, 
  Users, 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Eye, 
  MessageSquare, 
  Bell, 
  BellOff, 
  UserMinus, 
  Phone, 
  Send,
  Settings,
  TrendingUp,
  Activity,
  Calendar,
  Download,
  Upload
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  addedAt: string;
  status: "active" | "inactive";
  circleId?: string;
  notifications: boolean;
  lastSeen?: string;
  avatar?: string;
}

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

export default function ManageCircle() {
  const { circleId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [isEditCircleDialogOpen, setIsEditCircleDialogOpen] = useState(false);
  const [isBroadcastDialogOpen, setIsBroadcastDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    tags: [] as string[]
  });

  const [broadcastMessage, setBroadcastMessage] = useState({
    message: "",
    recipients: "all" as "all" | "selected"
  });

  // Mock data
  const availableTags = ["Premium", "VIP", "New", "Active", "Inactive", "Subscriber", "Customer", "Lead", "High-Value", "Regular"];

  const circle: Circle = {
    id: circleId || "1",
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
  };

  const [circleData, setCircleData] = useState(circle);
  const [members, setMembers] = useState<Contact[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+1234567890",
      email: "john@example.com",
      tags: ["Premium", "VIP"],
      addedAt: "2024-01-15",
      status: "active",
      circleId: "1",
      notifications: true,
      lastSeen: "2 mins ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "+1234567891",
      email: "jane@example.com",
      tags: ["Customer", "Active"],
      addedAt: "2024-01-16",
      status: "active",
      circleId: "1",
      notifications: true,
      lastSeen: "5 mins ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    },
    {
      id: "3",
      name: "Mike Johnson",
      phone: "+1234567892",
      email: "mike@example.com",
      tags: ["Beta", "New"],
      addedAt: "2024-01-17",
      status: "active",
      circleId: "1",
      notifications: false,
      lastSeen: "1 hour ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    {
      id: "4",
      name: "Sarah Wilson",
      phone: "+1234567893",
      email: "sarah@example.com",
      tags: ["Subscriber", "Active"],
      addedAt: "2024-01-18",
      status: "inactive",
      circleId: "1",
      notifications: true,
      lastSeen: "3 days ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    }
  ]);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.includes(searchQuery) ||
    member.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleToggleNotifications = (memberId: string) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, notifications: !member.notifications }
          : member
      )
    );
  };

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/circles")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Circles
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{circleData.name}</h1>
                <p className="text-muted-foreground">{circleData.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {circleData.isOnline && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-500 font-medium">Live</span>
                  </div>
                )}
                <Badge 
                  variant="secondary" 
                  className={circleData.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {circleData.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditCircleDialogOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Circle
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsBroadcastDialogOpen(true)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Broadcast
              </Button>
              <Button size="sm" onClick={() => setIsAddContactDialogOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">{members.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                  <p className="text-2xl font-bold">{members.filter(m => m.status === "active").length}</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engagement Rate</p>
                  <p className="text-2xl font-bold">{circleData.engagementRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold">+{circleData.growthRate}%</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Circle Members</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedMembers.length > 0 && (
                  <Alert className="mb-4">
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <span>{selectedMembers.length} members selected</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message Selected
                          </Button>
                          <Button variant="outline" size="sm">
                            <BellOff className="w-4 h-4 mr-2" />
                            Stop Notifications
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <UserMinus className="w-4 h-4 mr-2" />
                            Remove Selected
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedMembers.length === filteredMembers.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notifications</TableHead>
                        <TableHead>Last Seen</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedMembers.includes(member.id)}
                              onCheckedChange={() => handleSelectMember(member.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <div className="flex gap-1 mt-1">
                                  {member.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-muted-foreground" />
                                <span className="text-sm">{member.phone}</span>
                              </div>
                              {member.email && (
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary" 
                              className={member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {member.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleNotifications(member.id)}
                              className={member.notifications ? "text-green-600" : "text-muted-foreground"}
                            >
                              {member.notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{member.lastSeen}</span>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleNotifications(member.id)}>
                                  {member.notifications ? (
                                    <>
                                      <BellOff className="w-4 h-4 mr-2" />
                                      Stop Notifications
                                    </>
                                  ) : (
                                    <>
                                      <Bell className="w-4 h-4 mr-2" />
                                      Enable Notifications
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive" 
                                  onClick={() => handleRemoveMember(member.id)}
                                >
                                  <UserMinus className="w-4 h-4 mr-2" />
                                  Remove Member
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No members found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? "Try adjusting your search terms" : "This circle doesn't have any members yet"}
                    </p>
                    <Button onClick={() => setIsAddContactDialogOpen(true)}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add First Member
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Circle Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Circle Name</Label>
                    <Input value={circleData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={circleData.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={circleData.description} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Tags</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`setting-${tag}`}
                          checked={circleData.contactTags.includes(tag)}
                        />
                        <Label htmlFor={`setting-${tag}`} className="text-sm">{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Member Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Growth analytics will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Engagement metrics will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      {/* Add Contact Dialog */}
      <Dialog open={isAddContactDialogOpen} onOpenChange={setIsAddContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Add a new member to this circle
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Name *</Label>
              <Input
                id="contactName"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                placeholder="Enter member name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone *</Label>
              <Input
                id="contactPhone"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                placeholder="+1234567890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                placeholder="contact@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="grid grid-cols-3 gap-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`contact-${tag}`}
                      checked={newContact.tags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewContact({
                            ...newContact,
                            tags: [...newContact.tags, tag]
                          });
                        } else {
                          setNewContact({
                            ...newContact,
                            tags: newContact.tags.filter(t => t !== tag)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`contact-${tag}`} className="text-sm">{tag}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                console.log("Adding member:", newContact);
                setIsAddContactDialogOpen(false);
                setNewContact({ name: "", phone: "", email: "", tags: [] });
              }}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Broadcast Dialog */}
      <Dialog open={isBroadcastDialogOpen} onOpenChange={setIsBroadcastDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Broadcast Message</DialogTitle>
            <DialogDescription>
              Send a message to circle members
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Recipients</Label>
              <Select value={broadcastMessage.recipients} onValueChange={(value: "all" | "selected") => 
                setBroadcastMessage({...broadcastMessage, recipients: value})
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members ({members.length})</SelectItem>
                  <SelectItem value="selected">Selected Members ({selectedMembers.length})</SelectItem>
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
                setBroadcastMessage({ message: "", recipients: "all" });
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