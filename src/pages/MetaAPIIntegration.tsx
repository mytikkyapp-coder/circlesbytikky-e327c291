import React, { useState } from 'react';
import { Key, Webhook, MessageSquare, Instagram, Facebook, Phone, Check, X, Copy, Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const MetaAPIIntegration = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('fb_key_1234567890abcdef...');
  const [webhookUrl, setWebhookUrl] = useState('https://yourapp.com/webhook');

  const connectedChannels = [
    { id: 'whatsapp', name: 'WhatsApp Business', icon: Phone, connected: true, color: 'green' },
    { id: 'messenger', name: 'Messenger', icon: MessageSquare, connected: true, color: 'blue' },
    { id: 'instagram', name: 'Instagram DM', icon: Instagram, connected: false, color: 'pink' },
  ];

  const apiLogs = [
    { id: 1, timestamp: '2024-01-15 14:30:25', method: 'POST', endpoint: '/messages/send', status: 200, message: 'Message sent successfully' },
    { id: 2, timestamp: '2024-01-15 14:29:18', method: 'POST', endpoint: '/webhook/verify', status: 200, message: 'Webhook delivered' },
    { id: 3, timestamp: '2024-01-15 14:28:45', method: 'GET', endpoint: '/media/download', status: 200, message: 'Media downloaded' },
    { id: 4, timestamp: '2024-01-15 14:27:12', method: 'POST', endpoint: '/calls/initiate', status: 200, message: 'Call initiated' },
    { id: 5, timestamp: '2024-01-15 14:26:33', method: 'POST', endpoint: '/messages/send', status: 400, message: 'Invalid recipient number' },
  ];

  const analyticsData = {
    messagesSent: 15420,
    callsMade: 1250,
    deliveryRate: 98.5,
    responseRate: 76.2,
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
              <Facebook className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Meta API Integration Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">Manage your WhatsApp, Messenger, and Instagram integrations</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configuration">API Configuration</TabsTrigger>
            <TabsTrigger value="logs">API Logs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Connected Channels */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Connected Channels
                </h3>
                <div className="space-y-3">
                  {connectedChannels.map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${channel.color}-100 dark:bg-${channel.color}-900/30`}>
                          <channel.icon className={`w-4 h-4 text-${channel.color}-600 dark:text-${channel.color}-400`} />
                        </div>
                        <span className="font-medium">{channel.name}</span>
                      </div>
                      <Badge variant={channel.connected ? 'default' : 'secondary'}>
                        {channel.connected ? 'Connected' : 'Disconnected'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Messages Today</span>
                      <span className="font-semibold">2,341</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Calls Today</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">API Usage</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </Card>

              {/* WhatsApp Calling Status */}
              <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  WhatsApp Calling
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Business Calling API</span>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Check className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Voice Quality</span>
                    <span className="text-sm font-medium text-green-600">HD Audio</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Integration</span>
                    <Badge variant="secondary">Real-time</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  API Keys
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">Meta API Key</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="api-key"
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="app-id">App ID</Label>
                    <Input id="app-id" placeholder="Your Meta App ID" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="app-secret">App Secret</Label>
                    <Input id="app-secret" type="password" placeholder="Your Meta App Secret" className="mt-1" />
                  </div>
                  
                  <Button className="w-full">Update API Configuration</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Webhook className="w-5 h-5 text-primary" />
                  Webhook Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="verify-token">Verify Token</Label>
                    <Input id="verify-token" placeholder="Your webhook verify token" className="mt-1" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Webhook Events</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Messages</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Message Status</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Call Events</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Account Updates</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Test Webhook</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* API Logs Tab */}
          <TabsContent value="logs">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">API Request Logs</h3>
              <div className="space-y-2">
                {apiLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Badge variant={log.status === 200 ? 'default' : 'destructive'}>
                        {log.status === 200 ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        {log.status}
                      </Badge>
                      <span className="font-mono text-sm text-muted-foreground">{log.method}</span>
                      <span className="font-mono text-sm">{log.endpoint}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{analyticsData.messagesSent.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Messages Sent</div>
                <div className="text-xs text-green-600 mt-1">+12% from last month</div>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{analyticsData.callsMade.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Calls Made</div>
                <div className="text-xs text-green-600 mt-1">+8% from last month</div>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{analyticsData.deliveryRate}%</div>
                <div className="text-sm text-muted-foreground">Delivery Success</div>
                <div className="text-xs text-green-600 mt-1">+0.3% from last month</div>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{analyticsData.responseRate}%</div>
                <div className="text-sm text-muted-foreground">Response Rate</div>
                <div className="text-xs text-red-600 mt-1">-2% from last month</div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MetaAPIIntegration;