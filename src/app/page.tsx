import { Header } from '@/components/landing/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCFBF8]">
      <Header />
      <main className="pt-20">
        {/* The hero section was removed, content can be added here */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="animate-fade-in opacity-0 text-center space-y-6">
            <h2 className="text-5xl font-headline font-bold text-[#1E2433]">
              Welcome to <span className="text-[#2BB673]">Sheril Academy</span>
            </h2>
            <p className="text-xl text-[#1E2433]/60 max-w-2xl mx-auto">
              A premier institution dedicated to nurturing the leaders of tomorrow through holistic education and innovation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
