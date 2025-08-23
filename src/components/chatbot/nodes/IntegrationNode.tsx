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
    <Card className={`min-w-[220px] p-4 shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card/90 to-orange-500/5 border-orange-500/20 ${
      selected ? 'ring-2 ring-primary ring-offset-2 shadow-primary/20' : 'hover:shadow-xl hover:border-orange-500/30'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 shadow-sm">
          <Puzzle className="w-5 h-5 text-orange-600" />
        </div>
        <span className="font-semibold text-sm">{data.label}</span>
      </div>
      
      <div className="space-y-3 mb-3">
        <Badge variant="outline" className="text-xs font-medium bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 border-orange-500/30">
          {data.service || 'webhook'}
        </Badge>
        {data.url && (
          <div className="text-sm text-muted-foreground font-mono bg-gradient-to-r from-muted/30 to-orange-500/10 p-3 rounded-lg border border-orange-500/10 break-all min-h-[40px] flex items-center">
            {data.url}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 text-xs text-orange-600/80">
        <Puzzle className="w-3 h-3" />
        <span>External Service</span>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-orange-500 border-2 border-white dark:border-gray-800 shadow-sm"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-orange-500 border-2 border-white dark:border-gray-800 shadow-sm"
      />
    </Card>
  );
};