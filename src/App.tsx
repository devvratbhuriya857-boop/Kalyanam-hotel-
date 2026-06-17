/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  Sparkles, 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert, 
  Calendar,
  Users,
  Award
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Accommodations from './components/Accommodations';
import Events from './components/Events';
import BookingEngine from './components/BookingEngine';
import MapFooter from './components/MapFooter';
import WelcomeScreen from './components/WelcomeScreen';

import { TESTIMONIALS } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  
  // States to pass search parameters from Hero and Suite cards directly to booking engine
  const [bookingParams, setBookingParams] = useState<{
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  } | null>(null);

  // Active Testimonial Index
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // 1. Initialize Lenis Buttery Scroll
  useEffect(() => {
    // Scroll properties
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Setup IntersectionObserver to track scroll location and highlight matching Nav Indicators
  useEffect(() => {
    const sections = ['hero', 'stay', 'banquets', 'attractions', 'reservations', 'coordinates'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Scroll utility link callback
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scroll so glass header doesn't cover top titles
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 4. Booking activation pipeline
  const handleStartBooking = (params: { checkIn: string; checkOut: string; guests: number; roomType: string }) => {
    setBookingParams(params);
    scrollToSection('reservations');
  };

  const handleSelectSpecificRoom = (roomId: string) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2);

    setBookingParams({
      checkIn: today.toISOString().split('T')[0],
      checkOut: tomorrow.toISOString().split('T')[0],
      guests: 2,
      roomType: roomId
    });
    scrollToSection('reservations');
  };

  // Automated rotating testimonial interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!welcomeComplete && (
          <WelcomeScreen key="welcome-screen" onComplete={() => setWelcomeComplete(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {welcomeComplete && (
          <motion.div
            key="kalyanam-main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            id="kalyanam-applet-root"
            className="min-h-screen bg-transparent selection:bg-amber-400 selection:text-stone-950 leading-normal text-[#FAF6F0] font-sans"
          >
            {/* Dynamic Ambient Blur Background Layer */}
            <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-[#1A1613]/20 to-transparent pointer-events-none z-10" />

            {/* 1. Luxurious Glassmorphism Header / Navigation Bar */}
            <Navbar onScrollToSection={scrollToSection} activeSection={activeSection} />

            {/* 2. Hero Presentation Section with Parallax Backdrop & Quick reservation cards */}
            <div id="hero">
              <Hero onStartBooking={handleStartBooking} />
            </div>

            {/* Elegant Welcomes Transition Block (Divider) */}
            <section className="bg-white/3 backdrop-blur-md py-16 border-y border-white/5">
              <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left items-center">
                <div className="md:col-span-1 flex justify-center">
                  <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 animate-pulse">
                    <Award className="w-8 h-8" />
                  </div>
                </div>
                <div className="md:col-span-3 space-y-2">
                  <h3 className="font-serif-lux text-lg font-bold text-[#FAF6F0] uppercase tracking-wide">
                    The Heritage Hospitality Mandate
                  </h3>
                  <p className="text-stone-300 text-xs md:text-sm tracking-wide leading-relaxed">
                    Kalyanam is founded on "Athithi Devo Bhava". Our architecture and boutique guest services reflect the cultural majesty of Sikar, Rajasthan, accompanied by top-tier modern suite automations and security.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Suite Portfolio Grid (The Kalyanam Stay) with 3D tilting cards on hover */}
            <div id="stay">
              <Accommodations onSelectRoom={handleSelectSpecificRoom} />
            </div>

            {/* 4. Wedding Banquets & Event Concierge Showcase */}
            <div id="banquets">
              <Events />
            </div>

            {/* 5 & 6. Comprehensive Booking Engine, Date matrix calendar & high tech payment terminal */}
            <div id="reservations">
              <BookingEngine initialParams={bookingParams} />
            </div>

            {/* Luxury Integrated Testimonials Slider */}
            <section className="py-24 bg-stone-900 text-white relative overflow-hidden border-t border-amber-400/10">
              <div className="absolute inset-0 z-0 opacity-15">
                <img 
                  src="https://images.unsplash.com/photo-1590050752117-238cb0612b1b?q=80&w=1200" 
                  alt="Rajasthani Stone Lattice" 
                  className="w-full h-full object-cover object-center filter grayscale whitespace-nowrap"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-[#1A1613]/90 via-[#1A1613]/95 to-stone-950/100" />
              
              <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <div className="flex justify-center mb-6 text-amber-400">
                  <Quote className="w-12 h-12 stroke-[1.5px] opacity-40" />
                </div>

                <h3 className="font-serif-lux text-2xl md:text-3.5xl font-bold text-[#FAF6F0] mb-8">
                  Resonances of Sikar Gratitude
                </h3>

                <div className="min-h-[180px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonialIdx}
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <p className="text-[#FAF6F0]/85 italic text-sm md:text-base tracking-wide leading-relaxed font-sans max-w-3xl mx-auto">
                        "{TESTIMONIALS[testimonialIdx].comment}"
                      </p>

                      <div className="flex flex-col items-center gap-1.5 pt-4">
                        <div className="flex gap-1 mb-1">
                          {Array.from({ length: TESTIMONIALS[testimonialIdx].rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-300 font-mono-tech">
                          {TESTIMONIALS[testimonialIdx].author}
                        </span>
                        <span className="text-[10px] text-stone-400 tracking-wider">
                          {TESTIMONIALS[testimonialIdx].city} • {TESTIMONIALS[testimonialIdx].date}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Testimonial slider toggles */}
                <div className="flex justify-center gap-10 mt-8">
                  <button
                    id="testimonial-prev-btn"
                    onClick={() => setTestimonialIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="p-2 border border-white/10 hover:border-amber-400/50 rounded-full text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        id={`testimonial-dot-${idx}`}
                        key={idx}
                        onClick={() => setTestimonialIdx(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          testimonialIdx === idx ? 'w-6 bg-amber-450 bg-amber-400' : 'w-1.5 bg-stone-600'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    id="testimonial-next-btn"
                    onClick={() => setTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length)}
                    className="p-2 border border-white/10 hover:border-amber-400/50 rounded-full text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>

            {/* 7. Coordinates Section with Address, Contact info & Custom Stylized SVG Map */}
            <div id="coordinates">
              <MapFooter />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
