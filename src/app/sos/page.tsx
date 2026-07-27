import type { Metadata } from 'next';
import SOSPage from '@/components/landing/SOSPage';

export const metadata: Metadata = {
  title: 'SOS Emergency | CampusPilot AI',
  description: 'One-tap emergency alert with real-time location sharing to campus security.',
};

export default function SOS() {
  return <SOSPage />;
}
