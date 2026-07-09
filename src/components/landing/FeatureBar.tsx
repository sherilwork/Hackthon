'use client';

import React from 'react';
import { BookOpen, Users, Globe, Lightbulb, Trophy } from 'lucide-react';

const FEATURES = [
  {
    icon: <BookOpen className="w-6 h-6 text-[#2BB673]" />,
    bg: 'bg-[#DDF8EF]',
    title: 'Research-Based Learning',
    desc: 'Evidence driven pedagogies.'
  },
  {
    icon: <Users className="w-6 h-6 text-[#FF7F66]" />,
    bg: 'bg-[#FF7F66]/10',
    title: 'Expert Faculty',
    desc: 'Mentors from top universities.'
  },
  {
    icon: <Globe className="w-6 h-6 text-[#6BCBFF]" />,
    bg: 'bg-[#6BCBFF]/10',
    title: 'Global Exposure',
    desc: 'International exchange programs.'
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    bg: 'bg-yellow-50',
    title: 'Innovation Driven',
    desc: 'Fostering creative problem solving.'
  },
  {
    icon: <Trophy className="w-6 h-6 text-purple-500" />,
    bg: 'bg-purple-50',
    title: 'Holistic Development',
    desc: 'Beyond academic excellence.'
  }
];

export function FeatureBar() {
  return (
    <div className="max-w-[1400px] mx-auto px-8 relative z-10 -mt-10">
      <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white p-10 flex flex-wrap lg:flex-nowrap items-stretch justify-between gap-8">
        {FEATURES.map((feature, idx) => (
          <div key={feature.title} className="flex-1 min-w-[200px] group">
            <div className="flex items-start gap-5">
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <div>
                <h5 className="font-bold text-foreground text-sm mb-1">{feature.title}</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </div>
            {idx < FEATURES.length - 1 && (
              <div className="hidden lg:block absolute h-12 w-px bg-border/60 right-0 top-1/2 -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}