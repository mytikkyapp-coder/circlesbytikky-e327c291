import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Share, TrendingUp, Users, MessageCircle, Eye, Reply } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function CampaignAnalytics() {
  const { id, projectId } = useParams();

  // Mock data - replace with actual data from your API
  const campaign = {
    id: id || "1",
    name: "Summer Sale Announcement",
    description: "20% off summer collection for VIP customers",
    status: "completed" as const,
    circle: "VIP Customers",
    sent: 342,
    delivered: 338,
    opened: 267,
    replied: 43,
    createdAt: "2024-01-20",
    sentAt: "2024-01-20T10:00:00Z"
  };

  const timelineData = [
    { time: '10:00', sent: 0, delivered: 0, opened: 0 },
    { time: '10:15', sent: 342, delivered: 298, opened: 156 },
    { time: '10:30', sent: 342, delivered: 324, opened: 189 },
    { time: '10:45', sent: 342, delivered: 335, opened: 211 },
    { time: '11:00', sent: 342, delivered: 338, opened: 234 },
    { time: '11:15', sent: 342, delivered: 338, opened: 251 },
    { time: '11:30', sent: 342, delivered: 338, opened: 267 },
  ];

  const engagementData = [
    { name: 'Opened', value: 267, color: '#10b981' },
    { name: 'Not Opened', value: 75, color: '#e5e7eb' },
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "draft": "bg-gray-100 text-gray-800",
      "scheduled": "bg-blue-100 text-blue-800",
      "sending": "bg-yellow-100 text-yellow-800",
      "completed": "bg-green-100 text-green-800",
      "paused": "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const metrics = [
    {
      title: "Total Sent",
      value: campaign.sent.toLocaleString(),
      icon: Users,
      change: "+100%",
      changeType: "positive" as const
    },
    {
      title: "Delivery Rate",
      value: `${Math.round((campaign.delivered / campaign.sent) * 100)}%`,
      icon: MessageCircle,
      change: "+2.1%",
      changeType: "positive" as const
    },
    {
      title: "Open Rate",
      value: `${Math.round((campaign.opened / campaign.sent) * 100)}%`,
      icon: Eye,
      change: "+12.3%",
      changeType: "positive" as const
    },
    {
      title: "Reply Rate",
      value: `${Math.round((campaign.replied / campaign.sent) * 100)}%`,
      icon: Reply,
      change: "-1.2%",
      changeType: "negative" as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={projectId ? `/project/${projectId}/campaigns` : "/campaigns"}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-foreground">{campaign.name}</h1>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{campaign.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>Circle: {campaign.circle}</span>
              <span>•</span>
              <span>Sent {new Date(campaign.sentAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Share className="w-4 h-4" />
            Share Report
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <metric.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className={`w-4 h-4 mr-1 ${
                  metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs last campaign</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Timeline</CardTitle>
            <CardDescription>Message delivery and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sent" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="delivered" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="opened" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
            <CardDescription>How recipients interacted with your message</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
          <CardDescription>Complete campaign performance breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Delivery Performance</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Messages Sent</span>
                  <span className="font-medium">{campaign.sent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Successfully Delivered</span>
                  <span className="font-medium">{campaign.delivered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Failed Deliveries</span>
                  <span className="font-medium">{campaign.sent - campaign.delivered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Rate</span>
                  <span className="font-medium text-green-600">
                    {Math.round((campaign.delivered / campaign.sent) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Engagement Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Messages Opened</span>
                  <span className="font-medium">{campaign.opened}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Open Rate</span>
                  <span className="font-medium text-blue-600">
                    {Math.round((campaign.opened / campaign.sent) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Replies Received</span>
                  <span className="font-medium">{campaign.replied}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reply Rate</span>
                  <span className="font-medium text-purple-600">
                    {Math.round((campaign.replied / campaign.sent) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Campaign Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Audience</span>
                  <span className="font-medium">{campaign.circle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created Date</span>
                  <span className="font-medium">{new Date(campaign.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sent Date</span>
                  <span className="font-medium">{new Date(campaign.sentAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}