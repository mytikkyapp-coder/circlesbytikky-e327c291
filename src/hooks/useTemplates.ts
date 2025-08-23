
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type MessageTemplate = Tables<'message_templates'>;
type MessageTemplateInsert = TablesInsert<'message_templates'>;
type MessageTemplateUpdate = TablesUpdate<'message_templates'>;

export const useTemplates = (projectId: string) => {
  return useQuery({
    queryKey: ['templates', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('message_templates')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MessageTemplate[];
    },
    enabled: !!projectId,
  });
};

export const useTemplate = (id: string) => {
  return useQuery({
    queryKey: ['templates', 'single', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('message_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as MessageTemplate;
    },
    enabled: !!id,
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (template: MessageTemplateInsert) => {
      const { data, error } = await supabase
        .from('message_templates')
        .insert(template)
        .select()
        .single();

      if (error) throw error;
      return data as MessageTemplate;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['templates', data.project_id] });
    },
  });
};

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: MessageTemplateUpdate }) => {
      const { data, error } = await supabase
        .from('message_templates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as MessageTemplate;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['templates', data.project_id] });
      queryClient.invalidateQueries({ queryKey: ['templates', 'single', data.id] });
    },
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('message_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
};
