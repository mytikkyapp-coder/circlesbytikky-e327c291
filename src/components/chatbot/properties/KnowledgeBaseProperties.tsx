import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { GPTModelSelector } from '../GPTModelSelector';

interface KnowledgeBasePropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const KnowledgeBaseProperties: React.FC<KnowledgeBasePropertiesProps> = ({ node, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };


  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">Knowledge Base Node Settings</h3>
        <Separator className="mb-4" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Node Label</Label>
        <Input
          id="label"
          value={String(node.data.label || '')}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="Enter node label..."
        />
      </div>

      <GPTModelSelector 
        value={String(node.data.model || 'gpt-5-mini-2025-08-07')}
        onValueChange={(value) => handleChange('model', value)}
      />

      <div className="space-y-2">
        <Label htmlFor="systemPrompt">System Prompt</Label>
        <Textarea
          id="systemPrompt"
          value={String(node.data.systemPrompt || '')}
          onChange={(e) => handleChange('systemPrompt', e.target.value)}
          placeholder="You are a helpful assistant. Answer questions based on the provided context..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="query">Query Template</Label>
        <Textarea
          id="query"
          value={String(node.data.query || '')}
          onChange={(e) => handleChange('query', e.target.value)}
          placeholder="Based on the user's question: {{user_input}}, provide a helpful answer."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="temperature">Temperature (0-1)</Label>
        <Input
          id="temperature"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={String(node.data.temperature || '0.7')}
          onChange={(e) => handleChange('temperature', e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Lower values = more focused, Higher values = more creative
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxTokens">Max Tokens</Label>
        <Input
          id="maxTokens"
          type="number"
          min="1"
          max="4000"
          value={String(node.data.maxTokens || '1000')}
          onChange={(e) => handleChange('maxTokens', e.target.value)}
        />
      </div>

      <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="text-sm font-semibold">AI-Powered Knowledge Base</p>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>• Intelligent responses using latest GPT models</p>
          <p>• Context-aware conversation handling</p>
          <p>• Dynamic knowledge integration</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        <Badge variant="outline" className="text-xs">{"{{user_input}}"}</Badge>
        <Badge variant="outline" className="text-xs">{"{{conversation_history}}"}</Badge>
        <Badge variant="outline" className="text-xs">{"{{user_name}}"}</Badge>
      </div>
    </div>
  );
};