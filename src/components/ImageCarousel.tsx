'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WobbleCard } from '@/components/ui/wobble-image';

const images: string[] = [
  '/OF-1.png',
  '/Of-2.png',
  '/Of-3.png',
  '/Of-4.png',
  '/Of-5.png',
  '/Of-6.png',
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Determine the number of visible images based on screen size
  const getVisibleImages = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 768) return 2; // Tablet
    }
    return 3; // Desktop
  };

  const [visibleImages, setVisibleImages] = useState(getVisibleImages());

  // Update visible images on window resize
  useEffect(() => {
    const handleResize = () => setVisibleImages(getVisibleImages());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < images.length - (visibleImages - 1) ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  // Ref for the carousel container
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <div ref={ref} className="relative w-full max-w-5xl mx-auto mb-8">
      {/* Image Wrapper */}
      <div className="flex gap-4 sm:gap-6 overflow-hidden justify-center px-4 sm:px-6">
        <AnimatePresence mode="popLayout">
          {images.slice(currentIndex, currentIndex + visibleImages).map((src, index) => (
            <motion.div
              key={src}
              className="w-full sm:w-[45%] md:w-[30%] flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.2 }}
            >
              {/* Wrap the Image with WobbleCard */}
              <WobbleCard>
                <Image
                  src={src}
                  width={400}
                  height={500}
                  className="w-full h-[400px] sm:h-[450px] rounded-[20px] object-cover shadow-lg"
                  alt={`Slide ${index}`}
                  priority
                  unoptimized
                />
              </WobbleCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-[-70px] right-[10%] translate-x-1/2 flex space-x-4">
        <button
          onClick={prevSlide}
          className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-white/20 text-white rounded-full shadow-lg transition hover:scale-110 disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-white/20 text-white rounded-full shadow-lg transition hover:scale-110 disabled:opacity-50"
          disabled={currentIndex >= images.length - visibleImages}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;