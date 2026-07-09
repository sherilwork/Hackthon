import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        
        {/* Value Propositions Grid Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Academic Excellence', desc: 'A dynamic curriculum that fosters critical thinking, creativity, and innovation.', icon: '🏆' },
              { title: 'Holistic Development', desc: 'Sports, arts, leadership, and life skills for well-rounded growth.', icon: '🎨' },
              { title: 'World-Class Campus', desc: 'Modern facilities and a safe, inclusive environment that inspires learning.', icon: '🏢' },
              { title: 'Caring Community', desc: 'A supportive community that nurtures values, respect, and empathy.', icon: '❤️' },
            ].map((item, idx) => (
              <div key={idx} className="group p-8 rounded-[32px] bg-[#F8FBFF] border border-transparent hover:border-[#5A8BFF]/20 hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="text-4xl mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-headline font-bold text-[#10213A] mb-3">{item.title}</h3>
                <p className="text-[14px] text-[#68768A] leading-relaxed mb-6">
                  {item.desc}
                </p>
                <button className="text-[13px] font-bold text-[#103D8F] flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
