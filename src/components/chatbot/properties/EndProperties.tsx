import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface EndPropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const EndProperties: React.FC<EndPropertiesProps> = ({ node, onUpdate }) => {
  const handleChange = (field: string, value: string | boolean) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">End Node Settings</h3>
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
        <Label htmlFor="message">Final Message</Label>
        <Textarea
          id="message"
          value={String(node.data.message || '')}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Thank you for using our chatbot! Have a great day!"
          rows={3}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="showFeedback">Show Feedback Request</Label>
          <p className="text-xs text-muted-foreground">
            Ask users to rate their experience
          </p>
        </div>
        <Switch
          id="showFeedback"
          checked={Boolean(node.data.showFeedback)}
          onCheckedChange={(checked) => handleChange('showFeedback', checked)}
        />
      </div>
    </div>
  );
};