import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Filter,
  Calendar,
  User,
  Tag,
  MoreHorizontal,
  Eye,
  Send
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdAt: string;
  updatedAt: string;
  assignee?: string;
  tags: string[];
  replies: number;
}

export default function SupportTickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium"
  });
  const { toast } = useToast();

  const tickets: Ticket[] = [
    {
      id: "T-001",
      title: "WhatsApp API not receiving messages",
      description: "Messages are not being delivered to our webhook endpoint",
      status: "open",
      priority: "high",
      category: "API Issues",
      createdAt: "2024-01-20T10:30:00Z",
      updatedAt: "2024-01-20T14:15:00Z",
      assignee: "Support Agent 1",
      tags: ["WhatsApp", "API", "Webhook"],
      replies: 3
    },
    {
      id: "T-002",
      title: "Campaign analytics not updating",
      description: "The campaign statistics dashboard shows outdated data",
      status: "in_progress",
      priority: "medium",
      category: "Analytics",
      createdAt: "2024-01-19T15:45:00Z",
      updatedAt: "2024-01-20T09:20:00Z",
      assignee: "Support Agent 2",
      tags: ["Analytics", "Dashboard"],
      replies: 1
    },
    {
      id: "T-003",
      title: "Unable to upload template images",
      description: "Getting error when trying to upload images for message templates",
      status: "resolved",
      priority: "low",
      category: "Templates",
      createdAt: "2024-01-18T11:20:00Z",
      updatedAt: "2024-01-19T16:30:00Z",
      assignee: "Support Agent 1",
      tags: ["Templates", "Upload", "Images"],
      replies: 5
    },
    {
      id: "T-004",
      title: "Billing discrepancy in last invoice",
      description: "The amount charged doesn't match our usage for the previous month",
      status: "open",
      priority: "urgent",
      category: "Billing",
      createdAt: "2024-01-17T09:10:00Z",
      updatedAt: "2024-01-20T08:45:00Z",
      tags: ["Billing", "Invoice"],
      replies: 2
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.description || !newTicket.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket Created",
      description: "Your support ticket has been created successfully",
    });

    setNewTicket({
      title: "",
      description: "",
      category: "",
      priority: "medium"
    });
    setIsCreateDialogOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "in_progress": return <Clock className="w-4 h-4 text-blue-500" />;
      case "resolved": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "closed": return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
      default: return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
            <p className="text-muted-foreground">Manage your support requests and issues</p>
          </div>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll help you resolve it as quickly as possible.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newTicket.category} onValueChange={(value) => setNewTicket({...newTicket, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="API Issues">API Issues</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Templates">Templates</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Account">Account</SelectItem>
                      <SelectItem value="Technical">Technical Support</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({...newTicket, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  placeholder="Provide detailed information about your issue..."
                  rows={6}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTicket}>
                  <Send className="w-4 h-4 mr-2" />
                  Create Ticket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {ticket.id}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {getStatusIcon(ticket.status)}
                      <span className="ml-1 capitalize">{ticket.status.replace('_', ' ')}</span>
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{ticket.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>{ticket.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Created {formatDate(ticket.createdAt)}</span>
                    </div>
                    {ticket.assignee && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{ticket.assignee}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{ticket.replies} replies</span>
                    </div>
                  </div>

                  {ticket.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ticket.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Add Reply
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTickets.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No tickets found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedStatus !== "all" || selectedPriority !== "all" 
                  ? "Try adjusting your filters to see more tickets"
                  : "You haven't created any support tickets yet"
                }
              </p>
              {searchQuery || selectedStatus !== "all" || selectedPriority !== "all" ? (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStatus("all");
                    setSelectedPriority("all");
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Ticket
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}