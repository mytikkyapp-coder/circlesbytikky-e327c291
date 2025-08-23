import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
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
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ConnectionStatus = "not_started" | "connecting" | "connected" | "failed" | "pending_approval";

const WhatsAppSetup = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("not_started");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [progress, setProgress] = useState(0);
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">WhatsApp Business API</h1>
            <p className="text-muted-foreground">Connect your WhatsApp Business account to start messaging</p>
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

          {/* Connected Projects with Billing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                My Connected Projects
              </CardTitle>
              <CardDescription>
                WhatsApp integrations with billing and status details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* E-commerce Store Project */}
                <div className="p-6 bg-muted/50 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">E-commerce Store</h4>
                        <p className="text-sm text-muted-foreground">Customer support & order updates</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Current Plan</p>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">$49/month</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Next Billing</p>
                      <p className="font-medium">Dec 25, 2024</p>
                      <p className="text-sm text-green-600">Auto-renew ON</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Renew Now
                    </Button>
                    <Button size="sm" variant="outline">
                      View Usage
                    </Button>
                  </div>
                </div>

                {/* Marketing Campaign Project */}
                <div className="p-6 bg-muted/50 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Marketing Campaign</h4>
                        <p className="text-sm text-muted-foreground">Promotional broadcasts & engagement</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Current Plan</p>
                      <p className="font-medium">Starter Plan</p>
                      <p className="text-sm text-muted-foreground">$19/month</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Next Billing</p>
                      <p className="font-medium">Jan 5, 2025</p>
                      <p className="text-sm text-green-600">Auto-renew ON</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Renew Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Upgrade Plan
                    </Button>
                  </div>
                </div>

                {/* Lead Generation Project */}
                <div className="p-6 bg-muted/50 rounded-lg space-y-4 opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Lead Generation</h4>
                        <p className="text-sm text-muted-foreground">Automated follow-ups & nurturing</p>
                      </div>
                    </div>
                    <Badge variant="outline">Payment Required</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Selected Plan</p>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">$49/month</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-medium text-yellow-600">Setup Required</p>
                      <p className="text-sm text-muted-foreground">Payment pending</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="bg-primary">
                      Complete Setup
                    </Button>
                    <Button size="sm" variant="outline">
                      Change Plan
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Total Monthly Cost</p>
                    <p className="text-sm text-muted-foreground">2 active projects + 1 pending</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$68</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                </div>

                <Button className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Manage All Projects & Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSetup;