import Navbar from '@/components/landing/Navbar';
import SmartRoutePlanner from '@/components/landing/SmartRoutePlanner';
import AILostMode from '@/components/landing/AILostMode';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAFBFF' }}>
      <Navbar />
      <SmartRoutePlanner />
      <AILostMode />
    </main>
  );
}
