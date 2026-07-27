import type { Metadata } from 'next';
import VisualLandmarkRouting from '@/components/landing/VisualLandmarkRouting';

export const metadata: Metadata = {
  title: 'Visual Landmark Routing | CampusPilot AI',
  description: 'Navigate campus using AR-powered visual landmark detection with real building labels and direction arrows.',
};

export default function VisualLandmarkPage() {
  return <VisualLandmarkRouting />;
}
