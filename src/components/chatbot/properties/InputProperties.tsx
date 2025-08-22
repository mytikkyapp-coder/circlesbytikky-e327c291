import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface InputPropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const InputProperties: React.FC<InputPropertiesProps> = ({ node, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">Input Node Settings</h3>
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
        <Label htmlFor="placeholder">Placeholder Text</Label>
        <Input
          id="placeholder"
          value={String(node.data.placeholder || '')}
          onChange={(e) => handleChange('placeholder', e.target.value)}
          placeholder="Enter placeholder text..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inputType">Input Type</Label>
        <Select
          value={String(node.data.inputType || 'text')}
          onValueChange={(value) => handleChange('inputType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select input type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="textarea">Textarea</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};