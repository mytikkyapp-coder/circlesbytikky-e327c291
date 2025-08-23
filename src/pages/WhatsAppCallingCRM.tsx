import React, { useState } from 'react';
import { Phone, MessageCircle, Users, BarChart3, Mic, MicOff, Pause, Play, PhoneOff, UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
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

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-semibold">WhatsApp CRM</h1>
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
        {/* Call Interface */}
        {isCallActive && (
          <Card className="m-4 p-6 bg-gradient-to-r from-primary/5 to-green-50 dark:from-primary/10 dark:to-green-900/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg font-semibold bg-primary/20">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Connected
                    </Badge>
                    <span className="text-sm text-muted-foreground">{callDuration}</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant={isMuted ? 'destructive' : 'outline'}
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="rounded-full"
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  variant={isOnHold ? 'secondary' : 'outline'}
                  size="icon"
                  onClick={() => setIsOnHold(!isOnHold)}
                  className="rounded-full"
                >
                  {isOnHold ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setIsCallActive(false)}
                  className="rounded-full"
                >
                  <PhoneOff className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Call Recording & Analysis Active
              </div>
            </div>
          </Card>
        )}

        {/* Content Area */}
        <div className="flex-1 p-4">
          {activeTab === 'calls' && (
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
          )}
          
          {activeTab === 'chats' && (
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
          )}
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
      </div>
    </div>
  );
};

export default WhatsAppCallingCRM;