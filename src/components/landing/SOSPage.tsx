'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, MapPin, Phone, Send, CheckCircle2,
  XCircle, Clock, Navigation, ArrowLeft, Loader2, Bell
} from 'lucide-react';
import Link from 'next/link';

export default function SOSPage() {
  const [stage, setStage] = useState<'idle' | 'confirm' | 'sending' | 'sent'>('idle');
  const [countdown, setCountdown] = useState(5);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locError, setLocError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocError(true),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleSOS = () => {
    setStage('confirm');
  };

  const confirmSOS = () => {
    setStage('sending');
    let sec = 5;
    setCountdown(sec);
    const interval = setInterval(() => {
      sec--;
      setCountdown(sec);
      if (sec <= 0) {
        clearInterval(interval);
        setStage('sent');
      }
    }, 1000);
  };

  const cancelSOS = () => {
    setStage('idle');
  };

  const reset = () => {
    setStage('idle');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      {/* Emergency pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mb-auto pt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* SOS Button Area */}
        {stage === 'idle' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSOS}
              className="relative w-48 h-48 rounded-full bg-gradient-to-br from-red-600 to-rose-700 shadow-[0_0_60px_rgba(220,38,38,0.3),0_0_120px_rgba(220,38,38,0.15)] flex items-center justify-center"
            >
              {/* Pulse rings */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border-2 border-red-400/30"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute inset-0 rounded-full border border-red-400/20"
              />
              <motion.div
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute inset-0 rounded-full border border-red-400/10"
              />

              <div className="relative flex flex-col items-center">
                <Shield className="w-14 h-14 text-white mb-1" />
                <span className="text-white text-3xl font-black tracking-widest">SOS</span>
              </div>
            </motion.button>

            <p className="text-white/50 text-sm mt-6 text-center max-w-xs">
              Tap the SOS button to send an emergency alert with your current location to campus security.
            </p>
          </motion.div>
        )}

        {/* Confirm */}
        {stage === 'confirm' && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center w-full max-w-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Emergency Alert</h2>
            <p className="text-white/50 text-sm text-center mb-8">
              This will immediately notify campus security with your current location.
            </p>

            {/* Location */}
            <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-white text-sm font-medium">
                  {location ? 'Location available' : locError ? 'Location unavailable' : 'Fetching location...'}
                </span>
              </div>
              {location && (
                <p className="text-white/40 text-xs font-mono">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              )}
              {locError && (
                <p className="text-red-400/60 text-xs">Enable GPS for precise location sharing</p>
              )}
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={cancelSOS}
                className="flex-1 py-4 rounded-2xl border border-white/20 text-white/70 font-semibold text-sm hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmSOS}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Send Alert
              </button>
            </div>
          </motion.div>
        )}

        {/* Sending */}
        {stage === 'sending' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 text-red-400 animate-spin" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Sending Alert</h2>
            <div className="flex items-center gap-2 mt-4">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-mono">0:{countdown.toString().padStart(2, '0')}</span>
            </div>
            <p className="text-white/50 text-xs mt-2">Notifying campus security...</p>

            <div className="w-full max-w-xs mt-8 space-y-3">
              {[
                { label: 'Emergency Contact', value: 'Campus Security' },
                { label: 'Alert Type', value: 'Emergency SOS' },
                { label: 'Location Shared', value: location ? 'Yes' : 'No' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 text-sm">{row.label}</span>
                  <span className="text-white/70 text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sent */}
        {stage === 'sent' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </motion.div>
            <h2 className="text-white text-2xl font-bold mb-2">Alert Sent!</h2>
            <p className="text-white/50 text-sm text-center max-w-xs mb-8">
              Campus security has been notified. Help is on the way. Stay where you are.
            </p>

            <div className="w-full max-w-xs p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm font-medium">Your Location Shared</span>
              </div>
              {location && (
                <p className="text-white/40 text-xs font-mono mb-3">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              )}
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Phone className="w-3 h-3" />
                Emergency Contact: +91-1800-123-4567
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full max-w-xs py-4 rounded-2xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all"
            >
              Done
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <div className="w-full max-w-md mt-auto pb-6 text-center">
          <p className="text-white/20 text-xs">
            By using SOS you agree to share your location with campus security
          </p>
        </div>
      </div>
    </main>
  );
}
