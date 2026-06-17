/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Landmark, Phone } from 'lucide-react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onScrollToSection, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'The Stay', id: 'stay' },
    { label: 'Royal Banquets', id: 'banquets' },
    { label: 'Attractions', id: 'attractions' },
    { label: 'Reservations', id: 'reservations' },
    { label: 'Coordinates', id: 'coordinates' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-6 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="relative p-2 rounded-full border border-amber-400/30 bg-stone-900/45 group-hover:border-amber-400/80 transition-colors duration-500">
              <Landmark className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-500" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>
            <div>
              <h1 className="font-serif-lux text-xl md:text-2xl font-bold tracking-widest text-[#FAF6F0] leading-none">
                KALYANAM
              </h1>
              <p className="text-[9px] uppercase tracking-[0.25em] text-amber-400 font-medium mt-1">
                Hotel & Resort • Sikar
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                id={`desktop-nav-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative py-2 font-sans text-[13px] font-medium tracking-widest text-[#FAF6F0]/85 hover:text-amber-300 transition-colors duration-300 cursor-pointer"
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action Call to Action */}
          <div className="hidden xl:flex items-center gap-6">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-xs font-mono-tech tracking-widest text-[#FAF6F0]/75 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 SIKAR LINE
            </a>
            <motion.button
              id="desktop-reserve-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('reservations')}
              className="gold-glow text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-md cursor-pointer border border-amber-300/40"
            >
              Reserve Now
            </motion.button>
          </div>

          {/* Mobile Nav Button */}
          <div className="lg:hidden flex items-center gap-4">
            <motion.button
              id="mobile-reserve-quick-cta"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('reservations')}
              className="text-stone-950 bg-gradient-to-r from-amber-300 to-amber-500 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase cursor-pointer"
            >
              Book
            </motion.button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#FAF6F0] p-1 h-9 w-9 flex items-center justify-center border border-white/10 rounded-full bg-stone-900/20"
            >
              {isOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-stone-950 border-b border-amber-400/25 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col gap-6 bg-gradient-to-b from-stone-950 to-stone-900">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    id={`mobile-nav-${item.id}`}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left py-2 px-3 rounded-lg font-sans text-sm tracking-widest uppercase transition-all ${
                      activeSection === item.id
                        ? 'bg-amber-400/10 text-amber-400 font-bold border-l-2 border-amber-400'
                        : 'text-stone-200 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="h-[1px] bg-white/5 my-2" />
              <div className="flex flex-col gap-4 px-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-xs tracking-wider text-stone-300 hover:text-amber-400"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  +91 SIKAR HOTLINE
                </a>
                <button
                  id="mobile-reserve-drawer-cta"
                  onClick={() => handleNavClick('reservations')}
                  className="w-full text-[#1A1613] bg-gradient-to-r from-amber-300 back-to-amber-400 to-amber-500 py-3 rounded-xl text-center text-xs font-bold tracking-[0.16em] uppercase shadow-lg-gold"
                >
                  Book Royal Reservation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
