
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Play, Pause, BarChart3, Users, Phone } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'scheduled';
  type: 'voice' | 'text' | 'mixed';
  target: number;
  sent: number;
  connected: number;
  conversions: number;
  budget: number;
  spent: number;
}

export const CampaignsPanel = () => {
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Holiday Sale Outreach',
      status: 'active',
      type: 'voice',
      target: 1000,
      sent: 650,
      connected: 234,
      conversions: 45,
      budget: 500,
      spent: 325
    },
    {
      id: '2',
      name: 'Product Demo Calls',
      status: 'paused',
      type: 'mixed',
      target: 500,
      sent: 180,
      connected: 89,
      conversions: 23,
      budget: 300,
      spent: 108
    },
    {
      id: '3',
      name: 'Customer Feedback Survey',
      status: 'scheduled',
      type: 'voice',
      target: 800,
      sent: 0,
      connected: 0,
      conversions: 0,
      budget: 400,
      spent: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'scheduled': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Phone className="w-3 h-3" />;
      case 'text': return <Users className="w-3 h-3" />;
      case 'mixed': return <BarChart3 className="w-3 h-3" />;
      default: return <Users className="w-3 h-3" />;
    }
  };

  return (
    <Card className="h-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">WhatsApp Campaigns</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>
      
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded">
                  {getTypeIcon(campaign.type)}
                </div>
                <h4 className="font-medium">{campaign.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(campaign.status)} variant="secondary">
                  {campaign.status}
                </Badge>
                {campaign.status === 'active' ? (
                  <Button variant="outline" size="icon" className="h-6 w-6">
                    <Pause className="w-3 h-3" />
                  </Button>
                ) : (
                  <Button variant="outline" size="icon" className="h-6 w-6">
                    <Play className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{campaign.sent}/{campaign.target}</span>
                </div>
                <Progress value={(campaign.sent / campaign.target) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <p className="font-medium text-green-600">{campaign.connected}</p>
                  <p className="text-muted-foreground text-xs">Connected</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-blue-600">{campaign.conversions}</p>
                  <p className="text-muted-foreground text-xs">Conversions</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-primary">${campaign.spent}</p>
                  <p className="text-muted-foreground text-xs">Spent</p>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Conversion Rate:</span>
                <span className="font-medium">
                  {campaign.connected > 0 ? ((campaign.conversions / campaign.connected) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
