import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Users, MessageSquare, Send, Eye, Wand2 } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface TemplateOption {
  id: string;
  name: string;
  category: string;
  content: string;
  type: "text" | "image" | "video" | "audio" | "carousel" | "form";
}

export default function CreateCampaign() {
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCircle, setSelectedCircle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("");

  const circles = [
    { id: "1", name: "VIP Customers", count: 1250 },
    { id: "2", name: "Newsletter Subscribers", count: 3450 },
    { id: "3", name: "Beta Testers", count: 890 },
    { id: "4", name: "Inactive Users", count: 2100 }
  ];

  const templates: TemplateOption[] = [
    {
      id: "1",
      name: "Welcome Message",
      category: "Onboarding",
      content: "Welcome to {{circle_name}}, {{first_name}}! 🎉",
      type: "text"
    },
    {
      id: "2", 
      name: "Sale Announcement",
      category: "Marketing",
      content: "🔥 FLASH SALE ALERT! Get {{discount}}% off",
      type: "image"
    },
    {
      id: "3",
      name: "Product Showcase",
      category: "Marketing", 
      content: "Check out our latest products",
      type: "carousel"
    },
    {
      id: "4",
      name: "Video Demo",
      category: "Product",
      content: "Watch our product in action",
      type: "video"
    }
  ];

  const handleTemplateSelect = (template: TemplateOption) => {
    setSelectedTemplate(template);
    setMessageContent(template.content);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return "🖼️";
      case "video": return "🎥";
      case "audio": return "🎵";
      case "carousel": return "📱";
      case "form": return "📋";
      default: return "💬";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/campaigns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Campaign</h1>
          <p className="text-muted-foreground mt-1">Design and launch your WhatsApp campaign</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Details */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>Basic information about your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input 
                  id="name"
                  placeholder="Enter campaign name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your campaign"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="circle">Target Circle</Label>
                <Select value={selectedCircle} onValueChange={setSelectedCircle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target circle" />
                  </SelectTrigger>
                  <SelectContent>
                    {circles.map((circle) => (
                      <SelectItem key={circle.id} value={circle.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{circle.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {circle.count.toLocaleString()} members
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Message Content */}
          <Card>
            <CardHeader>
              <CardTitle>Message Content</CardTitle>
              <CardDescription>Create your message using templates or custom content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="templates" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                  <TabsTrigger value="ai">AI Generate</TabsTrigger>
                </TabsList>
                
                <TabsContent value="templates" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <Card 
                        key={template.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getTypeIcon(template.type)}</span>
                              <div>
                                <h4 className="font-medium text-sm">{template.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {template.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {template.content.substring(0, 60)}...
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Message Content</Label>
                    <Textarea 
                      id="message"
                      placeholder="Write your message here..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      rows={6}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="space-y-4">
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                    <Wand2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">AI Message Generator</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate personalized messages using AI
                    </p>
                    <Button>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate with AI
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card>
            <CardHeader>
              <CardTitle>Scheduling</CardTitle>
              <CardDescription>Schedule your campaign or send immediately</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="schedule"
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>

              {isScheduled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={setScheduledDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input 
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Message Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                <div className="bg-background rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Your Business</p>
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm">
                      {messageContent || "Your message will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCircle ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Circle:</span>
                    <span className="text-sm font-medium">
                      {circles.find(c => c.id === selectedCircle)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Recipients:</span>
                    <span className="text-sm font-medium">
                      {circles.find(c => c.id === selectedCircle)?.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Est. Cost:</span>
                    <span className="text-sm font-medium text-primary">
                      ${((circles.find(c => c.id === selectedCircle)?.count || 0) * 0.005).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Select a circle to see audience details</p>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              {isScheduled ? "Schedule Campaign" : "Send Now"}
            </Button>
            <Button variant="outline" className="w-full">
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}