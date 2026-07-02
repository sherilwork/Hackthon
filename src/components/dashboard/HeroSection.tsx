
"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { zenPresenceHeroGeneration, ZenPresenceHeroGenerationOutput } from '@/ai/flows/zen-presence-hero-generation';
import { priorityPulseDiscovery, PriorityPulseDiscoveryOutput } from '@/ai/flows/priority-pulse-discovery';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroSection() {
  const [heroData, setHeroData] = useState<ZenPresenceHeroGenerationOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [priorities, setPriorities] = useState<PriorityPulseDiscoveryOutput | null>(null);
  const [loadingPriorities, setLoadingPriorities] = useState(false);

  useEffect(() => {
    async function loadHero() {
      try {
        const data = await zenPresenceHeroGeneration({
          productivitySummary: "Highly focused on backend architecture recently with consistent morning output.",
          currentDate: new Date().toISOString().split('T')[0]
        });
        setHeroData(data);
      } catch (error) {
        console.error("Hero generation failed", error);
      } finally {
        setLoading(false);
      }
    }
    loadHero();
  }, []);

  const handleDiscovery = async () => {
    setLoadingPriorities(true);
    try {
      const data = await priorityPulseDiscovery({
        tasks: [
          { id: '1', name: 'Refactor Core Engine', status: 'In Progress', priority: 'High', project: 'Devora UI' },
          { id: '2', name: 'Client Feedback Session', status: 'To Do', priority: 'Urgent', dueDate: '2024-06-20' },
          { id: '3', name: 'Documentation Sprint', status: 'To Do', priority: 'Medium' }
        ]
      });
      setPriorities(data);
    } catch (error) {
      console.error("Priority discovery failed", error);
    } finally {
      setLoadingPriorities(false);
    }
  };

  if (loading) {
    return <Skeleton className="w-full h-[320px] rounded-[28px]" />;
  }

  return (
    <div className="relative w-full h-[320px] rounded-[28px] overflow-hidden luxury-card group">
      {heroData?.sumiEArt && (
        <Image 
          src={heroData.sumiEArt}
          alt="Zen Presence Art"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-card/20 to-transparent p-10 flex flex-col justify-between z-10">
        <div>
          <h3 className="text-4xl font-headline font-bold leading-tight max-w-sm mb-4">
            Keep building.<br />Keep growing.
          </h3>
          <p className="text-sm font-headline italic text-muted-foreground/80 max-w-md">
            {heroData?.quote || "Embrace the process, for each stroke defines the landscape."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="link" 
                className="text-primary font-medium hover:text-accent p-0 flex items-center gap-2 group/btn"
                onClick={handleDiscovery}
              >
                View my priorities <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[28px]">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Priority Pulse Discovery</DialogTitle>
              </DialogHeader>
              <div className="py-6 space-y-4">
                {loadingPriorities ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : priorities?.criticalPriorities ? (
                  priorities.criticalPriorities.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-secondary/50 border border-border/50">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                          {item.project && <p className="text-[10px] text-accent font-medium mt-2 uppercase tracking-wider">{item.project}</p>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center italic">Failed to discover priorities. Try reflecting on your goals.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
