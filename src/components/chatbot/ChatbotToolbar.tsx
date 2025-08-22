import React from 'react';
import { Save, Download, Rocket, Play, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export const ChatbotToolbar = () => {
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
    // TODO: Implement preview functionality
    console.log('Preview chatbot');
  };

  return (
    <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Chatbot Builder</h1>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          PRO
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