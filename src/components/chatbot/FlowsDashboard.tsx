
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Bot, Calendar, Activity, MessageSquare, MoreHorizontal, Play, Edit3 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Flow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  conversations: number;
  responseTime: string;
  lastUpdated: string;
}

interface FlowsDashboardProps {
  onCreateFlow: () => void;
  onEditFlow: (flowId: string) => void;
}

const mockFlows: Flow[] = [
  {
    id: 'flow-1',
    name: 'Customer Support Bot',
    description: 'Handles general customer inquiries and support tickets',
    status: 'active',
    conversations: 1247,
    responseTime: '2.3s',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'flow-2',
    name: 'Lead Generation Bot',
    description: 'Qualifies leads and collects contact information',
    status: 'active',
    conversations: 865,
    responseTime: '1.8s',
    lastUpdated: '1 day ago'
  },
  {
    id: 'flow-3',
    name: 'Product Recommendation',
    description: 'Recommends products based on user preferences',
    status: 'draft',
    conversations: 0,
    responseTime: '-',
    lastUpdated: '3 days ago'
  }
];

export const FlowsDashboard: React.FC<FlowsDashboardProps> = ({ onCreateFlow, onEditFlow }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5 min-h-full">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Chatbot Flows
              </h1>
              <p className="text-muted-foreground">Create and manage your AI chatbot flows</p>
            </div>
          </div>
          <Button onClick={onCreateFlow} className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Create New Flow
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Conversations</p>
                  <p className="text-2xl font-bold">2,112</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Flows</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">2.1s</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                  <Bot className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {mockFlows.map((flow) => (
            <Card key={flow.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-2 truncate">{flow.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{flow.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-2 flex-shrink-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditFlow(flow.id)}>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Flow
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Play className="w-4 h-4 mr-2" />
                        Test Flow
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3">
                  <Badge className={getStatusColor(flow.status)}>
                    {flow.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversations</p>
                    <p className="text-lg font-semibold">{flow.conversations.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="text-lg font-semibold">{flow.responseTime}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Updated {flow.lastUpdated}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onEditFlow(flow.id)}
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
