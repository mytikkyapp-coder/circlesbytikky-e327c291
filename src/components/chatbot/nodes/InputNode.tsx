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
    <Card className={`min-w-[220px] p-4 shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card/90 to-green-500/5 border-green-500/20 ${
      selected ? 'ring-2 ring-primary ring-offset-2 shadow-primary/20' : 'hover:shadow-xl hover:border-green-500/30'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-sm">
          <Type className="w-5 h-5 text-green-600" />
        </div>
        <span className="font-semibold text-sm">{data.label}</span>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3">
        <div className="border border-green-500/20 rounded-lg px-3 py-2 bg-gradient-to-r from-muted/30 to-green-500/10 min-h-[50px] flex items-center">
          {data.placeholder || 'Enter placeholder...'}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-green-600/80">
        <Type className="w-3 h-3" />
        <span>Type: {data.inputType || 'text'}</span>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 shadow-sm"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 shadow-sm"
      />
    </Card>
  );
};