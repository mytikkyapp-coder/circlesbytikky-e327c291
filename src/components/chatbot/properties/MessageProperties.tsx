import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface MessagePropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const MessageProperties: React.FC<MessagePropertiesProps> = ({ node, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">Message Node Settings</h3>
        <Separator className="mb-4" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Node Label</Label>
        <Input
          id="label"
          value={(node.data.label as string) || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="Enter node label..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message Content</Label>
        <Textarea
          id="message"
          value={(node.data.message as string) || ''}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Enter your message here..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          This message will be displayed to the user
        </p>
      </div>

      {node.data.isStart && (
        <div className="p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary font-medium">Start Node</p>
          <p className="text-xs text-muted-foreground mt-1">
            This is the entry point of your chatbot conversation
          </p>
        </div>
      )}
    </div>
  );
};