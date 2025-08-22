import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Puzzle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IntegrationNodeProps {
  data: {
    label: string;
    service: string;
    url?: string;
  };
  selected: boolean;
}

export const IntegrationNode: React.FC<IntegrationNodeProps> = ({ data, selected }) => {
  return (
    <Card className={`min-w-[200px] p-3 shadow-md transition-all duration-200 ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30">
          <Puzzle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      <div className="space-y-2 mb-3">
        <Badge variant="secondary" className="text-xs">
          {data.service || 'webhook'}
        </Badge>
        {data.url && (
          <div className="text-sm text-muted-foreground font-mono text-xs bg-muted/20 p-2 rounded break-all">
            {data.url}
          </div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-orange-500 border-2 border-white dark:border-gray-800"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-orange-500 border-2 border-white dark:border-gray-800"
      />
    </Card>
  );
};