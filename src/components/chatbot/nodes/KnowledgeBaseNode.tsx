import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KnowledgeBaseNodeProps {
  data: {
    label: string;
    provider?: string;
    model?: string;
    query?: string;
  };
  selected: boolean;
}

export const KnowledgeBaseNode: React.FC<KnowledgeBaseNodeProps> = ({ data, selected }) => {
  const getModelInfo = (model: string) => {
    if (model?.includes('gpt-5')) return { color: 'bg-gradient-to-r from-amber-500 to-orange-500', name: 'GPT-5' };
    if (model?.includes('gpt-4')) return { color: 'bg-gradient-to-r from-purple-500 to-indigo-500', name: 'GPT-4.1' };
    if (model?.includes('o3')) return { color: 'bg-gradient-to-r from-pink-500 to-rose-500', name: 'O3' };
    if (model?.includes('o4')) return { color: 'bg-gradient-to-r from-violet-500 to-purple-500', name: 'O4' };
    return { color: 'bg-gradient-to-r from-green-500 to-emerald-500', name: 'AI Model' };
  };

  const modelInfo = getModelInfo(data.model || 'gpt-5-mini-2025-08-07');

  return (
    <Card className={`min-w-[240px] p-4 shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card/90 to-primary/5 border-primary/20 ${
      selected ? 'ring-2 ring-primary ring-offset-2 shadow-primary/20' : 'hover:shadow-xl hover:border-primary/30'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-sm">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <span className="font-semibold text-sm">{data.label}</span>
      </div>
      
      <div className="space-y-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${modelInfo.color} shadow-sm`} />
          <Badge variant="outline" className={`text-xs font-medium ${modelInfo.color} text-white border-0`}>
            {modelInfo.name}
          </Badge>
        </div>
        {data.query && (
          <div className="text-sm text-muted-foreground bg-gradient-to-r from-muted/30 to-primary/10 p-3 rounded-lg border border-primary/10 min-h-[50px]">
            {data.query}
          </div>
        )}
        <div className="flex items-center gap-1 text-xs text-primary/80">
          <Brain className="w-3 h-3" />
          <span>AI-Powered Responses</span>
        </div>
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