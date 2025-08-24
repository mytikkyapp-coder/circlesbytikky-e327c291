
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Key, 
  Phone, 
  MessageSquare, 
  Shield, 
  Activity,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

export const APIIntegrationPanel = () => {
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  const apiStats = [
    { label: 'API Calls Today', value: '1,247', icon: Activity, color: 'text-blue-600' },
    { label: 'Success Rate', value: '99.2%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Avg Response', value: '120ms', icon: Zap, color: 'text-yellow-600' },
    { label: 'Rate Limit', value: '95/100', icon: Shield, color: 'text-purple-600' },
  ];

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/calls/initiate',
      description: 'Initiate a WhatsApp voice call',
      status: 'active'
    },
    {
      method: 'GET',
      path: '/v1/calls/status',
      description: 'Get call status and details',
      status: 'active'
    },
    {
      method: 'POST',
      path: '/v1/calls/end',
      description: 'End an active call',
      status: 'active'
    },
    {
      method: 'POST',
      path: '/v1/campaigns/create',
      description: 'Create new calling campaign',
      status: 'beta'
    }
  ];

  return (
    <Card className="h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <h2 className="text-lg font-semibold">WhatsApp Calling API</h2>
        </div>
        <Badge variant={isConnected ? 'default' : 'destructive'}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </Badge>
      </div>

      {/* API Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {apiStats.map((stat, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-sm font-medium">{stat.value}</span>
            </div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Configuration */}
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="api-key" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Key
          </Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your WhatsApp Business API key"
          />
        </div>

        <div>
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input
            id="webhook-url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://your-domain.com/webhook"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Voice Calling</span>
          </div>
          <Switch checked={true} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Message Fallback</span>
          </div>
          <Switch checked={false} />
        </div>
      </div>

      <Separator className="my-4" />

      {/* API Endpoints */}
      <div className="space-y-3">
        <h3 className="font-medium flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Available Endpoints
        </h3>
        {endpoints.map((endpoint, index) => (
          <div key={index} className="p-3 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {endpoint.method}
                </Badge>
                <code className="text-sm font-mono">{endpoint.path}</code>
              </div>
              <Badge variant={endpoint.status === 'active' ? 'default' : 'secondary'}>
                {endpoint.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{endpoint.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <Button className="flex-1">
          Test Connection
        </Button>
        <Button variant="outline">
          View Docs
        </Button>
      </div>
    </Card>
  );
};
