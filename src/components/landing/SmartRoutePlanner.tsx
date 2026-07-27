'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Clock, Route, ArrowRight, Zap, Users,
  Accessibility, CloudRain, Shield, ChevronRight, Navigation, Loader2
} from 'lucide-react';

const popularDestinations = [
  'Computer Science Lab',
  'Library',
  'Admin Office',
  'Exam Hall',
  'Cafeteria',
  'Hostel Block A',
];

interface RouteResult {
  destination: string;
  eta: string;
  distance: string;
  routeType: string;
  reason: string;
  crowdLevel: 'low' | 'medium' | 'high';
}

export default function SmartRoutePlanner() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<RouteResult | null>(null);
  const [showFlow, setShowFlow] = useState(false);

  const simulateSearch = (dest: string) => {
    setQuery(dest);
    setIsSearching(true);
    setResult(null);
    setShowFlow(true);

    setTimeout(() => {
      setIsSearching(false);
      setResult({
        destination: dest,
        eta: '4 Minutes',
        distance: '310 meters',
        routeType: 'Fastest',
        reason: 'Main staircase is crowded. Choosing east corridor — 45 seconds faster.',
        crowdLevel: 'low',
      });
    }, 2200);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      simulateSearch(query.trim());
    }
  };

  return (
    <section id="demo" className="relative py-24 lg:py-32" style={{ backgroundColor: '#FAFBFF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Live Demo
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            AI Smart Route <span className="text-gradient">Planner</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Type any destination and watch AI calculate the smartest route in real-time.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mb-6"
          >
            <div className="glass-strong shadow-premium-lg rounded-2xl p-2 flex items-center gap-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary">
                <Search className="w-5 h-5 text-white" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="flex-1 bg-transparent text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none px-2 py-3"
              />
              <button
                type="submit"
                disabled={!query.trim() || isSearching}
                className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Find Route'
                )}
              </button>
            </div>
          </motion.form>

          {/* Popular Destinations */}
          {!result && !isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 justify-center mb-10"
            >
              {popularDestinations.map((dest) => (
                <button
                  key={dest}
                  onClick={() => simulateSearch(dest)}
                  className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  {dest}
                </button>
              ))}
            </motion.div>
          )}

          {/* AI Processing Flow */}
          <AnimatePresence>
            {showFlow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8"
              >
                <div className="glass rounded-2xl p-6 shadow-premium">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      AI Processing
                    </span>
                    {isSearching && (
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin ml-auto" />
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { icon: MapPin, label: 'Location', status: 'done' },
                      { icon: Users, label: 'Crowd Data', status: 'done' },
                      { icon: Shield, label: 'Blocked Areas', status: 'done' },
                      { icon: Route, label: 'Route Optimize', status: isSearching ? 'loading' : 'done' },
                    ].map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.3 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          step.status === 'done'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <step.icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{step.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Card */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="glass-strong rounded-3xl p-8 shadow-premium-lg"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                        Best Route Found
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {result.destination}
                    </h3>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-gradient-primary text-white text-sm font-semibold">
                    {result.routeType}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-blue-50">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-600">ETA</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{result.eta}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-purple-50">
                    <div className="flex items-center gap-2 mb-1">
                      <Route className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600">Distance</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{result.distance}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 mb-6">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">AI Reasoning</p>
                      <p className="text-sm text-amber-700">{result.reason}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-gradient-primary text-white font-semibold text-base hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Start Navigation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
