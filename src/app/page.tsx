
import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { ActivityPanel } from '@/components/dashboard/ActivityPanel';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { ProjectGrid } from '@/components/dashboard/ProjectGrid';
import { DeepFocusWidget } from '@/components/dashboard/DeepFocusWidget';

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden selection:bg-accent/20">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-[1400px] mx-auto p-8 animate-fade-in">
          <Header />
          
          <div className="flex gap-8 mb-8">
            <div className="flex-[7]">
              <HeroSection />
            </div>
            <div className="flex-[3]">
              <ActivityPanel />
            </div>
          </div>

          <StatsGrid />

          <div className="flex gap-8 items-stretch">
            <div className="flex-[8]">
              <ProjectGrid />
            </div>
            <div className="flex-[2] min-w-[240px]">
              <DeepFocusWidget />
            </div>
          </div>
          
          <footer className="mt-12 py-8 border-t border-border/40 flex justify-between items-center text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
            <span>© 2024 Devora Collective</span>
            <div className="flex gap-6">
              <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Archive</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
