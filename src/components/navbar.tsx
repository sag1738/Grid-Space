"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const links = [
  { name: "Amenities", id: "amenities" },
  { name: "Family", id: "family" },
  { name: "Prices", id: "membership" },
  { name: "Contact us", id: "contact" },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Authentication");
    setIsLoggedIn(!!token);
  }, []);

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("Authentication");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      variant: "default",
    });
    router.push("/"); 
    window.location.reload(); 
  };

  // Handle click outside the logout modal
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowLogoutModal(false);
    }
  };

  // Add/remove event listener for clicking outside the modal
  useEffect(() => {
    if (showLogoutModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogoutModal]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 
        rounded-full shadow-lg flex items-center justify-between w-[60%] max-w-[800px] z-50 
        lg:px-14 transition-transform duration-300 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <button onClick={() => router.push("/")}>
            <Image
              src="/Logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-9"
            />
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => router.push(`/#${link.id}`)}
              className="text-black hover:text-gray-900 transition-colors duration-200 text-base font-medium"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Action Button (Login / Logout) */}
        {isLoggedIn ? (
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors duration-200 hidden md:block"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/auth")}
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors duration-200 hidden md:block"
          >
            Login
          </button>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-3 md:hidden">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  router.push(`/#${link.id}`);
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:text-black text-base font-medium"
              >
                {link.name}
              </button>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push("/auth");
                  setIsOpen(false);
                }}
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 w-80 text-center shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;