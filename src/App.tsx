
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProjectLayout } from "./components/ProjectLayout";
import Index from "./pages/Index";
import Home from "./pages/Home";
import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";
import MyWorkspace from "./pages/MyWorkspace";
import WhatsAppSetup from "./pages/WhatsAppSetup";
import KYC from "./pages/KYC";
import Pricing from "./pages/Pricing";
import Help from "./pages/Help";
import SupportTickets from "./pages/SupportTickets";
import ProjectDashboard from "./pages/ProjectDashboard";
import Dashboard from "./pages/Dashboard";
import CoreFeatures from "./pages/CoreFeatures";
import Circles from "./pages/Circles";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import Campaigns from "./pages/Campaigns";
import Templates from "./pages/Templates";
import LaunchAds from "./pages/LaunchAds";
import Analytics from "./pages/Analytics";
import ChatbotBuilder from "./pages/ChatbotBuilder";
import Wallet from "./pages/Wallet";
import Integrations from "./pages/Integrations";
import WhatsAppChat from "./pages/WhatsAppChat";
import WhatsAppCallingCRM from "./pages/WhatsAppCallingCRM";
import NotFound from "./pages/NotFound";

// CRM Sector Pages
import CloudKitchenCRM from "./pages/crm/CloudKitchenCRM";
import HealthcareCRM from "./pages/crm/HealthcareCRM";
import EducationCRM from "./pages/crm/EducationCRM";
import AutomotiveCRM from "./pages/crm/AutomotiveCRM";
import RetailCRM from "./pages/crm/RetailCRM";
import RealEstateCRM from "./pages/crm/RealEstateCRM";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes with main layout */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/create-project" element={<Layout><CreateProject /></Layout>} />
          <Route path="/my-projects" element={<Layout><MyProjects /></Layout>} />
          <Route path="/my-workspace" element={<Layout><MyWorkspace /></Layout>} />
          <Route path="/whatsapp-setup" element={<Layout><WhatsAppSetup /></Layout>} />
          <Route path="/kyc" element={<Layout><KYC /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/help" element={<Layout><Help /></Layout>} />
          <Route path="/support-tickets" element={<Layout><SupportTickets /></Layout>} />
          
          {/* CRM Sector Routes */}
          <Route path="/crm/cloud-kitchen" element={<Layout><CloudKitchenCRM /></Layout>} />
          <Route path="/crm/healthcare" element={<Layout><HealthcareCRM /></Layout>} />
          <Route path="/crm/education" element={<Layout><EducationCRM /></Layout>} />
          <Route path="/crm/automotive" element={<Layout><AutomotiveCRM /></Layout>} />
          <Route path="/crm/retail" element={<Layout><RetailCRM /></Layout>} />
          <Route path="/crm/real-estate" element={<Layout><RealEstateCRM /></Layout>} />

          {/* Project-specific routes with project layout */}
          <Route path="/project/:projectId" element={<ProjectLayout><ProjectDashboard /></ProjectLayout>} />
          <Route path="/project/:projectId/dashboard" element={<ProjectLayout><Dashboard /></ProjectLayout>} />
          <Route path="/project/:projectId/core-features" element={<ProjectLayout><CoreFeatures /></ProjectLayout>} />
          <Route path="/project/:projectId/circles" element={<ProjectLayout><Circles /></ProjectLayout>} />
          <Route path="/project/:projectId/members" element={<ProjectLayout><Members /></ProjectLayout>} />
          <Route path="/project/:projectId/settings" element={<ProjectLayout><Settings /></ProjectLayout>} />
          <Route path="/project/:projectId/campaigns" element={<ProjectLayout><Campaigns /></ProjectLayout>} />
          <Route path="/project/:projectId/templates" element={<ProjectLayout><Templates /></ProjectLayout>} />
          <Route path="/project/:projectId/launch-ads" element={<ProjectLayout><LaunchAds /></ProjectLayout>} />
          <Route path="/project/:projectId/analytics" element={<ProjectLayout><Analytics /></ProjectLayout>} />
          <Route path="/project/:projectId/chatbot-builder" element={<ProjectLayout><ChatbotBuilder /></ProjectLayout>} />
          <Route path="/project/:projectId/whatsapp-setup" element={<ProjectLayout><WhatsAppSetup /></ProjectLayout>} />
          <Route path="/project/:projectId/whatsapp-chat" element={<ProjectLayout><WhatsAppChat /></ProjectLayout>} />
          <Route path="/project/:projectId/whatsapp-calling-crm" element={<ProjectLayout><WhatsAppCallingCRM /></ProjectLayout>} />
          <Route path="/project/:projectId/kyc" element={<ProjectLayout><KYC /></ProjectLayout>} />
          <Route path="/project/:projectId/wallet" element={<ProjectLayout><Wallet /></ProjectLayout>} />
          <Route path="/project/:projectId/integrations" element={<ProjectLayout><Integrations /></ProjectLayout>} />

          {/* 404 route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
