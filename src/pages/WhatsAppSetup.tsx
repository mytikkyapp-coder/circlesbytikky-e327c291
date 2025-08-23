import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Phone, 
  Smartphone, 
  QrCode, 
  Shield, 
  Zap, 
  ExternalLink,
  Copy,
  RefreshCw,
  PhoneCall,
  Settings,
  UserCheck,
  Webhook,
  BadgeCheck,
  FileText,
  CreditCard,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ConnectionStatus = "not_started" | "connecting" | "connected" | "failed" | "pending_approval";

const WhatsAppSetup = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("not_started");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("messaging");
  
  // Business-initiated calling states
  const [callingEnabled, setCallingEnabled] = useState(false);
  const [callbackPermissionStatus, setCallbackPermissionStatus] = useState(false);
  const [webhookSubscribed, setWebhookSubscribed] = useState(false);
  
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!phoneNumber || !businessName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setConnectionStatus("connecting");
    setProgress(25);

    // Simulate API connection process
    setTimeout(() => {
      setProgress(50);
      toast({
        title: "Verification Code Sent",
        description: "Please check your WhatsApp for the verification code",
      });
    }, 2000);
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      toast({
        title: "Verification Code Required",
        description: "Please enter the 6-digit code from WhatsApp",
        variant: "destructive"
      });
      return;
    }

    setProgress(75);
    
    setTimeout(() => {
      setProgress(100);
      setConnectionStatus("pending_approval");
      toast({
        title: "WhatsApp Connected! 🎉",
        description: "Your account is now connected and pending business verification",
      });
    }, 2000);
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText("https://api.tikky.in/webhook/whatsapp");
    toast({
      title: "Copied!",
      description: "Webhook URL copied to clipboard",
    });
  };

  const getStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case "connected": return "bg-green-500";
      case "connecting": return "bg-yellow-500";
      case "failed": return "bg-red-500";
      case "pending_approval": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: ConnectionStatus) => {
    switch (status) {
      case "connected": return "Connected";
      case "connecting": return "Connecting...";
      case "failed": return "Failed";
      case "pending_approval": return "Pending Approval";
      default: return "Not Connected";
    }
  };

  const enableCalling = async () => {
    setCallingEnabled(true);
    toast({
      title: "Calling API Enabled",
      description: "Business-initiated calling is now enabled for your WhatsApp Business account",
    });
  };

  const subscribeToCallWebhooks = async () => {
    setWebhookSubscribed(true);
    toast({
      title: "Webhook Subscribed",
      description: "Successfully subscribed to 'calls' webhook field",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">WhatsApp Business Setup</h1>
            <p className="text-muted-foreground">Configure your WhatsApp Business account messaging and calling features</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {connectionStatus !== "not_started" && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Setup Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(connectionStatus)} animate-pulse`}></div>
                <span className="text-sm font-medium">{getStatusText(connectionStatus)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messaging" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Messaging Setup
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            Blue Tick Verification
          </TabsTrigger>
          <TabsTrigger value="calling" className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4" />
            Business Calling
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messaging" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Setup Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    Connect your WhatsApp Business account to Circles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Display Name</Label>
                      <Input
                        id="business-name"
                        placeholder="Enter your business name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        disabled={connectionStatus === "connecting" || connectionStatus === "connected"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-number">WhatsApp Business Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone-number"
                          placeholder="+1234567890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          disabled={connectionStatus === "connecting" || connectionStatus === "connected"}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleConnect}
                          disabled={connectionStatus === "connecting" || connectionStatus === "connected"}
                        >
                          {connectionStatus === "connecting" ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Connecting
                            </>
                          ) : (
                            <>
                              <Phone className="w-4 h-4 mr-2" />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {connectionStatus === "connecting" && (
                      <Alert>
                        <Clock className="w-4 h-4" />
                        <AlertDescription>
                          We're sending a verification code to your WhatsApp number. This may take a few moments.
                        </AlertDescription>
                      </Alert>
                    )}

                    {(connectionStatus === "connecting" || connectionStatus === "pending_approval") && (
                      <div className="space-y-2">
                        <Label htmlFor="verification-code">Verification Code</Label>
                        <div className="flex gap-2">
                          <Input
                            id="verification-code"
                            placeholder="Enter 6-digit code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            maxLength={6}
                          />
                          <Button onClick={handleVerify} disabled={connectionStatus === "pending_approval"}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Verify
                          </Button>
                        </div>
                      </div>
                    )}

                    {connectionStatus === "pending_approval" && (
                      <Alert>
                        <Shield className="w-4 h-4" />
                        <AlertDescription>
                          Your WhatsApp is connected! Complete your KYC verification to start sending messages.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Webhook Configuration */}
              {connectionStatus === "pending_approval" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Webhook Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure webhook endpoints for message handling
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Webhook URL</Label>
                      <div className="flex gap-2">
                        <Input 
                          value="https://api.tikky.in/webhook/whatsapp" 
                          readOnly 
                          className="bg-muted"
                        />
                        <Button variant="outline" size="icon" onClick={copyWebhookUrl}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Verification Token</Label>
                      <div className="flex gap-2">
                        <Input 
                          value="tikky_verification_token_2024" 
                          readOnly 
                          className="bg-muted"
                        />
                        <Button variant="outline" size="icon" onClick={() => {
                          navigator.clipboard.writeText("tikky_verification_token_2024");
                          toast({ title: "Token copied!" });
                        }}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Alert>
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription>
                        Add these webhook details to your WhatsApp Business API configuration to receive messages.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Status & Features */}
            <div className="space-y-6">
              {/* Connection Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Connection Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(connectionStatus)}`}></div>
                        <span className="font-medium">WhatsApp Business API</span>
                      </div>
                      <Badge variant={connectionStatus === "pending_approval" || connectionStatus === "connected" ? "default" : "secondary"}>
                        {getStatusText(connectionStatus)}
                      </Badge>
                    </div>

                    {connectionStatus === "pending_approval" && (
                      <div className="text-center space-y-3">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <div>
                          <h4 className="font-semibold">Successfully Connected!</h4>
                          <p className="text-sm text-muted-foreground">
                            Your WhatsApp Business account is now connected
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Features</CardTitle>
                  <CardDescription>
                    What you'll get with WhatsApp Business API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Bulk Messaging</h4>
                        <p className="text-sm text-muted-foreground">Send messages to multiple contacts at once</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Template Messages</h4>
                        <p className="text-sm text-muted-foreground">Use pre-approved message templates</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Rich Media</h4>
                        <p className="text-sm text-muted-foreground">Send images, videos, and documents</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Analytics & Reporting</h4>
                        <p className="text-sm text-muted-foreground">Track message delivery and engagement</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Need help with setup?</span>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Documentation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* QR Code Option */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    Alternative: QR Code Setup
                  </CardTitle>
                  <CardDescription>
                    Quick setup using WhatsApp Web QR code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 bg-muted border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center mx-auto">
                      <QrCode className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Scan to Connect</h4>
                      <p className="text-sm text-muted-foreground">
                        Open WhatsApp Web and scan this QR code
                      </p>
                    </div>
                    <Button variant="outline" disabled>
                      Generate QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calling" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Business-initiated Calling Setup */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PhoneCall className="w-5 h-5" />
                    Business-initiated Calling
                  </CardTitle>
                  <CardDescription>
                    Enable voice calling capabilities to call WhatsApp users directly from your business
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>
                      Business-initiated calling requires user permission before you can place calls. Users must grant explicit permission to receive calls from your business.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          <span className="font-medium">Enable Calling API</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Activate calling capabilities for your business phone number
                        </p>
                      </div>
                      <Switch
                        checked={callingEnabled}
                        onCheckedChange={enableCalling}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Webhook className="w-4 h-4" />
                          <span className="font-medium">Subscribe to Call Webhooks</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Receive webhook notifications for call events
                        </p>
                      </div>
                      <Switch
                        checked={webhookSubscribed}
                        onCheckedChange={subscribeToCallWebhooks}
                        disabled={!callingEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          <span className="font-medium">Auto Call Permission</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Automatically grant permission when users call you first
                        </p>
                      </div>
                      <Switch
                        checked={callbackPermissionStatus}
                        onCheckedChange={setCallbackPermissionStatus}
                        disabled={!callingEnabled}
                      />
                    </div>
                  </div>

                  {callingEnabled && (
                    <Alert>
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription>
                        Calling API is enabled! You can now initiate calls to WhatsApp users who have granted permission.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Call Permission Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Call Permission Management
                  </CardTitle>
                  <CardDescription>
                    Manage user permissions for business-initiated calls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">How to obtain call permissions:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                        <p className="text-sm text-muted-foreground">
                          Send a call permission request message during customer service window
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                        <p className="text-sm text-muted-foreground">
                          Use approved template messages with call permission requests
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                        <p className="text-sm text-muted-foreground">
                          Enable auto-permission when users call your business first
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">View calling documentation</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://developers.facebook.com/docs/whatsapp/cloud-api/calling/business-initiated-calls/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Learn More
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calling Features & Status */}
            <div className="space-y-6">
              {/* Calling Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Calling Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${callingEnabled ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span className="font-medium">Business Calling API</span>
                      </div>
                      <Badge variant={callingEnabled ? "default" : "secondary"}>
                        {callingEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${webhookSubscribed ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span className="font-medium">Call Webhooks</span>
                      </div>
                      <Badge variant={webhookSubscribed ? "default" : "secondary"}>
                        {webhookSubscribed ? "Subscribed" : "Not Subscribed"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${callbackPermissionStatus ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span className="font-medium">Auto Permissions</span>
                      </div>
                      <Badge variant={callbackPermissionStatus ? "default" : "secondary"}>
                        {callbackPermissionStatus ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calling Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Calling Features</CardTitle>
                  <CardDescription>
                    Capabilities available with business-initiated calling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <PhoneCall className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Outbound Voice Calls</h4>
                        <p className="text-sm text-muted-foreground">Make voice calls directly to WhatsApp users</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Webhook className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Real-time Call Events</h4>
                        <p className="text-sm text-muted-foreground">Receive webhooks for call connect, status, and terminate events</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Permission Management</h4>
                        <p className="text-sm text-muted-foreground">Secure permission-based calling system</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Settings className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">WebRTC Integration</h4>
                        <p className="text-sm text-muted-foreground">High-quality voice calls using WebRTC technology</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call Flow Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Call Flow Overview</CardTitle>
                  <CardDescription>
                    How business-initiated calls work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">1</div>
                      <div>
                        <h4 className="font-medium">Obtain Permission</h4>
                        <p className="text-sm text-muted-foreground">Get user consent to receive calls</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">2</div>
                      <div>
                        <h4 className="font-medium">Initiate Call</h4>
                        <p className="text-sm text-muted-foreground">Start call using Cloud API endpoint</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">3</div>
                      <div>
                        <h4 className="font-medium">Establish Connection</h4>
                        <p className="text-sm text-muted-foreground">Use webhook signaling for WebRTC connection</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">4</div>
                      <div>
                        <h4 className="font-medium">Handle Call Events</h4>
                        <p className="text-sm text-muted-foreground">Manage call status and termination</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Blue Tick Verification Process */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600" />
                    WhatsApp Blue Tick Verification
                  </CardTitle>
                  <CardDescription>
                    Get the verified blue checkmark for your business account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <BadgeCheck className="w-4 h-4" />
                    <AlertDescription>
                      Blue tick verification establishes authenticity and builds trust with your customers. It's a paid service through Meta.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium text-blue-900">Meta Verification Pricing</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">Monthly Subscription</span>
                          <span className="font-medium text-blue-900">$14.99/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">Setup Fee (One-time)</span>
                          <span className="font-medium text-blue-900">$25.00</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      asChild
                    >
                      <a 
                        href="https://business.facebook.com/settings/accounts/verification" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply for Blue Tick on Meta
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Verification Requirements
                  </CardTitle>
                  <CardDescription>
                    Documents and information needed for verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Business Registration</h4>
                        <p className="text-sm text-muted-foreground">Valid business license or incorporation documents</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Government-issued ID</h4>
                        <p className="text-sm text-muted-foreground">Passport, driver's license, or national ID</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Website or Social Presence</h4>
                        <p className="text-sm text-muted-foreground">Official website or verified social media accounts</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Contact Information</h4>
                        <p className="text-sm text-muted-foreground">Business phone number and email address</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Article Submission & Meta Links */}
            <div className="space-y-6">
              {/* Article Submission */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Submit Articles for Meta Review
                  </CardTitle>
                  <CardDescription>
                    Submit press articles and media coverage to support verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>
                      News articles and media coverage can strengthen your verification application. Submit 2-3 recent articles about your business.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="article1">Article 1 URL</Label>
                      <Input
                        id="article1"
                        placeholder="https://example.com/news-article-about-your-business"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="article2">Article 2 URL</Label>
                      <Input
                        id="article2"
                        placeholder="https://example.com/press-release"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="article3">Article 3 URL (Optional)</Label>
                      <Input
                        id="article3"
                        placeholder="https://example.com/media-coverage"
                      />
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Save Articles for Submission
                  </Button>
                </CardContent>
              </Card>

              {/* Meta Business Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Meta Business Resources
                  </CardTitle>
                  <CardDescription>
                    Official Meta links for business verification and support
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <Button variant="outline" className="justify-start" asChild>
                      <a 
                        href="https://business.facebook.com/settings/accounts/verification" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <BadgeCheck className="w-4 h-4 mr-2" />
                        Meta Business Verification
                      </a>
                    </Button>
                    
                    <Button variant="outline" className="justify-start" asChild>
                      <a 
                        href="https://developers.facebook.com/docs/whatsapp/cloud-api/getting-started/account-verification" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        WhatsApp Verification Guide
                      </a>
                    </Button>
                    
                    <Button variant="outline" className="justify-start" asChild>
                      <a 
                        href="https://www.facebook.com/business/help/2058515294227817" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Business Verification Help
                      </a>
                    </Button>
                    
                    <Button variant="outline" className="justify-start" asChild>
                      <a 
                        href="https://business.facebook.com/overview" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Meta Business Manager
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="font-medium">Blue Tick Verification</span>
                      </div>
                      <Badge variant="secondary">
                        Not Applied
                      </Badge>
                    </div>

                    <div className="text-center space-y-3">
                      <BadgeCheck className="w-12 h-12 text-blue-500 mx-auto" />
                      <div>
                        <h4 className="font-semibold">Ready to Apply</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete the application process on Meta Business
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppSetup;