'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { WobbleCard } from '@/components/ui/wobble-image'; 

const malls = [
  { name: 'CITY CENTER', image: '/city-center.png' },
  { name: 'CIVIL MALL', image: '/civil-mall.png' },
  { name: 'KATHMANDU MALL', image: '/kathmandu-mall.png' },
  { name: 'LABIM MALL', image: '/labim-mall.png' },
];

export default function Partner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-[#020617] text-white py-16 px-6 sm:px-12 lg:px-20">
      <div className="container mx-auto text-left">
        <h2 className="text-4xl sm:text-5xl font-bold">Grid Space’s Family</h2>
        <p className="text-lg text-gray-400 mt-2">..and homies that share our space</p>

        {/* Desktop Grid */}
        <motion.div
          ref={ref}
          className="hidden md:grid grid-cols-2 gap-6 mt-10 lg:px-32"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2, duration: 0.8 },
            },
          }}
        >
          {malls.map((mall, index) => (
            <motion.div
              key={index}
              className="border border-white/30 rounded-xl p-5 sm:p-6 shadow-lg flex flex-col items-center w-full mx-auto"
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            >
              <WobbleCard>
                <Image
                  src={mall.image}
                  width={280}
                  height={180}
                  alt={mall.name}
                  className="rounded-lg w-full object-cover"
                />
              </WobbleCard>
              <h3 className="text-lg font-semibold mt-3">{mall.name}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile/Tablet */}
        <div className="block md:hidden mt-10">
          <Swiper
            modules={[Pagination]}
            spaceBetween={8}  
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {malls.map((mall, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="border border-white/30 rounded-xl p-5 shadow-lg flex flex-col items-center w-full max-w-[80%] mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <WobbleCard>
                    <Image
                      src={mall.image}
                      width={300}
                      height={200}
                      alt={mall.name}
                      className="rounded-lg w-full object-cover"
                    />
                  </WobbleCard>
                  <h3 className="text-lg font-semibold mt-3">{mall.name}</h3>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}