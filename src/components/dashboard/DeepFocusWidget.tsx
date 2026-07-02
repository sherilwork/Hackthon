
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function DeepFocusWidget() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const zenImg = PlaceHolderImages.find(img => img.id === 'zen-stones');

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setSeconds(25 * 60);
    setIsActive(false);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full rounded-[28px] bg-gradient-to-br from-accent/80 to-accent p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
      <div className="relative z-10">
        <h5 className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-6">Deep Focus</h5>
        <div className="text-6xl font-headline font-bold mb-4 tabular-nums">
          {formatTime(seconds)}
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggle}
          className="rounded-full bg-white/20 border-white/20 hover:bg-white/30 text-white"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={reset}
          className="rounded-full text-white/60 hover:text-white hover:bg-transparent"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {zenImg && (
        <div className="absolute -bottom-2 -right-2 opacity-30 group-hover:opacity-50 transition-all duration-500 scale-125">
          <Image 
            src={zenImg.imageUrl} 
            alt={zenImg.description} 
            width={120} 
            height={120}
            className="grayscale brightness-200"
            data-ai-hint={zenImg.imageHint}
          />
        </div>
      )}
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
    </div>
  );
}
