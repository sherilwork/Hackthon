'use client';

import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
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
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.url}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover scale-105"
                  data-ai-hint={slide.hint}
                />
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
    </section>
  );
}
