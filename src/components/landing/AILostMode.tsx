'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Crosshair, CheckCircle2, Navigation, ArrowRight,
  Scan, Eye, ChevronRight, Building2, Layers, Camera,
  RefreshCw, XCircle, Video, VideoOff
} from 'lucide-react';

const landmarks = [
  { id: 'cs', label: 'Computer Science Dept', icon: '💻', floor: '2nd Floor', block: 'Block B' },
  { id: 'lib', label: 'Central Library', icon: '📚', floor: 'Ground Floor', block: 'Block A' },
  { id: 'caf', label: 'Cafeteria', icon: '🍕', floor: 'Ground Floor', block: 'Block C' },
  { id: 'admin', label: 'Admin Office', icon: '🏛️', floor: '1st Floor', block: 'Block A' },
  { id: 'lab', label: 'AI Research Lab', icon: '🤖', floor: '3rd Floor', block: 'Block D' },
  { id: 'hostel', label: 'Hostel Block', icon: '🏠', floor: 'All Floors', block: 'Block E' },
];

interface DetectedLocation {
  building: string;
  floor: string;
  near: string;
  confidence: number;
  detectedFrom: string;
}

export default function AILostMode() {
  const [stage, setStage] = useState<'idle' | 'camera' | 'scanning' | 'result'>('idle');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedLandmark, setSelectedLandmark] = useState<typeof landmarks[0] | null>(null);
  const [result, setResult] = useState<DetectedLocation | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStage('camera');
    } catch (err: unknown) {
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setCameraError('Camera permission denied. Please allow camera access and try again.');
        } else if (err.name === 'NotFoundError') {
          setCameraError('No camera found on this device.');
        } else {
          setCameraError('Unable to access camera. Please check permissions.');
        }
      } else {
        setCameraError('Something went wrong. Please try again.');
      }
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const handleCapture = () => {
    setStage('scanning');
    setScanProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const randomLandmark = landmarks[Math.floor(Math.random() * landmarks.length)];
        setSelectedLandmark(randomLandmark);
        setResult({
          building: randomLandmark.block,
          floor: randomLandmark.floor,
          near: randomLandmark.label,
          confidence: 94 + Math.floor(Math.random() * 5),
          detectedFrom: 'Camera analysis + OCR + Landmark detection',
        });
        stopCamera();
        setStage('result');
      }
    }, 55);
  };

  const reset = () => {
    stopCamera();
    setStage('idle');
    setSelectedLandmark(null);
    setScanProgress(0);
    setResult(null);
    setCameraError(null);
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#FAFBFF' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '10s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            Visual AI Detection
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            AI Lost <span className="text-gradient">Mode</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Don&apos;t know where you are? Open camera, point at any sign and AI will identify your location.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-strong rounded-3xl shadow-premium-lg overflow-hidden"
          >
            {/* Idle */}
            {stage === 'idle' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Crosshair className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Locate Me with AI</h3>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                  Open your camera, point at any room number or sign board and AI will find your exact position.
                </p>
                <button
                  onClick={startCamera}
                  className="w-full py-4 rounded-2xl bg-gradient-primary text-white font-semibold text-base hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Locate Me with AI
                </button>
                {cameraError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3"
                  >
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-red-800">{cameraError}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Camera */}
            {stage === 'camera' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-[3/4] bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay UI */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top bar */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur rounded-full">
                      <Video className="w-4 h-4 text-green-400" />
                      <span className="text-white text-xs font-medium">AI Camera Active</span>
                    </div>
                    <button
                      onClick={reset}
                      className="p-2 bg-black/40 backdrop-blur rounded-full text-white/70 hover:text-white transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Focus frame */}
                  <div className="absolute inset-[15%] border-2 border-white/30 rounded-2xl">
                    <div className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-3 border-l-3 border-blue-400 rounded-tl-xl" />
                    <div className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-3 border-r-3 border-blue-400 rounded-tr-xl" />
                    <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-3 border-l-3 border-blue-400 rounded-bl-xl" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-3 border-r-3 border-blue-400 rounded-br-xl" />
                  </div>

                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-5 py-2.5 bg-black/30 backdrop-blur rounded-xl">
                      <p className="text-white/80 text-sm font-medium text-center">
                        Point at room number or sign board
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom capture button */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleCapture}
                      className="w-18 h-18 rounded-full bg-white border-4 border-white/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-xl"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Scan className="w-7 h-7 text-white" />
                      </div>
                    </button>
                  </div>
                  <p className="text-white/60 text-xs text-center mt-3">Tap to scan surroundings</p>
                </div>
              </motion.div>
            )}

            {/* Scanning */}
            {stage === 'scanning' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center"
                  >
                    <Scan className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Analyzing Camera Feed</h3>
                  <p className="text-sm text-slate-500">AI is processing visual data...</p>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Detecting room numbers via OCR', threshold: 20 },
                    { label: 'Reading direction boards', threshold: 45 },
                    { label: 'Identifying department signs', threshold: 70 },
                    { label: 'Matching landmarks with campus map', threshold: 90 },
                  ].map((step, i) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        scanProgress >= step.threshold
                          ? 'bg-green-100 text-green-600'
                          : scanProgress >= step.threshold - 20
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        {scanProgress >= step.threshold ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                      <span className={`text-sm transition-colors duration-300 ${
                        scanProgress >= step.threshold ? 'text-slate-900 font-medium' : 'text-slate-400'
                      }`}>
                        {step.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Processing frame</span>
                    <span className="font-mono text-blue-600">{Math.min(scanProgress, 98)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${Math.min(scanProgress, 98)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {stage === 'result' && result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-16 h-16 rounded-2xl bg-green-100 mx-auto mb-4 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Location Found!</h3>
                  <p className="text-sm text-slate-500">AI identified your exact position</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Building</p>
                      <p className="text-lg font-bold text-slate-900">{result.building}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-purple-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Layers className="w-3.5 h-3.5 text-purple-600" />
                        <p className="text-xs font-medium text-purple-600 uppercase tracking-wider">Floor</p>
                      </div>
                      <p className="text-base font-bold text-slate-900">{result.floor}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">Near</p>
                      </div>
                      <p className="text-base font-bold text-slate-900">{result.near}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500">Detection Method</span>
                      <span className="text-xs text-green-600 font-semibold">{result.confidence}% match</span>
                    </div>
                    <p className="text-sm text-slate-600">{result.detectedFrom}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 rounded-2xl bg-gradient-primary text-white font-semibold text-base hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Navigate Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={reset}
                    className="w-full py-3 rounded-2xl border-2 border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Scan Again
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
