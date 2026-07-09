import React from 'react';
import { Header } from '@/components/landing/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Header />
      
      <main className="pt-32">
        {/* Content removed as requested */}
      </main>
      
      <footer className="py-12 border-t border-border/60">
        <div className="max-w-[1500px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20" />
            <span className="font-bold tracking-tight">Sheril Academy</span>
          </div>
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
            © 2024 Sheril Educational Collective. All Rights Reserved.
          </div>
          <div className="flex gap-8">
            <span className="text-[11px] font-bold uppercase tracking-wider hover:text-primary cursor-pointer transition-colors">Privacy</span>
            <span className="text-[11px] font-bold uppercase tracking-wider hover:text-primary cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
