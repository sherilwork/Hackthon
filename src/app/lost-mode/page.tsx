import type { Metadata } from 'next';
import AILostMode from '@/components/landing/AILostMode';

export const metadata: Metadata = {
  title: 'AI Lost Mode | CampusPilot AI',
  description: 'Point your camera anywhere and AI identifies your exact campus location using computer vision.',
};

export default function LostModePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAFBFF' }}>
      <AILostMode />
    </main>
  );
}
