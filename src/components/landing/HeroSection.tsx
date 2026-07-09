'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, CheckCircle2, Trophy, GraduationCap, Users, BookOpen } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/30 rounded-full blur-[100px] opacity-40" />
        
        {/* Abstract organic shapes */}
        <svg className="absolute top-1/4 left-10 w-24 h-24 text-blue-100 opacity-20" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-1/4 right-1/4 w-32 h-32 text-amber-50 opacity-30" viewBox="0 0 100 100">
           <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" fill="currentColor" />
        </svg>
        
        {/* Dotted Grids */}
        <div className="absolute top-40 right-20 grid grid-cols-4 gap-2 opacity-[0.03]">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="relative z-10 space-y-10">
          <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF5FF] border border-[#5A8BFF]/10 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#5A8BFF] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5A8BFF]">
              ✨ Future Ready Education
            </span>
          </div>

          <h1 className="text-[80px] lg:text-[96px] leading-[1.05] font-headline font-bold text-[#10213A] tracking-[-0.03em]">
            Inspiring <br />
            <span className="text-[#103D8F]">Young Minds</span> <br />
            <span className="italic font-normal serif text-[#68768A]">for</span> <span className="text-[#FFC94D]">Tomorrow.</span>
          </h1>

          <p className="max-w-lg text-[18px] text-[#68768A] leading-relaxed">
            Nurturing curiosity, creativity, and leadership through an innovation-driven curriculum designed to build confidence in every student.
          </p>

          <div className="flex items-center gap-5">
            <Button className="group bg-[#10213A] hover:bg-[#103D8F] text-white rounded-full px-8 h-14 text-[15px] font-bold transition-all shadow-xl hover:translate-y-[-2px]">
              Explore Our School
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="group bg-white/40 backdrop-blur-md border-[#68768A]/20 rounded-full px-8 h-14 text-[15px] font-bold text-[#10213A] hover:bg-white/60 transition-all">
              <div className="w-8 h-8 rounded-full bg-[#103D8F]/5 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 text-[#103D8F] fill-current" />
              </div>
              Watch Our Video
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 pt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-100">
                  <Image
                    src={`https://picsum.photos/seed/student${i}/100/100`}
                    alt="Student"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-[#FFC94D] flex items-center justify-center text-[11px] font-bold text-[#103D8F]">
                1.2K+
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#FFC94D] fill-current" />
                ))}
              </div>
              <p className="text-[13px] font-medium text-[#68768A]">
                Trusted by <span className="text-[#10213A] font-bold">2,500+ Families</span> 
                <CheckCircle2 className="w-3.5 h-3.5 inline ml-2 text-green-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Elements */}
        <div className="relative">
          {/* Main Blob Image Container */}
          <div className="relative w-full aspect-[4/5] max-w-[550px] mx-auto z-10">
            <div className="absolute inset-0 bg-blue-50 animate-blob rounded-[42%_58%_70%_30%_/_45%_45%_55%_55%] border-[12px] border-white shadow-2xl overflow-hidden">
              <Image
                src="https://picsum.photos/seed/school-hero/800/1000"
                alt="Sheril Academy Students"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                data-ai-hint="smiling students"
              />
            </div>

            {/* Floating Glass Cards */}
            <div className="absolute top-10 -left-12 z-20 animate-float">
              <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-5 rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center gap-4 group hover:translate-y-[-2px] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#5A8BFF]/10 flex items-center justify-center text-[#5A8BFF]">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#10213A]">15+ Years</h4>
                  <p className="text-[11px] text-[#68768A]">Educational Excellence</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 -right-16 z-20 animate-float-delayed">
              <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-5 rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center gap-4 group hover:translate-y-[-2px] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#FFC94D]/10 flex items-center justify-center text-[#FFC94D]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#10213A]">Ranked #1</h4>
                  <p className="text-[11px] text-[#68768A]">Top Innovation School</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-1/4 z-20">
              <div className="bg-[#103D8F] p-6 rounded-[24px] shadow-2xl flex items-center gap-5 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold">Admissions Open</h4>
                  <p className="text-[12px] opacity-70">Academic Year 2025-26</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFC94D]/10 rounded-full blur-[60px]" />
          <div className="absolute top-1/2 -left-20 w-32 h-32 bg-[#5A8BFF]/5 rounded-full blur-[40px]" />
        </div>
      </div>
    </section>
  );
}
