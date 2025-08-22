import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MessageNodeProps {
  data: {
    label: string;
    message: string;
    isStart?: boolean;
  };
  selected: boolean;
}

export const MessageNode: React.FC<MessageNodeProps> = ({ data, selected }) => {
  return (
    <Card className={`min-w-[200px] p-3 shadow-md transition-all duration-200 ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    } ${data.isStart ? 'border-primary bg-primary/5' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
          <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
        {data.isStart && (
          <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
            START
          </span>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground mb-3 min-h-[40px]">
        {data.message || 'Enter your message...'}
      </div>

      {!data.isStart && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-blue-500 border-2 border-white dark:border-gray-800"
        />
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white dark:border-gray-800"
      />
    </Card>
  );
};