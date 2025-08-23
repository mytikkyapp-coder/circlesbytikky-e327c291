import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { StopCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface EndNodeProps {
  data: {
    label: string;
    message: string;
  };
  selected: boolean;
}

export const EndNode: React.FC<EndNodeProps> = ({ data, selected }) => {
  return (
    <Card className={`min-w-[220px] p-4 shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card/90 to-destructive/5 border-destructive/20 ${
      selected ? 'ring-2 ring-primary ring-offset-2 shadow-primary/20' : 'hover:shadow-xl hover:border-destructive/30'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-destructive/20 to-red-500/20 shadow-sm">
          <StopCircle className="w-5 h-5 text-destructive" />
        </div>
        <span className="font-semibold text-sm">{data.label}</span>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3 min-h-[50px] bg-gradient-to-r from-muted/30 to-destructive/10 p-3 rounded-lg border border-destructive/10 flex items-center">
        {data.message || 'Conversation ended.'}
      </div>

      <div className="flex items-center gap-1 text-xs text-destructive/80">
        <StopCircle className="w-3 h-3" />
        <span>End Point</span>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-destructive border-2 border-white dark:border-gray-800 shadow-sm"
      />
    </Card>
  );
};