
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from '@/hooks/useAuth';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import MyProjects from '@/pages/MyProjects';
import ApiIntegrationPage from '@/pages/ApiIntegrationPage';
import Integrations from '@/pages/Integrations';
import NotFound from '@/pages/NotFound';
import { AuthGuard } from '@/components/AuthGuard';
import WhatsAppSetupPage from '@/pages/WhatsAppSetup';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/whatsapp-setup" element={<WhatsAppSetupPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/my-projects" 
                element={
                  <AuthGuard>
                    <MyProjects />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/api-integration" 
                element={
                  <AuthGuard>
                    <ApiIntegrationPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/integrations" 
                element={
                  <AuthGuard>
                    <Integrations />
                  </AuthGuard>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
