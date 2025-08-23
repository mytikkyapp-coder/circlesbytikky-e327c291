
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ApiCallOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  apiKeyHeader?: string;
  apiKeyValue?: string;
}

export const useApiIntegration = () => {
  const { toast } = useToast();

  const callApi = async (options: ApiCallOptions) => {
    try {
      console.log('Making API call through edge function:', options);
      
      const { data, error } = await supabase.functions.invoke('api-integration', {
        body: options
      });

      if (error) {
        console.error('Edge function error:', error);
        toast({
          title: "API Error",
          description: error.message || "Failed to call API",
          variant: "destructive",
        });
        throw error;
      }

      if (!data.success) {
        console.error('API call failed:', data);
        toast({
          title: "API Call Failed",
          description: data.message || "External API returned an error",
          variant: "destructive",
        });
        throw new Error(data.message || 'API call failed');
      }

      toast({
        title: "Success",
        description: "API call completed successfully",
      });

      return data.data;
    } catch (error) {
      console.error('API integration error:', error);
      throw error;
    }
  };

  return { callApi };
};
