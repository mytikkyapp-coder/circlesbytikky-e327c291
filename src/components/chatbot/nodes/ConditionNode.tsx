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
    <Card className={`min-w-[220px] p-4 shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card/90 to-accent/5 border-accent/20 ${
      selected ? 'ring-2 ring-primary ring-offset-2 shadow-primary/20' : 'hover:shadow-xl hover:border-accent/30'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 shadow-sm">
          <GitBranch className="w-5 h-5 text-accent" />
        </div>
        <span className="font-semibold text-sm">{data.label}</span>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3 min-h-[50px] font-mono bg-gradient-to-r from-muted/30 to-accent/10 p-3 rounded-lg border border-accent/10 flex items-center">
        {data.condition || 'Enter condition...'}
      </div>

      <div className="flex justify-between items-center text-xs mb-2">
        <span className="text-green-600 dark:text-green-400 font-medium">{data.trueLabel || 'True'}</span>
        <span className="text-red-600 dark:text-red-400 font-medium">{data.falseLabel || 'False'}</span>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-accent border-2 border-white dark:border-gray-800 shadow-sm"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        style={{ left: '25%' }}
        className="w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 shadow-sm"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        style={{ left: '75%' }}
        className="w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-800 shadow-sm"
      />
    </Card>
  );
};