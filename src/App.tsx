
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/Layout";
import { ProjectLayout } from "@/components/ProjectLayout";

// Import pages
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";
import ProjectDashboard from "./pages/ProjectDashboard";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Campaigns from "./pages/Campaigns";
import Settings from "./pages/Settings";
import WhatsAppSetup from "./pages/WhatsAppSetup";
import KYC from "./pages/KYC";
import Wallet from "./pages/Wallet";
import Integrations from "./pages/Integrations";
import Templates from "./pages/Templates";
import MetaAPIIntegration from "./pages/MetaAPIIntegration";
import Analytics from "./pages/Analytics";
import LaunchAds from "./pages/LaunchAds";
import ChatbotBuilder from "./pages/ChatbotBuilder";
import WhatsAppChat from "./pages/WhatsAppChat";
import WhatsAppCallingCRM from "./pages/WhatsAppCallingCRM";
import CoreFeatures from "./pages/CoreFeatures";
import Circles from "./pages/Circles";
import CreateProject from "./pages/CreateProject";
import MyWorkspace from "./pages/MyWorkspace";
import Pricing from "./pages/Pricing";
import Help from "./pages/Help";
import SupportTickets from "./pages/SupportTickets";

// Import info pages
import MetaCampaignsInfo from "./pages/info/MetaCampaignsInfo";
import CirclesInfo from "./pages/info/CirclesInfo";
import TemplatesInfo from "./pages/info/TemplatesInfo";
import AIAdsInfo from "./pages/info/AIAdsInfo";
import ChatbotInfo from "./pages/info/ChatbotInfo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              {/* Public routes with main layout */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/my-projects" element={<Layout><MyProjects /></Layout>} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/create-project" element={<Layout><CreateProject /></Layout>} />
              <Route path="/my-workspace" element={<Layout><MyWorkspace /></Layout>} />
              <Route path="/whatsapp-setup" element={<Layout><WhatsAppSetup /></Layout>} />
              <Route path="/kyc" element={<Layout><KYC /></Layout>} />
              <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
              <Route path="/help" element={<Layout><Help /></Layout>} />
              <Route path="/support-tickets" element={<Layout><SupportTickets /></Layout>} />
              
              {/* Info/Knowledge Kit routes */}
              <Route path="/info/meta-campaigns" element={<Layout><MetaCampaignsInfo /></Layout>} />
              <Route path="/info/circles" element={<Layout><CirclesInfo /></Layout>} />
              <Route path="/info/templates" element={<Layout><TemplatesInfo /></Layout>} />
              <Route path="/info/ai-ads" element={<Layout><AIAdsInfo /></Layout>} />
              <Route path="/info/chatbot" element={<Layout><ChatbotInfo /></Layout>} />
              
              {/* Project-specific routes with project layout */}
              <Route path="/project/:projectId/dashboard" element={<ProjectLayout><ProjectDashboard /></ProjectLayout>} />
              <Route path="/project/:projectId/members" element={<ProjectLayout><Members /></ProjectLayout>} />
              <Route path="/project/:projectId/campaigns" element={<ProjectLayout><Campaigns /></ProjectLayout>} />
              <Route path="/project/:projectId/settings" element={<ProjectLayout><Settings /></ProjectLayout>} />
              <Route path="/project/:projectId/whatsapp-setup" element={<ProjectLayout><WhatsAppSetup /></ProjectLayout>} />
              <Route path="/project/:projectId/whatsapp-chat" element={<ProjectLayout><WhatsAppChat /></ProjectLayout>} />
              <Route path="/project/:projectId/whatsapp-calling-crm" element={<ProjectLayout><WhatsAppCallingCRM /></ProjectLayout>} />
              <Route path="/project/:projectId/kyc" element={<ProjectLayout><KYC /></ProjectLayout>} />
              <Route path="/project/:projectId/wallet" element={<ProjectLayout><Wallet /></ProjectLayout>} />
              <Route path="/project/:projectId/integrations" element={<ProjectLayout><Integrations /></ProjectLayout>} />
              <Route path="/project/:projectId/templates" element={<ProjectLayout><Templates /></ProjectLayout>} />
              <Route path="/project/:projectId/meta-api" element={<ProjectLayout><MetaAPIIntegration /></ProjectLayout>} />
              <Route path="/project/:projectId/analytics" element={<ProjectLayout><Analytics /></ProjectLayout>} />
              <Route path="/project/:projectId/launch-ads" element={<ProjectLayout><LaunchAds /></ProjectLayout>} />
              <Route path="/project/:projectId/chatbot-builder" element={<ProjectLayout><ChatbotBuilder /></ProjectLayout>} />
              <Route path="/project/:projectId/core-features" element={<ProjectLayout><CoreFeatures /></ProjectLayout>} />
              <Route path="/project/:projectId/circles" element={<ProjectLayout><Circles /></ProjectLayout>} />
            </Routes>
          </div>
          <Toaster />
          <Sonner />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
