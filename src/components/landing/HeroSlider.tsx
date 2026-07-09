'use client';

import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slidesData from '@/app/lib/placeholder-images.json';

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 35,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(intervalId);
  }, [emblaApi, onSelect]);

  const slides = slidesData.heroSlides;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Image with subtle zoom animation could be added via CSS if desired */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.url}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover scale-105"
                  data-ai-hint={slide.hint}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-5xl px-6 md:px-12 text-center text-white space-y-8">
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 mb-2">
                      Est. 1995 • Premier Institution
                    </span>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-headline font-bold leading-[1.1] tracking-tight drop-shadow-2xl">
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className={i === 1 ? "text-primary italic" : ""}>{word} </span>
                      ))}
                    </h1>
                    <p className="text-base md:text-xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                      {slide.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    <Button 
                      size="lg" 
                      className="rounded-full px-10 h-14 text-sm font-bold bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                    >
                      {slide.ctaPrimary}
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="rounded-full px-10 h-14 text-sm font-bold bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                    >
                      {slide.ctaSecondary}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Navigation Controls */}
      <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12 flex items-center justify-between z-20 pointer-events-none">
        {/* Progress Dots */}
        <div className="flex gap-4 pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="group py-4 focus:outline-none"
            >
              <div className={`h-1 rounded-full transition-all duration-700 ease-out ${
                index === selectedIndex ? 'w-12 bg-primary' : 'w-4 bg-white/30 group-hover:bg-white/50'
              }`} />
            </button>
          ))}
        </div>

        {/* Arrow Navigation */}
        <div className="flex gap-3 pointer-events-auto">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FCFBF8] to-transparent z-10" />
    </section>
  );
}