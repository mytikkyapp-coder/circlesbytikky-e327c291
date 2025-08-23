
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  apiKeyHeader?: string;
  apiKeyValue?: string;
}

serve(async (req: Request) => {
  console.log('API Integration function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      method,
      url,
      headers = {},
      body,
      apiKeyHeader,
      apiKeyValue
    }: ApiRequest = await req.json();

    console.log(`Making ${method} request to: ${url}`);

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    };

    // Add API key if provided
    if (apiKeyHeader && apiKeyValue) {
      requestHeaders[apiKeyHeader] = apiKeyValue;
    }

    // Make the API call
    const apiResponse = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseData = await apiResponse.json().catch(() => null);
    
    console.log(`API response status: ${apiResponse.status}`);

    if (!apiResponse.ok) {
      console.error('API call failed:', responseData);
      return new Response(
        JSON.stringify({
          error: 'API call failed',
          status: apiResponse.status,
          message: responseData?.message || 'Unknown error'
        }),
        {
          status: apiResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: responseData,
        status: apiResponse.status
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in api-integration function:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
