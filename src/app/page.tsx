"use client";
import HeroSection from "@/app/sections/Herosection";
import Navbar from "@/components/navbar";
import Discover from "./sections/discover";
import AmenitiesPage from "./sections/AmenitiesPage";
import Partner from "./sections/Partners";
import Contact from "./sections/contact";
import Membership from "./sections/membership";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Discover />
      <div id="amenities">
        <AmenitiesPage />
      </div>
      <div id="family">
        <Partner />
      </div>
      <div id="membership">
        <Membership />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}