-- Fix critical security vulnerability in analytics_daily table
-- Remove the overly permissive policy that allows any user to manipulate analytics data

-- Drop the dangerous policy that allows unrestricted access
DROP POLICY IF EXISTS "Only system can manage analytics data" ON public.analytics_daily;

-- Create a new restrictive policy for system operations only
-- This policy will only allow operations from service role or specific system functions
CREATE POLICY "System processes can manage analytics data" 
ON public.analytics_daily 
FOR ALL 
USING (
  -- Only allow if the request is coming from service role or specific system context
  auth.jwt() ->> 'role' = 'service_role' OR 
  current_setting('role') = 'service_role'
)
WITH CHECK (
  -- Same condition for INSERT/UPDATE operations
  auth.jwt() ->> 'role' = 'service_role' OR 
  current_setting('role') = 'service_role'
);

-- Ensure users can still view their own project analytics (this policy should already exist)
-- But adding it to be safe
CREATE POLICY IF NOT EXISTS "Users can view analytics from their projects" 
ON public.analytics_daily 
FOR SELECT 
USING (
  project_id IN (
    SELECT projects.id 
    FROM projects 
    WHERE projects.user_id = auth.uid()
  )
);