import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Building, 
  Settings, 
  MoreVertical,
  Calendar,
  Activity,
  Target,
  Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const workspaceCategories = [
  {
    id: 'marketing',
    name: 'Marketing Hub',
    description: 'Campaigns, analytics, and customer engagement',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500',
    projects: 3,
    lastUsed: '2 hours ago'
  },
  {
    id: 'sales',
    name: 'Sales Operations',
    description: 'Lead management and sales tracking',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    projects: 1,
    lastUsed: '1 day ago'
  },
  {
    id: 'business',
    name: 'Business Intelligence',
    description: 'Analytics, reporting, and insights',
    icon: Building,
    gradient: 'from-green-500 to-emerald-500',
    projects: 2,
    lastUsed: '3 days ago'
  }
];

const recentActivity = [
  { action: 'Updated Marketing Campaign', workspace: 'Marketing Hub', time: '2 hours ago' },
  { action: 'Added new team member', workspace: 'Sales Operations', time: '5 hours ago' },
  { action: 'Generated quarterly report', workspace: 'Business Intelligence', time: '1 day ago' },
];

const quickActions = [
  { title: 'Create Campaign', icon: Target, action: 'campaign' },
  { title: 'Add Team Member', icon: Users, action: 'member' },
  { title: 'View Analytics', icon: Activity, action: 'analytics' },
  { title: 'Schedule Meeting', icon: Calendar, action: 'meeting' },
];

export default function MyWorkspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleCreateWorkspace = () => {
    navigate('/create-project');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            My Workspace
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects and collaborate with your team
          </p>
        </div>
        <Button onClick={handleCreateWorkspace} className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Create New Workspace
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workspaces">My Workspaces</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={action.action}
                      variant="outline"
                      className="h-20 flex-col gap-2 hover:bg-muted/50 transition-all duration-200 hover:scale-105"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-xs">{action.title}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Workspace Categories Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workspaceCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary">{category.projects} projects</Badge>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last used: {category.lastUsed}</span>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="workspaces" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">All Workspaces</h2>
            <Button onClick={handleCreateWorkspace} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Workspace
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaceCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <CardDescription className="mt-1">{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-muted">
                        {category.projects} active projects
                      </Badge>
                      <span className="text-sm text-muted-foreground">Last used {category.lastUsed}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        Open
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">in {activity.workspace}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}