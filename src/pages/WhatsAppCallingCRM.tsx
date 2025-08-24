
import React, { useState } from 'react';
import { Phone, MessageCircle, Users, BarChart3, Settings, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CallInterface } from '@/components/whatsapp-crm/CallInterface';
import { AgentsPanel } from '@/components/whatsapp-crm/AgentsPanel';
import { CampaignsPanel } from '@/components/whatsapp-crm/CampaignsPanel';
import { APIIntegrationPanel } from '@/components/whatsapp-crm/APIIntegrationPanel';

const WhatsAppCallingCRM = () => {
  const [activeTab, setActiveTab] = useState('calls');
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [callDuration, setCallDuration] = useState('02:34');
  const [notes, setNotes] = useState('');

  const navigationItems = [
    { id: 'chats', label: 'Chats', icon: MessageCircle },
    { id: 'calls', label: 'Calls', icon: Phone },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: BarChart3 },
    { id: 'api', label: 'API Integration', icon: Settings },
  ];

  const callHistory = [
    { id: 1, type: 'incoming', time: '10:30 AM', duration: '5:23', status: 'completed' },
    { id: 2, type: 'outgoing', time: '09:15 AM', duration: '2:45', status: 'completed' },
    { id: 3, type: 'missed', time: '08:45 AM', duration: '0:00', status: 'missed' },
  ];

  const chatHistory = [
    { id: 1, message: 'Hello, I need help with my order', time: '2 hours ago', type: 'incoming' },
    { id: 2, message: 'Sure, I can help you with that', time: '2 hours ago', type: 'outgoing' },
    { id: 3, message: 'Thank you for the quick response', time: '1 hour ago', type: 'incoming' },
  ];

  const renderMainContent = () => {
    switch (activeTab) {
      case 'calls':
        return (
          <Card className="h-full p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Calls</h2>
            <div className="space-y-3">
              {callHistory.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      call.type === 'incoming' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                      call.type === 'outgoing' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">{call.type} Call</p>
                      <p className="text-sm text-muted-foreground">{call.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{call.duration}</p>
                    <Badge variant={call.status === 'completed' ? 'default' : 'destructive'}>
                      {call.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      
      case 'chats':
        return (
          <Card className="h-full p-6">
            <h2 className="text-lg font-semibold mb-4">Chat History</h2>
            <div className="space-y-3">
              {chatHistory.map((chat) => (
                <div key={chat.id} className={`p-3 rounded-lg max-w-md ${
                  chat.type === 'incoming' ? 'bg-muted mr-auto' : 'bg-primary/10 ml-auto'
                }`}>
                  <p className="text-sm">{chat.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{chat.time}</p>
                </div>
              ))}
            </div>
          </Card>
        );
      
      case 'agents':
        return <AgentsPanel />;
      
      case 'campaigns':
        return <CampaignsPanel />;
      
      case 'api':
        return <APIIntegrationPanel />;
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">WhatsApp CRM</h1>
              <p className="text-xs text-muted-foreground">Calling API Enabled</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className="w-full justify-start gap-3"
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">
        <CallInterface
          isCallActive={isCallActive}
          setIsCallActive={setIsCallActive}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isOnHold={isOnHold}
          setIsOnHold={setIsOnHold}
          callDuration={callDuration}
        />

        {/* Content Area */}
        <div className="flex-1 p-4">
          {renderMainContent()}
        </div>
      </div>

      {/* Right Panel - Customer Info */}
      <div className="w-80 bg-card border-l border-border p-4 space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Customer Notes</h3>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about the customer..."
            className="min-h-24"
          />
          <Button className="w-full mt-2" size="sm">Save Notes</Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Customer Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">VIP Customer</Badge>
            <Badge variant="outline">Enterprise</Badge>
            <Badge variant="secondary">Support</Badge>
          </div>
          <Button variant="outline" className="w-full mt-2" size="sm">Add Tag</Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">AI Insights</h3>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-blue-700 dark:text-blue-300">Customer sentiment: Positive</p>
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="text-yellow-700 dark:text-yellow-300">Suggested: Follow up in 2 days</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="text-green-700 dark:text-green-300">High conversion probability</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            API Status
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Calling API</span>
              <Badge variant="default" className="bg-green-100 text-green-700">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Rate Limit</span>
              <span className="text-sm text-muted-foreground">847/1000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Response Time</span>
              <span className="text-sm text-muted-foreground">120ms</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WhatsAppCallingCRM;
