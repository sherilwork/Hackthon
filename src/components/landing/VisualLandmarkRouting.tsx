'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Navigation, ArrowRight, Compass, MapPin, Building2,
  XCircle, Radar, ArrowUp, Layers, Eye, RotateCw
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const landmarkData = [
  { name: 'Block A', direction: 'left', distance: '22m', bearing: 'NW', x: '15%', y: '30%', color: 'blue' },
  { name: 'Block B', direction: 'right', distance: '45m', bearing: 'NE', x: '70%', y: '20%', color: 'purple' },
  { name: 'Block C', direction: 'center', distance: '60m', bearing: 'N', x: '45%', y: '10%', color: 'green' },
  { name: 'Library', direction: 'right', distance: '30m', bearing: 'E', x: '75%', y: '40%', color: 'amber' },
  { name: 'Cafeteria', direction: 'left', distance: '15m', bearing: 'W', x: '10%', y: '55%', color: 'orange' },
  { name: 'Sports Complex', direction: 'center', distance: '80m', bearing: 'N', x: '50%', y: '5%', color: 'teal' },
];

const directionArrow = (dir: string) => {
  switch (dir) {
    case 'left': return '←';
    case 'right': return '→';
    case 'center': return '↑';
    default: return '↑';
  }
};

export default function VisualLandmarkRouting() {
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    setCameraError(null);

    if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      setCameraError('Camera requires a secure connection (HTTPS). Deploy the site or use localhost.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraReady(true);
    } catch (err: unknown) {
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setCameraError('Camera permission denied. Please allow access.');
        } else if (err.name === 'NotFoundError') {
          setCameraError('No camera found on this device.');
        } else {
          setCameraError('Unable to access camera.');
        }
      } else {
        setCameraError('Something went wrong.');
      }
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [startCamera]);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Camera Feed */}
      {cameraReady ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          {cameraError ? (
            <div className="text-center p-8 max-w-sm">
              <div className="w-16 h-16 rounded-2xl bg-red-500/20 mx-auto mb-4 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-white font-semibold mb-2">Camera Error</p>
              <p className="text-white/60 text-sm mb-6">{cameraError}</p>
              <Button onClick={startCamera} variant="pill">
                Try Again
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 mx-auto mb-4 flex items-center justify-center animate-pulse">
                <Camera className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-white/60">Starting camera...</p>
            </div>
          )}
        </div>
      )}

      {/* VR Overlay */}
      {cameraReady && showOverlay && (
        <>
          {/* Buildings */}
          {landmarkData.map((lm) => (
            <motion.div
              key={lm.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute cursor-pointer group"
              style={{ left: lm.x, top: lm.y }}
              onClick={() => setSelectedLandmark(lm.name)}
            >
              <div className="relative flex flex-col items-center">
                {/* Direction arrow */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className={`text-3xl font-bold ${
                    lm.color === 'blue' ? 'text-blue-400' :
                    lm.color === 'purple' ? 'text-purple-400' :
                    lm.color === 'green' ? 'text-green-400' :
                    lm.color === 'amber' ? 'text-amber-400' :
                    lm.color === 'orange' ? 'text-orange-400' : 'text-teal-400'
                  } drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
                >
                  {directionArrow(lm.direction)}
                </motion.div>
                {/* Label */}
                <div className={`px-3 py-1.5 rounded-xl backdrop-blur-xl border ${
                  selectedLandmark === lm.name
                    ? 'bg-white/90 text-slate-900 border-white/40'
                    : 'bg-black/40 text-white border-white/20'
                } shadow-lg transition-all duration-300 group-hover:bg-white/80 group-hover:text-slate-900`}>
                  <p className="text-xs font-bold whitespace-nowrap">{lm.name}</p>
                  <p className="text-[10px] opacity-60">{lm.distance} · {lm.bearing}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Selected landmark card */}
          <AnimatePresence>
            {selectedLandmark && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="absolute bottom-28 left-4 right-4 max-w-sm mx-auto"
              >
                <div className="bg-white/90 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl border border-white/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{selectedLandmark}</p>
                        <p className="text-xs text-slate-500">
                          {landmarkData.find(l => l.name === selectedLandmark)?.distance} away
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLandmark(null)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-600"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-1.5">
                      <Navigation className="w-4 h-4" />
                      Navigate
                    </button>
                    <button className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-white text-sm hover:bg-black/60 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                Back
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full">
                <Radar className="w-4 h-4 text-green-400" />
                <span className="text-white text-xs font-medium">AR Active</span>
              </div>
            </div>

            {/* Compass */}
            <div className="absolute top-20 right-4 pointer-events-auto">
              <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Bottom AR bar */}
            <div className="absolute bottom-6 left-4 right-4 pointer-events-auto">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">AR Landmark Detection</p>
                      <p className="text-white/50 text-[10px]">6 landmarks visible</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowOverlay(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
                  >
                    Hide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
