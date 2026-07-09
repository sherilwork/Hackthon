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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 md:p-8">
      <div className="w-full max-w-7xl h-20 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] flex items-center justify-between px-6 md:px-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-headline font-bold text-foreground leading-none tracking-tight">Sheril Academy</h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold mt-1 opacity-70">Global Excellence</p>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="hidden xl:flex items-center bg-secondary/40 rounded-full px-2 py-1.5 border border-white/60">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[13px] font-semibold text-foreground/60 hover:text-foreground hover:bg-white rounded-full px-5 py-2 transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/admissions" className="hidden lg:block text-[13px] font-bold text-foreground/70 hover:text-primary transition-colors">
            Admissions
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-[13px] font-bold shadow-xl shadow-primary/10 transition-all hover:translate-y-[-2px] hover:shadow-2xl active:translate-y-0">
            Apply Now
          </Button>
        </div>
      </div>
    </header>
  );
}
