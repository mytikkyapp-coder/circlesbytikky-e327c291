import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
  Bot
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

const businessItems = [
  { title: "WhatsApp API", url: "/whatsapp-setup", icon: MessageSquare },
  { title: "Business KYC", url: "/kyc", icon: Shield },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Integrations", url: "/integrations", icon: Plug },
];

const coreItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Projects", url: "/my-projects", icon: FolderOpen },
  { title: "Circles", url: "/circles", icon: Circle },
  { title: "Members", url: "/members", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

const marketingItems = [
  { title: "Campaigns", url: "/campaigns", icon: Megaphone },
  { title: "Templates", url: "/templates", icon: FileText },
  { title: "Launch AI Ads", url: "/launch-ads", icon: Zap },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const helpItems = [
  { title: "Help Center", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuth();
  const currentPath = location.pathname;
  
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

        {/* Business Setup */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 mb-2">
            {!isCollapsed && "Business Setup"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {businessItems.map((item) => (
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

        {/* Core Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 mb-2 mt-6">
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
              onClick={() => signOut()}
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