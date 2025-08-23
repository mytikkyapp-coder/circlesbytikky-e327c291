import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import MemberProfile from "./pages/MemberProfile";
import MyProjects from "./pages/MyProjects";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes without Layout */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/my-projects" element={<Layout><MyProjects /></Layout>} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/circles" element={<Layout><Circles /></Layout>} />
          <Route path="/circles/:circleId/manage" element={<Layout><ManageCircle /></Layout>} />
          <Route path="/members" element={<Layout><Members /></Layout>} />
          <Route path="/campaigns" element={<Layout><Campaigns /></Layout>} />
          <Route path="/templates" element={<Layout><Templates /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/launch-ads" element={<Layout><LaunchAds /></Layout>} />
          <Route path="/whatsapp-setup" element={<Layout><WhatsAppSetup /></Layout>} />
          <Route path="/kyc" element={<Layout><KYC /></Layout>} />
          <Route path="/wallet" element={<Layout><Wallet /></Layout>} />
          <Route path="/integrations" element={<Layout><Integrations /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/help" element={<Layout><Help /></Layout>} />
          <Route path="/help/article/:id" element={<Layout><HelpArticle /></Layout>} />
          <Route path="/help/category/:category" element={<Layout><HelpCategory /></Layout>} />
          <Route path="/support-tickets" element={<Layout><SupportTickets /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/project-features" element={<Layout><ProjectFeatures /></Layout>} />
          <Route path="/ai-ads" element={<Layout><AIAdsLanding /></Layout>} />
          <Route path="/member-profile/:id" element={<Layout><MemberProfile /></Layout>} />
          <Route path="/add-member" element={<Layout><AddMember /></Layout>} />
          <Route path="/calling-api" element={<Layout><CallingAPILanding /></Layout>} />
          <Route path="/whatsapp-calling-crm" element={<Layout><WhatsAppCallingCRM /></Layout>} />
          <Route path="/meta-api-integration" element={<Layout><MetaAPIIntegration /></Layout>} />
          <Route path="/chatbot-builder" element={<ChatbotBuilder />} />
          
          {/* Project-specific routes */}
          <Route path="/project/:projectId/dashboard" element={<ProjectLayout><ProjectDashboard /></ProjectLayout>} />
          <Route path="/project/:projectId/circles" element={<ProjectLayout><Circles /></ProjectLayout>} />
          <Route path="/project/:projectId/circles/:circleId/manage" element={<ProjectLayout><ManageCircle /></ProjectLayout>} />
          <Route path="/project/:projectId/members" element={<ProjectLayout><Members /></ProjectLayout>} />
          <Route path="/project/:projectId/campaigns" element={<ProjectLayout><Campaigns /></ProjectLayout>} />
          <Route path="/project/:projectId/campaigns/create" element={<ProjectLayout><CreateCampaign /></ProjectLayout>} />
          <Route path="/project/:projectId/campaigns/:campaignId/analytics" element={<ProjectLayout><CampaignAnalytics /></ProjectLayout>} />
          <Route path="/project/:projectId/templates" element={<ProjectLayout><Templates /></ProjectLayout>} />
          <Route path="/project/:projectId/templates/create" element={<ProjectLayout><TemplateBuilder /></ProjectLayout>} />
          <Route path="/project/:projectId/analytics" element={<ProjectLayout><Analytics /></ProjectLayout>} />
          <Route path="/project/:projectId/launch-ads" element={<ProjectLayout><LaunchAds /></ProjectLayout>} />
          <Route path="/project/:projectId/whatsapp-setup" element={<ProjectLayout><WhatsAppSetup /></ProjectLayout>} />
          <Route path="/project/:projectId/whatsapp-chat" element={<ProjectLayout><WhatsAppChat /></ProjectLayout>} />
          <Route path="/project/:projectId/kyc" element={<ProjectLayout><KYC /></ProjectLayout>} />
          <Route path="/project/:projectId/wallet" element={<ProjectLayout><Wallet /></ProjectLayout>} />
          <Route path="/project/:projectId/integrations" element={<ProjectLayout><Integrations /></ProjectLayout>} />
          <Route path="/project/:projectId/settings" element={<ProjectLayout><Settings /></ProjectLayout>} />
          <Route path="/project/:projectId/chatbot-builder" element={<ProjectLayout><ChatbotBuilder /></ProjectLayout>} />
          
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
