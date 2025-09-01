import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Users, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  Filter,
  Upload,
  Download,
  Eye,
  Play,
  Pause,
  RefreshCw,
  Plus
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface Contact {
  id: string;
  name: string;
  phone: string;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
  lastSeen?: string;
  tags: string[];
}

interface BroadcastTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
}

export default function WhatsAppBroadcast() {
  const { projectId } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customMessage, setCustomMessage] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [broadcastName, setBroadcastName] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [filter, setFilter] = useState("all");

  // Mock data
  const templates: BroadcastTemplate[] = [
    {
      id: "1",
      name: "Welcome Message",
      content: "Welcome to {{company_name}}, {{first_name}}! 🎉",
      variables: ["company_name", "first_name"]
    },
    {
      id: "2", 
      name: "Sale Announcement",
      content: "🔥 FLASH SALE! Get {{discount}}% off {{product}}",
      variables: ["discount", "product"]
    },
    {
      id: "3",
      name: "Event Reminder", 
      content: "📅 Don't forget! {{event_name}} is tomorrow at {{time}}",
      variables: ["event_name", "time"]
    }
  ];

  const contacts: Contact[] = [
    {
      id: "1",
      name: "John Doe",
      phone: "+1234567890",
      status: "delivered",
      lastSeen: "2 hours ago",
      tags: ["customer", "premium"]
    },
    {
      id: "2", 
      name: "Jane Smith",
      phone: "+1234567891",
      status: "read",
      lastSeen: "1 hour ago",
      tags: ["lead", "interested"]
    },
    {
      id: "3",
      name: "Bob Wilson",
      phone: "+1234567892", 
      status: "pending",
      tags: ["customer"]
    },
    {
      id: "4",
      name: "Alice Brown",
      phone: "+1234567893",
      status: "failed",
      lastSeen: "1 day ago",
      tags: ["lead"]
    }
  ];

  const broadcastStats = {
    total: 1250,
    sent: 1100,
    delivered: 980,
    read: 756,
    failed: 50,
    pending: 150
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "read": return "bg-purple-100 text-purple-800";
      case "failed": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Send className="w-3 h-3" />;
      case "delivered": return <CheckCircle className="w-3 h-3" />;
      case "read": return <Eye className="w-3 h-3" />;
      case "failed": return <XCircle className="w-3 h-3" />;
      case "pending": return <Clock className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === "all") return true;
    return contact.status === filter;
  });

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id));
    }
  };

  const handleSendBroadcast = () => {
    // Send broadcast logic here
    console.log("Sending broadcast to:", selectedContacts.length, "contacts");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">WhatsApp Broadcast</h1>
          <p className="text-muted-foreground mt-1">Send bulk messages to your contacts efficiently</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Results
          </Button>
          <Link to={projectId ? `/project/${projectId}/templates/create` : "/templates/create"}>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Template
            </Button>
          </Link>
        </div>
      </div>

      {/* Broadcast Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{broadcastStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Contacts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{broadcastStats.sent}</div>
            <div className="text-sm text-muted-foreground">Sent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{broadcastStats.delivered}</div>
            <div className="text-sm text-muted-foreground">Delivered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{broadcastStats.read}</div>
            <div className="text-sm text-muted-foreground">Read</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{broadcastStats.failed}</div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{broadcastStats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message Composition */}
          <Card>
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
              <CardDescription>Create your broadcast message</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="template" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="template">Use Template</TabsTrigger>
                  <TabsTrigger value="custom">Custom Message</TabsTrigger>
                </TabsList>

                <TabsContent value="template" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a message template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTemplate && (
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Template Preview</h4>
                        <p className="text-sm">
                          {templates.find(t => t.id === selectedTemplate)?.content}
                        </p>
                      </div>

                      {/* Variable inputs */}
                      {templates.find(t => t.id === selectedTemplate)?.variables.map((variable) => (
                        <div key={variable} className="space-y-2">
                          <Label>Value for {`{{${variable}}}`}</Label>
                          <Input placeholder={`Enter ${variable}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-message">Custom Message</Label>
                    <Textarea
                      id="custom-message"
                      placeholder="Type your message here..."
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      rows={6}
                    />
                    <div className="text-sm text-muted-foreground">
                      {customMessage.length}/1024 characters
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Contact Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Select Recipients</CardTitle>
                  <CardDescription>Choose contacts to send the broadcast</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Import
                  </Button>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    {selectedContacts.length === filteredContacts.length ? "Deselect All" : "Select All"}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {selectedContacts.length} of {filteredContacts.length} selected
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedContacts.includes(contact.id) 
                          ? 'bg-primary/5 border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleContactSelect(contact.id)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => handleContactSelect(contact.id)}
                          className="rounded"
                        />
                        <div>
                          <div className="font-medium text-sm">{contact.name}</div>
                          <div className="text-xs text-muted-foreground">{contact.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {contact.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Badge className={`text-xs ${getStatusColor(contact.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(contact.status)}
                            {contact.status}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Broadcast Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Broadcast Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="broadcast-name">Broadcast Name</Label>
                <Input
                  id="broadcast-name"
                  placeholder="Enter broadcast name"
                  value={broadcastName}
                  onChange={(e) => setBroadcastName(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="schedule"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>

              {isScheduled && (
                <div className="space-y-2">
                  <Label htmlFor="schedule-date">Schedule Date & Time</Label>
                  <Input
                    id="schedule-date"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Selected Recipients:</span>
                  <span className="font-medium">{selectedContacts.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Cost:</span>
                  <span className="font-medium">${(selectedContacts.length * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <Button 
                onClick={handleSendBroadcast} 
                className="w-full" 
                size="lg"
                disabled={selectedContacts.length === 0 || (!selectedTemplate && !customMessage)}
              >
                {isScheduled ? (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Broadcast
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Broadcasts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Broadcasts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Welcome Campaign", sent: 150, date: "2 hours ago", status: "completed" },
                  { name: "Flash Sale Alert", sent: 89, date: "1 day ago", status: "completed" },
                  { name: "Event Reminder", sent: 45, date: "2 days ago", status: "scheduled" }
                ].map((broadcast, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{broadcast.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {broadcast.sent} recipients • {broadcast.date}
                      </div>
                    </div>
                    <Badge variant={broadcast.status === "completed" ? "default" : "secondary"}>
                      {broadcast.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Delivered</span>
                  <span>{Math.round((broadcastStats.delivered / broadcastStats.total) * 100)}%</span>
                </div>
                <Progress value={(broadcastStats.delivered / broadcastStats.total) * 100} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Read Rate</span>
                  <span>{Math.round((broadcastStats.read / broadcastStats.delivered) * 100)}%</span>
                </div>
                <Progress value={(broadcastStats.read / broadcastStats.delivered) * 100} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Success Rate</span>
                  <span>{Math.round(((broadcastStats.total - broadcastStats.failed) / broadcastStats.total) * 100)}%</span>
                </div>
                <Progress value={((broadcastStats.total - broadcastStats.failed) / broadcastStats.total) * 100} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}