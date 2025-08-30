import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft, Send, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [date, setDate] = useState<Date>();
  const [isScheduled, setIsScheduled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    message: "",
    circle: "",
    sendImmediately: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the campaign
    console.log("Campaign created:", { ...formData, scheduledDate: date });
    navigate(projectId ? `/project/${projectId}/campaigns` : "/campaigns");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={projectId ? `/project/${projectId}/campaigns` : "/campaigns"}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Campaign</h1>
          <p className="text-muted-foreground mt-1">Set up your WhatsApp campaign with targeted messaging</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign Details */}
          <div className="lg:col-span-2 space-y-6">
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
                    placeholder="e.g., Summer Sale Announcement"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of the campaign"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message Content</CardTitle>
                <CardDescription>Craft your WhatsApp message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    className="min-h-32"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Tip: Keep it concise and engaging. You can use emojis and personalization.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience</CardTitle>
                <CardDescription>Select who will receive this campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Circle</Label>
                  <Select value={formData.circle} onValueChange={(value) => setFormData(prev => ({ ...prev, circle: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a circle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vip-customers">VIP Customers</SelectItem>
                      <SelectItem value="newsletter-subscribers">Newsletter Subscribers</SelectItem>
                      <SelectItem value="beta-testers">Beta Testers</SelectItem>
                      <SelectItem value="inactive-users">Inactive Users</SelectItem>
                      <SelectItem value="all-customers">All Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Estimated Reach</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.circle ? "1,234 contacts" : "Select a circle to see reach"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduling</CardTitle>
                <CardDescription>When should this campaign be sent?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="send-now"
                    checked={!isScheduled}
                    onCheckedChange={(checked) => {
                      setIsScheduled(!checked);
                      setFormData(prev => ({ ...prev, sendImmediately: !!checked }));
                    }}
                  />
                  <Label htmlFor="send-now" className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send immediately
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="schedule"
                    checked={isScheduled}
                    onCheckedChange={(checked) => {
                      setIsScheduled(!!checked);
                      setFormData(prev => ({ ...prev, sendImmediately: !checked }));
                    }}
                  />
                  <Label htmlFor="schedule" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Schedule for later
                  </Label>
                </div>

                {isScheduled && (
                  <div className="space-y-2">
                    <Label>Select Date & Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{formData.name || "Untitled"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Circle:</span>
                  <span className="font-medium">{formData.circle || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timing:</span>
                  <span className="font-medium">
                    {isScheduled && date ? format(date, "PPP") : "Send now"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">
                    {isScheduled ? "Scheduled" : "Ready to send"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button type="submit" className="w-full" size="lg">
                {isScheduled ? "Schedule Campaign" : "Send Campaign"}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate(projectId ? `/project/${projectId}/campaigns` : "/campaigns")}>
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}