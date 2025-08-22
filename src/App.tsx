import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import MemberProfile from "./pages/MemberProfile";
import MyProjects from "./pages/MyProjects";
import WhatsAppSetup from "./pages/WhatsAppSetup";
import KYC from "./pages/KYC";
import AddMember from "./pages/AddMember";

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
          <Route path="/member-profile/:id" element={<Layout><MemberProfile /></Layout>} />
          <Route path="/add-member" element={<Layout><AddMember /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
