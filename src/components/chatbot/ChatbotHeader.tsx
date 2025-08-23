import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  Share2
} from 'lucide-react';

interface ChatbotHeaderProps {
  currentFlow: string | null;
  onBackToDashboard: () => void;
  onPreview: () => void;
}

export const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ 
  currentFlow, 
  onBackToDashboard, 
  onPreview 
}) => {
  const handleSave = () => {
    console.log('Save chatbot');
  };

  const handleExport = () => {
    console.log('Export chatbot');
  };

  const handleDeploy = () => {
    console.log('Deploy chatbot');
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

  return (
    <div className="bg-gradient-to-r from-card via-card/80 to-card border-b border-border/50 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBackToDashboard}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {currentFlow === 'new-flow' ? 'New Chatbot Flow' : 'Customer Support Bot'}
            </h1>
            <p className="text-xs text-muted-foreground">Visual flow builder</p>
          </div>
        </div>
        
        <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 shadow-sm">
          <Sparkles className="w-3 h-3 mr-1" />
          GPT Enabled
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSettings}
          className="gap-2"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleTest}
          className="gap-2"
        >
          <Play className="w-4 h-4" />
          Test
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          className="gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>

        <Separator orientation="vertical" className="h-6" />

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

        <Button
          size="sm"
          onClick={handleDeploy}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Rocket className="w-4 h-4" />
          Deploy
        </Button>
      </div>
    </div>
  );
};