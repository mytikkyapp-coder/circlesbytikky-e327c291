import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Send, 
  MessageCircle, 
  Eye, 
  Reply, 
  AlertCircle, 
  TrendingUp, 
  RefreshCw,
  Download,
  Calendar
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface FailureMessage {
  id: string;
  recipient: string;
  error: string;
  timestamp: string;
  retryCount: number;
}

interface DeliveryData {
  time: string;
  sent: number;
  delivered: number;
  opened: number;
  replied: number;
}

export default function CampaignAnalytics() {
  const { campaignId } = useParams();

  // Mock campaign data
  const campaign = {
    id: campaignId,
    name: "Summer Sale Announcement",
    description: "20% off summer collection for VIP customers",
    status: "completed",
    circle: "VIP Customers",
    sent: 1250,
    delivered: 1198,
    opened: 856,
    replied: 142,
    failed: 52,
    cost: 6.25,
    createdAt: "2024-01-20T10:00:00Z",
    completedAt: "2024-01-20T14:30:00Z"
  };

  const deliveryData: DeliveryData[] = [
    { time: "10:00", sent: 250, delivered: 245, opened: 120, replied: 15 },
    { time: "10:30", sent: 500, delivered: 485, opened: 280, replied: 32 },
    { time: "11:00", sent: 750, delivered: 725, opened: 450, replied: 58 },
    { time: "11:30", sent: 1000, delivered: 960, opened: 620, replied: 89 },
    { time: "12:00", sent: 1250, delivered: 1198, opened: 780, replied: 125 },
    { time: "12:30", sent: 1250, delivered: 1198, opened: 820, replied: 135 },
    { time: "13:00", sent: 1250, delivered: 1198, opened: 845, replied: 140 },
    { time: "13:30", sent: 1250, delivered: 1198, opened: 856, replied: 142 }
  ];

  const failureReasons = [
    { name: "Invalid Number", value: 28, color: "#ef4444" },
    { name: "Blocked User", value: 15, color: "#f97316" },
    { name: "Network Error", value: 6, color: "#eab308" },
    { name: "Rate Limit", value: 3, color: "#84cc16" }
  ];

  const failedMessages: FailureMessage[] = [
    {
      id: "1",
      recipient: "+1234567890",
      error: "Invalid phone number format",
      timestamp: "2024-01-20T10:15:00Z",
      retryCount: 2
    },
    {
      id: "2", 
      recipient: "+9876543210",
      error: "User has blocked business number",
      timestamp: "2024-01-20T10:32:00Z",
      retryCount: 0
    },
    {
      id: "3",
      recipient: "+5555555555",
      error: "Network timeout",
      timestamp: "2024-01-20T11:05:00Z", 
      retryCount: 3
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "completed": "bg-green-100 text-green-800",
      "sending": "bg-yellow-100 text-yellow-800",
      "failed": "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const deliveryRate = ((campaign.delivered / campaign.sent) * 100).toFixed(1);
  const openRate = ((campaign.opened / campaign.delivered) * 100).toFixed(1);
  const replyRate = ((campaign.replied / campaign.delivered) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/campaigns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-foreground">{campaign.name}</h1>
            <Badge className={getStatusColor(campaign.status)}>
              {campaign.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{campaign.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sent</p>
                <p className="text-2xl font-bold text-foreground">{campaign.sent.toLocaleString()}</p>
              </div>
              <Send className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold text-foreground">{campaign.delivered.toLocaleString()}</p>
                <p className="text-xs text-green-600">{deliveryRate}% rate</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Opened</p>
                <p className="text-2xl font-bold text-foreground">{campaign.opened.toLocaleString()}</p>
                <p className="text-xs text-blue-600">{openRate}% rate</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Replied</p>
                <p className="text-2xl font-bold text-foreground">{campaign.replied.toLocaleString()}</p>
                <p className="text-xs text-purple-600">{replyRate}% rate</p>
              </div>
              <Reply className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-foreground">{campaign.failed.toLocaleString()}</p>
                <p className="text-xs text-red-600">${campaign.cost} spent</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Timeline</TabsTrigger>
          <TabsTrigger value="failures">Failed Messages</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Funnel</CardTitle>
                <CardDescription>Message flow from sent to replied</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sent</span>
                    <span className="text-sm font-medium">{campaign.sent}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Delivered</span>
                    <span className="text-sm font-medium">{campaign.delivered}</span>
                  </div>
                  <Progress value={parseFloat(deliveryRate)} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Opened</span>
                    <span className="text-sm font-medium">{campaign.opened}</span>
                  </div>
                  <Progress value={parseFloat(openRate)} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Replied</span>
                    <span className="text-sm font-medium">{campaign.replied}</span>
                  </div>
                  <Progress value={parseFloat(replyRate)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Failure Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Failure Breakdown</CardTitle>
                <CardDescription>Reasons for message failures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={failureReasons}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {failureReasons.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {failureReasons.map((reason, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: reason.color }}
                      />
                      <span className="text-xs">{reason.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
              <CardDescription>Real-time delivery and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={deliveryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="sent" 
                      stackId="1" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="delivered" 
                      stackId="2" 
                      stroke="#82ca9d" 
                      fill="#82ca9d" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="opened" 
                      stackId="3" 
                      stroke="#ffc658" 
                      fill="#ffc658" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Failed Messages</CardTitle>
              <CardDescription>Messages that failed to deliver with retry options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {failedMessages.map((failure) => (
                  <div key={failure.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium">{failure.recipient}</span>
                        <Badge variant="destructive" className="text-xs">
                          Failed
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{failure.error}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {new Date(failure.timestamp).toLocaleString()}
                        </span>
                        <span>Retries: {failure.retryCount}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Retry
                      </Button>
                      <Button size="sm" variant="outline">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {failedMessages.length} failed messages
                </p>
                <Button>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry All Failed
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Over Time</CardTitle>
              <CardDescription>How recipients engaged with your message</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={deliveryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="opened" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="replied" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}