'use client';

import { motion } from 'framer-motion';
import { Map, Box, Crosshair, ScanLine, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Map,
    title: 'Visual Landmark Routing',
    description: 'Navigate using visual landmarks like buildings, trees and signboards instead of coordinates.',
    gradient: 'from-blue-500 to-cyan-400',
    bgLight: 'bg-cyan-50',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-400',
  },
  {
    icon: Box,
    title: '3D Digital Twin',
    description: 'Interactive 3D campus model with real-time room availability and crowd density.',
    gradient: 'from-purple-500 to-violet-500',
    bgLight: 'bg-purple-50',
    iconBg: 'bg-gradient-to-br from-purple-500 to-violet-500',
  },
  {
    icon: Crosshair,
    title: 'AI Lost Mode',
    description: 'Point your camera anywhere — AI identifies your exact location using computer vision.',
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
  },
  {
    icon: ScanLine,
    title: 'Scan & Go + SOS',
    description: 'Scan QR codes for instant navigation. One-tap SOS alerts campus security.',
    gradient: 'from-green-500 to-emerald-500',
    bgLight: 'bg-green-50',
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    extra: true,
  },
];

export default function FeatureCards() {
  return (
    <section id="home" className="relative pt-32 pb-16 lg:pt-36 lg:pb-20" style={{ backgroundColor: '#FAFBFF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative glass-strong rounded-3xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${f.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

              <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                {f.title}
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                {f.description}
              </p>

              {f.extra && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Emergency Ready
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
