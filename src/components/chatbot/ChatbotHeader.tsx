import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Rocket, 
  Play, 
  Eye, 
  Sparkles, 
  Brain,
  Settings,
  Share2,
  ChevronDown,
  Smartphone,
  Globe,
  Code,
  Link,
  Zap
} from 'lucide-react';

interface ChatbotHeaderProps {
  currentFlow: string | null;
  onBackToDashboard: () => void;
  onPreview: () => void;
}

interface DeploymentSettings {
  name: string;
  description: string;
  whatsappEnabled: boolean;
  webEnabled: boolean;
  webhookUrl: string;
}

export const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ 
  currentFlow, 
  onBackToDashboard, 
  onPreview 
}) => {
  const [deploymentSettings, setDeploymentSettings] = useState<DeploymentSettings>({
    name: 'Customer Support Bot',
    description: 'AI-powered customer support chatbot',
    whatsappEnabled: true,
    webEnabled: true,
    webhookUrl: 'https://your-domain.com/webhook'
  });
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const handleSave = () => {
    console.log('Save chatbot');
  };

  const handleExport = () => {
    console.log('Export chatbot');
  };

  const handleDeploy = () => {
    setShowDeployDialog(true);
  };

  const handleTest = () => {
    console.log('Test chatbot');
  };

  const handleShare = () => {
    console.log('Share chatbot');
  };

  const handleSettings = () => {
    console.log('Open settings');
  };

  const handleDeploySubmit = () => {
    console.log('Deploying with settings:', deploymentSettings);
    setShowDeployDialog(false);
  };

  return (
    <div className="bg-gradient-to-r from-card via-card/80 to-card border-b border-border/50 px-3 lg:px-6 py-3 lg:py-4 flex items-center justify-between backdrop-blur-sm">
      <div className="flex items-center gap-2 lg:gap-4 min-w-0 flex-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBackToDashboard}
          className="p-2 flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 hidden lg:block" />
        
        <div className="flex items-center gap-2 lg:gap-3 min-w-0">
          <div className="p-1.5 lg:p-2 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary shadow-lg flex-shrink-0">
            <Brain className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
              {currentFlow === 'new-flow' ? 'New Chatbot Flow' : 'Customer Support Bot'}
            </h1>
            <p className="text-xs text-muted-foreground hidden lg:block">Visual flow builder</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 shadow-sm hidden sm:flex">
            <Sparkles className="w-3 h-3 mr-1" />
            GPT Enabled
          </Badge>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs hidden lg:flex">
            <Smartphone className="w-3 h-3 mr-1" />
            WhatsApp Ready
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 lg:gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSettings}>
              <Settings className="w-4 h-4 mr-2" />
              Bot Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Smartphone className="w-4 h-4 mr-2" />
              WhatsApp Config
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Code className="w-4 h-4 mr-2" />
              API Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={handleTest}
          className="gap-1 lg:gap-2"
        >
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Test</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          className="gap-1 lg:gap-2"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Preview</span>
        </Button>

        <Separator orientation="vertical" className="h-6 hidden lg:block" />

        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        <Dialog open={showDeployDialog} onOpenChange={setShowDeployDialog}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              onClick={handleDeploy}
              className="gap-1 lg:gap-2 bg-primary hover:bg-primary/90"
            >
              <Rocket className="w-4 h-4" />
              <span className="hidden sm:inline">Deploy</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Deploy Chatbot
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Bot Name</Label>
                <Input
                  id="bot-name"
                  value={deploymentSettings.name}
                  onChange={(e) => setDeploymentSettings(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bot-description">Description</Label>
                <Textarea
                  id="bot-description"
                  value={deploymentSettings.description}
                  onChange={(e) => setDeploymentSettings(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Deployment Channels</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">WhatsApp Business</span>
                  </div>
                  <Switch
                    checked={deploymentSettings.whatsappEnabled}
                    onCheckedChange={(checked) => 
                      setDeploymentSettings(prev => ({ ...prev, whatsappEnabled: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Web Widget</span>
                  </div>
                  <Switch
                    checked={deploymentSettings.webEnabled}
                    onCheckedChange={(checked) => 
                      setDeploymentSettings(prev => ({ ...prev, webEnabled: checked }))
                    }
                  />
                </div>
              </div>

              {deploymentSettings.whatsappEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook-url"
                      value={deploymentSettings.webhookUrl}
                      onChange={(e) => setDeploymentSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                      placeholder="https://your-domain.com/webhook"
                    />
                    <Button variant="outline" size="sm">
                      <Zap className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeployDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDeploySubmit} className="gap-2">
                  <Rocket className="w-4 h-4" />
                  Deploy Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};