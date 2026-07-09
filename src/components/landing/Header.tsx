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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FCFBF8]/80 backdrop-blur-md border-b border-[#2BB673]/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2BB673] rounded-xl flex items-center justify-center shadow-lg shadow-[#2BB673]/20">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-headline font-bold text-[#1E2433] leading-none">Sheril Academy</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#2BB673] font-semibold mt-1">Global Excellence</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-[#1E2433]/70 hover:text-[#2BB673] transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2BB673] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4">
          <Link href="/admissions" className="hidden sm:block">
            <Button variant="ghost" className="text-[#2BB673] hover:bg-[#DDF8EF] font-semibold">
              Admissions
            </Button>
          </Link>
          <Button className="bg-[#2BB673] hover:bg-[#259e64] text-white rounded-full px-6 shadow-md shadow-[#2BB673]/20 transition-all hover:scale-105">
            Apply Now
          </Button>
        </div>
      </div>
    </header>
  );
}
