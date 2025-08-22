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
    <Card className={`min-w-[220px] p-3 shadow-md transition-all duration-200 ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900/30">
          <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {data.method || 'GET'}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground font-mono text-xs bg-muted/20 p-2 rounded break-all">
          {data.endpoint || 'https://api.example.com'}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500 border-2 border-white dark:border-gray-800"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-500 border-2 border-white dark:border-gray-800"
      />
    </Card>
  );
};