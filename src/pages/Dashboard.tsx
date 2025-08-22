import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Circle, Send, TrendingUp, Activity, ArrowRight, Sparkles, BarChart3, Zap, Eye } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "2,847",
      change: "+12% from last month",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Circles",
      value: "23",
      change: "+3 new this week",
      icon: Circle,
      color: "text-primary"
    },
    {
      title: "Campaigns This Week",
      value: "8",
      change: "+2 from last week",
      icon: Send,
      color: "text-green-600"
    },
    {
      title: "Engagement Rate",
      value: "87%",
      change: "+5% improvement",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const quickActions = [
    {
      title: "Create New Circle",
      description: "Set up a new member circle",
      icon: Plus,
      action: "create-circle"
    },
    {
      title: "Start Campaign",
      description: "Launch a WhatsApp campaign",
      icon: Send,
      action: "start-campaign"
    },
    {
      title: "Import Members",
      description: "Add members via CSV upload",
      icon: Users,
      action: "import-members"
    }
  ];

  const recentActivity = [
    { action: "New circle 'VIP Customers' created", time: "2 hours ago" },
    { action: "Campaign 'Summer Sale' sent to 234 members", time: "4 hours ago" },
    { action: "45 new members added to 'Newsletter'", time: "6 hours ago" },
    { action: "Template 'Welcome Message' updated", time: "1 day ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="relative flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Welcome back! Here's what's happening with your circles.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                All systems operational
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: 2 minutes ago
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              View Analytics
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              New Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                  {stat.change}
                </div>
                <TrendingUp className="w-3 h-3 text-green-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Quick Actions */}
        <Card className="lg:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-3">
            {quickActions.map((action, index) => (
              <div key={index} className="group flex items-center justify-between p-4 border border-border rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-300 hover:border-primary/20 hover:shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-105">
                    <action.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                  Start
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Recent Activity */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your account</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-all duration-300">
                <div className="relative">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                  {index < recentActivity.length - 1 && (
                    <div className="absolute top-6 left-1.5 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm text-foreground font-medium leading-relaxed">{activity.action}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">{activity.time}</p>
                    <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
                    <span className="text-xs text-primary font-medium">View details</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                View all activity
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* View Analytics Section */}
        <Card className="border border-border/50 hover:border-primary/20 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              View Analytics
            </CardTitle>
            <CardDescription>
              Track your campaign performance and member engagement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold text-primary">24.5K</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold text-secondary">87%</p>
              </div>
            </div>
            <Button className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Full Analytics
            </Button>
          </CardContent>
        </Card>

        {/* New WhatsApp Campaign Setup */}
        <Card className="border border-border/50 hover:border-primary/20 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              New WhatsApp Campaign
            </CardTitle>
            <CardDescription>
              Create and launch your next WhatsApp marketing campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <span className="text-sm">Template Selection</span>
                <span className="text-xs text-muted-foreground">Step 1</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <span className="text-sm">Audience Targeting</span>
                <span className="text-xs text-muted-foreground">Step 2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <span className="text-sm">Schedule & Launch</span>
                <span className="text-xs text-muted-foreground">Step 3</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Start New Campaign
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}