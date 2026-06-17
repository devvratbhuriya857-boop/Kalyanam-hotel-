/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, Users, Sparkles, ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartBooking: (params: { checkIn: string; checkOut: string; guests: number; roomType: string }) => void;
}

export default function Hero({ onStartBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set default scroll container motion
  const { scrollY } = useScroll();
  
  // Create beautiful slow parallax transformation for background & content
  const bgY = useTransform(scrollY, [0, 800], [0, 240]);
  const textY = useTransform(scrollY, [0, 800], [0, -100]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Set default initial dates for checkin (today) & checkout (tomorrow)
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('heritage-suite');

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatYMD = (d: Date) => d.toISOString().split('T')[0];
    setCheckIn(formatYMD(today));
    setCheckOut(formatYMD(tomorrow));
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartBooking({
      checkIn,
      checkOut,
      guests,
      roomType
    });
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative min-h-[105vh] flex items-center justify-center overflow-hidden bg-stone-950 px-6 md:px-12"
    >
      {/* Parallax Background Cover - Cinematic Warm Hotel Facade / Lobby backdrop */}
      <motion.div
        id="hero-parallax-bg"
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] scale-105 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800"
          alt="Kalyanam Resort Facade Reflection"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.05]"
          onError={(e) => {
            // Fallback image in case
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1800';
          }}
        />
        {/* Rich gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-stone-900/20 to-stone-950/80" />
        <div className="absolute inset-0 bg-radial-gradient-vignette" />
      </motion.div>

      {/* Floating Sparkles & Light Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Hero Core Content */}
      <motion.div
        id="hero-content"
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center pt-24 pb-8"
      >
        {/* Luxury Tagline / Badge */}
        <motion.div
          id="hero-tagline-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-stone-950/60 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] font-mono-tech tracking-[0.3em] uppercase text-amber-300">
            Sanwali Road, Sikar, Rajasthan
          </span>
        </motion.div>

        {/* Brand Display Main Heading */}
        <motion.h1
          id="hero-main-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="font-serif-lux text-4xl sm:text-5xl md:text-7xl font-bold text-[#FAF6F0] leading-[1.1] tracking-tight max-w-4xl"
        >
          Where Tradition <br className="hidden md:inline" />
          Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 italic drop-shadow-sm">Modern Luxury</span>
        </motion.h1>

        {/* Sophisticated Description */}
        <motion.p
          id="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-sm md:text-base text-stone-200/90 font-sans tracking-wide max-w-2xl leading-relaxed"
        >
          Indulge in imperial boutique comforts at Rajasthan's premium sanctuary. Custom-carved stone architecture, serene dining salons, and majestic Shekhawati hospitality await you.
        </motion.p>

        {/* Interactive Horizontal Check Capability / Selector Bar */}
        <motion.div
          id="hero-selector-bar-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, type: 'spring' }}
          className="w-full mt-12 glass-card p-1.5 md:p-3 rounded-2xl md:rounded-full overflow-hidden shadow-2xl hover:border-amber-400/50 transition-colors duration-500"
        >
          <form
            id="hero-quick-book-form"
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-0"
          >
            {/* Check In Date */}
            <div className="flex-1 px-4 py-2.5 flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-800/85">
              <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[9px] uppercase tracking-widest text-[#FAF6F0]/50 font-bold">
                  Check-In
                </label>
                <input
                  id="hero-check-in-input"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-transparent text-amber-100 font-sans text-xs focus:outline-none focus:text-amber-400 cursor-pointer pt-0.5"
                  required
                />
              </div>
            </div>

            {/* Check Out Date */}
            <div className="flex-1 px-4 py-2.5 flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-800/85">
              <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[9px] uppercase tracking-widest text-[#FAF6F0]/50 font-bold">
                  Check-Out
                </label>
                <input
                  id="hero-check-out-input"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full bg-transparent text-amber-100 font-sans text-xs focus:outline-none focus:text-amber-400 cursor-pointer pt-0.5"
                  required
                />
              </div>
            </div>

            {/* Guests Picker */}
            <div className="flex-1 px-4 py-2.5 flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-800/85">
              <Users className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[9px] uppercase tracking-widest text-[#FAF6F0]/50 font-bold">
                  Guests
                </label>
                <select
                  id="hero-guests-select"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-amber-100 font-sans text-xs focus:outline-none focus:text-amber-400 cursor-pointer pt-0.5 border-none"
                >
                  <option value={1} className="bg-stone-900">1 Guest</option>
                  <option value={2} className="bg-stone-900">2 Guests</option>
                  <option value={3} className="bg-stone-900">3 Guests</option>
                  <option value={4} className="bg-stone-900">4 Guests</option>
                </select>
              </div>
            </div>

            {/* Preferred Room Class Selection */}
            <div className="flex-1 px-4 py-2.5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[9px] uppercase tracking-widest text-[#FAF6F0]/50 font-bold">
                  Refined Stay
                </label>
                <select
                  id="hero-room-type-select"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-transparent text-amber-100 font-sans text-xs focus:outline-none focus:text-amber-400 cursor-pointer pt-0.5 border-none"
                >
                  <option value="deluxe-garden" className="bg-stone-900">Royal Deluxe</option>
                  <option value="heritage-suite" className="bg-stone-900">Heritage Suite</option>
                  <option value="presidential-suite" className="bg-stone-900">The Maharaja Grand</option>
                </select>
              </div>
            </div>

            {/* Trigger Button */}
            <div className="px-2 md:px-0">
              <motion.button
                id="hero-search-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 md:py-4.5 rounded-xl md:rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-amber-300/20"
              >
                Book Now <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Elegant scrolling prompt */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-15 text-center hidden md:block">
        <p className="text-stone-400 text-[9px] uppercase tracking-[0.25em] mb-2 font-mono-tech">
          Scroll to explore
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-1.5 h-6 bg-amber-400/40 rounded-full mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-amber-400 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
