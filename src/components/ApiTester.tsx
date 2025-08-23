
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useApiIntegration } from '@/hooks/useApiIntegration';
import { Loader2, Send, Code } from 'lucide-react';

const ApiTester = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('{}');
  const [apiKeyHeader, setApiKeyHeader] = useState('');
  const [apiKeyValue, setApiKeyValue] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { callApi } = useApiIntegration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      let parsedHeaders = {};
      let parsedBody = null;

      // Parse headers
      if (headers.trim()) {
        try {
          parsedHeaders = JSON.parse(headers);
        } catch (error) {
          throw new Error('Invalid JSON in headers');
        }
      }

      // Parse body for POST/PUT/PATCH requests
      if (['POST', 'PUT', 'PATCH'].includes(method) && body.trim()) {
        try {
          parsedBody = JSON.parse(body);
        } catch (error) {
          throw new Error('Invalid JSON in request body');
        }
      }

      const result = await callApi({
        method,
        url,
        headers: parsedHeaders,
        body: parsedBody,
        apiKeyHeader: apiKeyHeader || undefined,
        apiKeyValue: apiKeyValue || undefined,
      });

      setResponse(result);
    } catch (error) {
      setResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            API Integration Tester
          </CardTitle>
          <CardDescription>
            Test external API integrations securely through Supabase Edge Functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="method">Method</Label>
                <Select value={method} onValueChange={(value: any) => setMethod(value)}>
                  <SelectTrigger>
                    <SelectValue />
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
              <div className="md:col-span-3">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com/endpoint"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="apiKeyHeader">API Key Header (optional)</Label>
                <Input
                  id="apiKeyHeader"
                  value={apiKeyHeader}
                  onChange={(e) => setApiKeyHeader(e.target.value)}
                  placeholder="Authorization"
                />
              </div>
              <div>
                <Label htmlFor="apiKeyValue">API Key Value (optional)</Label>
                <Input
                  id="apiKeyValue"
                  type="password"
                  value={apiKeyValue}
                  onChange={(e) => setApiKeyValue(e.target.value)}
                  placeholder="Bearer your-api-key"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="headers">Headers (JSON)</Label>
              <Textarea
                id="headers"
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder='{"Content-Type": "application/json"}'
                rows={3}
                className="font-mono text-sm"
              />
            </div>

            {['POST', 'PUT', 'PATCH'].includes(method) && (
              <div>
                <Label htmlFor="body">Request Body (JSON)</Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Making API Call...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Response
              {response.error ? (
                <Badge variant="destructive">Error</Badge>
              ) : (
                <Badge variant="default">Success</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApiTester;
