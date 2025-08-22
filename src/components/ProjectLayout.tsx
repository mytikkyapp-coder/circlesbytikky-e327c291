import { useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { Header } from "@/components/Header";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

export function ProjectLayout({ children }: ProjectLayoutProps) {
  const { projectId } = useParams();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 bg-background">
              {children}
            </main>
          </div>
          {projectId && <ProjectSidebar projectId={projectId} />}
        </div>
      </div>
    </SidebarProvider>
  );
}