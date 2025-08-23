
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Campaign = Tables<'campaigns'>;
type CampaignInsert = TablesInsert<'campaigns'>;
type CampaignUpdate = TablesUpdate<'campaigns'>;

export const useCampaigns = (projectId: string) => {
  return useQuery({
    queryKey: ['campaigns', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          message_templates (
            name,
            body_text
          )
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });
};

export const useCampaign = (id: string) => {
  return useQuery({
    queryKey: ['campaigns', 'single', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          message_templates (
            name,
            body_text,
            category
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaign: CampaignInsert) => {
      const { data, error } = await supabase
        .from('campaigns')
        .insert(campaign)
        .select()
        .single();

      if (error) throw error;
      return data as Campaign;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', data.project_id] });
    },
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: CampaignUpdate }) => {
      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Campaign;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', data.project_id] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', 'single', data.id] });
    },
  });
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
};
