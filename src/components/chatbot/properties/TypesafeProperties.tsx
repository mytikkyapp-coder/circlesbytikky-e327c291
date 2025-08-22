// Type-safe property components to fix TypeScript issues
import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Helper function to safely get string value
const getString = (value: unknown, defaultValue = ''): string => {
  return typeof value === 'string' ? value : defaultValue;
};

// Helper function to safely get boolean value
const getBoolean = (value: unknown, defaultValue = false): boolean => {
  return typeof value === 'boolean' ? value : defaultValue;
};

interface BasePropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const InputProperties: React.FC<BasePropertiesProps> = ({ node, onUpdate }) => {
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
          value={getString(node.data.label)}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="Enter node label..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="placeholder">Placeholder Text</Label>
        <Input
          id="placeholder"
          value={getString(node.data.placeholder)}
          onChange={(e) => handleChange('placeholder', e.target.value)}
          placeholder="Enter placeholder text..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inputType">Input Type</Label>
        <Select
          value={getString(node.data.inputType, 'text')}
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

      <div className="p-3 bg-muted/30 rounded-lg">
        <p className="text-sm font-medium">Preview</p>
        <div className="mt-2 p-2 border rounded bg-background">
          <input 
            type={getString(node.data.inputType, 'text')}
            placeholder={getString(node.data.placeholder, 'Enter your response...')}
            className="w-full bg-transparent text-sm"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export const EndProperties: React.FC<BasePropertiesProps> = ({ node, onUpdate }) => {
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
          value={getString(node.data.label)}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="Enter node label..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Final Message</Label>
        <Textarea
          id="message"
          value={getString(node.data.message)}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Thank you for using our chatbot! Have a great day!"
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          This message will be displayed before ending the conversation
        </p>
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
          checked={getBoolean(node.data.showFeedback)}
          onCheckedChange={(checked) => handleChange('showFeedback', checked)}
        />
      </div>

      {getBoolean(node.data.showFeedback) && (
        <div className="space-y-2">
          <Label htmlFor="feedbackMessage">Feedback Message</Label>
          <Input
            id="feedbackMessage"
            value={getString(node.data.feedbackMessage)}
            onChange={(e) => handleChange('feedbackMessage', e.target.value)}
            placeholder="How would you rate this conversation?"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="allowRestart">Allow Restart</Label>
          <p className="text-xs text-muted-foreground">
            Show button to restart conversation
          </p>
        </div>
        <Switch
          id="allowRestart"
          checked={getBoolean(node.data.allowRestart)}
          onCheckedChange={(checked) => handleChange('allowRestart', checked)}
        />
      </div>

      {getBoolean(node.data.allowRestart) && (
        <div className="space-y-2">
          <Label htmlFor="restartMessage">Restart Button Text</Label>
          <Input
            id="restartMessage"
            value={getString(node.data.restartMessage)}
            onChange={(e) => handleChange('restartMessage', e.target.value)}
            placeholder="Start New Conversation"
          />
        </div>
      )}

      <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
        <p className="text-sm font-medium text-red-800 dark:text-red-200">End Node</p>
        <p className="text-xs text-red-600 dark:text-red-300 mt-1">
          This node terminates the conversation flow. No connections can be made from this node.
        </p>
      </div>
    </div>
  );
};