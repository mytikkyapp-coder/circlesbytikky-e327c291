import { useState } from "react";
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  CreditCard, 
  Phone, 
  CheckCircle, 
  Calendar,
  MapPin,
  Building,
  Wallet,
  Users,
  PhoneCall,
  MessageSquare,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MemberProfile = () => {
  const [callNotes, setCallNotes] = useState("");
  const [callOutcome, setCallOutcome] = useState("");

  const memberData = {
    id: 1,
    name: "Chandan Kumar",
    businessName: "TechVenture Solutions",
    avatar: "",
    phone: "+91 98765 43210",
    email: "chandan@techventure.com",
    industry: "SaaS & Technology",
    location: "Mumbai, Maharashtra",
    memberSince: "2024-01-15",
    assignedCircles: 5,
    plan: "Pro",
    walletBalance: 5200,
    whatsappVerified: true,
    tags: ["Premium", "Active", "High Engagement"],
    totalSpent: 25000,
    campaignsLaunched: 12,
    leadsGenerated: 156
  };

  const callLogs = [
    { id: 1, date: "2024-01-20", duration: "15 min", outcome: "Interested", notes: "Discussed Pro upgrade features" },
    { id: 2, date: "2024-01-18", duration: "8 min", outcome: "Follow Up", notes: "Wants demo next week" },
    { id: 3, date: "2024-01-15", duration: "22 min", outcome: "Closed", notes: "Signed up for annual plan" }
  ];

  const handleWhatsAppCall = () => {
    // WhatsApp Business API integration
    console.log("Initiating WhatsApp call to:", memberData.phone);
  };

  const saveCallOutcome = () => {
    console.log("Saving call outcome:", { outcome: callOutcome, notes: callNotes });
    setCallNotes("");
    setCallOutcome("");
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Members
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={memberData.avatar} />
                <AvatarFallback className="text-2xl">{memberData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{memberData.businessName}</CardTitle>
              <p className="text-muted-foreground">{memberData.name}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {memberData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
                <Badge variant="default">{memberData.plan} Plan</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{memberData.industry}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{memberData.location}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{memberData.phone}</span>
                  {memberData.whatsappVerified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Member since {new Date(memberData.memberSince).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Assigned Circles: {memberData.assignedCircles}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Wallet className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">₹{memberData.walletBalance.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Calling */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleWhatsAppCall} className="w-full">
                <PhoneCall className="w-4 h-4 mr-2" />
                Start WA Call
              </Button>
              
              <div className="space-y-2">
                <Label htmlFor="call-notes">Call Notes</Label>
                <Textarea
                  id="call-notes"
                  placeholder="Record call notes..."
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="call-outcome">Tag Outcome</Label>
                <Select value={callOutcome} onValueChange={setCallOutcome}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={saveCallOutcome} variant="outline" className="w-full" disabled={!callNotes || !callOutcome}>
                <Tag className="w-4 h-4 mr-2" />
                Save Outcome
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="call-logs">Call Logs</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{memberData.totalSpent.toLocaleString()}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{memberData.campaignsLaunched}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Leads Generated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{memberData.leadsGenerated}</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="call-logs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Call History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {callLogs.map((log) => (
                      <div key={log.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{new Date(log.date).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">Duration: {log.duration}</p>
                          </div>
                          <Badge variant={log.outcome === "Closed" ? "default" : log.outcome === "Interested" ? "secondary" : "outline"}>
                            {log.outcome}
                          </Badge>
                        </div>
                        <p className="text-sm">{log.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Campaign data will be displayed here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Activity timeline will be displayed here...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;