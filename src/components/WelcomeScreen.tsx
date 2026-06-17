/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
  key?: React.Key;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [startOutro, setStartOutro] = useState(false);
  const titleLetters = "KALYANAM".split("");

  // Dismiss automatically after 4.5s if not clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartOutro(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setStartOutro(true);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!startOutro && (
        <motion.div
          id="welcome-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-[#0F0F0F] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Symmetrical glowing ambient backlights */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-amber-500/15 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-stone-800/40 blur-[150px] translate-x-1/2 translate-y-1/2" />
          </div>

          {/* Symmetrical Golden Corner Framing Lines (Expanding entry path) */}
          <div className="absolute inset-8 md:inset-12 border border-white/5 pointer-events-none rounded-xl">
            {/* Top-Left elegant L bracket */}
            <motion.div 
              initial={{ width: 0, height: 0 }}
              animate={{ width: 40, height: 40 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 left-0 border-t-2 border-l-2 border-amber-500/60"
            />
            {/* Top-Right elegant L bracket */}
            <motion.div 
              initial={{ width: 0, height: 0 }}
              animate={{ width: 40, height: 40 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 right-0 border-t-2 border-r-2 border-amber-500/60"
            />
            {/* Bottom-Left elegant L bracket */}
            <motion.div 
              initial={{ width: 0, height: 0 }}
              animate={{ width: 40, height: 40 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute bottom-0 left-0 border-b-2 border-l-2 border-amber-500/60"
            />
            {/* Bottom-Right elegant L bracket */}
            <motion.div 
              initial={{ width: 0, height: 0 }}
              animate={{ width: 40, height: 40 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute bottom-0 right-0 border-b-2 border-r-2 border-amber-500/60"
            />
          </div>

          {/* Inner Content Grid */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-xl">
            
            {/* 1. Golden Emblem Crest */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 45 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 md:w-20 md:h-20 border border-amber-400 rotate-45 flex items-center justify-center relative mb-8"
              style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)' }}
            >
              {/* Pulsing outer ring */}
              <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute inset-[-4px] border border-amber-550/30"
              />
              <span className="-rotate-45 font-serif text-3xl md:text-4xl font-bold tracking-tight text-amber-400">
                K
              </span>
            </motion.div>

            {/* 2. Typographic Letter-by-Letter Reveal */}
            <h1 className="font-serif-lux text-3xl md:text-5xl font-semibold tracking-[0.3em] uppercase text-[#F5F2ED] mb-4 flex justify-center flex-wrap">
              {titleLetters.map((letter, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + (idx * 0.1), 
                    ease: "easeOut" 
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            {/* 3. Luxury Tagline Tracking Reveal */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.8, delay: 1.2, ease: "easeOut" }}
              className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs font-mono-tech uppercase text-amber-400 tracking-[0.4em] mb-12 pl-1.5"
            >
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
              Sikar, Rajasthan
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            </motion.div>

            {/* 4. Luxury Glassmorphic Entry Button */}
            <motion.button
              id="enter-sanctuary-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
              onClick={handleDismiss}
              className="px-8 py-3.5 bg-white/5 hover:bg-amber-400 backdrop-blur-md border border-white/10 hover:border-amber-400 text-[#FAF6F0] hover:text-stone-950 font-sans text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] flex items-center gap-2 group"
            >
              Enter The Sanctuary
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="inline-block"
              >
                →
              </motion.span>
            </motion.button>

            {/* 5. Minimal luxury footnote indicator */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-[9px] uppercase tracking-widest text-[#FAF6F0] mt-16 font-mono-tech"
            >
              Adhering to Athithi Devo Bhava • Est. 2026
            </motion.span>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
