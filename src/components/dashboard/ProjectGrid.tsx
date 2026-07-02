
"use client"

import React from 'react';
import { Boxes, Zap, Globe, Cpu } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const projects = [
  { name: 'Devora Platform', icon: Boxes, progress: 75, color: 'text-primary' },
  { name: 'E-commerce SDK', icon: Globe, progress: 40, color: 'text-accent' },
  { name: 'Internal Tools', icon: Cpu, progress: 92, color: 'text-primary' },
  { name: 'Marketing Hub', icon: Zap, progress: 15, color: 'text-yellow-600' },
];

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {projects.map((project) => (
        <div key={project.name} className="luxury-card rounded-[28px] p-5 hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl bg-secondary/50 ${project.color}`}>
              <project.icon className="w-5 h-5" />
            </div>
            <h6 className="text-sm font-semibold truncate">{project.name}</h6>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
              <span>Active development</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
