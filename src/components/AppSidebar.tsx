import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
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
  HelpCircle, 
  LogOut,
  FolderOpen,
  MessageSquare,
  Shield,
  Bot,
  Building2,
  Target,
  ChevronDown,
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

// Mock projects data - replace with real data from your backend
const mockProjects = [
  { 
    id: 1, 
    name: "E-commerce Store", 
    status: "active",
    businessSetup: {
      whatsapp: true,
      kyc: true,
      wallet: false,
      integrations: true
    }
  },
  { 
    id: 2, 
    name: "SaaS Platform", 
    status: "setup",
    businessSetup: {
      whatsapp: false,
      kyc: false,
      wallet: false,
      integrations: false
    }
  },
];

const getBusinessSetupItems = (projectId: string) => [
  { title: "WhatsApp API", url: `/projects/${projectId}/whatsapp-setup`, icon: MessageSquare },
  { title: "Business KYC", url: `/projects/${projectId}/kyc`, icon: Shield },
  { title: "Wallet", url: `/projects/${projectId}/wallet`, icon: Wallet },
  { title: "Integrations", url: `/projects/${projectId}/integrations`, icon: Plug },
];

const getMarketingItems = (projectId: string) => [
  { title: "Campaigns", url: `/projects/${projectId}/campaigns`, icon: Megaphone },
  { title: "Templates", url: `/projects/${projectId}/templates`, icon: FileText },
  { title: "Launch AI Ads", url: `/projects/${projectId}/launch-ads`, icon: Zap },
  { title: "Analytics", url: `/projects/${projectId}/analytics`, icon: BarChart3 },
  { title: "Chatbot Builder", url: `/projects/${projectId}/chatbot-builder`, icon: Bot, badge: "PRO" },
];

const coreItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Projects", url: "/my-projects", icon: FolderOpen },
  { title: "Circles", url: "/circles", icon: Circle },
  { title: "Members", url: "/members", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

const helpItems = [
  { title: "Help Center", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(['1'])); // Default expand first project
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary/10 text-primary font-medium hover:bg-primary/15" 
      : "text-muted-foreground hover:bg-muted hover:text-foreground";
  };

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"}>
      <SidebarContent className="px-3 py-6">
        {/* Brand */}
        <div className="mb-8 px-3">
          {!isCollapsed ? (
            <div>
              <h2 className="text-xl font-bold text-foreground">Circles</h2>
              <p className="text-xs text-muted-foreground">by Tikky</p>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Circle className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Home */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 mb-4">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${getNavClasses("/")}`}
                  >
                    <Home className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">Home</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Core Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 mb-2">
            {!isCollapsed && "Core"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {coreItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 mb-2 mt-6">
            {!isCollapsed && "Business Projects"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mockProjects.map((project) => {
                const projectId = project.id.toString();
                const isExpanded = expandedProjects.has(projectId);
                const businessItems = getBusinessSetupItems(projectId);
                const marketingItems = getMarketingItems(projectId);
                
                return (
                  <SidebarMenuItem key={project.id}>
                    <Collapsible 
                      open={isExpanded} 
                      onOpenChange={() => toggleProject(projectId)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${getNavClasses(`/projects/${projectId}`)}`}
                        >
                          <Building2 className="w-4 h-4 flex-shrink-0" />
                          {!isCollapsed && (
                            <>
                              <span className="font-medium flex-1 text-left">{project.name}</span>
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      
                      {!isCollapsed && (
                        <CollapsibleContent className="ml-4 mt-2 space-y-3 border-l border-border pl-4">
                          {/* Business Setup */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs font-medium text-muted-foreground">Business Setup</span>
                            </div>
                            <SidebarMenu className="space-y-1">
                              {businessItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                  <SidebarMenuButton asChild>
                                    <NavLink 
                                      to={item.url} 
                                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all duration-200 ${getNavClasses(item.url)}`}
                                    >
                                      <item.icon className="w-4 h-4 flex-shrink-0" />
                                      <span>{item.title}</span>
                                    </NavLink>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </div>

                          {/* Marketing */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs font-medium text-muted-foreground">Marketing</span>
                            </div>
                            <SidebarMenu className="space-y-1">
                              {marketingItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                  <SidebarMenuButton asChild>
                                    <NavLink 
                                      to={item.url} 
                                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all duration-200 ${getNavClasses(item.url)}`}
                                    >
                                      <item.icon className="w-4 h-4 flex-shrink-0" />
                                      <span>{item.title}</span>
                                      {item.badge && (
                                        <span className="ml-auto text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-medium">
                                          {item.badge}
                                        </span>
                                      )}
                                    </NavLink>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </div>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 mt-6">
              {helpItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-border">
          <SidebarMenuButton asChild>
            <button 
              className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-xl transition-all duration-200 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                // Navigate to login page
                window.location.href = "/login";
              }}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}