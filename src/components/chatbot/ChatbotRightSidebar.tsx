import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart3, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  Activity,
  X,
  CheckCircle,
  AlertCircle,
  Settings,
  Smartphone,
  Link,
  Zap,
  Shield,
  Globe,
  QrCode
} from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  status: 'completed' | 'active' | 'error';
}

const mockChats: ChatMessage[] = [
  {
    id: '1',
    user: 'John Doe',
    message: 'Hi, I need help with my order',
    timestamp: '2 min ago',
    status: 'active'
  },
  {
    id: '2',
    user: 'Sarah Wilson',
    message: 'Can you recommend a product?',
    timestamp: '5 min ago',
    status: 'completed'
  },
  {
    id: '3',
    user: 'Mike Johnson',
    message: 'Payment issue',
    timestamp: '8 min ago',
    status: 'error'
  },
  {
    id: '4',
    user: 'Emily Davis',
    message: 'Thank you for the help!',
    timestamp: '12 min ago',
    status: 'completed'
  },
  {
    id: '5',
    user: 'David Brown',
    message: 'How do I track my order?',
    timestamp: '15 min ago',
    status: 'completed'
  }
];

export const ChatbotRightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://your-domain.com/webhook');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'active':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-80 border-l border-border bg-card/50 backdrop-blur-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <div className="p-4 border-b border-border">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics" className="gap-1 text-xs">
              <BarChart3 className="w-3 h-3" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="chats" className="gap-1 text-xs">
              <MessageSquare className="w-3 h-3" />
              Chats
            </TabsTrigger>
            <TabsTrigger value="connect" className="gap-1 text-xs">
              <Smartphone className="w-3 h-3" />
              Connect
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="analytics" className="m-0 h-full">
          <ScrollArea className="h-full p-4">
            <div className="space-y-6">
              {/* Response Time */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-primary">2.3s</div>
                  <p className="text-xs text-muted-foreground">Average response time</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">12% faster</span>
                  </div>
                </CardContent>
              </Card>

              {/* Conversations Today */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Conversations Today
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-primary">47</div>
                  <p className="text-xs text-muted-foreground">Total conversations</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+8 from yesterday</span>
                  </div>
                </CardContent>
              </Card>

              {/* Success Rate */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-primary">94%</div>
                  <p className="text-xs text-muted-foreground">Resolved conversations</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </CardContent>
              </Card>

              {/* Peak Hours */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Peak Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">9:00 AM - 11:00 AM</span>
                      <Badge variant="secondary" className="text-xs">18 chats</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">2:00 PM - 4:00 PM</span>
                      <Badge variant="secondary" className="text-xs">15 chats</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">6:00 PM - 8:00 PM</span>
                      <Badge variant="secondary" className="text-xs">12 chats</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="chats" className="m-0 h-full">
          <ScrollArea className="h-full p-4">
            <div className="space-y-3">
              {mockChats.map((chat) => (
                <Card key={chat.id} className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(chat.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">{chat.user}</p>
                        <Badge className={getStatusColor(chat.status)} variant="secondary">
                          {chat.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">
                        {chat.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="connect" className="m-0 h-full">
          <ScrollArea className="h-full p-4">
            <div className="space-y-6">
              {/* WhatsApp Business Connection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-green-600" />
                    WhatsApp Business
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${whatsappConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-sm">{whatsappConnected ? 'Connected' : 'Not Connected'}</span>
                    </div>
                    <Switch 
                      checked={whatsappConnected} 
                      onCheckedChange={setWhatsappConnected}
                    />
                  </div>
                  
                  {!whatsappConnected && (
                    <div className="space-y-3">
                      <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                        <QrCode className="w-4 h-4" />
                        Scan QR Code
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Scan QR code with WhatsApp Business to connect
                      </p>
                    </div>
                  )}

                  {whatsappConnected && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700 dark:text-green-400">
                          Business account linked
                        </span>
                      </div>
                      <Button variant="outline" className="w-full gap-2">
                        <Settings className="w-4 h-4" />
                        Configure Settings
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Webhook Configuration */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    Webhook Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url" className="text-xs">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="text-xs"
                      placeholder="https://your-domain.com/webhook"
                    />
                  </div>
                  <Button className="w-full gap-2" size="sm">
                    <Zap className="w-3 h-3" />
                    Test Webhook
                  </Button>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">End-to-End Encryption</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Message Logging</span>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full gap-2" size="sm">
                    <Globe className="w-3 h-3" />
                    Privacy Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Integration Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Integration Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Meta API</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Business Verification</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Rate Limit</span>
                    <Badge variant="secondary">1000/hour</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};