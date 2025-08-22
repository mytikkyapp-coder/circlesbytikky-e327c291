import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Type } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface InputNodeProps {
  data: {
    label: string;
    placeholder: string;
    inputType: string;
  };
  selected: boolean;
}

export const InputNode: React.FC<InputNodeProps> = ({ data, selected }) => {
  return (
    <Card className={`min-w-[200px] p-3 shadow-md transition-all duration-200 ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/30">
          <Type className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3">
        <div className="border border-border rounded px-2 py-1 bg-muted/20">
          {data.placeholder || 'Enter placeholder...'}
        </div>
      </div>

      <div className="text-xs text-muted-foreground mb-2">
        Type: {data.inputType || 'text'}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800"
      />
    </Card>
  );
};