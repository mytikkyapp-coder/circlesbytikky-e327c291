import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface KnowledgeBasePropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const KnowledgeBaseProperties: React.FC<KnowledgeBasePropertiesProps> = ({ node, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const providers = [
    { value: 'chatgpt', label: 'ChatGPT (OpenAI)', color: 'bg-green-500' },
    { value: 'gemini', label: 'Gemini (Google)', color: 'bg-blue-500' },
    { value: 'perplexity', label: 'Perplexity AI', color: 'bg-purple-500' },
  ];

  const selectedProvider = providers.find(p => p.value === String(node.data.provider)) || providers[0];

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

      <div className="space-y-2">
        <Label htmlFor="provider">AI Provider</Label>
        <Select
          value={String(node.data.provider || 'chatgpt')}
          onValueChange={(value) => handleChange('provider', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select AI provider" />
          </SelectTrigger>
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem key={provider.value} value={provider.value}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${provider.color}`} />
                  {provider.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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

      <div className="p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${selectedProvider.color}`} />
          <p className="text-sm font-medium">{selectedProvider.label}</p>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          {String(node.data.provider) === 'chatgpt' && (
            <>
              <p>• Uses OpenAI's GPT models</p>
              <p>• Best for general conversation</p>
            </>
          )}
          {String(node.data.provider) === 'gemini' && (
            <>
              <p>• Uses Google's Gemini models</p>
              <p>• Great for factual information</p>
            </>
          )}
          {String(node.data.provider) === 'perplexity' && (
            <>
              <p>• Real-time web search capabilities</p>
              <p>• Perfect for current information</p>
            </>
          )}
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