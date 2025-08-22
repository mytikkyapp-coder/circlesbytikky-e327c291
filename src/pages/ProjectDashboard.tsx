import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Circle, Send, TrendingUp, Activity, ArrowRight, Sparkles, Eye, Plus } from "lucide-react";

export default function ProjectDashboard() {
  const { projectId } = useParams();
  
  // Mock project data
  const getProjectData = (id: string) => {
    const projects = {
      "1": {
        name: "Fitness Coach Pro",
        description: "Personal training business",
        plan: "Pro",
        stats: {
          members: 245,
          circles: 8,
          campaigns: 12,
          engagement: "87%"
        }
      },
      "2": {
        name: "Tech Startup Hub", 
        description: "B2B SaaS community",
        plan: "Enterprise",
        stats: {
          members: 1250,
          circles: 15,
          campaigns: 28,
          engagement: "92%"
        }
      },
      "3": {
        name: "Cooking Masterclass",
        description: "Culinary education platform", 
        plan: "Basic",
        stats: {
          members: 89,
          circles: 3,
          campaigns: 5,
          engagement: "78%"
        }
      }
    };
    return projects[id as keyof typeof projects] || projects["1"];
  };

  const project = getProjectData(projectId || "1");

  const stats = [
    {
      title: "Total Members",
      value: project.stats.members.toString(),
      change: "+12% from last month",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Circles",
      value: project.stats.circles.toString(),
      change: "+3 new this week",
      icon: Circle,
      color: "text-primary"
    },
    {
      title: "Campaigns This Month",
      value: project.stats.campaigns.toString(),
      change: "+2 from last month",
      icon: Send,
      color: "text-green-600"
    },
    {
      title: "Engagement Rate",
      value: project.stats.engagement,
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

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise": return "bg-primary text-primary-foreground";
      case "Pro": return "bg-accent text-accent-foreground";
      case "Basic": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="relative flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <h1 className="text-4xl font-bold text-foreground">{project.name}</h1>
              </div>
              <Badge className={getPlanColor(project.plan)}>
                {project.plan}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {project.description} - Project Dashboard
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

      {/* Stats Grid */}
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
        {/* Quick Actions */}
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

        {/* Recent Activity */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your project</CardDescription>
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
    </div>
  );
}