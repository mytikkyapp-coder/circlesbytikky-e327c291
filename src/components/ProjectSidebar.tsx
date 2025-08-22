import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  Circle, 
  Users,
  Megaphone, 
  FileText, 
  BarChart3, 
  Zap,
  Wallet,
  Plug, 
  Settings, 
  MessageSquare,
  Shield,
  Bot,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface ProjectSidebarProps {
  projectId: string;
}

// Mock project data - in real app, this would come from your data store
const getProjectData = (projectId: string) => {
  const projects = {
    "1": {
      name: "Fitness Coach Pro",
      businessSetup: [
        { title: "WhatsApp API", url: `/project/${projectId}/whatsapp-setup`, icon: MessageSquare },
        { title: "Business KYC", url: `/project/${projectId}/kyc`, icon: Shield },
        { title: "Wallet", url: `/project/${projectId}/wallet`, icon: Wallet },
        { title: "Integrations", url: `/project/${projectId}/integrations`, icon: Plug },
      ],
      core: [
        { title: "Dashboard", url: `/project/${projectId}/dashboard`, icon: LayoutDashboard },
        { title: "Circles", url: `/project/${projectId}/circles`, icon: Circle },
        { title: "Members", url: `/project/${projectId}/members`, icon: Users },
        { title: "Settings", url: `/project/${projectId}/settings`, icon: Settings },
      ],
      marketing: [
        { title: "Campaigns", url: `/project/${projectId}/campaigns`, icon: Megaphone },
        { title: "Templates", url: `/project/${projectId}/templates`, icon: FileText },
        { title: "Launch AI Ads", url: `/project/${projectId}/launch-ads`, icon: Zap },
        { title: "Analytics", url: `/project/${projectId}/analytics`, icon: BarChart3 },
        { title: "Chatbot Builder", url: `/project/${projectId}/chatbot-builder`, icon: Bot, badge: "PRO" },
      ]
    },
    "2": {
      name: "Tech Startup Hub",
      businessSetup: [
        { title: "WhatsApp API", url: `/project/${projectId}/whatsapp-setup`, icon: MessageSquare },
        { title: "Business KYC", url: `/project/${projectId}/kyc`, icon: Shield },
        { title: "Wallet", url: `/project/${projectId}/wallet`, icon: Wallet },
        { title: "Integrations", url: `/project/${projectId}/integrations`, icon: Plug },
      ],
      core: [
        { title: "Dashboard", url: `/project/${projectId}/dashboard`, icon: LayoutDashboard },
        { title: "Circles", url: `/project/${projectId}/circles`, icon: Circle },
        { title: "Members", url: `/project/${projectId}/members`, icon: Users },
        { title: "Developer Tools", url: `/project/${projectId}/dev-tools`, icon: Settings },
        { title: "API Management", url: `/project/${projectId}/api-management`, icon: Plug },
      ],
      marketing: [
        { title: "B2B Campaigns", url: `/project/${projectId}/campaigns`, icon: Megaphone },
        { title: "Email Templates", url: `/project/${projectId}/templates`, icon: FileText },
        { title: "Lead Generation", url: `/project/${projectId}/lead-gen`, icon: Zap },
        { title: "Conversion Analytics", url: `/project/${projectId}/analytics`, icon: BarChart3 },
        { title: "AI Assistant", url: `/project/${projectId}/chatbot-builder`, icon: Bot, badge: "ENTERPRISE" },
      ]
    },
    "3": {
      name: "Cooking Masterclass",
      businessSetup: [
        { title: "WhatsApp API", url: `/project/${projectId}/whatsapp-setup`, icon: MessageSquare },
        { title: "Business KYC", url: `/project/${projectId}/kyc`, icon: Shield },
        { title: "Payment Setup", url: `/project/${projectId}/wallet`, icon: Wallet },
        { title: "Course Integrations", url: `/project/${projectId}/integrations`, icon: Plug },
      ],
      core: [
        { title: "Dashboard", url: `/project/${projectId}/dashboard`, icon: LayoutDashboard },
        { title: "Student Groups", url: `/project/${projectId}/circles`, icon: Circle },
        { title: "Students", url: `/project/${projectId}/members`, icon: Users },
        { title: "Course Settings", url: `/project/${projectId}/settings`, icon: Settings },
      ],
      marketing: [
        { title: "Course Campaigns", url: `/project/${projectId}/campaigns`, icon: Megaphone },
        { title: "Course Templates", url: `/project/${projectId}/templates`, icon: FileText },
        { title: "Student Acquisition", url: `/project/${projectId}/launch-ads`, icon: Zap },
        { title: "Learning Analytics", url: `/project/${projectId}/analytics`, icon: BarChart3 },
        { title: "Course Assistant", url: `/project/${projectId}/chatbot-builder`, icon: Bot, badge: "BASIC" },
      ]
    }
  };
  
  return projects[projectId as keyof typeof projects] || projects["1"];
};

export function ProjectSidebar({ projectId }: ProjectSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const projectData = getProjectData(projectId);
  
  const [businessSetupOpen, setBusinessSetupOpen] = useState(true);
  const [coreOpen, setCoreOpen] = useState(true);
  const [marketingOpen, setMarketingOpen] = useState(true);

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const getNavClasses = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary/10 text-primary font-medium hover:bg-primary/15" 
      : "text-muted-foreground hover:bg-muted hover:text-foreground";
  };

  const renderMenuSection = (
    title: string, 
    items: any[], 
    isOpen: boolean, 
    setOpen: (open: boolean) => void
  ) => (
    <SidebarGroup>
      <SidebarGroupLabel 
        className="text-xs font-medium text-muted-foreground px-3 mb-2 cursor-pointer flex items-center justify-between hover:text-foreground transition-colors"
        onClick={() => setOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
      </SidebarGroupLabel>
      {isOpen && (
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.url} 
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${getNavClasses(item.url)}`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );

  return (
    <Sidebar className="w-64 border-l border-border">
      <SidebarContent className="px-3 py-6">
        {/* Project Header */}
        <div className="mb-6 px-3">
          <h3 className="text-lg font-bold text-foreground">{projectData.name}</h3>
          <p className="text-xs text-muted-foreground">Project Dashboard</p>
        </div>

        {/* Business Setup */}
        {renderMenuSection(
          "Business Setup", 
          projectData.businessSetup, 
          businessSetupOpen, 
          setBusinessSetupOpen
        )}

        {/* Core Features */}
        {renderMenuSection(
          "Core Features", 
          projectData.core, 
          coreOpen, 
          setCoreOpen
        )}

        {/* Marketing */}
        {renderMenuSection(
          "Marketing", 
          projectData.marketing, 
          marketingOpen, 
          setMarketingOpen
        )}
      </SidebarContent>
    </Sidebar>
  );
}