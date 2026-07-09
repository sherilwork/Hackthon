'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, CheckCircle2, Trophy, GraduationCap, BookOpen } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] pt-24 pb-12 overflow-hidden bg-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/30 rounded-full blur-[100px] opacity-40" />
        
        {/* Abstract organic shapes */}
        <svg className="absolute top-1/4 left-10 w-20 h-20 text-blue-100 opacity-20" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
        
        {/* Dotted Grids */}
        <div className="absolute top-40 right-20 grid grid-cols-4 gap-2 opacity-[0.03]">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="relative z-10 space-y-6">
          <h1 className="text-[48px] lg:text-[62px] leading-[1.1] font-headline font-bold text-[#10213A] tracking-[-0.03em]">
            Inspiring <span className="text-[#103D8F]">Young Minds</span> <br />
            for <span className="text-[#FFC94D]">Tomorrow.</span>
          </h1>

          <p className="max-w-md text-[15px] text-[#68768A] leading-relaxed">
            Nurturing curiosity, creativity, and leadership through an innovation-driven curriculum designed to build confidence in every student.
          </p>

          <div className="flex items-center gap-4">
            <Button className="group bg-[#10213A] hover:bg-[#103D8F] text-white rounded-full px-6 h-11 text-[13px] font-bold transition-all shadow-xl hover:translate-y-[-2px]">
              Explore Our School
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="group bg-white/40 backdrop-blur-md border-[#68768A]/20 rounded-full px-6 h-11 text-[13px] font-bold text-[#10213A] hover:bg-white/60 transition-all">
              <div className="w-6 h-6 rounded-full bg-[#103D8F]/5 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                <Play className="w-2.5 h-2.5 text-[#103D8F] fill-current" />
              </div>
              Watch Video
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                  <Image
                    src={`https://picsum.photos/seed/student${i}/80/80`}
                    alt="Student"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-white bg-[#FFC94D] flex items-center justify-center text-[9px] font-bold text-[#103D8F]">
                1.2K+
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 text-[#FFC94D] fill-current" />
                ))}
              </div>
              <p className="text-[11px] font-medium text-[#68768A]">
                Trusted by <span className="text-[#10213A] font-bold">2,500+ Families</span> 
                <CheckCircle2 className="w-2.5 h-2.5 inline ml-1 text-green-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Elements */}
        <div className="relative">
          {/* Main Blob Image Container */}
          <div className="relative w-full aspect-[4/5] max-w-[420px] mx-auto z-10">
            <div className="absolute inset-0 bg-blue-50 animate-blob rounded-[42%_58%_70%_30%_/_45%_45%_55%_55%] border-[10px] border-white shadow-xl overflow-hidden">
              <Image
                src="https://picsum.photos/seed/school-hero/800/1000"
                alt="Sheril Academy Students"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                data-ai-hint="smiling students"
              />
            </div>

            {/* Floating Glass Cards */}
            <div className="absolute top-6 -left-6 z-20 animate-float">
              <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-3 rounded-[18px] shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex items-center gap-2.5 group hover:translate-y-[-2px] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#5A8BFF]/10 flex items-center justify-center text-[#5A8BFF]">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#10213A]">15+ Years</h4>
                  <p className="text-[9px] text-[#68768A]">Excellence</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 -right-10 z-20 animate-float-delayed">
              <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-3 rounded-[18px] shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex items-center gap-2.5 group hover:translate-y-[-2px] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#FFC94D]/10 flex items-center justify-center text-[#FFC94D]">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#10213A]">Ranked #1</h4>
                  <p className="text-[9px] text-[#68768A]">Innovation</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 left-1/4 z-20">
              <div className="bg-[#103D8F] p-4 rounded-[18px] shadow-xl flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold">Admissions Open</h4>
                  <p className="text-[10px] opacity-70">2025-26 Session</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FFC94D]/10 rounded-full blur-[45px]" />
          <div className="absolute top-1/2 -left-20 w-24 h-24 bg-[#5A8BFF]/5 rounded-full blur-[30px]" />
        </div>
      </div>
    </section>
  );
}
