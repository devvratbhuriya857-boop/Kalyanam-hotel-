/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { KALYANAM_ROOMS } from '../data';
import { Room } from '../types';
import { Star, Maximize, Users, Bed, ChevronRight, Check } from 'lucide-react';

interface AccommodationsProps {
  onSelectRoom: (roomId: string) => void;
}

// 3D Tilt Card Component for Luxury Feel
function TiltCard({ room, onSelectRoom }: { room: Room; onSelectRoom: (roomId: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for coordinates
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Springs for smooth, buttery 3D motion rotation
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      id={`room-${room.id}-card-wrapper`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className="relative flex flex-col glass-card rounded-3xl overflow-hidden shadow-xl transition-all duration-300 group h-full justify-between text-[#FAF6F0]"
    >
      <div>
        {/* Room Image Container */}
        <div className="relative h-64 overflow-hidden bg-stone-900">
          <motion.img
            id={`room-${room.id}-image`}
            src={room.image}
            alt={room.name}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center brightness-[0.95]"
          />
          
          {/* Glass floating rate tag */}
          <div className="absolute top-4 right-4 bg-stone-950/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-300/20 flex items-center gap-1 shadow-lg">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-white">{room.rating.toFixed(1)}</span>
            <span className="text-[10px] text-stone-400">({room.reviewsCount})</span>
          </div>

          <div className="absolute bottom-4 left-4 bg-amber-450 text-stone-950 px-3.5 py-1 rounded-md text-[10px] font-bold tracking-[0.15em] uppercase bg-[#FAF6F0] border border-amber-400/40">
            ₹{room.pricePerNight.toLocaleString('en-IN')} / Night
          </div>
        </div>

        {/* Info detail content */}
        <div className="p-6 md:p-8" style={{ transform: 'translateZ(20px)' }}>
          <header className="mb-4">
            <h3 className="font-serif-lux text-xl md:text-2xl font-bold text-[#F5F2ED] group-hover:text-amber-400 transition-colors duration-300">
              {room.name}
            </h3>
            <p className="text-xs text-amber-400 font-medium tracking-wide mt-1.5">
              {room.tagline}
            </p>
          </header>

          <p className="text-[#FAF6F0]/70 text-xs md:text-sm tracking-wide leading-relaxed mb-6 font-sans">
            {room.description}
          </p>

          {/* Quick core specs block */}
          <div className="grid grid-cols-2 gap-3.5 py-4 border-y border-white/10 mb-6 bg-white/5 rounded-xl px-4">
            <div className="flex items-center gap-2.5 text-xs text-[#FAF6F0]/85">
              <Maximize className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{room.specs.size}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#FAF6F0]/85">
              <Users className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{room.specs.occupancy}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#FAF6F0]/85">
              <Bed className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{room.specs.bed}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#FAF6F0]/85">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">View:</span>
              <span className="truncate">{room.specs.view}</span>
            </div>
          </div>

          {/* Premium customized features list */}
          <div className="space-y-2 mb-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Suite Prerogatives:</p>
            <div className="grid grid-cols-1 gap-1.5 pl-1">
              {room.featuredAmenities.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-start gap-2 text-xs text-[#FAF6F0]/75">
                  <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Selector Action */}
      <div className="px-6 pb-6 md:px-8 md:pb-8">
        <motion.button
          id={`room-${room.id}-select-btn`}
          onClick={() => onSelectRoom(room.id)}
          className="w-full py-3.5 bg-white/10 hover:bg-amber-400 text-[#FAF6F0] hover:text-stone-950 font-sans text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md border border-white/10 hover:border-amber-400 group/btn"
        >
          Reserve Sanctuary <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Accommodations({ onSelectRoom }: AccommodationsProps) {
  return (
    <section id="stay" className="py-24 bg-transparent px-6 md:px-12 relative overflow-hidden border-b border-white/5">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center md:max-w-xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="w-8 h-[1px] bg-amber-500" />
            <span className="text-xs font-mono-tech tracking-[0.25em] uppercase text-amber-400">
              The Kalyanam Sanctuary
            </span>
            <div className="w-8 h-[1px] bg-amber-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif-lux text-3xl md:text-4xl font-bold tracking-tight text-[#FAF6F0]"
          >
            Accommodations & Suites
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-stone-300 text-xs md:text-sm font-sans tracking-wide leading-relaxed"
          >
            Each chambers is sculpted as a serene retreat. Warm stonework, traditional detailing, and full-spectrum bespoke amenities compose a royal refuge in Sikar.
          </motion.p>
        </div>

        {/* Accommodations Grid with Staggered Entrance Animations */}
        <motion.div
          id="accommodations-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.25
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {KALYANAM_ROOMS.map((room) => (
            <motion.div
              id={`room-wrapper-${room.id}`}
              key={room.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
              }}
            >
              <TiltCard room={room} onSelectRoom={onSelectRoom} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
