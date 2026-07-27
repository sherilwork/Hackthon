'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, MapPin, Phone, Send, CheckCircle2,
  Clock, ArrowLeft, Loader2, Bell, User, Building2, ChevronRight, Copy
} from 'lucide-react';
import Link from 'next/link';

const adminContacts = [
  { name: 'Dr. Rajesh Kumar', role: 'Principal', phone: '+91-98765-43210', building: 'Block B, Room 101' },
  { name: 'Prof. Anita Sharma', role: 'Admin Head', phone: '+91-98765-43211', building: 'Block B, Room 102' },
  { name: 'Campus Security', role: '24/7 Control Room', phone: '+91-98765-43212', building: 'Block A, Ground Floor' },
];

export default function SOSPage() {
  const [stage, setStage] = useState<'idle' | 'confirm' | 'sending' | 'sent'>('idle');
  const [countdown, setCountdown] = useState(5);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locError, setLocError] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  const cancelSOS = () => setStage('idle');
  const reset = () => setStage('idle');

  const copyNumber = (phone: string, idx: number) => {
    navigator.clipboard.writeText(phone);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 min-h-screen flex flex-col px-6 py-8 max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </motion.div>

        {/* Idle */}
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
              className="relative w-48 h-48 rounded-full bg-gradient-to-br from-red-600 to-rose-700 shadow-[0_0_60px_rgba(220,38,38,0.3)] flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-red-400/30"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full border border-red-400/20"
              />
              <motion.div
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute inset-0 rounded-full border border-red-400/10"
              />
              <div className="relative flex flex-col items-center">
                <Shield className="w-14 h-14 text-white mb-1" />
                <span className="text-white text-3xl font-black tracking-widest">SOS</span>
              </div>
            </motion.button>

            <p className="text-white/50 text-sm mt-6 text-center max-w-xs">
              Tap to immediately alert the Principal & Admin with your live location.
            </p>

            {/* Admin contacts preview */}
            <div className="w-full mt-8 space-y-2">
              {adminContacts.map((contact, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-xs font-medium">{contact.name}</p>
                    <p className="text-white/40 text-[10px]">{contact.role}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Confirm */}
        {stage === 'confirm' && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6 mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2 text-center">Send Emergency Alert</h2>
            <p className="text-white/50 text-sm text-center mb-8">
              Your location will be shared with Principal & Admin immediately.
            </p>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-white text-sm font-medium">
                  {location ? 'Live Location Available' : locError ? 'Location Unavailable' : 'Fetching GPS...'}
                </span>
              </div>
              {location && (
                <p className="text-white/40 text-xs font-mono">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              )}
            </div>

            {/* Will be sent to */}
            <p className="text-white/30 text-xs font-medium mb-3 uppercase tracking-wider">Will Alert</p>
            <div className="space-y-2 mb-8">
              {adminContacts.map((contact, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{contact.name}</p>
                    <p className="text-white/40 text-xs">{contact.role} · {contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={cancelSOS} className="flex-1 py-4 rounded-2xl border border-white/20 text-white/70 font-semibold text-sm hover:bg-white/5 transition-all">Cancel</button>
              <button onClick={confirmSOS} className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                Send Alert
              </button>
            </div>
          </motion.div>
        )}

        {/* Sending */}
        {stage === 'sending' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-center">
            <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6 mx-auto">
              <Loader2 className="w-10 h-10 text-red-400 animate-spin" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2 text-center">Sending Alert</h2>
            <div className="flex items-center justify-center gap-2 mt-2 mb-8">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-mono">0:{countdown.toString().padStart(2, '0')}</span>
            </div>
            <div className="w-full space-y-3">
              {[
                { label: 'Alert Sent To', value: 'Principal + Admin (3 contacts)' },
                { label: 'Location Shared', value: location ? 'Yes - Live GPS' : 'No' },
                { label: 'Emergency Type', value: 'SOS Distress Signal' },
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
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 mx-auto"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </motion.div>
            <h2 className="text-white text-2xl font-bold mb-2 text-center">Alert Sent!</h2>
            <p className="text-white/50 text-sm text-center mb-8">
              Principal & Admin have been notified with your live location. Help is on the way.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <p className="text-white/30 text-xs font-medium mb-3 uppercase tracking-wider">Location Shared</p>
              {location && <p className="text-white/40 text-xs font-mono mb-3">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>}
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Phone className="w-3 h-3" />
                Emergency: +91-98765-43212
              </div>
            </div>

            <p className="text-white/30 text-xs font-medium mb-3 uppercase tracking-wider">Admin Contacts</p>
            <div className="space-y-2 mb-8">
              {adminContacts.map((contact, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{contact.name}</p>
                    <p className="text-white/40 text-xs">{contact.role}</p>
                    <p className="text-white/30 text-[10px]">{contact.building}</p>
                  </div>
                  <button
                    onClick={() => copyNumber(contact.phone, i)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors shrink-0"
                  >
                    {copiedIndex === i ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/60" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <button onClick={reset} className="w-full py-4 rounded-2xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all">Done</button>
          </motion.div>
        )}

        <div className="mt-auto pb-4 text-center">
          <p className="text-white/20 text-xs">Your location is shared only during active SOS</p>
        </div>
      </div>
    </main>
  );
}
