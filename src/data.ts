/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room } from './types';

export const KALYANAM_ROOMS: Room[] = [
  {
    id: 'deluxe-garden',
    name: 'Royal Deluxe Sanctum',
    tagline: 'Modern Rajasthani elegance with lush courtyard views',
    type: 'deluxe',
    description: 'Immerse yourself in handcrafted comfort. This beautifully balanced sanctuary features authentic stone textures, soft indirect golden lighting, and a panoramic window opening onto our serene inner courtyard gardens.',
    specs: {
      size: '340 sq ft',
      occupancy: '2 Adults, 1 Child',
      bed: 'Premium King Coil Bed',
      view: 'Serene Courtyard Garden'
    },
    pricePerNight: 5500,
    featuredAmenities: [
      'High-Speed Complimentary Wi-Fi',
      '4K Smart LED TV with Streaming',
      'Plush Bathrobes & Ayurvedic Toiletries',
      'Fully Stocked Gourmet Minibar',
      'Individual Climatic Control',
      'In-room Digital Safe'
    ],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200',
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'heritage-suite',
    name: 'Kalyanam Heritage Suite',
    tagline: 'Bespoke imperial spatial luxury for grand stays',
    type: 'suite',
    description: 'A masterpiece of local Rajasthani architecture combined with contemporary design elements. Features an exquisite private sitting lounge, traditional carved heritage accents, dynamic ambient lighting controls, and an opulent private balcony.',
    specs: {
      size: '620 sq ft',
      occupancy: '3 Adults or 2 Adults, 2 Children',
      bed: 'Royal Four-Poster Canopy Bed',
      view: 'Scenic Sikar Skyline & Hills'
    },
    pricePerNight: 9500,
    featuredAmenities: [
      'Dedicated Round-the-Clock Butler Service',
      'Espresso Brewer & Premium Leaf Tea Station',
      'Opulent Italian Marble Bath with Jet Jacuzzi',
      'Walk-In Dresser & Wardrobe',
      'Complimentary Evening High-Tea & Hors-D’oeuvres',
      'Pillow Menu (Silk, Memory Foam, Feather)'
    ],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200',
    rating: 5.0,
    reviewsCount: 88
  },
  {
    id: 'presidential-suite',
    name: 'The Maharaja Grand Presidential',
    tagline: 'The ultimate pinnacle of state-level comfort and poise',
    type: 'presidential',
    description: 'An expansive modern palace designed for those who expect nothing less than absolute perfection. Boasts formal dining and board spaces, a private security anteroom, sweeping vistas of the Shekhawati mountain ridge, and handpicked brass installations.',
    specs: {
      size: '1200 sq ft',
      occupancy: '4 Guests max',
      bed: 'Upholstered Emperor King Bed',
      view: '360° Panoramic Aravalli Foothills'
    },
    pricePerNight: 18500,
    featuredAmenities: [
      'Custom Welcome Rajasthani Tikka Ceremony & Mocktails',
      'Private In-suite Chef & Curated Dining Settings',
      'Fully Integrated Smart Home Automations',
      'Private Spa Deck & Steam Room access',
      'VIP Airport / Luxury Chauffeur Transfers Included',
      'Acoustically Treated Lounge with Premium Acoustics'
    ],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400',
    rating: 5.0,
    reviewsCount: 41
  }
];

export const AMENITIES = [
  {
    icon: 'Sparkles',
    name: 'Grand Wedding Banquets',
    description: 'Opulent halls holding up to 1,500 guests with tailored royal themes.'
  },
  {
    icon: 'UtensilsCrossed',
    name: 'Saffron Heritage Diner',
    description: 'Award-winning Rajasthani thalis and contemporary multi-cuisine delicacies.'
  },
  {
    icon: 'Flame',
    name: 'The Jharokha Poolside Lounge',
    description: 'Glistening outdoor swimming pool with private cabanas and high-tea counters.'
  },
  {
    icon: 'ShieldCheck',
    name: 'VIP Elite Concierge',
    description: 'Personalized sightseeing planning across Sikar forts and local temples.'
  },
  {
    icon: 'CarFront',
    name: 'Valet & Luxury Chauffeurs',
    description: 'Secure, modern valet terminal & regional airport pickup/drop-offs.'
  },
  {
    icon: 'Wifi',
    name: 'Gigabit Fiber Internet',
    description: 'High-speed wireless connectivity blanketed seamlessly across the entire resort.'
  }
];

export const TESTIMONIALS = [
  {
    author: 'Sunita & Rajeev Sharma',
    city: 'Jaipur',
    rating: 5,
    date: 'February 2026',
    comment: 'We hosted our daughter’s luxury wedding at Kalyanam Banquets. The hospitality was unmatched! Every guest was spellbound by the service, and the food was simply incredible. Truly the crown jewel of Sikar of Sanwali Road!'
  },
  {
    author: 'Vikramaditya Rathore',
    city: 'New Delhi',
    rating: 5,
    date: 'April 2026',
    comment: 'The Kalyanam Heritage Suite feels like a high-end palace. High ceiling, royal finishes, and incredible luxury bathroom standard. Highly recommended for family stays or business visits.'
  },
  {
    author: 'Dr. Michael Vance',
    city: 'Melbourne, Australia',
    rating: 5,
    date: 'May 2026',
    comment: 'Outstanding hospitality! The design gracefully merges traditional Rajasthani warmth with absolute modern comfort. The staff went above and beyond to organize our Shekhawati region tour.'
  }
];

export const LOCAL_ATTRACTIONS = [
  {
    name: 'Khatu Shyam Ji Temple',
    distance: '48 km',
    type: 'Spiritual Center',
    desc: 'The world-famous temple dedicated to Lord Krishna (Barbarika) attracting millions of devotees.'
  },
  {
    name: 'Salasar Balaji Dham',
    distance: '62 km',
    type: 'Heritage pilgrimage',
    desc: 'Renowned temple dedicated to Hanuman Ji, showcasing exceptional intricate devotional craftsmanship.'
  },
  {
    name: 'Jeen Mata Ji Temple',
    distance: '29 km',
    type: 'Sacred Sanctuary',
    desc: 'Ancient shrine surrounded by the breathtaking, verdant Aravalli range valleys.'
  },
  {
    name: 'Devgarh Fort & Havelis',
    distance: '12 km',
    type: 'Historical Architecture',
    desc: 'Magnificent 18th-century hilltop fortress, boasting authentic Shekhawati frescoes and panoramic views.'
  }
];
