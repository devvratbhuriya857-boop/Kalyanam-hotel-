/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Coffee, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Info, 
  Printer, 
  ArrowRight,
  CarFront
} from 'lucide-react';
import { KALYANAM_ROOMS } from '../data';
import { BookingState, GuestDetails, BookingConfirmation } from '../types';

interface BookingEngineProps {
  initialParams?: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  } | null;
}

export default function BookingEngine({ initialParams }: BookingEngineProps) {
  // 1. Core State
  const [selectedRoomId, setSelectedRoomId] = useState('heritage-suite');
  
  // Dates represented as Date objects or YYYY-MM-DD
  const [checkInStr, setCheckInStr] = useState('');
  const [checkOutStr, setCheckOutStr] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [breakfastAddon, setBreakfastAddon] = useState(false);
  const [airportAddon, setAirportAddon] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // 2. Calendar custom state
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11
  const [tempSelection, setTempSelection] = useState<'checkIn' | 'checkOut'>('checkIn');

  // 3. Checkout Progress State
  // 'configure' -> 'details' -> 'processing' -> 'success'
  const [activeStep, setActiveStep] = useState<'configure' | 'details' | 'processing' | 'success'>('configure');
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'corporate'>('upi');
  
  // Processing animation terminal logs
  const [processingLogIndex, setProcessingLogIndex] = useState(0);
  const processingLogs = [
    'Establishing secure escrow tunnel with Kalyanam Sikar ledger...',
    'Analyzing room inventory block allotment for preferred suite...',
    'Performing biometric handshake and verifying client credentials...',
    'Securing central guest terminal record and locking tariff variables...',
    'Generating encrypted cryptographic transaction receipt...',
    'Kalyanam Sanctuary reservation cleared successfully!'
  ];

  // 4. Final booking details
  const [confirmationData, setConfirmationData] = useState<BookingConfirmation | null>(null);

  // Catch initial parameters passed from Hero selection
  useEffect(() => {
    if (initialParams) {
      if (initialParams.checkIn) setCheckInStr(initialParams.checkIn);
      if (initialParams.checkOut) setCheckOutStr(initialParams.checkOut);
      if (initialParams.guests) setGuestCount(initialParams.guests);
      if (initialParams.roomType) setSelectedRoomId(initialParams.roomType);
      
      // Auto scroll to reservation component is handled by nav, we can set correct configurations
    } else {
      // Setup default dates
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 2);
      setCheckInStr(today.toISOString().split('T')[0]);
      setCheckOutStr(tomorrow.toISOString().split('T')[0]);
    }
  }, [initialParams]);

  // Handle active calendar Month generation
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // Day of week (0-6)

  const handleMonthPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleMonthNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const selectCalendarDate = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

    if (tempSelection === 'checkIn') {
      setCheckInStr(dateStr);
      setTempSelection('checkOut');
      // If previous checkout is before this checkin, clear checkout
      if (checkOutStr && new Date(dateStr) >= new Date(checkOutStr)) {
        setCheckOutStr('');
      }
    } else {
      const checkInDate = new Date(checkInStr);
      const chosenCheckout = new Date(dateStr);

      if (chosenCheckout <= checkInDate) {
        // Reset checkin instead
        setCheckInStr(dateStr);
        setCheckOutStr('');
        setTempSelection('checkOut');
      } else {
        setCheckOutStr(dateStr);
        setTempSelection('checkIn');
      }
    }
  };

  // Pricing calculations
  const selectedRoom = KALYANAM_ROOMS.find(r => r.id === selectedRoomId) || KALYANAM_ROOMS[0];
  
  const calculateNights = () => {
    if (!checkInStr || !checkOutStr) return 1;
    const inDate = new Date(checkInStr);
    const outDate = new Date(checkOutStr);
    const diff = outDate.getTime() - inDate.getTime();
    const nights = Math.ceil(diff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 1;
  };

  const nightsTotal = calculateNights();

  const calculateRates = () => {
    const baseTariff = selectedRoom.pricePerNight * nightsTotal;
    
    // Addons
    const breakfastPrice = breakfastAddon ? 750 * guestCount * nightsTotal : 0;
    const pickupPrice = airportAddon ? 1500 : 0;
    
    const subtotal = baseTariff + breakfastPrice + pickupPrice;
    
    // Coupon discount logic
    let discount = 0;
    if (isCouponApplied) {
      if (coupon.toUpperCase() === 'ROYALTY') {
        discount = Math.round(subtotal * 0.15); // 15% discount
      } else if (coupon.toUpperCase() === 'WELCOME2026') {
        discount = 1000; // Rs 1000 flat
      } else if (coupon.toUpperCase() === 'KALYANAM50') {
        discount = Math.round(subtotal * 0.50); // 50% discount
      }
    }

    const gst = Math.round((subtotal - discount) * 0.12); // Standard 12% luxury hotel room tax
    const grandTotal = subtotal - discount + gst;

    return {
      baseTariff,
      breakfastPrice,
      pickupPrice,
      subtotal,
      discount,
      gst,
      grandTotal
    };
  };

  const rates = calculateRates();

  const applyDiscountCoupon = () => {
    const code = coupon.toUpperCase();
    if (['ROYALTY', 'KALYANAM50', 'WELCOME2026'].includes(code)) {
      setIsCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid royal coupon code.');
      setIsCouponApplied(false);
    }
  };

  const removeDiscountCoupon = () => {
    setIsCouponApplied(false);
    setCoupon('');
    setCouponError('');
  };

  // Step 2 submit
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep('processing');
    setProcessingLogIndex(0);
  };

  // Terminal log processing loop
  useEffect(() => {
    if (activeStep === 'processing') {
      const interval = setInterval(() => {
        setProcessingLogIndex(prev => {
          if (prev < processingLogs.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            // Completed! Create confirmation
            const refId = `KLY-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
            setConfirmationData({
              bookingId: refId,
              room: selectedRoom,
              checkIn: checkInStr,
              checkOut: checkOutStr,
              guests: guestCount,
              nights: nightsTotal,
              breakfastAddon,
              airportPickupAddon: airportAddon,
              couponApplied: isCouponApplied,
              discountAmount: rates.discount,
              gstAmount: rates.gst,
              totalPrice: rates.grandTotal,
              guest: guestDetails,
              bookedAt: new Date().toLocaleString()
            });
            setActiveStep('success');
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeStep]);

  // Simulated system Print receipt
  const simulatePrint = () => {
    window.print();
  };

  return (
    <section id="reservations" className="py-24 bg-transparent border-b border-white/5 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-stone-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center md:max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-amber-500" />
            <span className="text-xs font-mono-tech tracking-[0.25em] uppercase text-amber-400">
              Direct Reservation Ledger
            </span>
            <span className="w-8 h-[1px] bg-amber-400" />
          </div>
          <h2 className="font-serif-lux text-3xl md:text-4xl font-bold tracking-tight text-[#FAF6F0]">
            Booking Engine & Checkout
          </h2>
          <p className="mt-4 text-stone-300 text-xs md:text-sm font-sans tracking-wide leading-relaxed">
            Select sanctuary parameters down on our calendar matrix below, add tailored amenities, and confirm details inside our high-tech terminal.
          </p>
        </div>

        {/* Dynamic Display based on active processes */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CONFIGURE & SELECT DATES / PREFERENCES */}
          {activeStep === 'configure' && (
            <motion.div
              id="booking-step-configure"
              key="configure"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column - Room select & bespoke calendar dates (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* A. Select Sanctuary Category */}
                <div className="glass-card p-6 md:p-8 rounded-3xl">
                  <span className="text-[10px] uppercase font-mono-tech font-bold tracking-wider text-amber-600 mb-4 block">
                    01 • Pick Your Luxury Chamber
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {KALYANAM_ROOMS.map((room) => (
                      <button
                        id={`choose-room-${room.id}`}
                        key={room.id}
                        type="button"
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                          selectedRoomId === room.id
                            ? 'border-amber-500 bg-white/10 text-white shadow-xl shadow-amber-950/10'
                            : 'border-white/10 bg-white/5 text-stone-200 hover:bg-white/10'
                        }`}
                      >
                        <div className="relative z-10">
                          <h4 className="font-serif-lux font-bold text-sm tracking-wide group-hover:text-amber-400 transition-colors">
                            {room.name.replace('The ', '').replace('Kalyanam ', '')}
                          </h4>
                          <p className={`text-[10px] font-sans mt-1 ${selectedRoomId === room.id ? 'text-[#FAF6F0]/70' : 'text-stone-400'}`}>
                            {room.specs.size} • {room.specs.view.split(' ')[0]} View
                          </p>
                        </div>
                        <div className="relative z-10 flex justify-between items-end mt-4">
                          <span className={`text-[10px] font-mono-tech tracking-wider uppercase font-bold ${selectedRoomId === room.id ? 'text-amber-300' : 'text-amber-400'}`}>
                            ₹{room.pricePerNight.toLocaleString('en-IN')}/N
                          </span>
                          {selectedRoomId === room.id && (
                            <div className="h-5 w-5 rounded-full bg-amber-450 flex items-center justify-center bg-amber-400 text-stone-950 p-1">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* B. Custom Traditional Calendar picker interface */}
                <div className="glass-card p-6 md:p-8 rounded-3xl">
                  <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-[10px] uppercase font-mono-tech font-bold tracking-wider text-amber-400">
                        02 • Calendar Matrix Picker
                      </span>
                      <h3 className="font-serif-lux text-xl font-bold text-[#FAF6F0] mt-1">
                        Dates of Sanctuary Allotment
                      </h3>
                      <p className="text-[#FAF6F0]/70 text-xs mt-0.5">Toggle months for correct booking check-in & check-out dates</p>
                    </div>

                    {/* Checkin / Checkout state indicator badges */}
                    <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
                      <button
                        id="set-check-in-mode"
                        type="button"
                        onClick={() => setTempSelection('checkIn')}
                        className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                          tempSelection === 'checkIn'
                            ? 'bg-amber-450 bg-amber-450 text-stone-950 shadow bg-stone-950 text-stone-50'
                            : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        In: {checkInStr ? new Date(checkInStr).toLocaleDateString('en-IN', {day:'2-digit', month:'short'}) : 'Pick Date'}
                      </button>
                      <button
                        id="set-check-out-mode"
                        type="button"
                        onClick={() => setTempSelection('checkOut')}
                        className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                          tempSelection === 'checkOut'
                            ? 'bg-amber-450 bg-amber-450 text-stone-950 shadow bg-stone-950 text-stone-50'
                            : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        Out: {checkOutStr ? new Date(checkOutStr).toLocaleDateString('en-IN', {day:'2-digit', month:'short'}) : 'Pick Date'}
                      </button>
                    </div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Bespoke interactive month drawer */}
                    <div className="border border-white/5 rounded-2xl p-5 bg-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          id="calendar-month-prev"
                          type="button"
                          onClick={handleMonthPrev}
                          className="p-1 h-7 w-7 rounded-full hover:bg-white/10 flex items-center justify-center border border-white/10"
                        >
                          <ChevronLeft className="w-4 h-4 text-[#FAF6F0]" />
                        </button>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono-tech">
                          {monthNames[currentMonth]} {currentYear}
                        </h4>
                        <button
                          id="calendar-month-next"
                          type="button"
                          onClick={handleMonthNext}
                          className="p-1 h-7 w-7 rounded-full hover:bg-white/10 flex items-center justify-center border border-white/10"
                        >
                          <ChevronRight className="w-4 h-4 text-[#FAF6F0]" />
                        </button>
                      </div>

                      {/* Header week days labels */}
                      <div className="grid grid-cols-7 gap-1 text-center font-mono-tech text-[9px] uppercase font-bold text-stone-400 mb-2 py-1.5 border-b border-white/10">
                        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                      </div>

                      {/* Day cells grid */}
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {/* Space offset padding cells */}
                        {Array.from({ length: firstDayIndex }).map((_, i) => (
                          <div key={`empty-${i}`} className="h-9" />
                        ))}

                        {/* Actual days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const formattedMonth = String(currentMonth + 1).padStart(2, '0');
                          const formattedDay = String(day).padStart(2, '0');
                          const cellDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
                          const cellDate = new Date(cellDateStr);
                          
                          const isCheckInOccur = cellDateStr === checkInStr;
                          const isCheckOutOccur = cellDateStr === checkOutStr;
                          
                          // Check if day lies between checkIn and checkOut
                          let isInActiveRange = false;
                          if (checkInStr && checkOutStr) {
                            const cin = new Date(checkInStr);
                            const cout = new Date(checkOutStr);
                            isInActiveRange = cellDate > cin && cellDate < cout;
                          }

                          // Check if day is historical (past date)
                          const todayFull = new Date();
                          todayFull.setHours(0,0,0,0);
                          const isPastDate = cellDate < todayFull;

                          return (
                            <button
                              id={`calendar-day-${cellDateStr}`}
                              key={`day-${day}`}
                              type="button"
                              disabled={isPastDate}
                              onClick={() => selectCalendarDate(day)}
                              className={`h-9 w-full text-xs font-medium font-sans rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                                isPastDate 
                                  ? 'text-stone-300 bg-transparent cursor-not-allowed line-through' 
                                  : isCheckInOccur || isCheckOutOccur
                                  ? 'bg-amber-450 bg-stone-900 text-amber-300 font-bold shadow'
                                  : isInActiveRange
                                  ? 'bg-amber-100/65 text-stone-950 font-semibold'
                                  : 'hover:bg-amber-200/25 text-stone-750'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Guests selection and core details notes */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] uppercase font-mono-tech font-bold tracking-widest text-[#FAF6F0] mb-2.5">
                          Attendance Guest Count
                        </label>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1 max-w-[200px]">
                          <button
                            id="decrease-guests-btn"
                            type="button"
                            onClick={() => setGuestCount(prev => Math.max(1, prev - 1))}
                            className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-[#FAF6F0] hover:bg-white/20 font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-mono-tech font-bold text-xs text-[#FAF6F0]">
                            {guestCount} Guest{guestCount > 1 ? 's' : ''}
                          </span>
                          <button
                            id="increase-guests-btn"
                            type="button"
                            onClick={() => setGuestCount(prev => Math.min(selectedRoom.id === 'deluxe-garden' ? 3 : 4, prev + 1))}
                            className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-[#FAF6F0] hover:bg-white/20 font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[10px] text-stone-500 tracking-wide mt-2">
                          Max occupancy limits apply based on suite size constraints ({selectedRoom.id === 'deluxe-garden' ? '3' : '4'} guests max).
                        </p>
                      </div>

                      {/* C. Bespoke Suite Addons */}
                      <div className="space-y-3.5">
                        <label className="block text-[10px] uppercase font-mono-tech font-bold tracking-widest text-[#1A1613]">
                          Pre-arrange Sanctuary Add-ons
                        </label>
                        
                        {/* Addon BREAKFAST */}
                        <div
                          onClick={() => setBreakfastAddon(!breakfastAddon)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            breakfastAddon ? 'border-amber-400 bg-amber-500/5' : 'border-stone-150 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Coffee className={`w-4 h-4 mt-0.5 ${breakfastAddon ? 'text-amber-600' : 'text-stone-400'}`} />
                            <div className="text-left">
                              <h5 className="text-xs font-bold text-stone-900 leading-none">Daily Royal Breakfast Lounge</h5>
                              <p className="text-[10px] text-stone-500 mt-1">Multi-course buffet & Saffron chai thali (+₹750/g/day)</p>
                            </div>
                          </div>
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            breakfastAddon ? 'bg-amber-400 border-amber-400 text-stone-900' : 'border-stone-300'
                          }`}>
                            {breakfastAddon && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        {/* Addon TRAVEL */}
                        <div
                          onClick={() => setAirportAddon(!airportAddon)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            airportAddon ? 'border-amber-400 bg-amber-500/5' : 'border-stone-150 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <CarFront className={`w-4 h-4 mt-0.5 ${airportAddon ? 'text-amber-600' : 'text-stone-400'}`} />
                            <div className="text-left">
                              <h5 className="text-xs font-bold text-stone-900 leading-none">VIP Valet Chauffeur Airport Pickup</h5>
                              <p className="text-[10px] text-stone-500 mt-1">Liaison from Jaipur Airport / Sikar Junction (+₹1,500 flat)</p>
                            </div>
                          </div>
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            airportAddon ? 'bg-amber-400 border-amber-400 text-stone-900' : 'border-stone-300'
                          }`}>
                            {airportAddon && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Summary Card Sticky Ledger (4 Cols) */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between text-[#FAF6F0]">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                      <span className="text-[10px] font-mono-tech font-bold tracking-widest text-amber-400">
                        RESORT RECEIPT LEDGER
                      </span>
                      <span className="text-xs font-mono-tech bg-amber-400/10 text-amber-300 px-3 py-1 rounded-full font-bold">
                        {nightsTotal} Night{nightsTotal > 1 ? 's' : ''} Stay
                      </span>
                    </div>

                    {/* Room showcase block */}
                    <div className="flex gap-4 items-center mb-6">
                      <img
                        src={selectedRoom.image}
                        alt="selected room"
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200"
                      />
                      <div className="text-left">
                        <span className="text-[9px] uppercase font-mono-tech tracking-wider text-amber-600 font-bold block">
                          Chamber Premium
                        </span>
                        <h4 className="font-serif-lux text-base font-bold text-stone-900 line-clamp-1">{selectedRoom.name}</h4>
                        <p className="text-[10px] text-stone-500 font-sans">₹{selectedRoom.pricePerNight.toLocaleString('en-IN')} / night base</p>
                      </div>
                    </div>

                    {/* Pricing lines */}
                    <div className="space-y-3.5 border-b border-stone-100 pb-5 text-xs text-stone-600">
                      <div className="flex justify-between">
                        <span>Base Room Accommodations:</span>
                        <span className="font-mono-tech font-semibold text-stone-900">
                          ₹{rates.baseTariff.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      {breakfastAddon && (
                        <div className="flex justify-between animate-fade-in">
                          <span>Imperial Dining Add-on:</span>
                          <span className="font-mono-tech font-semibold text-stone-900">
                            ₹{rates.breakfastPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}

                      {airportAddon && (
                        <div className="flex justify-between animate-fade-in">
                          <span>VIP Chauffeur Pickup:</span>
                          <span className="font-mono-tech font-semibold text-stone-900">
                            ₹{rates.pickupPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}

                      {/* Coupon Promotion Box */}
                      <div className="pt-2">
                        <div className="flex gap-2">
                          <input
                            id="coupon-input"
                            type="text"
                            placeholder="COUPON (e.g. ROYALTY)"
                            value={coupon}
                            onChange={(e) => {
                              setCoupon(e.target.value);
                              setCouponError('');
                            }}
                            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-850 uppercase focus:outline-none focus:border-amber-400 flex-1 font-mono-tech"
                          />
                          {isCouponApplied ? (
                            <button
                              id="remove-coupon-btn"
                              type="button"
                              onClick={removeDiscountCoupon}
                              className="px-3 py-2 bg-stone-900 text-amber-400 hover:text-white rounded-lg text-xs font-bold font-mono-tech cursor-pointer"
                            >
                              X
                            </button>
                          ) : (
                            <button
                              id="apply-coupon-btn"
                              type="button"
                              onClick={applyDiscountCoupon}
                              className="px-3 py-2 bg-amber-400 hover:bg-amber-500 text-stone-950 rounded-lg text-[10px] font-bold tracking-wider uppercase cursor-pointer"
                            >
                              Apply
                            </button>
                          )}
                        </div>
                        {isCouponApplied && (
                          <p className="text-[10px] text-green-600 font-medium font-sans mt-1">
                            ✓ Royal Coupon applied successfully!
                          </p>
                        )}
                        {couponError && (
                          <p className="text-[10px] text-red-500 font-medium font-sans mt-0.5">
                            {couponError}
                          </p>
                        )}
                        <p className="text-[9px] text-stone-400 mt-1 pl-1">
                          Hint: Use coupon coupon codes <span className="font-bold text-amber-600">ROYALTY</span> (15%) or <span className="font-bold text-amber-600">KALYANAM50</span> (50% Off).
                        </p>
                      </div>

                      {isCouponApplied && (
                        <div className="flex justify-between text-green-600 font-semibold bg-green-50 p-2.5 rounded-lg border border-green-100">
                          <span>Royal Discount Offset:</span>
                          <span className="font-mono-tech">- ₹{rates.discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-stone-500 border-t border-dashed border-stone-200 pt-3">
                        <span className="flex items-center gap-1">
                          Luxury Goods Tax (12% GST) <Info className="w-3 h-3 cursor-help text-stone-400" title="Standard hotel luxury GST in Sikar" />
                        </span>
                        <span className="font-mono-tech text-stone-700">
                          ₹{rates.gst.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Grand price display */}
                    <div className="flex justify-between items-end bg-[#FAF6F0] p-4 rounded-2xl border border-amber-500/15 mb-6">
                      <div className="text-left">
                        <span className="text-[9px] uppercase tracking-wider text-amber-800 font-bold block mb-1">
                          Grand Total Tariff
                        </span>
                        <span className="text-stone-500 text-[10px]">inclusive of high amenities</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl md:text-2xl font-serif-lux font-bold text-amber-800 leading-none">
                          ₹{rates.grandTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    id="trigger-details-step-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!checkInStr || !checkOutStr) {
                        alert('Please pick Check-In and Check-Out parameters inside the calendar matrix before advancing.');
                        return;
                      }
                      setActiveStep('details');
                    }}
                    className="w-full py-4 text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-xl text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-md cursor-pointer border border-amber-300/20 flex items-center justify-center gap-2"
                  >
                    Configure Guest Details <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: ENTER DETAILS & CHOOSE PAYMENT METHOD */}
          {activeStep === 'details' && (
            <motion.div
              id="booking-step-details"
              key="details"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
            >
              {/* Checkout details intake forms (8 Cols) */}
              <div className="lg:col-span-8 glass-card p-6 md:p-8 rounded-3xl text-[#FAF6F0]">
                <button
                  id="checkout-go-back"
                  type="button"
                  onClick={() => setActiveStep('configure')}
                  className="text-amber-400 hover:text-[#FAF6F0] font-sans text-xs font-bold tracking-wider uppercase mb-6 flex items-center gap-1 cursor-pointer"
                >
                  ← Modify Parameters & Dates
                </button>

                <h3 className="font-serif-lux text-2xl font-bold text-[#FAF6F0] mb-2">
                  Liaison Guest Registry
                </h3>
                <p className="text-stone-300 text-xs mb-8">All fields marked with an asterisk (*) are essential to lock reservation records.</p>
                
                <form id="checkout-guest-registry-form" onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#1A1613]/55 mb-2">
                        Guest Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-500" />
                        <input
                          id="checkout-fullname"
                          type="text"
                          required
                          value={guestDetails.fullName}
                          onChange={(e) => setGuestDetails(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="e.g. Devvrat Bhuriya"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 text-xs text-stone-850 focus:outline-none focus:border-amber-400 font-sans"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#1A1613]/55 mb-2">
                        Liaison Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-500" />
                        <input
                          id="checkout-email"
                          type="email"
                          required
                          value={guestDetails.email}
                          onChange={(e) => setGuestDetails(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="e.g. devvratbhuriya857@gmail.com"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 text-xs text-stone-850 focus:outline-none focus:border-amber-400 font-sans"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#1A1613]/55 mb-2">
                        WhatsApp Contact Phone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-500" />
                        <input
                          id="checkout-phone"
                          type="tel"
                          required
                          value={guestDetails.phone}
                          onChange={(e) => setGuestDetails(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="e.g. +91 94140 12345"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 text-xs text-stone-850 focus:outline-none focus:border-amber-400 font-sans"
                        />
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-[#1A1613]/55 mb-2">
                        Chamber Specifications / Special Requests
                      </label>
                      <textarea
                        id="checkout-requests"
                        value={guestDetails.specialRequests}
                        onChange={(e) => setGuestDetails(prev => ({ ...prev, specialRequests: e.target.value }))}
                        placeholder="e.g. High floor courtyard viewpoint, extra orthopedic bolster pillows, non-smoking floor preferred..."
                        rows={3}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-xs text-stone-850 focus:outline-none focus:border-amber-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Choose payment channels */}
                  <div className="pt-4 border-t border-stone-100">
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-[#1A1613]/55 mb-4">
                      Select Imperial Dummy Settlement Channel
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* UPI */}
                      <div
                        id="pay-method-upi"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-4 rounded-xl border flex flex-col justify-between h-28 cursor-pointer transition-all ${
                          paymentMethod === 'upi' ? 'border-amber-500 bg-amber-500/5' : 'border-stone-150 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono-tech tracking-widest text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded">UPI</span>
                          <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                            paymentMethod === 'upi' ? 'bg-amber-400 border-amber-400 text-stone-900' : 'border-stone-300'
                          }`}>
                            {paymentMethod === 'upi' && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <div className="text-left mt-2">
                          <h5 className="text-xs font-bold text-stone-900 leading-none">BHIM UPI Escrow</h5>
                          <p className="text-[9px] text-stone-500 mt-1">Instant simulated checkout code</p>
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        id="pay-method-card"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border flex flex-col justify-between h-28 cursor-pointer transition-all ${
                          paymentMethod === 'card' ? 'border-amber-500 bg-amber-500/5' : 'border-stone-150 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <CreditCard className="w-4 h-4 text-amber-500" />
                          <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                            paymentMethod === 'card' ? 'bg-amber-400 border-amber-400 text-stone-900' : 'border-stone-300'
                          }`}>
                            {paymentMethod === 'card' && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <div className="text-left mt-2">
                          <h5 className="text-xs font-bold text-stone-900 leading-none">Credit / Debit Card</h5>
                          <p className="text-[9px] text-stone-500 mt-1">Support modern simulated token gateway</p>
                        </div>
                      </div>

                      {/* Corporate Billing */}
                      <div
                        id="pay-method-corporate"
                        onClick={() => setPaymentMethod('corporate')}
                        className={`p-4 rounded-xl border flex flex-col justify-between h-28 cursor-pointer transition-all ${
                          paymentMethod === 'corporate' ? 'border-amber-500 bg-amber-500/5' : 'border-stone-150 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <ShieldCheck className="w-4 h-4 text-amber-500" />
                          <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                            paymentMethod === 'corporate' ? 'bg-amber-400 border-amber-400 text-stone-900' : 'border-stone-300'
                          }`}>
                            {paymentMethod === 'corporate' && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <div className="text-left mt-2">
                          <h5 className="text-xs font-bold text-stone-900 leading-none">VIP Corporate Account</h5>
                          <p className="text-[9px] text-stone-500 mt-1">Sikar business billing clearance</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-3 text-[10px] text-stone-500 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                    <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Your transient billing details are encrypted and parsed inside our sandbox container host. This is a secure guest-simulation clearing ledger.</span>
                  </div>

                  {/* Trigger pay button */}
                  <motion.button
                    id="submit-payment-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-950 text-xs font-bold tracking-[0.16em] uppercase rounded-xl transition-all font-sans shadow-md flex items-center justify-center gap-2 cursor-pointer gold-glow border border-amber-300/25"
                  >
                    Confirm Booking & Transact Payment <Sparkles className="w-4 h-4" />
                  </motion.button>
                </form>
              </div>

              {/* Right Column - Booking Summary Card Stick (4 Cols) */}
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="bg-stone-900 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
                  <div className="text-left">
                    <h4 className="font-serif-lux font-bold text-lg text-amber-400 border-b border-white/5 pb-4 mb-4">
                      Sanctum Specifications
                    </h4>
                    
                    <div className="space-y-4 mb-8 text-xs text-stone-300">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-500 block">CHAMBER CATEGORY</span>
                        <span className="font-semibold text-[#FAF6F0]">{selectedRoom.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-stone-500 block">CHECK-IN</span>
                          <span className="font-mono-tech font-semibold text-[#FAF6F0]">
                            {new Date(checkInStr).toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'})}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-stone-500 block">CHECK-OUT</span>
                          <span className="font-mono-tech font-semibold text-[#FAF6F0]">
                            {new Date(checkOutStr).toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'})}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-stone-500 block">DURATIONS</span>
                          <span className="font-semibold text-[#FAF6F0]">{nightsTotal} Luxurious Night{nightsTotal > 1 ? 's' : ''}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-stone-500 block">ACCOMPANY GUESTS</span>
                          <span className="font-semibold text-[#FAF6F0]">{guestCount} Guest{guestCount > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-500 block">ADDONS SCHEDULED</span>
                        <span className="font-semibold text-[#FAF6F0]">
                          {[
                            breakfastAddon ? 'Royal Buffet' : null,
                            airportAddon ? 'VIP Pickup' : null
                          ].filter(Boolean).join(', ') || 'None scheduled'}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 space-y-3 font-mono-tech text-xs">
                      <div className="flex justify-between text-stone-400">
                        <span>Original Tariff:</span>
                        <span>₹{rates.subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {isCouponApplied && (
                        <div className="flex justify-between text-[#FAF6F0] bg-white/5 p-2 rounded">
                          <span>Coupon Discount:</span>
                          <span className="text-green-400">-₹{rates.discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-stone-400">
                        <span>Goods Tax (12%):</span>
                        <span>₹{rates.gst.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-amber-300 font-bold text-sm border-t border-dashed border-white/10 pt-3">
                        <span>TOTAL PAYABLE:</span>
                        <span>₹{rates.grandTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: HIGH-TECH PROCESSING TERMINAL */}
          {activeStep === 'processing' && (
            <motion.div
              id="booking-step-processing"
              key="processing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-xl mx-auto bg-stone-950 rounded-3xl p-8 border border-amber-300/20 text-left relative overflow-hidden"
            >
              {/* Matrix glow back-lights */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none" />

              <div className="relative z-10 space-y-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] uppercase font-mono-tech tracking-[0.2em] text-[#FAF6F0]/65">
                      Kalyanam Secure Token Clearance
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-amber-400 tracking-widest font-bold">
                    {Math.round(((processingLogIndex + 1) / processingLogs.length) * 100)}% COMPLETE
                  </span>
                </div>

                {/* Cyber style high technology circular progress loader */}
                <div className="flex flex-col items-center justify-center my-6 py-6 border-y border-white/5">
                  <div className="relative h-20 w-20 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full border-2 border-stone-800" />
                    <span className="absolute inset-0 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    <CreditCard className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="font-serif-lux text-base font-bold text-[#FAF6F0] mt-6">
                    Authenticating Dummy Escrow Code
                  </h4>
                  <p className="text-[10px] text-stone-400 mt-1">Please do not refresh nor exit active browser tab.</p>
                </div>

                {/* Micro-logging interactive console window */}
                <div className="bg-stone-900 border border-white/5 rounded-2xl p-5 space-y-2 font-mono-tech text-[10px] text-stone-300 max-h-48 overflow-y-auto">
                  {processingLogs.slice(0, processingLogIndex + 1).map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 animate-fade-in text-emerald-400">
                      <span className="text-stone-500 font-bold select-none">&gt;&gt;</span>
                      <p>{log}</p>
                    </div>
                  ))}
                  {processingLogIndex < processingLogs.length - 1 && (
                    <div className="flex items-center gap-1.5 text-stone-500 animate-pulse">
                      <span>&gt;&gt;</span>
                      <span className="h-3 w-1.5 bg-stone-500" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: REFINED GEOMETRICAL CELEBRATORY SUCCESS MODAL WITH GOLD BORDER */}
          {activeStep === 'success' && confirmationData && (
            <motion.div
              id="booking-step-success"
              key="success"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="max-w-2xl mx-auto text-left"
            >
              <div className="bg-[#1A1613] rounded-3xl border-2 border-amber-400/80 p-6 md:p-10 shadow-2xl overflow-hidden relative shadow-amber-400/10">
                {/* Gold floral decorative element backdrop or glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient-success rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center pb-8 border-b border-white/5 mb-8">
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-stone-950 p-1 shadow-lg-gold"
                  >
                    <Check className="w-8 h-8 stroke-[2.5px]" />
                  </motion.div>
                  
                  <h3 className="font-serif-lux text-2xl md:text-3xl font-bold text-white tracking-wide mt-6 leading-tight">
                    Booking Confirmed at Kalyanam Hotel & Resort!
                  </h3>
                  <p className="text-stone-300 text-xs mt-2 max-w-sm">
                    Your luxury sanctuary inside Sikar has been secured. A confirmation courier has been transmitted to your registry.
                  </p>
                </div>

                {/* High Fidelity Simulated Printable Receipt Document */}
                <div id="booking-printable-receipt" className="bg-white border-t-4 border-amber-500 rounded-2xl p-5 md:p-8 text-stone-850 shadow-inner flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Header details */}
                    <div className="flex justify-between items-start border-b border-stone-100 pb-4">
                      <div>
                        <h4 className="font-serif-lux font-bold text-base text-stone-900 leading-none">
                          KALYANAM HOTEL & RESORT
                        </h4>
                        <p className="text-[9px] uppercase tracking-widest text-[#1F1C18]/60 font-semibold font-mono-tech mt-1">
                          Sanwali Road, Sikar (Raj.) • INDIA
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono-tech text-stone-400 uppercase font-bold block">RESERVATION KEY ID</span>
                        <span className="text-xs font-mono-tech font-bold text-amber-600 tracking-wide">
                          {confirmationData.bookingId}
                        </span>
                      </div>
                    </div>

                    {/* Registry particulars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans border-b border-stone-100 pb-4">
                      <div>
                        <span className="text-[9px] uppercase text-stone-400 font-bold block mb-1">GUEST REGISTRY</span>
                        <p className="font-bold text-stone-950 mb-0.5">{confirmationData.guest.fullName}</p>
                        <p className="text-stone-600">{confirmationData.guest.email}</p>
                        <p className="text-stone-600 font-mono-tech">{confirmationData.guest.phone}</p>
                      </div>
                      <div className="text-right md:text-right">
                        <span className="text-[9px] uppercase text-stone-400 font-bold block mb-1 font-sans">CHAMBER DETAILS</span>
                        <p className="font-bold text-stone-950 mb-0.5">{confirmationData.room.name}</p>
                        <p className="text-stone-600">{confirmationData.nights} luxurious night{confirmationData.nights > 1 ? 's' : ''} stay</p>
                        <p className="text-stone-600">Guests: {confirmationData.guests} Adults / children</p>
                      </div>
                    </div>

                    {/* Schedule of dates */}
                    <div className="grid grid-cols-2 gap-4 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <div>
                        <span className="text-[9px] uppercase text-stone-400 font-bold block">CHECK-IN</span>
                        <span className="font-mono-tech font-bold text-stone-900">
                          {new Date(confirmationData.checkIn).toLocaleDateString('en-IN', {weekday:'short', day:'2-digit', month:'short', year:'numeric'})}
                        </span>
                        <p className="text-[9px] text-amber-700 mt-0.5">Welcome Tikka Ceremony (14:00 hrs)</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase text-stone-400 font-bold block">CHECK-OUT</span>
                        <span className="font-mono-tech font-bold text-stone-900">
                          {new Date(confirmationData.checkOut).toLocaleDateString('en-IN', {weekday:'short', day:'2-digit', month:'short', year:'numeric'})}
                        </span>
                        <p className="text-[9px] text-amber-700 mt-0.5">Chamber clearance (11:00 hrs)</p>
                      </div>
                    </div>

                    {/* Scheduled Services */}
                    {(confirmationData.breakfastAddon || confirmationData.airportPickupAddon) && (
                      <div className="text-xs">
                        <span className="text-[9px] uppercase text-stone-400 font-bold block mb-1">INCLUDED TARIFF SERVICES</span>
                        <div className="flex gap-2 flex-wrap">
                          {confirmationData.breakfastAddon && (
                            <span className="inline-flex items-center gap-1 bg-amber-50 rounded px-2.5 py-1 text-[10px] text-amber-700 font-semibold border border-amber-200/50">
                              <Coffee className="w-3 h-3" /> Royal Daily Breakfast Included
                            </span>
                          )}
                          {confirmationData.airportPickupAddon && (
                            <span className="inline-flex items-center gap-1 bg-amber-50 rounded px-2.5 py-1 text-[10px] text-amber-700 font-semibold border border-amber-200/50">
                              <CarFront className="w-3 h-3" /> VIP Valet Chauffeur Pickup
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Financial summary thali detail */}
                    <div className="border-t border-dashed border-stone-200 pt-4 space-y-2 font-mono-tech text-[11px] text-stone-600">
                      <div className="flex justify-between">
                        <span>Sanctum Chamber rate:</span>
                        <span>₹{(confirmationData.room.pricePerNight * confirmationData.nights).toLocaleString('en-IN')}</span>
                      </div>
                      {confirmationData.couponApplied && (
                        <div className="flex justify-between text-green-600 font-semibold">
                          <span>Luxury Coupon applied:</span>
                          <span>- ₹{confirmationData.discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Luxury Goods GST Tax (12%):</span>
                        <span>₹{confirmationData.gstAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-stone-950 font-bold text-xs pt-2 border-t border-stone-200">
                        <span>TOTAL SETTLED SECURE:</span>
                        <span className="text-amber-800 font-bold text-sm">₹{confirmationData.totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="mt-6 border-t border-stone-100 pt-4 text-center text-[9px] text-stone-400">
                    <p>This is a certified Kalyanam Hotel & Resort (Sikar) guest billing clearance ticket. Generated at {confirmationData.bookedAt}.</p>
                  </div>
                </div>

                {/* Print confirmation actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    id="receipt-print-btn"
                    onClick={simulatePrint}
                    className="w-full sm:w-auto px-6 py-3 border border-white/20 hover:border-amber-400 bg-stone-900 hover:bg-stone-800 text-amber-400 rounded-xl text-xs font-bold font-sans tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Print Receipt
                  </button>
                  <button
                    id="receipt-close-btn"
                    onClick={() => {
                      setActiveStep('configure');
                      setConfirmationData(null);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 text-stone-950 rounded-xl text-xs font-bold font-sans tracking-wider uppercase transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Book Another sanctuary
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
