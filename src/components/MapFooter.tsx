/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Landmark, Compass, Award } from 'lucide-react';
import { LOCAL_ATTRACTIONS } from '../data';

export default function MapFooter() {
  const [activeAttraction, setActiveAttraction] = useState<number | null>(null);
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  const landmarks = [
    { id: 'kalyanam', name: 'Kalyanam Hotel & Resort', x: '50%', y: '45%', desc: 'Sanwali Road, Sikar (Right in front of Commerce College)', isMain: true },
    { id: 'commerce', name: 'Commerce College', x: '50%', y: '60%', desc: 'Major educational landmark, directly across the street' },
    { id: 'station', name: 'Sikar Railway Junction', x: '35%', y: '25%', desc: 'Connecting you to Jaipur, Delhi & Churu (3.8 km away)' },
    { id: 'devgarh', name: 'Devgarh Fort Hilltop', x: '75%', y: '20%', desc: 'Breathtaking historical castle viewpoint (12 km away)' },
    { id: 'salasar', name: 'Salasar Balaji Bypass', x: '25%', y: '70%', desc: 'Gateway highway to the sacred Hanuman Dham' }
  ];

  return (
    <footer id="coordinates" className="bg-transparent text-[#FAF6F0] relative overflow-hidden border-t border-white/5">
      
      {/* 1. Regional Map & local guides section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Sikar location descriptions */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[1.5px] bg-amber-400" />
                <span className="text-xs font-mono-tech tracking-[0.25em] uppercase text-amber-400">
                  Regional Coordinates
                </span>
              </div>
              <h2 className="font-serif-lux text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Our Sikar Sanctuary
              </h2>
              <p className="text-[#FAF6F0]/70 text-xs md:text-sm font-sans tracking-wide leading-relaxed">
                Positioned strategically on <span className="text-amber-400 font-semibold">Sanwali Road</span>, directly opposite the historic Sikar Commerce College. This prime locale provides quiet sanctuary isolation while keeping you intimately connected to Shekhawati temple pilgrimages.
              </p>
            </div>

            {/* Quick specifications */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-amber-400/20 text-amber-400">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono-tech">Physical Address</h4>
                  <p className="text-stone-300 text-xs mt-1 font-sans">
                    Sanwali Road, In front of Commerce College,<br />
                    Sikar, Rajasthan - 332001, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-amber-400/20 text-amber-400">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono-tech">Liaison Hotlines</h4>
                  <p className="text-stone-300 text-xs mt-1 font-sans">
                    Office: +91 1572 245999 &nbsp;|&nbsp; Mob: +91 94140 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-amber-400/20 text-amber-400">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono-tech">Digital Courier</h4>
                  <p className="text-stone-300 text-xs mt-1 font-sans">
                    reservations@kalyanamresort.com &nbsp;|&nbsp; info@kalyanamresort.com
                  </p>
                </div>
              </div>
            </div>

            {/* Local pilgrimages distances checklist */}
            <div id="attractions" className="pt-4 border-t border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6F0] mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" /> Pilgrimage Distances
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LOCAL_ATTRACTIONS.map((att, i) => (
                  <button
                    id={`attraction-guide-${i}`}
                    key={i}
                    onClick={() => setActiveAttraction(activeAttraction === i ? null : i)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeAttraction === i
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white leading-none truncate max-w-[140px]">{att.name}</span>
                      <span className="text-[10px] uppercase font-mono-tech tracking-wider text-amber-400">{att.distance}</span>
                    </div>
                    {activeAttraction === i && (
                      <p className="text-[10px] text-stone-300 mt-2 font-sans leading-relaxed animate-fade-in">
                        {att.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Styled Dark SVG Interactive Map */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900 rounded-3xl p-4 md:p-6 border border-amber-400/20 shadow-2xl relative">
              <div className="absolute top-4 left-4 z-10 bg-stone-950/80 px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs font-mono-tech tracking-wider text-white">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                SIKAR NAVIGATION SYSTEM
              </div>

              {/* Styled Sikar interactive road vectors */}
              <div className="relative h-[340px] md:h-[420px] bg-stone-950 rounded-2xl overflow-hidden border border-white/5 select-none shadow-inner">
                {/* SVG Roads & Highways */}
                <svg className="absolute inset-0 w-full h-full opacity-35 stroke-stone-800" fill="none" strokeWidth="2.5">
                  {/* Sanwali Road Parkway */}
                  <path d="M -10,340 C 300,180 400,240 850,120" stroke="#D4AF37" strokeWidth="3" opacity="0.6" />
                  {/* Sikar Bypass Highway */}
                  <path d="M 120,-20 L 500,480" />
                  {/* Local City Streets */}
                  <path d="M 10,120 L 400,120" strokeWidth="1.5" />
                  <path d="M 300,10 L 300,450" strokeWidth="1.5" />
                  <path d="M 500,60 L 800,420" strokeWidth="1.5" />
                  <path d="M -10,180 Q 200,60 800,20" strokeWidth="1.5" />
                </svg>

                {/* Grid Overlay detailing precise coordinates */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-5">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border-t border-l border-white" />
                  ))}
                </div>

                {/* Sikar mountains representation */}
                <div className="absolute right-6 top-10 opacity-15 text-right font-serif-lux italic text-stone-300 text-xs select-none">
                  ▲▲ Aravalli Hill Crest
                </div>

                {/* Interactive Pins on the Map */}
                {landmarks.map((landmark) => {
                  const isHovered = hoveredLandmark === landmark.id;
                  return (
                    <div
                      key={landmark.id}
                      style={{ left: landmark.x, top: landmark.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                      onMouseEnter={() => setHoveredLandmark(landmark.id)}
                      onMouseLeave={() => setHoveredLandmark(null)}
                    >
                      <div className="relative cursor-pointer group">
                        {landmark.isMain ? (
                          /* Main Kalyanam pinpoint glow with radar circles */
                          <>
                            <span className="absolute -inset-4 rounded-full bg-amber-400/25 animate-ping duration-1000" />
                            <span className="absolute -inset-7 rounded-full bg-amber-400/10 animate-ping duration-1000 delay-300" />
                            <div className="h-6 w-6 rounded-full bg-stone-900 border-2 border-amber-400 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                              <Landmark className="w-3.5 h-3.5 text-amber-400" />
                            </div>
                          </>
                        ) : (
                          /* Simple landmark pin */
                          <div className="h-3.5 w-3.5 rounded-full bg-stone-900 border border-stone-400 group-hover:border-amber-400 transition-colors" />
                        )}

                        {/* Floating tooltip overlay */}
                        <AnimatePresence>
                          {(isHovered || (landmark.isMain && !hoveredLandmark)) && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: -6, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-stone-900 border border-amber-300/30 p-2.5 rounded-xl shadow-2xl text-left w-48 pointer-events-none select-none z-30"
                            >
                              <h5 className={`text-[10px] font-bold font-sans ${landmark.isMain ? 'text-amber-300' : 'text-white'}`}>
                                {landmark.name}
                              </h5>
                              <p className="text-[9px] text-stone-300 mt-1 font-sans leading-tight">
                                {landmark.desc}
                              </p>
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 border-r border-b border-amber-300/30 rotate-45" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Instructions reminder */}
              <p className="text-[10px] text-center text-stone-500 mt-4 font-mono-tech flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Lobby reception open 24/7/366 for direct check-ins on Sanwali Road.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Global luxury signature block footer info */}
      <div className="bg-stone-950 py-12 px-6 border-t border-white/5 relative z-10 text-center font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left md:text-left flex flex-col gap-1">
            <h3 className="font-serif-lux font-bold text-[#FAF6F0] tracking-widest text-lg">
              KALYANAM HOTEL & RESORT
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold font-mono-tech mt-0.5">
              Traditional Rajasthani Splendor • Modern Luxury Sikar
            </p>
            <p className="text-stone-500 text-[11px] mt-2">
              © {new Date().getFullYear()} Kalyanam Resort. Crafted in Sikar, Rajasthan. All Rights Reserved.
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-xl bg-[#FAF6F0]/5 max-sm:hidden">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-mono-tech text-stone-300 tracking-wider">
                5-STAR RESORT HOSPITALITY AWARD
              </span>
            </div>
            
            <button
              id="footer-back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-amber-400/40 text-stone-400 hover:text-white text-xs font-mono-tech tracking-widest uppercase transition-colors uppercase cursor-pointer"
            >
              Back To Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
