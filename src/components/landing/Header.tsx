'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Infrastructure', href: '/infrastructure' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const ANNOUNCEMENTS = [
  "Admissions Open for Academic Year 2025-26",
  "National Excellence Award Winner 2024",
  "International Exchange Program Applications Closing Soon",
  "Ranked #1 for Innovation in Education",
  "Scholarship Applications for Meritorious Students are Live"
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
      {/* Premium Marquee Announcement Bar - Light Version */}
      <div className="w-full bg-white/80 backdrop-blur-md py-1.5 overflow-hidden whitespace-nowrap border-b border-slate-100">
        <div className="inline-block animate-marquee">
          {ANNOUNCEMENTS.map((text, index) => (
            <span key={index} className="inline-flex items-center px-12 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
              <Sparkles className="w-2.5 h-2.5 mr-4 text-primary/30" />
              {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {ANNOUNCEMENTS.map((text, index) => (
            <span key={`dup-${index}`} className="inline-flex items-center px-12 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
              <Sparkles className="w-2.5 h-2.5 mr-4 text-primary/30" />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Main Header Container */}
      <div className="w-full max-w-7xl mt-4 px-4 md:px-6">
        <div className="w-full h-14 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-full flex items-center justify-between px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
              <GraduationCap className="text-white w-4.5 h-4.5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-headline font-bold text-foreground leading-none tracking-tight">Sheril Academy</h1>
              <p className="text-[6.5px] uppercase tracking-[0.3em] text-primary font-bold mt-0.5 opacity-70">Global Excellence</p>
            </div>
          </Link>

          {/* Navigation Section */}
          <nav className="hidden xl:flex items-center bg-secondary/30 rounded-full px-1 py-0.5 border border-white/60">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[11px] font-semibold text-foreground/60 hover:text-foreground hover:bg-white rounded-full px-3.5 py-1.5 transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Section */}
          <div className="flex items-center gap-4">
            <Link href="/admissions" className="hidden lg:block text-[11px] font-bold text-foreground/70 hover:text-primary transition-colors">
              Admissions
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 h-8 text-[11px] font-bold shadow-xl shadow-primary/10 transition-all hover:translate-y-[-1px] hover:shadow-2xl active:translate-y-0">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}