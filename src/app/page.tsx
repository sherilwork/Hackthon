import { Header } from '@/components/landing/Header';
import { HeroSlider } from '@/components/landing/HeroSlider';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCFBF8]">
      <Header />
      <main>
        <HeroSlider />
        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* Future sections like About, Featured Programs, etc. will go here */}
        </div>
      </main>
    </div>
  );
}