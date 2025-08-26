import { NavLink, useLocation } from "react-router-dom";
import { TikkyLogo } from "./TikkyLogo";
import tikkyLogo from "@/assets/tikky-logo.png";
import { 
  Home, 
  Plus,
  FolderOpen,
  Briefcase,
  MessageSquare,
  Shield,
  Wallet,
  BookOpen,
  HelpCircle,
  Settings
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

const navigationItems = [
  { title: "+ Create Project", url: "/create-project", icon: Plus, special: true },
  { title: "My Projects", url: "/my-projects", icon: FolderOpen },
  { title: "My Workspace", url: "/my-workspace", icon: Briefcase },
];

const businessItems = [
  { title: "WhatsApp API", url: "/whatsapp-setup", icon: MessageSquare },
  { title: "Business KYC", url: "/kyc", icon: Shield },
  { title: "Pricing & Payments", url: "/pricing", icon: Wallet },
];

const knowledgeItems = [
  { title: "How Meta Campaigns", url: "/info/meta-campaigns", icon: BookOpen },
  { title: "How Circle Works", url: "/info/circles", icon: BookOpen },
  { title: "How to create Templates", url: "/info/templates", icon: BookOpen },
  { title: "How to Launch AI Ads", url: "/info/ai-ads", icon: BookOpen },
  { title: "How to Build ChatBot", url: "/info/chatbot", icon: BookOpen },
];

const supportItems = [
  { title: "Help Center", url: "/help", icon: HelpCircle },
  { title: "Support Tickets", url: "/support-tickets", icon: MessageSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary/15 text-primary font-semibold border-r-2 border-primary hover:bg-primary/20" 
      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all duration-200";
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="px-3 py-6 bg-sidebar-background">
        {/* Brand */}
        <div className="mb-8 px-3 border-b border-sidebar-border pb-6">
          {!isCollapsed ? (
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-foreground via-primary-foreground/90 to-primary-foreground/80 rounded-full"></div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-sidebar-foreground">Circles</h2>
              <p className="text-xs text-muted-foreground">Business Platform</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-gradient-to-br from-primary-foreground via-primary-foreground/90 to-primary-foreground/80 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Home */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/" 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${getNavClasses("/")}`}
                  >
                    <Home className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">Home</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                        item.special 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-105" 
                          : getNavClasses(item.url)
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business Setup */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-sidebar-foreground px-3 mb-1 mt-4">
            {!isCollapsed && "BUSINESS SETUP"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {businessItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Knowledge Kit */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-sidebar-foreground px-3 mb-1 mt-4">
            {!isCollapsed && "KNOWLEDGE KIT"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {knowledgeItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium text-xs">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-sidebar-foreground px-3 mb-1 mt-4">
            {!isCollapsed && "SUPPORT"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Made with Love in India */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="text-center px-3 py-2">
            {!isCollapsed ? (
              <p className="text-xs text-muted-foreground">
                Made with ❤️ in India 🇮🇳
              </p>
            ) : (
              <div className="text-xs">❤️🇮🇳</div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
