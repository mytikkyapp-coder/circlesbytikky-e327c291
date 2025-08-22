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
    <Card className={`min-w-[200px] p-3 shadow-md transition-all duration-200 border-red-200 dark:border-red-800 ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-red-100 dark:bg-red-900/30">
          <StopCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3 min-h-[40px]">
        {data.message || 'Conversation ended.'}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-800"
      />
    </Card>
  );
};