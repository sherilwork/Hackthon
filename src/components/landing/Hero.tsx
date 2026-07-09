'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, Sparkles, Beaker, CheckCircle2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-students');

  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-secondary/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[140px] rounded-full" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-sky-100/40 blur-[100px] rounded-full" />
        
        {/* Subtle dot pattern */}
        <div className="absolute top-40 right-40 opacity-10">
          <div className="grid grid-cols-6 gap-3">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-foreground rounded-full" />
            ))}
          </div>
        </div>

        {/* Floating lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 1000 1000">
          <path d="M-100,500 C200,300 400,700 1100,400" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M-100,600 C300,400 500,800 1100,500" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 max-w-[580px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/40 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-6 animate-fade-in">
              <Sparkles className="w-3 h-3 fill-current" />
              Admissions Open 2027
            </div>

            <h2 className="text-5xl lg:text-[4.5rem] leading-[1.1] font-headline font-bold text-foreground mb-6">
              Dream <span className="italic">Bigger.</span><br />
              <span className="gradient-text">Learn Smarter.</span>
            </h2>

            <p className="text-base lg:text-lg text-muted-foreground/80 leading-relaxed mb-8 max-w-[480px]">
              Empowering global thinkers through research-based learning and an environment where curiosity meets excellence. Your journey to the future starts here.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button className="rounded-full h-12 px-8 text-sm bg-gradient-to-r from-primary to-primary/90 text-white font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all flex gap-2">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="rounded-full h-12 px-8 text-sm border-border bg-white/50 backdrop-blur-sm hover:bg-white transition-all flex gap-2">
                <Calendar className="w-4 h-4" />
                View Calendar
              </Button>
            </div>

            <div className="flex items-center gap-6 py-4 border-t border-border/60">
              {['CBSE Affiliated', 'Established 2008', 'Smart Campus', 'Digital Learning'].map((item, idx) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.1em] whitespace-nowrap">
                    {item}
                  </span>
                  {idx < 3 && <div className="h-3 w-px bg-border/80" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 relative w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="relative w-full aspect-[4/5] lg:w-[480px] rounded-[50px] lg:rounded-[100px] overflow-hidden shadow-2xl shadow-primary/10 rotate-[-1deg] group">
              {heroImage && (
                <Image 
                  src={heroImage.imageUrl} 
                  alt="Students" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  priority
                  data-ai-hint={heroImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating UI Cards */}
            
            {/* Innovation Labs */}
            <div className="absolute -top-2 -left-4 glass-card rounded-[24px] p-4 max-w-[160px] animate-float">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-3">
                <Beaker className="w-5 h-5 text-sky-500" />
              </div>
              <h4 className="font-bold text-sm text-foreground mb-1">Innovation Labs</h4>
              <p className="text-[10px] text-muted-foreground leading-snug">Hands-on STEM experiences.</p>
            </div>

            {/* Achievement Stack */}
            <div className="absolute top-1/4 -right-8 glass-card rounded-[24px] p-4 min-w-[200px] animate-float-delayed">
              <div className="space-y-3">
                {[
                  { label: 'Personalized Learning', color: 'text-primary' },
                  { label: 'Global Curriculum', color: 'text-accent' },
                  { label: 'Future Skills', color: 'text-sky-500' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Gradient Card */}
            <div className="absolute -bottom-4 left-1/4 bg-gradient-to-br from-primary to-[#1a6e45] rounded-[24px] p-6 text-white shadow-2xl shadow-primary/40 min-w-[240px] animate-float-slow">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-lg font-bold">Future Ready</h4>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </div>
              <p className="text-white/70 text-xs">Preparing tomorrow's leaders.</p>
            </div>

            {/* Statistic Badge */}
            <div className="absolute bottom-1/4 -left-8 w-24 h-24 rounded-full glass-card flex flex-col items-center justify-center p-3 animate-float">
              <span className="text-xl font-bold text-primary">95%</span>
              <span className="text-[9px] text-center font-bold uppercase tracking-wider text-muted-foreground">Satisfied</span>
            </div>

            {/* Tiny Glass Notification */}
            <div className="absolute top-[10%] right-1/4 glass-card rounded-xl px-4 py-2 flex items-center gap-2 animate-pulse">
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-bold">Scholarships Open</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
