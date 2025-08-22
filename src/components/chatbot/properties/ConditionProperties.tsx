import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface ConditionPropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const ConditionProperties: React.FC<ConditionPropertiesProps> = ({ node, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">Condition Node Settings</h3>
        <Separator className="mb-4" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Node Label</Label>
        <Input
          id="label"
          value={String(node.data.label || '')}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="Enter node label..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="condition">Condition Expression</Label>
        <Textarea
          id="condition"
          value={String(node.data.condition || '')}
          onChange={(e) => handleChange('condition', e.target.value)}
          placeholder="e.g., user_input == 'yes' || user_input.includes('help')"
          rows={3}
          className="font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="trueLabel">True Branch Label</Label>
          <Input
            id="trueLabel"
            value={String(node.data.trueLabel || '')}
            onChange={(e) => handleChange('trueLabel', e.target.value)}
            placeholder="Yes"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="falseLabel">False Branch Label</Label>
          <Input
            id="falseLabel"
            value={String(node.data.falseLabel || '')}
            onChange={(e) => handleChange('falseLabel', e.target.value)}
            placeholder="No"
          />
        </div>
      </div>
    </div>
  );
};