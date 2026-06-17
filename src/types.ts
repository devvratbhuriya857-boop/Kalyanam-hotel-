/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  name: string;
  tagline: string;
  type: 'deluxe' | 'suite' | 'presidential';
  description: string;
  specs: {
    size: string;
    occupancy: string;
    bed: string;
    view: string;
  };
  pricePerNight: number;
  featuredAmenities: string[];
  image: string;
  rating: number;
  reviewsCount: number;
}

export interface BookingState {
  roomId: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  breakfastAddon: boolean;
  airportPickupAddon: boolean;
  couponCode: string;
}

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface BookingConfirmation {
  bookingId: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  breakfastAddon: boolean;
  airportPickupAddon: boolean;
  couponApplied: boolean;
  gstAmount: number;
  discountAmount: number;
  totalPrice: number;
  guest: GuestDetails;
  bookedAt: string;
}

export interface EventBookingRequest {
  fullName: string;
  email: string;
  phone: string;
  eventType: 'wedding' | 'corporate' | 'social' | 'other';
  guestsEstimate: number;
  eventDate: string;
  requiresRooms: boolean;
  specialRequirements: string;
}
