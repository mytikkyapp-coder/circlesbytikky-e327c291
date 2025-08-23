
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type ChatbotFlow = Tables<'chatbot_flows'>;
type ChatbotFlowInsert = TablesInsert<'chatbot_flows'>;
type ChatbotFlowUpdate = TablesUpdate<'chatbot_flows'>;

export const useChatbotFlows = (projectId: string) => {
  return useQuery({
    queryKey: ['chatbot_flows', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chatbot_flows')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ChatbotFlow[];
    },
    enabled: !!projectId,
  });
};

export const useChatbotFlow = (id: string) => {
  return useQuery({
    queryKey: ['chatbot_flows', 'single', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chatbot_flows')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as ChatbotFlow;
    },
    enabled: !!id,
  });
};

export const useCreateChatbotFlow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flow: ChatbotFlowInsert) => {
      const { data, error } = await supabase
        .from('chatbot_flows')
        .insert(flow)
        .select()
        .single();

      if (error) throw error;
      return data as ChatbotFlow;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['chatbot_flows', data.project_id] });
    },
  });
};

export const useUpdateChatbotFlow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ChatbotFlowUpdate }) => {
      const { data, error } = await supabase
        .from('chatbot_flows')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as ChatbotFlow;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['chatbot_flows', data.project_id] });
      queryClient.invalidateQueries({ queryKey: ['chatbot_flows', 'single', data.id] });
    },
  });
};

export const useDeleteChatbotFlow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('chatbot_flows')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbot_flows'] });
    },
  });
};
