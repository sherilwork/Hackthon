'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Search, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Programs', href: '/programs' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Glass Navigation */}
        <div className="flex-1 flex items-center justify-between h-16 bg-white/60 backdrop-blur-xl border border-white/40 rounded-full px-6 md:px-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#103D8F] rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-105">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-headline font-bold text-[#10213A] leading-none tracking-tight">Sheril Academy</h1>
              <p className="text-[7px] uppercase tracking-[0.3em] text-[#103D8F] font-bold mt-1 opacity-80">Global Excellence</p>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[12px] font-semibold text-[#68768A] hover:text-[#103D8F] hover:bg-[#103D8F]/5 rounded-full px-4 py-2 transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-slate-100/50 transition-colors cursor-pointer group">
              <Globe className="w-3.5 h-3.5 text-[#68768A]" />
              <span className="text-[11px] font-bold text-[#68768A]">EN</span>
              <ChevronDown className="w-3 h-3 text-[#68768A] group-hover:translate-y-0.5 transition-transform" />
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100/50 transition-colors text-[#68768A]">
              <Search className="w-4 h-4" />
            </button>
            <Button className="bg-[#103D8F] hover:bg-[#103D8F]/90 text-white rounded-full px-6 h-10 text-[12px] font-bold shadow-xl shadow-[#103D8F]/10 transition-all hover:translate-y-[-1px] hover:shadow-2xl active:translate-y-0">
              Book Campus Tour
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
