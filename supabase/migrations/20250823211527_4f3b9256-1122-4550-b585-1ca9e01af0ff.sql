
-- Create enum types for better data integrity
CREATE TYPE public.project_plan AS ENUM ('Standard', 'Pro', 'Enterprise');
CREATE TYPE public.project_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.campaign_status AS ENUM ('draft', 'scheduled', 'running', 'completed', 'paused', 'cancelled');
CREATE TYPE public.campaign_type AS ENUM ('broadcast', 'drip', 'triggered');
CREATE TYPE public.message_status AS ENUM ('sent', 'delivered', 'read', 'failed');
CREATE TYPE public.template_status AS ENUM ('draft', 'pending', 'approved', 'rejected');
CREATE TYPE public.contact_status AS ENUM ('active', 'blocked', 'opted_out');

-- Projects table - core workspace for users
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  plan project_plan NOT NULL DEFAULT 'Standard',
  status project_status NOT NULL DEFAULT 'active',
  whatsapp_business_id TEXT,
  whatsapp_phone_number TEXT,
  whatsapp_display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact lists for organizing contacts
CREATE TABLE public.contact_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contacts table for storing WhatsApp contacts
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  phone_number TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  status contact_status NOT NULL DEFAULT 'active',
  tags TEXT[],
  custom_fields JSONB DEFAULT '{}',
  last_message_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, phone_number)
);

-- Junction table for contact list memberships
CREATE TABLE public.contact_list_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_list_id UUID REFERENCES public.contact_lists(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(contact_list_id, contact_id)
);

-- Message templates for WhatsApp Business
CREATE TABLE public.message_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  header_type TEXT, -- 'text', 'image', 'video', 'document'
  header_content TEXT,
  body_text TEXT NOT NULL,
  footer_text TEXT,
  buttons JSONB DEFAULT '[]',
  variables JSONB DEFAULT '[]',
  whatsapp_template_id TEXT,
  status template_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Campaigns for message broadcasting
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES public.message_templates(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  type campaign_type NOT NULL DEFAULT 'broadcast',
  status campaign_status NOT NULL DEFAULT 'draft',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  target_contacts_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  read_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Campaign recipients tracking
CREATE TABLE public.campaign_recipients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  status message_status NOT NULL DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  failed_reason TEXT,
  whatsapp_message_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, contact_id)
);

-- Messages log for all WhatsApp communications
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  template_id UUID REFERENCES public.message_templates(id) ON DELETE SET NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message_type TEXT NOT NULL,
  content TEXT,
  media_url TEXT,
  status message_status,
  whatsapp_message_id TEXT,
  whatsapp_conversation_id TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chatbot flows for automated conversations
CREATE TABLE public.chatbot_flows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  flow_data JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT false,
  trigger_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Analytics aggregated data
CREATE TABLE public.analytics_daily (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  messages_sent INTEGER DEFAULT 0,
  messages_delivered INTEGER DEFAULT 0,
  messages_read INTEGER DEFAULT 0,
  messages_failed INTEGER DEFAULT 0,
  new_contacts INTEGER DEFAULT 0,
  active_conversations INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, date)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_list_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Projects
CREATE POLICY "Users can view their own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own projects" ON public.projects  
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Contact Lists
CREATE POLICY "Users can view contact lists from their projects" ON public.contact_lists
  FOR SELECT USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can create contact lists in their projects" ON public.contact_lists
  FOR INSERT WITH CHECK (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can update contact lists in their projects" ON public.contact_lists
  FOR UPDATE USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete contact lists from their projects" ON public.contact_lists
  FOR DELETE USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- RLS Policies for Contacts
CREATE POLICY "Users can view contacts from their projects" ON public.contacts
  FOR SELECT USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can create contacts in their projects" ON public.contacts
  FOR INSERT WITH CHECK (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can update contacts in their projects" ON public.contacts
  FOR UPDATE USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete contacts from their projects" ON public.contacts
  FOR DELETE USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- RLS Policies for Contact List Members
CREATE POLICY "Users can view contact list members from their projects" ON public.contact_list_members
  FOR SELECT USING (contact_list_id IN (
    SELECT cl.id FROM public.contact_lists cl 
    JOIN public.projects p ON cl.project_id = p.id 
    WHERE p.user_id = auth.uid()
  ));
CREATE POLICY "Users can manage contact list members in their projects" ON public.contact_list_members
  FOR ALL USING (contact_list_id IN (
    SELECT cl.id FROM public.contact_lists cl 
    JOIN public.projects p ON cl.project_id = p.id 
    WHERE p.user_id = auth.uid()
  ));

-- RLS Policies for Message Templates
CREATE POLICY "Users can manage templates in their projects" ON public.message_templates
  FOR ALL USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- RLS Policies for Campaigns
CREATE POLICY "Users can manage campaigns in their projects" ON public.campaigns
  FOR ALL USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- RLS Policies for Campaign Recipients
CREATE POLICY "Users can view campaign recipients from their projects" ON public.campaign_recipients
  FOR SELECT USING (campaign_id IN (
    SELECT c.id FROM public.campaigns c 
    JOIN public.projects p ON c.project_id = p.id 
    WHERE p.user_id = auth.uid()
  ));
CREATE POLICY "Users can manage campaign recipients in their projects" ON public.campaign_recipients
  FOR ALL USING (campaign_id IN (
    SELECT c.id FROM public.campaigns c 
    JOIN public.projects p ON c.project_id = p.id 
    WHERE p.user_id = auth.uid()
  ));

-- RLS Policies for Messages
CREATE POLICY "Users can view messages from their projects" ON public.messages
  FOR SELECT USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can create messages in their projects" ON public.messages
  FOR INSERT WITH CHECK (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- RLS Policies for Chatbot Flows
CREATE POLICY "Users can manage chatbot flows in their projects" ON public.chatbot_flows
  FOR ALL USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- RLS Policies for Analytics
CREATE POLICY "Users can view analytics from their projects" ON public.analytics_daily
  FOR SELECT USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));
CREATE POLICY "System can manage analytics" ON public.analytics_daily
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_contacts_project_id ON public.contacts(project_id);
CREATE INDEX idx_contacts_phone_number ON public.contacts(phone_number);
CREATE INDEX idx_messages_project_id ON public.messages(project_id);
CREATE INDEX idx_messages_contact_id ON public.messages(contact_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_campaigns_project_id ON public.campaigns(project_id);
CREATE INDEX idx_campaign_recipients_campaign_id ON public.campaign_recipients(campaign_id);
CREATE INDEX idx_analytics_project_date ON public.analytics_daily(project_id, date);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON public.projects 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_lists_updated_at 
  BEFORE UPDATE ON public.contact_lists 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at 
  BEFORE UPDATE ON public.contacts 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_templates_updated_at 
  BEFORE UPDATE ON public.message_templates 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at 
  BEFORE UPDATE ON public.campaigns 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chatbot_flows_updated_at 
  BEFORE UPDATE ON public.chatbot_flows 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
