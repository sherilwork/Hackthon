'use client';

import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const NAV_LINKS = [
  'Home', 'Why Us', 'Learning', 'Campus', 'Admissions', 'Student Life', 'Achievements', 'Contact'
];

export function Header() {
  const logo = PlaceHolderImages.find(img => img.id === 'school-logo');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary overflow-hidden relative border border-white shadow-sm">
            {logo && (
              <Image 
                src={logo.imageUrl} 
                alt="Logo" 
                fill 
                className="object-cover"
                data-ai-hint={logo.imageHint}
              />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Sheril Academy</h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Global Excellence</p>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center bg-white/40 backdrop-blur-md border border-white/50 rounded-full px-2 py-1.5 shadow-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="px-5 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-white/80 rounded-full transition-all duration-300"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/60 bg-white/40 shadow-sm hover:scale-105 transition-transform">
            <Phone className="w-4 h-4 text-foreground" />
          </Button>
          <Button className="rounded-[18px] px-8 h-12 bg-gradient-to-r from-primary to-[#24a164] text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all flex gap-2">
            Book a Campus Tour
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}