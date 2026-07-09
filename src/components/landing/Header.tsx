'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Infrastructure', href: '/infrastructure' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6">
      <div className="w-full max-w-7xl h-14 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-full flex items-center justify-between px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-headline font-bold text-foreground leading-none tracking-tight">Sheril Academy</h1>
            <p className="text-[7px] uppercase tracking-[0.3em] text-primary font-bold mt-0.5 opacity-70">Global Excellence</p>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="hidden xl:flex items-center bg-secondary/30 rounded-full px-1.5 py-1 border border-white/60">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[12px] font-semibold text-foreground/60 hover:text-foreground hover:bg-white rounded-full px-4 py-1.5 transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/admissions" className="hidden lg:block text-[12px] font-bold text-foreground/70 hover:text-primary transition-colors">
            Admissions
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-9 text-[12px] font-bold shadow-xl shadow-primary/10 transition-all hover:translate-y-[-1px] hover:shadow-2xl active:translate-y-0">
            Apply Now
          </Button>
        </div>
      </div>
    </header>
  );
}
