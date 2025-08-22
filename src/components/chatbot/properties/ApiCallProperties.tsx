import React from 'react';
import { Node } from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ApiCallPropertiesProps {
  node: Node;
  onUpdate: (data: any) => void;
}

export const ApiCallProperties: React.FC<ApiCallPropertiesProps> = ({ node, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">API Call Node Settings</h3>
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
        <Label htmlFor="method">HTTP Method</Label>
        <Select
          value={node.data.method || 'GET'}
          onValueChange={(value) => handleChange('method', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endpoint">API Endpoint</Label>
        <Input
          id="endpoint"
          value={node.data.endpoint || ''}
          onChange={(e) => handleChange('endpoint', e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headers">Headers (JSON)</Label>
        <Textarea
          id="headers"
          value={node.data.headers || ''}
          onChange={(e) => handleChange('headers', e.target.value)}
          placeholder={`{
  "Content-Type": "application/json",
  "Authorization": "Bearer {{api_key}}"
}`}
          rows={4}
          className="font-mono text-sm"
        />
      </div>

      {(node.data.method === 'POST' || node.data.method === 'PUT' || node.data.method === 'PATCH') && (
        <div className="space-y-2">
          <Label htmlFor="body">Request Body (JSON)</Label>
          <Textarea
            id="body"
            value={node.data.body || ''}
            onChange={(e) => handleChange('body', e.target.value)}
            placeholder={`{
  "message": "{{user_input}}",
  "user_id": "{{user_id}}"
}`}
            rows={4}
            className="font-mono text-sm"
          />
        </div>
      )}

      <div className="p-3 bg-muted/30 rounded-lg">
        <p className="text-sm font-medium mb-2">Variables</p>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">{{user_input}}</Badge>
          <Badge variant="outline" className="text-xs">{{user_id}}</Badge>
          <Badge variant="outline" className="text-xs">{{api_key}}</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Use these variables in your headers and body
        </p>
      </div>
    </div>
  );
};