import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface IntegrationPropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const IntegrationProperties: React.FC<IntegrationPropertiesProps> = ({ node, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const integrationServices = [
    { value: 'webhook', label: 'Webhook' },
    { value: 'zapier', label: 'Zapier' },
    { value: 'make', label: 'Make (Integromat)' },
    { value: 'slack', label: 'Slack' },
    { value: 'discord', label: 'Discord' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">Integration Node Settings</h3>
        <Separator className="mb-4" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Node Label</Label>
        <Input
          id="label"
          value={node.data.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="Enter node label..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Integration Service</Label>
        <Select
          value={node.data.service || 'webhook'}
          onValueChange={(value) => handleChange('service', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            {integrationServices.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Webhook URL / Endpoint</Label>
        <Input
          id="url"
          value={node.data.url || ''}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder="https://hooks.zapier.com/hooks/catch/..."
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="payload">Payload Template (JSON)</Label>
        <Textarea
          id="payload"
          value={node.data.payload || ''}
          onChange={(e) => handleChange('payload', e.target.value)}
          placeholder={`{
  "user_input": "{{user_input}}",
  "conversation_id": "{{conversation_id}}",
  "timestamp": "{{timestamp}}"
}`}
          rows={6}
          className="font-mono text-sm"
        />
      </div>

      <div className="p-3 bg-muted/30 rounded-lg">
        <p className="text-sm font-medium mb-2">Service-specific Notes</p>
        <div className="text-xs text-muted-foreground space-y-1">
          {node.data.service === 'webhook' && (
            <p>• Generic webhook integration for any service</p>
          )}
          {node.data.service === 'zapier' && (
            <p>• Use Zapier webhook trigger URL</p>
          )}
          {node.data.service === 'slack' && (
            <p>• Send messages to Slack channels</p>
          )}
          {node.data.service === 'email' && (
            <p>• Send email notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};