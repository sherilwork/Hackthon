'use client';

import React from 'react';
import { Search, Menu, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Philosophy', href: '#why-us' },
  { name: 'Curriculum', href: '#learning' },
  { name: 'Admissions', href: '#admissions' },
  { name: 'Campus', href: '#campus' },
  { name: 'Life at Sheril', href: '#student-life' },
];

export function Header() {
  const logo = PlaceHolderImages.find(img => img.id === 'school-logo');

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar - Very thin and subtle */}
      <div className="h-10 bg-foreground/5 border-b border-foreground/5 backdrop-blur-md hidden sm:flex items-center justify-between px-10">
        <div className="flex gap-6">
          <span className="text-[10px] font-medium tracking-widest text-foreground/40 uppercase">Global Campus</span>
          <span className="text-[10px] font-medium tracking-widest text-foreground/40 uppercase">Research Excellence</span>
        </div>
        <div className="flex gap-6 items-center">
          <a href="tel:+123456789" className="text-[10px] font-medium tracking-widest text-foreground/60 hover:text-primary transition-colors uppercase">Support</a>
          <div className="w-px h-3 bg-foreground/10" />
          <a href="/login" className="text-[10px] font-medium tracking-widest text-foreground/60 hover:text-primary transition-colors uppercase">Student Portal</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="h-20 bg-background/80 backdrop-blur-xl border-b border-foreground/5 px-6 sm:px-10 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-5 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20 transition-all duration-500 group-hover:rotate-[360deg]">
            {logo && (
              <Image 
                src={logo.imageUrl} 
                alt="Sheril Logo" 
                fill 
                className="object-cover p-1.5"
                data-ai-hint={logo.imageHint}
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-headline font-bold tracking-tighter text-foreground leading-none">Sheril</span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-primary -mt-0.5">Academy</span>
          </div>
        </div>

        {/* Navigation - Spaced Out Editorial Style */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-all duration-300 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full w-10 h-10 hover:bg-foreground/5 text-foreground/60"
          >
            <Search className="w-4 h-4" />
          </Button>
          
          <Button 
            className="hidden md:flex h-12 px-8 bg-foreground text-background hover:bg-foreground/90 rounded-none font-bold uppercase tracking-widest text-[10px] transition-all duration-300 hover:gap-4 group"
          >
            Apply Now
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden rounded-full w-10 h-10"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
