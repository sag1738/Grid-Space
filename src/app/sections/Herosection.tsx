"use client";

import { Highlight } from "@/components/ui/hero-highlight";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-center min-h-screen px-6 space-y-8 z-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Animated Heading */}
      <div className="relative max-w-5xl mx-auto text-left">
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to
        </motion.h1>

        <motion.h1
          className="text-5xl sm:text-8xl font-extrabold text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          GridSpace
        </motion.h1>
      </div>

      {/* FlipWords Animation */}
      <div className="text-base sm:text-3xl font-medium text-right w-full max-w-3xl mx-auto">
        Where
        <span className="font-bold text-gray-900">
          <FlipWords words={["Knowledge Spark", "Innovation Grows", "Creativity Thrives"]} />
        </span>
      </div>

      {/* Highlight */}
      <div className="mt-6">
        <Highlight>
          <span className="px-4 py-3 rounded-lg inline-block text-base sm:text-2xl font-semibold">
            Dream • Create • Connect • Thrive
          </span>
        </Highlight>
      </div>
    </section>
  );
};

export default HeroSection;