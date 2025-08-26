
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Layout } from "./components/Layout";
import { ProjectLayout } from "./components/ProjectLayout";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";
import MyWorkspace from "./pages/MyWorkspace";
import Pricing from "./pages/Pricing";
import SupportTickets from "./pages/SupportTickets";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import WhatsAppSetup from "./pages/WhatsAppSetup";
import KYC from "./pages/KYC";
import NotFound from "./pages/NotFound";
import TemplateBuilder from "./pages/TemplateBuilder";
import Templates from "./pages/Templates";
import MetaAPIIntegration from "./pages/MetaAPIIntegration";
import Circles from "./pages/Circles";
import AIAdsLanding from "./pages/AIAdsLanding";
import ChatbotBuilder from "./pages/ChatbotBuilder";

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
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              <Route path="/whatsapp-setup" element={<Layout><WhatsAppSetup /></Layout>} />
              <Route path="/kyc" element={<Layout><KYC /></Layout>} />
              <Route path="/template-builder" element={<Layout><TemplateBuilder /></Layout>} />
              <Route path="/templates" element={<Layout><Templates /></Layout>} />
              <Route path="/meta-api-integration" element={<Layout><MetaAPIIntegration /></Layout>} />
              <Route path="/circles" element={<Layout><Circles /></Layout>} />
              <Route path="/ai-ads" element={<Layout><AIAdsLanding /></Layout>} />
              <Route path="/chatbot" element={<Layout><ChatbotBuilder /></Layout>} />
              
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
