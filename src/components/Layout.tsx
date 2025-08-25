
import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommunityJoinPopup } from "@/components/CommunityJoinPopup";
import { LaunchOfferBanner } from "@/components/LaunchOfferBanner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showCommunityPopup, setShowCommunityPopup] = useState(false);

  // Show popup after 3 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user hasn't seen this popup recently (using localStorage)
      const lastShown = localStorage.getItem("tikky-community-popup-shown");
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (!lastShown || now - parseInt(lastShown) > oneDay) {
        setShowCommunityPopup(true);
        localStorage.setItem("tikky-community-popup-shown", now.toString());
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <LaunchOfferBanner />
          <main className="flex-1 p-4 lg:p-6 bg-background overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
      
      <CommunityJoinPopup 
        open={showCommunityPopup} 
        onOpenChange={setShowCommunityPopup} 
      />
    </SidebarProvider>
  );
}
