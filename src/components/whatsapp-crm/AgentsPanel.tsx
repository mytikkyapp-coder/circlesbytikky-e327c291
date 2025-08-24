
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, MessageCircle, Clock, Plus, Settings } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  activeCalls: number;
  totalCalls: number;
  avgResponse: string;
  languages: string[];
}

export const AgentsPanel = () => {
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      status: 'online',
      activeCalls: 2,
      totalCalls: 45,
      avgResponse: '1m 23s',
      languages: ['English', 'Spanish']
    },
    {
      id: '2',
      name: 'Mike Chen',
      status: 'busy',
      activeCalls: 1,
      totalCalls: 38,
      avgResponse: '2m 15s',
      languages: ['English', 'Mandarin']
    },
    {
      id: '3',
      name: 'Emma Wilson',
      status: 'away',
      activeCalls: 0,
      totalCalls: 52,
      avgResponse: '1m 45s',
      languages: ['English', 'French']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'busy': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'away': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Card className="h-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">WhatsApp Agents</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </Button>
      </div>
      
      <div className="space-y-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{agent.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(agent.status)} variant="secondary">
                      {agent.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {agent.languages.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Phone className="w-3 h-3" />
                  <span className="font-medium">{agent.activeCalls}</span>
                </div>
                <p className="text-muted-foreground text-xs">Active Calls</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="font-medium">{agent.totalCalls}</span>
                </div>
                <p className="text-muted-foreground text-xs">Total Calls</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-3 h-3" />
                  <span className="font-medium">{agent.avgResponse}</span>
                </div>
                <p className="text-muted-foreground text-xs">Avg Response</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
