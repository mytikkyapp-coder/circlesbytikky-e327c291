import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import ProjectLayout from "./components/ProjectLayout";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";
import MyWorkspace from "./pages/MyWorkspace";
import Pricing from "./pages/Pricing";
import SupportTickets from "./pages/SupportTickets";
import Help from "./pages/Help";
import SettingsPage from "./pages/SettingsPage";
import WhatsappSetup from "./pages/WhatsappSetup";
import Kyc from "./pages/Kyc";
import NotFound from "./pages/NotFound";
import TemplateBuilder from "./pages/TemplateBuilder";
import Templates from "./pages/Templates";
import MetaApiIntegration from "./pages/MetaApiIntegration";
import Circles from "./pages/Circles";
import AIAds from "./pages/AIAds";
import Chatbot from "./pages/Chatbot";

// Info pages
import MetaCampaignsInfo from "./pages/info/MetaCampaignsInfo";
import CirclesInfo from "./pages/info/CirclesInfo";
import TemplatesInfo from "./pages/info/TemplatesInfo";
import AIAdsInfo from "./pages/info/AIAdsInfo";
import ChatbotInfo from "./pages/info/ChatbotInfo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/campaigns" element={<Layout><Campaigns /></Layout>} />
              <Route path="/create-project" element={<Layout><CreateProject /></Layout>} />
              <Route path="/my-projects" element={<Layout><MyProjects /></Layout>} />
              <Route path="/my-workspace" element={<Layout><MyWorkspace /></Layout>} />
              <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
              <Route path="/support-tickets" element={<Layout><SupportTickets /></Layout>} />
              <Route path="/help" element={<Layout><Help /></Layout>} />
              <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
              <Route path="/whatsapp-setup" element={<Layout><WhatsappSetup /></Layout>} />
              <Route path="/kyc" element={<Layout><Kyc /></Layout>} />
              <Route path="/template-builder" element={<Layout><TemplateBuilder /></Layout>} />
              <Route path="/templates" element={<Layout><Templates /></Layout>} />
              <Route path="/meta-api-integration" element={<Layout><MetaApiIntegration /></Layout>} />
              <Route path="/circles" element={<Layout><Circles /></Layout>} />
              <Route path="/ai-ads" element={<Layout><AIAds /></Layout>} />
              <Route path="/chatbot" element={<Layout><Chatbot /></Layout>} />
              
              {/* Info Pages Routes */}
              <Route path="/info/meta-campaigns" element={<Layout><MetaCampaignsInfo /></Layout>} />
              <Route path="/info/circles" element={<Layout><CirclesInfo /></Layout>} />
              <Route path="/info/templates" element={<Layout><TemplatesInfo /></Layout>} />
              <Route path="/info/ai-ads" element={<Layout><AIAdsInfo /></Layout>} />
              <Route path="/info/chatbot" element={<Layout><ChatbotInfo /></Layout>} />
              
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
