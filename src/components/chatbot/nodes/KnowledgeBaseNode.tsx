import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KnowledgeBaseNodeProps {
  data: {
    label: string;
    provider: string;
    query?: string;
  };
  selected: boolean;
}

export const KnowledgeBaseNode: React.FC<KnowledgeBaseNodeProps> = ({ data, selected }) => {
  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'chatgpt':
        return 'bg-green-500';
      case 'gemini':
        return 'bg-blue-500';
      case 'perplexity':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className={`min-w-[220px] p-3 shadow-md transition-all duration-200 ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-pink-100 dark:bg-pink-900/30">
          <Brain className="w-4 h-4 text-pink-600 dark:text-pink-400" />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getProviderColor(data.provider)}`} />
          <Badge variant="outline" className="text-xs capitalize">
            {data.provider || 'chatgpt'}
          </Badge>
        </div>
        {data.query && (
          <div className="text-sm text-muted-foreground bg-muted/20 p-2 rounded min-h-[40px]">
            {data.query}
          </div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-pink-500 border-2 border-white dark:border-gray-800"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-pink-500 border-2 border-white dark:border-gray-800"
      />
    </Card>
  );
};