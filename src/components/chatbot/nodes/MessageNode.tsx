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
    <Card className={`min-w-[220px] p-4 shadow-lg transition-all duration-300 ${
      selected ? 'ring-2 ring-primary ring-offset-2 shadow-primary/20' : 'hover:shadow-xl'
    } ${data.isStart ? 'border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent' : 'bg-gradient-to-br from-card via-card/90 to-accent/5 border-accent/20 hover:border-accent/30'}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-xl shadow-sm ${data.isStart ? 'bg-gradient-to-br from-primary/20 to-accent/20' : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'}`}>
          <MessageSquare className={`w-5 h-5 ${data.isStart ? 'text-primary' : 'text-blue-500'}`} />
        </div>
        <span className="font-semibold text-sm">{data.label}</span>
        {data.isStart && (
          <span className="text-xs bg-gradient-to-r from-primary to-accent text-white px-2 py-1 rounded-full shadow-sm font-medium">
            START
          </span>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground mb-3 min-h-[50px] bg-gradient-to-r from-muted/20 to-primary/5 p-3 rounded-lg border border-primary/10">
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