'use client';

import ImageCarousel from '@/components/ImageCarousel';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const amenities = [
  { icon: '⏰', text: '24/7 Access' },
  { icon: '🎭', text: 'Event Space' },
  { icon: '🤝', text: 'Meeting Room with Smart TV' },
  { icon: '☕', text: 'Tea & Coffee on Us' },
  { icon: '🛁', text: 'Shower Room' },
  { icon: '😎', text: 'Roof Terrace' },
  { icon: '♿', text: 'Wheelchair Accessible' },
  { icon: '🔒', text: 'Unifi Security System' },
  { icon: '☎️', text: '2 Private Phone Booths' },
  { icon: '🐶', text: 'Pet Friendly' },
  { icon: '🌐', text: 'Gigabit Internet' },
  { icon: '🍽️', text: 'Dining Area' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, // Staggered effect
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AmenitiesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' }); // Only triggers once when visible

  return (
    <main className="bg-[#020617] text-white">
      {/* Amenities Section */}
      <section ref={ref} className="min-h-screen py-12 px-6 sm:px-12 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl font-bold text-left mb-12">
            Amenities
          </h1>

          {/* Animate the grid only when in view */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 bg-gray-800 p-6 rounded-lg shadow-lg transform transition hover:scale-105"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
              >
                <motion.span
                  className="text-3xl sm:text-4xl"
                  whileHover={{ rotate: 10 }}
                >
                  {amenity.icon}
                </motion.span>
                <span className="text-lg font-medium">{amenity.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="py-12 px-6">
        <ImageCarousel />
      </section>
    </main>
  );
}