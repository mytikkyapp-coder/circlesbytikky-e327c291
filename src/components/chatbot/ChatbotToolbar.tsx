import React from 'react';
import { Save, Download, Rocket, Play, Eye, Sparkles, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ChatbotToolbarProps {
  onPreview?: () => void;
}

export const ChatbotToolbar: React.FC<ChatbotToolbarProps> = ({ onPreview }) => {
  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save chatbot');
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export chatbot');
  };

  const handleDeploy = () => {
    // TODO: Implement deploy functionality
    console.log('Deploy chatbot');
  };

  const handleTest = () => {
    // TODO: Implement test functionality
    console.log('Test chatbot');
  };

  const handlePreview = () => {
    onPreview?.();
  };

  return (
    <div className="bg-gradient-to-r from-card via-card/80 to-card border-b border-border/50 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Chatbot Builder
            </h1>
            <p className="text-xs text-muted-foreground">Build intelligent conversations</p>
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
          onClick={handleTest}
          className="gap-2"
        >
          <Play className="w-4 h-4" />
          Test
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePreview}
          className="gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>

        <Separator orientation="vertical" className="h-6" />

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