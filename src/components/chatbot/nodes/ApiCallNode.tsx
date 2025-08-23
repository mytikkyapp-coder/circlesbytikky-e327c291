import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ApiCallNodeProps {
  data: {
    label: string;
    endpoint: string;
    method: string;
  };
  selected: boolean;
}

export const ApiCallNode: React.FC<ApiCallNodeProps> = ({ data, selected }) => {
  return (
    <Card className={`min-w-[220px] p-4 shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card/90 to-secondary/5 border-secondary/20 ${
      selected ? 'ring-2 ring-primary ring-offset-2 shadow-primary/20' : 'hover:shadow-xl hover:border-secondary/30'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 shadow-sm">
          <Zap className="w-5 h-5 text-secondary" />
        </div>
        <span className="font-semibold text-sm">{data.label}</span>
      </div>
      
      <div className="space-y-3 mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-medium bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary border-secondary/30">
            {data.method || 'GET'}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground font-mono bg-gradient-to-r from-muted/30 to-secondary/10 p-3 rounded-lg border border-secondary/10 break-all min-h-[40px] flex items-center">
          {data.endpoint || 'https://api.example.com'}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-secondary border-2 border-white dark:border-gray-800 shadow-sm"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-secondary border-2 border-white dark:border-gray-800 shadow-sm"
      />
    </Card>
  );
};