import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Digital Twin | CampusPilot AI',
  description: 'Interactive 3D digital twin of the campus with real-time building data.',
};

export default function DigitalTwinPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <iframe
        src="https://iviewd.com/lpu2/"
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; camera; gyroscope; magnetometer; microphone; xr-spatial-tracking"
        allowFullScreen
        loading="lazy"
      />
    </main>
  );
}
