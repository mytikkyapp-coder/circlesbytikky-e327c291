-- Fix security vulnerability in analytics_daily table
-- Remove the overly permissive policy that allows anyone to manage analytics
DROP POLICY IF EXISTS "System can manage analytics" ON public.analytics_daily;

-- Create a restrictive policy that only allows system/service role to insert/update/delete analytics
-- This policy uses the service_role which is used by edge functions and system processes
CREATE POLICY "Only system can manage analytics data" 
ON public.analytics_daily 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Keep the existing policy that allows users to view analytics from their own projects
-- This policy already exists and is properly scoped:
-- "Users can view analytics from their projects" FOR SELECT

-- Optional: Add a policy to allow authenticated users to insert analytics for their own projects
-- This is more restrictive than the previous "true" condition
CREATE POLICY "Users can insert analytics for their projects" 
ON public.analytics_daily 
FOR INSERT 
TO authenticated
WITH CHECK (project_id IN (
  SELECT projects.id 
  FROM projects 
  WHERE projects.user_id = auth.uid()
));