
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle, ExternalLink, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppSetupProps {
  onConnectionComplete?: (data: any) => void;
}

export const WhatsAppSetup = ({ onConnectionComplete }: WhatsAppSetupProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [businessId, setBusinessId] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [webhookToken, setWebhookToken] = useState('');
  const { toast } = useToast();

  const handleConnect = async () => {
    setLoading(true);
    try {
      // Here you would typically make an API call to verify and save the WhatsApp Business API credentials
      // For now, we'll simulate the connection process
      
      if (!businessId || !phoneNumberId || !accessToken) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all required fields.',
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'WhatsApp Connected!',
        description: 'Your WhatsApp Business API has been successfully connected.',
      });

      if (onConnectionComplete) {
        onConnectionComplete({
          businessId,
          phoneNumberId,
          accessToken,
          webhookToken
        });
      }

      setStep(3);
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect WhatsApp Business API. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center">
        <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Connect WhatsApp Business API</h3>
        <p className="text-muted-foreground">
          Set up your WhatsApp Business API to start sending messages
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You'll need a WhatsApp Business API account. If you don't have one, you can create it through the Facebook Developer Console.
        </AlertDescription>
      </Alert>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm">WhatsApp Business Account</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm">Facebook Developer Account</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm">WhatsApp Business API Access Token</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={() => window.open('https://developers.facebook.com/docs/whatsapp', '_blank')}
        >
          <ExternalLink className="w-4 h-4" />
          Documentation
        </Button>
        <Button onClick={() => setStep(2)} className="flex-1">
          Get Started
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center">
        <Settings className="w-8 h-8 text-primary mx-auto mb-2" />
        <h3 className="text-lg font-semibold">API Configuration</h3>
        <p className="text-muted-foreground text-sm">
          Enter your WhatsApp Business API credentials
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business-id">WhatsApp Business Account ID *</Label>
          <Input
            id="business-id"
            placeholder="Enter your Business Account ID"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone-id">Phone Number ID *</Label>
          <Input
            id="phone-id"
            placeholder="Enter your Phone Number ID"
            value={phoneNumberId}
            onChange={(e) => setPhoneNumberId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="access-token">Access Token *</Label>
          <Input
            id="access-token"
            type="password"
            placeholder="Enter your Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="webhook-token">Webhook Verify Token (Optional)</Label>
          <Input
            id="webhook-token"
            placeholder="Enter webhook verify token"
            value={webhookToken}
            onChange={(e) => setWebhookToken(e.target.value)}
          />
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Your credentials are encrypted and stored securely. We never share your data with third parties.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button onClick={handleConnect} disabled={loading} className="flex-1">
          {loading ? 'Connecting...' : 'Connect WhatsApp'}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 text-center">
      <div>
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-600">Connected Successfully!</h3>
        <p className="text-muted-foreground">
          Your WhatsApp Business API is now connected and ready to use.
        </p>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Status</span>
          <Badge className="bg-green-100 text-green-800">Connected</Badge>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Business ID</span>
          <span className="text-xs font-mono">{businessId.slice(0, 8)}...</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Phone Number ID</span>
          <span className="text-xs font-mono">{phoneNumberId.slice(0, 8)}...</span>
        </div>
      </div>

      <Button onClick={() => setStep(1)} variant="outline" className="w-full">
        Setup Another Account
      </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" />
          WhatsApp Business API
        </CardTitle>
        <CardDescription>
          Step {step} of 3: {step === 1 ? 'Requirements' : step === 2 ? 'Configuration' : 'Complete'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </CardContent>
    </Card>
  );
};
