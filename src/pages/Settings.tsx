import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Users, 
  Smartphone,
  Globe,
  Save
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    campaignComplete: true,
    lowEngagement: true,
    newMembers: false,
    systemUpdates: true
  });

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@company.com",
    phone: "+1 (555) 123-4567",
    company: "Tikky Inc.",
    timezone: "America/New_York"
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and configurations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Shield className="w-4 h-4" />
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <CreditCard className="w-4 h-4" />
                Billing
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="w-4 h-4" />
                Team
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Smartphone className="w-4 h-4" />
                WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleProfileChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleProfileChange("lastName", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => handleProfileChange("company", e.target.value)}
                  />
                </div>
              </div>

              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Campaign Completion</Label>
                  <p className="text-sm text-muted-foreground">Get notified when campaigns finish sending</p>
                </div>
                <Switch
                  checked={notifications.campaignComplete}
                  onCheckedChange={(value) => handleNotificationChange("campaignComplete", value)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Low Engagement Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert when campaigns have low open rates</p>
                </div>
                <Switch
                  checked={notifications.lowEngagement}
                  onCheckedChange={(value) => handleNotificationChange("lowEngagement", value)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">New Member Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new members join circles</p>
                </div>
                <Switch
                  checked={notifications.newMembers}
                  onCheckedChange={(value) => handleNotificationChange("newMembers", value)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Important platform updates and maintenance notices</p>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={(value) => handleNotificationChange("systemUpdates", value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Connection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                WhatsApp Business Integration
              </CardTitle>
              <CardDescription>Connect your WhatsApp Business account to send campaigns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp Business</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Status:</span>
                  <span className="text-green-600 font-medium">Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Message Limit:</span>
                  <span className="text-foreground font-medium">1000/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Version:</span>
                  <span className="text-foreground font-medium">v17.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Sync:</span>
                  <span className="text-foreground font-medium">5 min ago</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Globe className="w-4 h-4 mr-2" />
                Reconnect WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}