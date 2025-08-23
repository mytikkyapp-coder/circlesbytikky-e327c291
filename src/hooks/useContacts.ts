
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Contact = Tables<'contacts'>;
type ContactInsert = TablesInsert<'contacts'>;
type ContactUpdate = TablesUpdate<'contacts'>;

export const useContacts = (projectId: string) => {
  return useQuery({
    queryKey: ['contacts', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Contact[];
    },
    enabled: !!projectId,
  });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: ['contacts', 'single', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Contact;
    },
    enabled: !!id,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contact: ContactInsert) => {
      const { data, error } = await supabase
        .from('contacts')
        .insert(contact)
        .select()
        .single();

      if (error) throw error;
      return data as Contact;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts', data.project_id] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ContactUpdate }) => {
      const { data, error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Contact;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts', data.project_id] });
      queryClient.invalidateQueries({ queryKey: ['contacts', 'single', data.id] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};
