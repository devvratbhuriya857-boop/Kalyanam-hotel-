/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Users, Calendar, Briefcase, Heart, X, Send, Check } from 'lucide-react';
import { EventBookingRequest } from '../types';

export default function Events() {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<EventBookingRequest>({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'wedding',
    guestsEstimate: 200,
    eventDate: '',
    requiresRooms: true,
    specialRequirements: ''
  });

  const eventTypesInfo = {
    wedding: {
      title: 'The Maharaja Court Weddings',
      tagline: 'Imperial scale Shekhawati royal matrimony',
      description: 'Exchange your sacred vows amidst high sandstone arches, floral canopies, and traditional live musicians. Our manicured festival lawns comfortably seat up to 1,500 guests with complete bespoke royal catering.',
      bgImg: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200',
      icon: Heart,
      accent: 'border-rose-400 text-rose-500 bg-rose-500/10'
    },
    corporate: {
      title: 'Imperial Council Summits',
      tagline: 'Precision engineered corporate milestones',
      description: 'Host state-of-the-art conferences, retreats, or annual leadership assemblies. Equipped with immersive smart projection, studio acoustic treatments, high-speed regional trunks, and customizable fine-dining breaks.',
      bgImg: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200',
      icon: Briefcase,
      accent: 'border-sky-400 text-sky-500 bg-sky-500/10'
    },
    social: {
      title: 'Sambhram Heritage Soirées',
      tagline: 'Elegant private celebrations and high-tea assemblies',
      description: 'For anniversaries, milestone birthdays, or cultural festivals. Our indoor air-conditioned banquet halls and beautiful open-air terraces offer an intimate setting for up to 350 loved ones.',
      bgImg: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
      icon: Sparkles,
      accent: 'border-amber-400 text-amber-500 bg-amber-500/10'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium agency concierge dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1800);
  };

  // Estimate customized proposal price based on user event preferences
  const calculateEstimatedEventBudget = () => {
    let perGuestCost = 1200; // Base buffet charge
    if (formData.eventType === 'wedding') perGuestCost = 1800; // Royal catering
    if (formData.eventType === 'corporate') perGuestCost = 1400; // Executive corporate setup
    
    let baseDecor = 150000;
    if (formData.eventType === 'wedding') baseDecor = 350000;
    
    let accommodationEst = 0;
    if (formData.requiresRooms) {
      accommodationEst = Math.min(250000, formData.guestsEstimate * 1500); // Special bulk room tariff estimation
    }

    const total = (perGuestCost * formData.guestsEstimate) + baseDecor + accommodationEst;
    return total;
  };

  return (
    <section id="banquets" className="py-24 bg-transparent text-[#FAF6F0] relative overflow-hidden px-6 md:px-12 border-b border-white/5">
      {/* Dynamic background highlights */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-650/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1.5px] bg-amber-400" />
              <span className="text-xs font-mono-tech tracking-[0.25em] uppercase text-amber-400">
                Royalty & Celebrations
              </span>
            </div>
            <h2 className="font-serif-lux text-3xl md:text-5xl font-bold tracking-tight text-[#FAF6F0]">
              Events & Grand Banquets
            </h2>
            <p className="mt-4 text-stone-300 text-xs md:text-sm tracking-wide leading-relaxed font-sans">
              From majestic Shekhawati royal weddings drawing guests worldwide, to elite boardroom summits, Kalyanam crafts tailored hospitality atmospheres with gourmet precision.
            </p>
          </div>

          <motion.button
            id="plan-event-top-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(true)}
            className="gold-glow self-start md:self-end text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 py-3.5 px-8 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer border border-amber-300/35 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Plan Your Event
          </motion.button>
        </div>

        {/* Dynamic Display cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(eventTypesInfo).map(([key, info]) => {
            const IconComp = info.icon;
            return (
              <motion.div
                id={`event-type-${key}`}
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className="group relative h-[480px] rounded-3xl overflow-hidden border border-amber-400/10 flex flex-col justify-end p-6 md:p-8 hover:border-amber-400/40 transition-colors duration-500 bg-stone-900/40 shadow-2xl"
              >
                {/* Background image zoom on card hover */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={info.bgImg}
                    alt={info.title}
                    className="w-full h-full object-cover object-center brightness-[0.35] group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between items-start">
                  {/* Floating Action Circle Icon */}
                  <div className={`p-3 rounded-2xl border ${info.accent} backdrop-blur-md`}>
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-serif-lux text-xl md:text-2xl font-bold text-[#FAF6F0] mb-2 group-hover:text-amber-300 transition-colors">
                      {info.title}
                    </h3>
                    <p className="text-[10px] text-amber-400 tracking-[0.15em] uppercase font-bold mb-4 font-mono-tech">
                      {info.tagline}
                    </p>
                    <p className="text-stone-300 text-xs tracking-wide leading-relaxed font-sans mb-6">
                      {info.description}
                    </p>
                    <button
                      id={`event-${key}-learn-btn`}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, eventType: key as any }));
                        setIsOpen(true);
                      }}
                      className="text-white hover:text-amber-400 font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 group/link cursor-pointer"
                    >
                      Configure Showcase <span className="group-hover/link:translate-x-1.5 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Concierge Intake Drawer/Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              id="event-loader-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-stone-950/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              id="event-planner-modal"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-stone-950/85 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 max-h-[90vh]"
            >
              <div className="sticky top-0 bg-stone-950/80 backdrop-blur-md p-6 border-b border-white/10 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-serif-lux text-lg md:text-xl font-bold text-white leading-none">
                      Event Planner Concierge
                    </h3>
                    <p className="text-[10px] text-stone-400 tracking-wider uppercase mt-1">
                      Kalyanam Sikar Resorts
                    </p>
                  </div>
                </div>
                <button
                  id="close-event-planner"
                  onClick={() => setIsOpen(false)}
                  className="p-1 h-8 w-8 hover:bg-white/10 rounded-full flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!formSubmitted ? (
                <form
                  id="event-planner-form"
                  onSubmit={handleSubmit}
                  className="p-6 md:p-8 space-y-6 overflow-y-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/60 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        id="event-planner-fullname"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Devvrat Bhuriya"
                        className="w-full bg-stone-900 border border-amber-400/20 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-sans"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/60 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="event-planner-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. devvrat@domain.com"
                        className="w-full bg-stone-900 border border-amber-400/20 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-sans"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/60 mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="event-planner-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-stone-900 border border-amber-400/20 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-sans"
                        required
                      />
                    </div>

                    {/* Event Type */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/60 mb-2">
                        Celebration Style *
                      </label>
                      <select
                        id="event-planner-type"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full bg-stone-900 border border-amber-400/20 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-sans cursor-pointer"
                        required
                      >
                        <option value="wedding">Maharaja Court Wedding</option>
                        <option value="corporate">Imperial Council Corporate</option>
                        <option value="social">Sambhram Soirée Celebration</option>
                      </select>
                    </div>

                    {/* Estimated Guests */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/60 mb-2">
                        Guest Attendance Estimate * ({formData.guestsEstimate})
                      </label>
                      <input
                        id="event-planner-guests-slider"
                        type="range"
                        name="guestsEstimate"
                        min="20"
                        max="1500"
                        step="20"
                        value={formData.guestsEstimate}
                        onChange={handleInputChange}
                        className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                      <div className="flex justify-between items-center text-[10px] text-[#FAF6F0]/40 font-mono-tech mt-1">
                        <span>20 pax</span>
                        <span>1,500 pax</span>
                      </div>
                    </div>

                    {/* Event Date */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/60 mb-2">
                        Event Date *
                      </label>
                      <input
                        id="event-planner-date"
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-stone-900 border border-amber-400/20 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-sans cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  {/* Requires rooms checkbox? */}
                  <div className="bg-stone-900/50 p-4 rounded-xl border border-[#FAF6F0]/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white">Residential Block Rooms?</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5">We will estimate bulk luxury tariffs for guest suites.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        id="event-planner-rooms-checkbox"
                        type="checkbox"
                        name="requiresRooms"
                        checked={formData.requiresRooms}
                        onChange={() => setFormData(prev => ({ ...prev, requiresRooms: !prev.requiresRooms }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                    </label>
                  </div>

                  {/* Special terms */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/60 mb-2">
                      Decor motifs or dietary specifications
                    </label>
                    <textarea
                      id="event-planner-requirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleInputChange}
                      placeholder="e.g., Traditional Rajasthani gold lattice background with marigold borders, vegetarian thali spread, 5 executive garden suites..."
                      rows={3}
                      className="w-full bg-stone-900 border border-amber-400/20 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-sans"
                    />
                  </div>

                  {/* Dynamic Realtime Budget Estimation Badge */}
                  <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-amber-300 font-bold font-mono-tech">
                        Conceptual Budget Preview
                      </span>
                      <p className="text-[10px] text-stone-400 mt-0.5">Catering, Venue base, Planning & Decor</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base md:text-xl font-serif-lux font-bold text-amber-300">
                        ₹{calculateEstimatedEventBudget().toLocaleString('en-IN')}*
                      </span>
                      <p className="text-[9px] text-stone-500">*Exclusive of GST tariff</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    id="submit-event-proposal-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-amber-300 to-amber-500 text-stone-950 text-xs font-bold tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold font-sans disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                        Aspirating royal coordinates...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Transmit Grand Plan Proposal
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                /* Beautiful Staggered Confirmation screen */
                <motion.div
                  id="event-proposal-success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center space-y-6 flex flex-col items-center justify-center my-6"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-amber-400/60 bg-amber-500/15 flex items-center justify-center animate-pulse text-amber-400 shadow-lg-gold">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif-lux text-2xl font-bold text-[#FAF6F0] mb-2">Proposal Received with Grace!</h4>
                    <p className="text-stone-300 text-xs max-w-md mx-auto font-sans leading-relaxed">
                      Esteemed <span className="text-amber-400 font-semibold">{formData.fullName}</span>, your royal blueprint has been successfully cataloged. Our elite wedding and corporate relations concierge will analyze your scope and contact you on <span className="text-amber-400 font-mono-tech">{formData.phone}</span> within 2 hours.
                    </p>
                  </div>

                  <div className="w-full max-w-sm bg-stone-900 border border-amber-400/15 p-5 rounded-2xl text-left space-y-3 font-mono-tech text-[11px] text-stone-300">
                    <div className="flex justify-between border-b border-stone-800 pb-2">
                      <span className="text-stone-500">PROPOSAL REFERENCE:</span>
                      <span className="text-amber-400 font-bold">KLY-EVT-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">EVENT TYPE:</span>
                      <span className="capitalize">{formData.eventType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ATTENDANCE TARGET:</span>
                      <span>{formData.guestsEstimate} pax</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">TARGET DATE:</span>
                      <span>{formData.eventDate || 'TBD'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">RESIDENTIAL BLOCK:</span>
                      <span>{formData.requiresRooms ? 'Yes (Suite Priority)' : 'No'}</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-800 pt-2 font-bold text-amber-300 text-xs">
                      <span>BUDGET FORECAST:</span>
                      <span>₹{calculateEstimatedEventBudget().toLocaleString('en-IN')}*</span>
                    </div>
                  </div>

                  <button
                    id="finish-proposal-btn"
                    onClick={() => {
                      setIsOpen(false);
                      setFormSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        eventType: 'wedding',
                        guestsEstimate: 200,
                        eventDate: '',
                        requiresRooms: true,
                        specialRequirements: ''
                      });
                    }}
                    className="py-3 px-8 bg-stone-900 hover:bg-stone-800 rounded-xl text-xs font-bold tracking-wider text-amber-400 border border-amber-400/20 uppercase transition-colors"
                  >
                    Seal Proposal & Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
