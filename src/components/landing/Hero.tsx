'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-students');

  return (
    <section className="relative min-h-screen overflow-hidden bg-foreground">
      <div className="absolute top-0 right-0 w-full sm:w-[58%] h-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-foreground/70 to-foreground" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/40" />
      </div>

      <div className="absolute top-1/4 left-[42%] w-px h-32 bg-gradient-to-b from-primary/40 to-transparent hidden lg:block" />
      <div className="absolute top-[calc(25%+2rem)] left-[42%] w-3 h-3 rounded-full border border-primary/30 hidden lg:block" />

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 w-full">
          <div className="max-w-[500px]">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 text-[11px] font-semibold uppercase tracking-[0.12em] mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Admissions Open 2027-28
            </div>

            <h1 className="text-5xl lg:text-[4.25rem] leading-[1.04] font-headline font-bold text-white mb-6 tracking-tight">
              Shape{' '}
              <span className="italic text-primary">tomorrow</span>
              <span className="text-white/90">.</span>
              <br />
              <span className="relative">
                <span className="relative z-10">Start today</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/25 -rotate-1 z-0" />
              </span>
              <span className="text-white/90">.</span>
            </h1>

            <p className="text-base text-white/40 leading-relaxed mb-10 max-w-[400px]">
              A research-driven school where curiosity meets purpose. We nurture global thinkers through mentorship, innovation, and a passion for lifelong learning.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Button className="rounded-full h-12 px-9 text-sm bg-primary text-white hover:bg-primary/90 font-semibold shadow-xl shadow-primary/25 transition-all flex gap-2 group">
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button className="rounded-full h-12 px-9 text-sm bg-transparent border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all">
                Explore Programs
              </Button>
            </div>

            <div className="flex items-center gap-8 lg:gap-12 pt-8 border-t border-white/[0.06]">
              {[
                { number: '15+', label: 'Years Legacy' },
                { number: '500+', label: 'Students' },
                { number: '98%', label: 'Graduation Rate' },
              ].map((stat, idx) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div>
                    <span className="text-2xl font-bold font-headline text-white">{stat.number}</span>
                    <span className="block text-[11px] text-white/35 font-medium uppercase tracking-wider mt-0.5">{stat.label}</span>
                  </div>
                  {idx < 2 && <div className="h-10 w-px bg-white/[0.06]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
