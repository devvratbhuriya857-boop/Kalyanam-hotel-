/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { KALYANAM_ROOMS } from '../data';
import { Room } from '../types';
import { 
  Star, 
  Maximize, 
  Users, 
  Bed, 
  ChevronRight, 
  Check, 
  X, 
  ChevronLeft, 
  Images, 
  Camera, 
  Eye, 
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';

interface AccommodationsProps {
  onSelectRoom: (roomId: string) => void;
}

// Curated luxurious captions describing each photo's artistic/design merit
const GALLERY_CAPTIONS: Record<string, string[]> = {
  'deluxe-garden': [
    'The Royal Chamber Bedroom with authentic hand-carved stone finishes and soft indirect lighting',
    'Elegant Italian-style vanity bathroom outfitted with pure Ayurvedic organic essentials',
    'Bespoke private sit-out parlor area framed by cozy, warm fabric armchairs',
    'Glorious panoramic morning view over our beautifully landscaped inner courtyard gardens'
  ],
  'heritage-suite': [
    'Classic handcrafted royal canopy bedchamber with high-vaulted ceilings and traditional drapery',
    'Opulent imperial marble bathroom featuring a premium deep-jetted wellness jacuzzi tub',
    'Exquisite private reading lounge designed with historic hand-sculpted Rajasthani stone pillars',
    'Private stone-carved sunrise balcony looking out into the ancient skyline surrounding Sika'
  ],
  'presidential-suite': [
    'Magnificent master emperor bedroom draped in authentic local gold leafing, marble, and silk',
    'Formal private meeting/dining lounge and built-in fully stocked luxury entertainment bar',
    'Acoustically treated private steam cubicle, glass rain shower, and aromatherapy bath paradise',
    'Sundeck and fully heated personal plunge pool with spectacular vistas of the Aravalli range'
  ]
};

// Full-screen Premium Lightbox Gallery Modal with responsive layout configurations
interface LightboxProps {
  roomId: string;
  initialIndex: number;
  onClose: () => void;
}

function RoomGalleryLightbox({ roomId, initialIndex, onClose }: LightboxProps) {
  const room = KALYANAM_ROOMS.find(r => r.id === roomId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  if (!room || !room.gallery) return null;
  const galleryList = room.gallery;
  const captions = GALLERY_CAPTIONS[roomId] || [];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  // Keyboard navigation hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll when open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[120] bg-stone-950/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      {/* Lightbox Inner Container with Desktop-to-Mobile Autolayout */}
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="w-full max-w-6xl bg-[#141210]/95 border border-amber-400/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col lg:grid lg:grid-cols-12 min-h-[500px] lg:h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 h-11 w-11 bg-black/60 hover:bg-amber-400 border border-white/10 hover:border-amber-400 rounded-full flex items-center justify-center text-white hover:text-stone-950 transition-all duration-300 shadow-lg group active:scale-95 cursor-pointer"
          title="Close Gallery (Esc)"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Column 1: Core Media Stage (Col span 8 on widescreen) */}
        <div className="relative col-span-8 bg-stone-900 border-r border-[#1D1916] flex flex-col justify-between h-[350px] md:h-[500px] lg:h-full overflow-hidden">
          
          {/* Main Display Picture */}
          <div className="absolute inset-x-0 top-0 bottom-24 flex items-center justify-center p-4 select-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={galleryList[currentIndex]}
                alt={`${room.name} Interior ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-full max-h-full object-contain rounded-xl shadow-xl border border-white/5"
              />
            </AnimatePresence>
          </div>

          {/* Symmetrical Left/Right Swift Arrows */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-12 flex justify-between pointer-events-none">
            <button
              id="lightbox-btn-prev"
              onClick={handlePrev}
              className="pointer-events-auto h-12 w-12 bg-black/50 hover:bg-amber-400 border border-white/10 hover:border-amber-400 rounded-full flex items-center justify-center text-white hover:text-stone-950 transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              title="Previous Photo (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              id="lightbox-btn-next"
              onClick={handleNext}
              className="pointer-events-auto h-12 w-12 bg-black/50 hover:bg-amber-400 border border-white/10 hover:border-amber-400 rounded-full flex items-center justify-center text-white hover:text-stone-950 transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              title="Next Photo (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Custom Picture Counter Tag */}
          <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 text-[10px] font-mono-tech tracking-[0.2em] font-bold text-amber-400">
            {currentIndex + 1} / {galleryList.length} CHAMBER VIEWS
          </div>

          {/* Bottom active thumbnails strip indicator inside the stage */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2.5 px-4 h-16 pointer-events-auto relative mt-auto z-10 bg-gradient-to-t from-black/80 to-transparent pt-4">
            {galleryList.map((imgUrl, idx) => (
              <button
                id={`thumb-${idx}`}
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-12 w-18 md:w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  currentIndex === idx 
                    ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20' 
                    : 'border-white/10 hover:border-white/30 brightness-50 hover:brightness-90'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* Column 2: Luxurious Suite Details Sidebar (Col span 4 on widescreen) */}
        <div className="col-span-4 p-6 md:p-8 flex flex-col justify-between bg-[#110F0D] text-left">
          
          <div className="space-y-6">
            <div>
              <span className="text-[9px] uppercase font-mono-tech font-bold tracking-[0.3em] text-amber-400 bg-amber-450/10 px-3 py-1 rounded-full border border-amber-400/10 inline-block mb-3">
                KALYANAM GALLERY MANIFEST
              </span>
              <h2 className="font-serif-lux text-xl md:text-2xl font-bold text-[#F5F2ED] leading-tight">
                {room.name}
              </h2>
              <p className="text-xs text-amber-300 italic tracking-wide mt-1">
                {room.tagline}
              </p>
            </div>

            {/* Room Specifications Quick Block */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5 font-sans bg-white/3 p-3 rounded-2xl">
              <div className="text-[11px] text-stone-300">
                <span className="block text-stone-500 text-[9px] font-mono-tech uppercase tracking-wide">Dimension:</span>
                {room.specs.size}
              </div>
              <div className="text-[11px] text-stone-300">
                <span className="block text-stone-500 text-[9px] font-mono-tech uppercase tracking-wide">Bedding:</span>
                {room.specs.bed}
              </div>
              <div className="text-[11px] text-stone-300">
                <span className="block text-stone-500 text-[9px] font-mono-tech uppercase tracking-wide">Capacity:</span>
                {room.specs.occupancy}
              </div>
              <div className="text-[11px] text-stone-300">
                <span className="block text-stone-500 text-[9px] font-mono-tech uppercase tracking-wide">Orient:</span>
                {room.specs.view}
              </div>
            </div>

            {/* Active Interior Description (Interactive transition overlay) */}
            <div className="space-y-2.5">
              <span className="text-[9px] font-mono-tech tracking-widest text-[#8E857C] uppercase font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> Focus Detail Context:
              </span>
              <div className="min-h-[80px] bg-amber-400/3 border-l-2 border-amber-400 p-3.5 rounded-r-xl">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-stone-300 text-xs tracking-wide leading-relaxed"
                  >
                    {captions[currentIndex] || "Every feature has been custom coordinated by traditional artisans utilizing royal finishes and pristine modern detailing."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Quick Reserve/Rate Banner */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <div>
              <span className="block text-[9px] font-mono-tech uppercase tracking-widest text-stone-500 text-left">ESTIMATED RATE</span>
              <span className="text-xl font-bold font-mono text-amber-400">
                ₹{room.pricePerNight.toLocaleString('en-IN')}
                <span className="text-xs text-stone-400 font-normal"> / Night</span>
              </span>
            </div>
            
            <button
              id="lightbox-close-interact"
              onClick={onClose}
              className="px-5 py-2.5 bg-amber-400 text-stone-900 hover:bg-amber-300 font-sans text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              Back To Suites
            </button>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}


// Interactive 3D Card utilizing Dual-layer image cycling on Hover
function TiltCard({ 
  room, 
  onSelectRoom,
  onOpenLightbox 
}: { 
  room: Room; 
  onSelectRoom: (roomId: string) => void;
  onOpenLightbox: (roomId: string, index: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

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

  // Image selectors logic
  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.gallery) {
      setActiveImgIdx((prev) => (prev + 1) % room.gallery!.length);
    }
  };

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.gallery) {
      setActiveImgIdx((prev) => (prev - 1 + room.gallery!.length) % room.gallery!.length);
    }
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
        {/* Room Image Container (Interactive Preview with Side Clickable Swifts on hover) */}
        <div 
          className="relative h-64 overflow-hidden bg-stone-900 select-none group/img cursor-pointer"
          onClick={() => onOpenLightbox(room.id, activeImgIdx)}
          title="Click to expand full screen luxury gallery"
        >
          {/* Animated active image */}
          <AnimatePresence mode="wait">
            <motion.img
              id={`room-${room.id}-slide-${activeImgIdx}`}
              key={activeImgIdx}
              src={room.gallery ? room.gallery[activeImgIdx] : room.image}
              alt={`${room.name} Slide`}
              initial={{ opacity: 0.9, scale: 1.02 }}
              animate={{ opacity: 1, scale: isHovered ? 1.08 : 1 }}
              exit={{ opacity: 0.9 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.92]"
            />
          </AnimatePresence>

          {/* Interactive lens trigger on hover (Anti-AI-slop standard display) */}
          <div className="absolute inset-x-0 bottom-0 top-0 bg-stone-950/20 group-hover/img:bg-stone-950/40 transition-colors duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 rounded-full bg-stone-900/90 backdrop-blur-md border border-amber-300/30 text-white font-sans text-[10px] tracking-widest font-bold uppercase flex items-center gap-1.5 shadow-xl hover:bg-amber-400 hover:text-stone-950 hover:border-amber-400 transition-all duration-300"
            >
              <Images className="w-3.5 h-3.5" />
              <span>Expand Interior Gallery</span>
            </motion.div>
          </div>

          {/* Symmetrical Mini Nav Arrows inside image (Fade-in on container hover) */}
          <AnimatePresence>
            {isHovered && room.gallery && room.gallery.length > 1 && (
              <>
                <motion.button
                  id={`room-${room.id}-cycle-prev`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={handlePrevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-black/60 hover:bg-amber-400/90 hover:text-stone-950 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  id={`room-${room.id}-cycle-next`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={handleNextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-black/60 hover:bg-amber-400/90 hover:text-stone-950 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Symmetrical Mini Dots indicators at the bottom curve */}
          {room.gallery && room.gallery.length > 1 && (
            <div className="absolute bottom-4 right-4 z-10 flex gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
              {room.gallery.map((_, idx) => (
                <button
                  id={`dot-${room.id}-${idx}`}
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIdx(idx);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeImgIdx === idx ? 'w-4 bg-amber-400' : 'w-1.5 bg-stone-500 hover:bg-stone-300'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Symmetrical Premium Score Badge */}
          <div className="absolute top-4 right-4 bg-stone-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/20 flex items-center gap-1 shadow-lg pointer-events-none">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-semibold text-white">{room.rating.toFixed(1)}</span>
            <span className="text-[9px] text-stone-400">({room.reviewsCount})</span>
          </div>

          {/* Float pricing tag */}
          <div className="absolute bottom-4 left-4 bg-[#FAF6F0] text-stone-950 px-3 py-1 rounded-md text-[9px] font-bold tracking-[0.12em] uppercase border border-amber-400/40 pointer-events-none">
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
            <div className="flex items-center gap-2.5 text-xs text-[#FAF6F0]/85 truncate">
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
  const [lightboxState, setLightboxState] = useState<{ roomId: string; initialIdx: number } | null>(null);

  const handleOpenLightbox = (roomId: string, initialIdx: number) => {
    setLightboxState({ roomId, initialIdx });
  };

  const handleCloseLightbox = () => {
    setLightboxState(null);
  };

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
            Each chamber is sculpted as a serene retreat. Warm stonework, traditional detailing, and full-spectrum bespoke amenities compose a royal refuge in Sikar. Click on any room gallery to explore their beautiful royal interiors.
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
              <TiltCard 
                room={room} 
                onSelectRoom={onSelectRoom} 
                onOpenLightbox={handleOpenLightbox}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full-Screen Luxe Lightbox Gallery Rendering portal (AnimatePresence supported) */}
      <AnimatePresence>
        {lightboxState && (
          <RoomGalleryLightbox 
            roomId={lightboxState.roomId} 
            initialIndex={lightboxState.initialIdx} 
            onClose={handleCloseLightbox} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
