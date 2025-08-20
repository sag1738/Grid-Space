"use client";

import { motion } from "framer-motion";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Just a bunch of pals building things",
    description:
      "Looking for a home for your business? A space to host meetings or events? Friends to share ideas with? Or just somewhere quiet to escape the kids?",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <Image
          src="/coworking.png"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-lg"
          alt="Coworking space"
          priority
        />
      </div>
    ),
  },
  {
    title: "Why GridSpace?",
    description:
      "GridSpace is a private co-working and events space in the heart of Lisbon with rooftop views and an incredible community.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-white">
        <Image
          src="/GridSpace.png"
          width={300}
          height={300}
          className="max-w-full h-auto object-contain rounded-lg"
          alt="Coworking space"
          priority
        />
      </div>
    ),
  },
  {
    title: "Space That Works for You",
    description:
      "Over 150 square meters of modern workspaces, private offices, and meeting areas designed for productivity.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-white">
        <Image
          src="/GridSpace.png"
          width={300}
          height={300}
          className="max-w-full h-auto object-contain rounded-lg"
          alt="Coworking space"
          priority
        />
      </div>
    ),
  },
];

export default function Discover() {
  return (
    <main className="bg-[#020617]">
      {/* Hero Section */}
      <motion.section
        className="text-white flex flex-col items-center justify-center text-center py-24 px-4 sm:py-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl sm:text-7xl font-extrabold mt-2">
          A Place for <br /> Big IDEAS
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 border border-white text-white rounded-lg 
  hover:bg-white hover:text-black transition"
          onClick={() => {
            const section = document.getElementById("membership");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          DISCOVER OUR MEMBERSHIP
        </motion.button>
      </motion.section>

      {/* Sticky Scroll Section */}
      <section className="flex min-h-screen flex-col justify-center items-center px-4 sm:px-6">
        <StickyScroll content={content} />
      </section>
    </main>
  );
}
