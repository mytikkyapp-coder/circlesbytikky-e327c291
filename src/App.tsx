import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import FrontPage from "./pages/FrontPage";
import Dashboard from "./pages/Dashboard";
import Circles from "./pages/Circles";
import Members from "./pages/Members";
import Campaigns from "./pages/Campaigns";
import Templates from "./pages/Templates";
import Analytics from "./pages/Analytics";
import LaunchAds from "./pages/LaunchAds";
import Wallet from "./pages/Wallet";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import MemberProfile from "./pages/MemberProfile";
import MyProjects from "./pages/MyProjects";
import WhatsAppSetup from "./pages/WhatsAppSetup";
import KYC from "./pages/KYC";
import AddMember from "./pages/AddMember";
import ChatbotBuilder from "./pages/ChatbotBuilder";
import ProjectDashboard from "./pages/ProjectDashboard";
import { ProjectLayout } from "./components/ProjectLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes without Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes with Layout */}
            <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
            <Route path="/my-projects" element={<ProtectedRoute><Layout><MyProjects /></Layout></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/circles" element={<ProtectedRoute><Layout><Circles /></Layout></ProtectedRoute>} />
            <Route path="/members" element={<ProtectedRoute><Layout><Members /></Layout></ProtectedRoute>} />
            <Route path="/campaigns" element={<ProtectedRoute><Layout><Campaigns /></Layout></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute><Layout><Templates /></Layout></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
            <Route path="/launch-ads" element={<ProtectedRoute><Layout><LaunchAds /></Layout></ProtectedRoute>} />
            <Route path="/whatsapp-setup" element={<ProtectedRoute><Layout><WhatsAppSetup /></Layout></ProtectedRoute>} />
            <Route path="/kyc" element={<ProtectedRoute><Layout><KYC /></Layout></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><Layout><Wallet /></Layout></ProtectedRoute>} />
            <Route path="/integrations" element={<ProtectedRoute><Layout><Integrations /></Layout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><Layout><Help /></Layout></ProtectedRoute>} />
            <Route path="/member-profile/:id" element={<ProtectedRoute><Layout><MemberProfile /></Layout></ProtectedRoute>} />
            <Route path="/add-member" element={<ProtectedRoute><Layout><AddMember /></Layout></ProtectedRoute>} />
            <Route path="/chatbot-builder" element={<ProtectedRoute><ChatbotBuilder /></ProtectedRoute>} />
            
            {/* Project-specific routes */}
            <Route path="/project/:projectId/dashboard" element={<ProtectedRoute><ProjectLayout><ProjectDashboard /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/circles" element={<ProtectedRoute><ProjectLayout><Circles /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/members" element={<ProtectedRoute><ProjectLayout><Members /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/campaigns" element={<ProtectedRoute><ProjectLayout><Campaigns /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/templates" element={<ProtectedRoute><ProjectLayout><Templates /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/analytics" element={<ProtectedRoute><ProjectLayout><Analytics /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/launch-ads" element={<ProtectedRoute><ProjectLayout><LaunchAds /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/whatsapp-setup" element={<ProtectedRoute><ProjectLayout><WhatsAppSetup /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/kyc" element={<ProtectedRoute><ProjectLayout><KYC /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/wallet" element={<ProtectedRoute><ProjectLayout><Wallet /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/integrations" element={<ProtectedRoute><ProjectLayout><Integrations /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/settings" element={<ProtectedRoute><ProjectLayout><Settings /></ProjectLayout></ProtectedRoute>} />
            <Route path="/project/:projectId/chatbot-builder" element={<ProtectedRoute><ProjectLayout><ChatbotBuilder /></ProjectLayout></ProtectedRoute>} />
            
            <Route path="*" element={<ProtectedRoute><Layout><NotFound /></Layout></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
