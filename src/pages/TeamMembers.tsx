import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Shield, 
  UserPlus,
  Edit,
  Trash2,
  Send
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function TeamMembers() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "",
    name: ""
  });

  // Mock team members data
  const teamMembers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      role: "Support Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      status: "Online",
      joinedAt: "2024-01-15",
      permissions: ["Admin", "Manage Team", "View Analytics"],
      lastActive: "2 mins ago"
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@techcorp.com",
      role: "Senior Support Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      status: "Away",
      joinedAt: "2024-01-20",
      permissions: ["View Tickets", "Respond to Customers"],
      lastActive: "1 hour ago"
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily@techcorp.com",
      role: "Support Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      status: "Online",
      joinedAt: "2024-02-01",
      permissions: ["View Tickets", "Respond to Customers"],
      lastActive: "5 mins ago"
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@techcorp.com",
      role: "Junior Support Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      status: "Offline",
      joinedAt: "2024-02-10",
      permissions: ["View Tickets"],
      lastActive: "2 days ago"
    }
  ];

  const roles = [
    { value: "admin", label: "Admin", permissions: ["Full Access"] },
    { value: "manager", label: "Manager", permissions: ["Manage Team", "View Analytics", "Manage Tickets"] },
    { value: "agent", label: "Support Agent", permissions: ["View Tickets", "Respond to Customers"] },
    { value: "viewer", label: "Viewer", permissions: ["View Only"] }
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteMember = () => {
    console.log("Inviting member:", inviteData);
    setIsInviteDialogOpen(false);
    setInviteData({ email: "", role: "", name: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online": return "bg-green-100 text-green-800";
      case "Away": return "bg-yellow-100 text-yellow-800";
      case "Offline": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    if (role.includes("Manager") || role.includes("Admin")) return "bg-primary/10 text-primary";
    if (role.includes("Senior")) return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
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
                onClick={() => navigate(`/workspace/${workspaceId}/dashboard`)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
                <p className="text-muted-foreground">Manage your workspace team</p>
              </div>
            </div>
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Stats and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{teamMembers.length}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">
                  {teamMembers.filter(m => m.status === "Online").length}
                </div>
                <div className="text-sm text-muted-foreground">Online Now</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {roles.length}
                </div>
                <div className="text-sm text-muted-foreground">Roles</div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
        </div>

        {/* Team Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {member.permissions.slice(0, 2).map((permission, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {member.permissions.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{member.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{member.lastActive}</span>
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
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="w-4 h-4 mr-2" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Roles & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roles.map((role) => (
                <div key={role.value} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{role.label}</h4>
                  <div className="space-y-1">
                    {role.permissions.map((permission, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {permission}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Member Dialog */}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="memberName">Full Name</Label>
            <Input
              id="memberName"
              value={inviteData.name}
              onChange={(e) => setInviteData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter member's full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="memberEmail">Email Address</Label>
            <Input
              id="memberEmail"
              type="email"
              value={inviteData.email}
              onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="member@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberRole">Role</Label>
            <Select value={inviteData.role} onValueChange={(value) => setInviteData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex flex-col">
                      <span>{role.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {role.permissions.join(", ")}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteMember} disabled={!inviteData.email || !inviteData.role}>
              <Send className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </div>
        </div>
      </DialogContent>
    </div>
  );
}