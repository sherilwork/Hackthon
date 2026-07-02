
"use client"

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';

export function StatsGrid() {
  const botanical = PlaceHolderImages.find(img => img.id === 'botanical-stat');

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* Card 1: Progress */}
      <div className="luxury-card rounded-[28px] p-6 relative overflow-hidden flex flex-col justify-between h-[240px]">
        <div className="relative z-10">
          <h5 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Weekly Output</h5>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-headline font-bold">68%</span>
            <span className="text-xs text-accent font-medium">+12% from last week</span>
          </div>
        </div>

        {botanical && (
          <div className="absolute top-2 -right-8 opacity-20 group-hover:opacity-30 transition-opacity">
            <Image 
              src={botanical.imageUrl} 
              alt={botanical.description} 
              width={180} 
              height={180} 
              className="grayscale"
              data-ai-hint={botanical.imageHint}
            />
          </div>
        )}

        <div className="space-y-3 relative z-10">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Development</span>
            <span>72/100 hrs</span>
          </div>
          <Progress value={68} className="h-1.5" />
        </div>
      </div>

      {/* Card 2: Task List */}
      <div className="luxury-card rounded-[28px] p-6 flex flex-col h-[240px]">
        <h5 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Focus Tasks</h5>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
          {[
            { label: 'Finalize Design System', priority: 'Urgent', done: false },
            { label: 'Review API Docs', priority: 'Medium', done: true },
            { label: 'Deploy Staging Env', priority: 'High', done: false },
            { label: 'Clean CSS variables', priority: 'Low', done: false },
          ].map((task, i) => (
            <div key={i} className="flex items-center gap-3">
              {task.done ? (
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
              <span className={cn("text-xs flex-1 truncate", task.done && "line-through text-muted-foreground")}>
                {task.label}
              </span>
              <span className={cn(
                "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase",
                task.priority === 'Urgent' ? 'bg-accent/10 text-accent' : 
                task.priority === 'High' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
              )}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Timeline */}
      <div className="luxury-card rounded-[28px] p-6 flex flex-col h-[240px]">
        <h5 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Milestones</h5>
        <div className="flex-1 space-y-6 relative ml-2">
          <div className="absolute left-[7px] top-1 bottom-1 w-[1px] bg-border" />
          {[
            { date: '22', month: 'JUN', title: 'Beta Release', status: 'Upcoming' },
            { date: '28', month: 'JUN', title: 'Client Review', status: 'Pending' },
            { date: '04', month: 'JUL', title: 'Final Handover', status: 'Goal' },
          ].map((item, i) => (
            <div key={i} className="relative flex items-center gap-4 group">
              <div className="w-4 h-4 rounded-full bg-background border border-border shrink-0 z-10 transition-colors group-hover:border-primary" />
              <div className="flex items-center gap-3">
                <div className="bg-secondary px-2 py-1 rounded-md flex flex-col items-center justify-center min-w-[32px]">
                  <span className="text-[10px] font-bold">{item.date}</span>
                  <span className="text-[7px] font-medium text-muted-foreground">{item.month}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold">{item.title}</p>
                  <p className="text-[9px] text-muted-foreground font-headline italic">{item.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
