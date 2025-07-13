import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Send, 
  Eye, 
  MessageCircle, 
  Calendar,
  Download
} from "lucide-react";

export default function Analytics() {
  const overviewStats = [
    {
      title: "Total Messages Sent",
      value: "12,847",
      change: "+23%",
      trend: "up",
      icon: Send,
      period: "vs last month"
    },
    {
      title: "Delivery Rate",
      value: "98.2%",
      change: "+0.8%",
      trend: "up",
      icon: TrendingUp,
      period: "vs last month"
    },
    {
      title: "Open Rate",
      value: "76.4%",
      change: "-2.1%",
      trend: "down",
      icon: Eye,
      period: "vs last month"
    },
    {
      title: "Reply Rate",
      value: "18.3%",
      change: "+4.2%",
      trend: "up",
      icon: MessageCircle,
      period: "vs last month"
    }
  ];

  const topPerformingCampaigns = [
    {
      name: "Summer Sale Announcement",
      circle: "VIP Customers",
      sent: 342,
      openRate: "89.2%",
      replyRate: "24.1%",
      status: "completed"
    },
    {
      name: "Product Launch Beta",
      circle: "Beta Testers",
      sent: 89,
      openRate: "87.6%",
      replyRate: "31.5%",
      status: "completed"
    },
    {
      name: "Weekly Newsletter #45",
      circle: "Newsletter Subscribers",
      sent: 1247,
      openRate: "72.3%",
      replyRate: "8.7%",
      status: "completed"
    }
  ];

  const circlePerformance = [
    { name: "VIP Customers", members: 342, avgOpenRate: "87.4%", avgReplyRate: "22.1%" },
    { name: "Beta Testers", members: 89, avgOpenRate: "83.7%", avgReplyRate: "28.9%" },
    { name: "Newsletter Subscribers", members: 1247, avgOpenRate: "74.2%", avgReplyRate: "9.3%" },
    { name: "Inactive Users", members: 523, avgOpenRate: "45.8%", avgReplyRate: "3.2%" }
  ];

  const recentActivity = [
    { event: "Campaign 'Holiday Special' completed", metric: "89.3% open rate", time: "2 hours ago", type: "success" },
    { event: "New high engagement rate achieved", metric: "92.1% for VIP circle", time: "4 hours ago", type: "achievement" },
    { event: "Campaign 'Weekly Update' sent", metric: "1,247 recipients", time: "6 hours ago", type: "info" },
    { event: "Low engagement alert", metric: "Below 60% for Inactive Users", time: "1 day ago", type: "warning" }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  const getActivityTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "success": "bg-green-100 text-green-800",
      "achievement": "bg-primary/10 text-primary",
      "info": "bg-blue-100 text-blue-800",
      "warning": "bg-yellow-100 text-yellow-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your campaign performance and engagement metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const TrendIcon = getTrendIcon(stat.trend);
          return (
            <Card key={index} className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendIcon className={`w-3 h-3 ${getTrendColor(stat.trend)}`} />
                  <span className={`text-xs font-medium ${getTrendColor(stat.trend)}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.period}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Top Performing Campaigns
            </CardTitle>
            <CardDescription>Campaigns with highest engagement rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformingCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{campaign.name}</h3>
                  <p className="text-sm text-muted-foreground">{campaign.circle} • {campaign.sent} sent</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{campaign.openRate} open</div>
                  <div className="text-sm text-muted-foreground">{campaign.replyRate} reply</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Circle Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Circle Performance
            </CardTitle>
            <CardDescription>Average engagement by circle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {circlePerformance.map((circle, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">{circle.name}</h3>
                  <span className="text-sm text-muted-foreground">{circle.members} members</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Open:</span>
                    <span className="font-medium">{circle.avgOpenRate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Reply:</span>
                    <span className="font-medium">{circle.avgReplyRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest analytics events and milestones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <Badge 
                variant="secondary" 
                className={`mt-1 ${getActivityTypeColor(activity.type)}`}
              >
                {activity.type}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.event}</p>
                <p className="text-sm font-medium text-primary">{activity.metric}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}