
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { AuthGuard } from "./components/AuthGuard";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import ProjectFeatures from "./pages/ProjectFeatures";
import FrontPage from "./pages/FrontPage";
import Dashboard from "./pages/Dashboard";
import Circles from "./pages/Circles";
import Members from "./pages/Members";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignAnalytics from "./pages/CampaignAnalytics";
import Templates from "./pages/Templates";
import TemplateBuilder from "./pages/TemplateBuilder";
import Analytics from "./pages/Analytics";
import LaunchAds from "./pages/LaunchAds";
import Wallet from "./pages/Wallet";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import HelpArticle from "./pages/help/HelpArticle";
import HelpCategory from "./pages/help/HelpCategory";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import MemberProfile from "./pages/MemberProfile";
import MyProjects from "./pages/MyProjects";
import CreateProject from "./pages/CreateProject";
import MyWorkspace from "./pages/MyWorkspace";
import WhatsAppSetup from "./pages/WhatsAppSetup";
import WhatsAppChat from "./pages/WhatsAppChat";
import SupportTickets from "./pages/SupportTickets";
import Pricing from "./pages/Pricing";
import KYC from "./pages/KYC";
import AddMember from "./pages/AddMember";
import ChatbotBuilder from "./pages/ChatbotBuilder";
import ProjectDashboard from "./pages/ProjectDashboard";
import AIAdsLanding from "./pages/AIAdsLanding";
import CallingAPILanding from "./pages/CallingAPILanding";
import WhatsAppCallingCRM from "./pages/WhatsAppCallingCRM";
import MetaAPIIntegration from "./pages/MetaAPIIntegration";
import { ProjectLayout } from "./components/ProjectLayout";
import ManageCircle from "./pages/ManageCircle";
import WorkspaceSetup from "./pages/WorkspaceSetup";
import BusinessSetup from "./pages/BusinessSetup";
import CoreFeatures from "./pages/CoreFeatures";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes with Layout */}
            <Route path="/" element={<AuthGuard><Layout><Home /></Layout></AuthGuard>} />
            <Route path="/create-project" element={<AuthGuard><Layout><CreateProject /></Layout></AuthGuard>} />
            <Route path="/my-projects" element={<AuthGuard><Layout><MyProjects /></Layout></AuthGuard>} />
            <Route path="/my-workspace" element={<AuthGuard><Layout><MyWorkspace /></Layout></AuthGuard>} />
            <Route path="/home" element={<AuthGuard><Layout><Home /></Layout></AuthGuard>} />
            <Route path="/dashboard" element={<AuthGuard><Layout><Dashboard /></Layout></AuthGuard>} />
            <Route path="/circles" element={<AuthGuard><Layout><Circles /></Layout></AuthGuard>} />
            <Route path="/circles/:circleId/manage" element={<AuthGuard><Layout><ManageCircle /></Layout></AuthGuard>} />
            <Route path="/members" element={<AuthGuard><Layout><Members /></Layout></AuthGuard>} />
            <Route path="/campaigns" element={<AuthGuard><Layout><Campaigns /></Layout></AuthGuard>} />
            <Route path="/templates" element={<AuthGuard><Layout><Templates /></Layout></AuthGuard>} />
            <Route path="/analytics" element={<AuthGuard><Layout><Analytics /></Layout></AuthGuard>} />
            <Route path="/launch-ads" element={<AuthGuard><Layout><LaunchAds /></Layout></AuthGuard>} />
            <Route path="/whatsapp-setup" element={<AuthGuard><Layout><WhatsAppSetup /></Layout></AuthGuard>} />
            <Route path="/kyc" element={<AuthGuard><Layout><KYC /></Layout></AuthGuard>} />
            <Route path="/wallet" element={<AuthGuard><Layout><Wallet /></Layout></AuthGuard>} />
            <Route path="/integrations" element={<AuthGuard><Layout><Integrations /></Layout></AuthGuard>} />
            <Route path="/settings" element={<AuthGuard><Layout><Settings /></Layout></AuthGuard>} />
            <Route path="/help" element={<AuthGuard><Layout><Help /></Layout></AuthGuard>} />
            <Route path="/help/article/:id" element={<AuthGuard><Layout><HelpArticle /></Layout></AuthGuard>} />
            <Route path="/help/category/:category" element={<AuthGuard><Layout><HelpCategory /></Layout></AuthGuard>} />
            <Route path="/support-tickets" element={<AuthGuard><Layout><SupportTickets /></Layout></AuthGuard>} />
            <Route path="/pricing" element={<AuthGuard><Layout><Pricing /></Layout></AuthGuard>} />
            <Route path="/project-features" element={<AuthGuard><Layout><ProjectFeatures /></Layout></AuthGuard>} />
            <Route path="/ai-ads" element={<AuthGuard><Layout><AIAdsLanding /></Layout></AuthGuard>} />
            <Route path="/member-profile/:id" element={<AuthGuard><Layout><MemberProfile /></Layout></AuthGuard>} />
            <Route path="/add-member" element={<AuthGuard><Layout><AddMember /></Layout></AuthGuard>} />
            <Route path="/calling-api" element={<AuthGuard><Layout><CallingAPILanding /></Layout></AuthGuard>} />
            <Route path="/whatsapp-calling-crm" element={<AuthGuard><Layout><WhatsAppCallingCRM /></Layout></AuthGuard>} />
            <Route path="/meta-api-integration" element={<AuthGuard><Layout><MetaAPIIntegration /></Layout></AuthGuard>} />
            <Route path="/workspace/:categoryId/setup" element={<AuthGuard><Layout><WorkspaceSetup /></Layout></AuthGuard>} />
            <Route path="/chatbot-builder" element={<AuthGuard><ChatbotBuilder /></AuthGuard>} />
            
            {/* Project-specific routes */}
            <Route path="/project/:projectId/dashboard" element={<AuthGuard><ProjectLayout><ProjectDashboard /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/business-setup" element={<AuthGuard><ProjectLayout><BusinessSetup /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/core-features" element={<AuthGuard><ProjectLayout><CoreFeatures /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/circles" element={<AuthGuard><ProjectLayout><Circles /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/circles/:circleId/manage" element={<AuthGuard><ProjectLayout><ManageCircle /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/members" element={<AuthGuard><ProjectLayout><Members /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/campaigns" element={<AuthGuard><ProjectLayout><Campaigns /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/campaigns/create" element={<AuthGuard><ProjectLayout><CreateCampaign /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/campaigns/:campaignId/analytics" element={<AuthGuard><ProjectLayout><CampaignAnalytics /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/templates" element={<AuthGuard><ProjectLayout><Templates /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/templates/create" element={<AuthGuard><ProjectLayout><TemplateBuilder /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/analytics" element={<AuthGuard><ProjectLayout><Analytics /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/launch-ads" element={<AuthGuard><ProjectLayout><LaunchAds /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/whatsapp-setup" element={<AuthGuard><ProjectLayout><WhatsAppSetup /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/whatsapp-chat" element={<AuthGuard><ProjectLayout><WhatsAppChat /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/kyc" element={<AuthGuard><ProjectLayout><KYC /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/wallet" element={<AuthGuard><ProjectLayout><Wallet /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/integrations" element={<AuthGuard><ProjectLayout><Integrations /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/settings" element={<AuthGuard><ProjectLayout><Settings /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/chatbot-builder" element={<AuthGuard><ProjectLayout><ChatbotBuilder /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/dev-tools" element={<AuthGuard><ProjectLayout><Settings /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/api-management" element={<AuthGuard><ProjectLayout><Integrations /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/lead-gen" element={<AuthGuard><ProjectLayout><LaunchAds /></ProjectLayout></AuthGuard>} />
            <Route path="/project/:projectId/whatsapp-calling-crm" element={<AuthGuard><ProjectLayout><WhatsAppCallingCRM /></ProjectLayout></AuthGuard>} />
            
            <Route path="*" element={<AuthGuard><Layout><NotFound /></Layout></AuthGuard>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
