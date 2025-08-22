import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { GitBranch } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ConditionNodeProps {
  data: {
    label: string;
    condition: string;
    trueLabel: string;
    falseLabel: string;
  };
  selected: boolean;
}

export const ConditionNode: React.FC<ConditionNodeProps> = ({ data, selected }) => {
  return (
    <Card className={`min-w-[220px] p-3 shadow-md transition-all duration-200 ${
      selected ? 'ring-2 ring-primary ring-offset-2' : ''
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-yellow-100 dark:bg-yellow-900/30">
          <GitBranch className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3 min-h-[40px] font-mono text-xs bg-muted/20 p-2 rounded">
        {data.condition || 'Enter condition...'}
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-green-600">{data.trueLabel || 'True'}</span>
        <span className="text-red-600">{data.falseLabel || 'False'}</span>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-yellow-500 border-2 border-white dark:border-gray-800"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        style={{ left: '25%' }}
        className="w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        style={{ left: '75%' }}
        className="w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-800"
      />
    </Card>
  );
};