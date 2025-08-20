"use client";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaDesktop,
  FaExchangeAlt,
  FaUsers,
  FaTicketAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import bookingService from "@/app/services/bookingService";
import subscriptionService from "@/app/services/subscriptionService";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    title: "Private Office",
    icon: <FaBuilding />,
    price: "Rs.10,000/month",
    description:
      "A home for your business or a space to jam with your team? Our spacious private offices have room for 5!",
  },
  {
    title: "Fixed Desk",
    icon: <FaDesktop />,
    price: "Rs.6,000/month",
    description:
      "Bring your screens and get tucked in. This desk is yours and only yours (unless of course you want to share)!",
  },
  {
    title: "Flex Desk",
    icon: <FaExchangeAlt />,
    price: "Rs.5,500/month",
    description:
      "Need a desk from time to time? Or a central spot to host meetings? We got ya!",
  },
];

const visits = [
  {
    title: "Meeting Room",
    icon: <FaUsers />,
    price: "Rs.1,500/day",
    description:
      "In town for a couple of days to meet with your remote team? Book our meeting room for up to 8 max!",
  },
  {
    title: "Day Pass",
    icon: <FaTicketAlt />,
    price: "Rs.500/day",
    description:
      "Just you? Rs.500/day gets you a desk and access to all our amenities. Come hang out!",
  },
  {
    title: "Week Pass",
    icon: <FaCalendarAlt />,
    price: "Rs.1,000/week",
    description:
      "Trying out Lisbon? Rs.1,000 gets you access from Monday through Sunday at any hour.",
  },
];

const Membership = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookingItem, setBookingItem] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { toast } = useToast(); // Initialize the useToast hook

  useEffect(() => {
    const token = localStorage.getItem("Authentication");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleBooking = (item: any) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to book.",
        variant: "destructive",
      });
      return;
    }
    setBookingItem(item);
    setModalOpen(true);
  };

  const confirmBooking = async () => {
    console.log("Booking confirmed for:", bookingItem?.title);
    const bookingDate = new Date(startDate);
    bookingDate.setHours(9, 0, 0, 0);
    console.log("Start Date:", bookingDate);
    const checkoutDate = new Date(endDate);
    checkoutDate.setHours(16, 0, 0, 0);
    console.log("End Date:", checkoutDate);

    const obj = {
      fromDate: bookingDate,
      toDate: checkoutDate,
    };

    try {
      const response = await bookingService.booking(obj);
      if (response.status === 200) {
        toast({
          title: "Booking Successful",
          description: `You have successfully booked ${bookingItem?.title}.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Booking Failed",
          description: "An error occurred while booking. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setModalOpen(false);
  };

  const handleSubscription = (item: any) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe.",
        variant: "destructive",
      });
      return;
    }
    setSelectedItem(item);
    setSubscriptionModal(true);
  };

  const confirmSubscription = async () => {
    console.log("Subscription confirmed for:", selectedItem?.title);

    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    const obj = {
      fromDate: today,
      toDate: nextMonth,
    };

    try {
      const response = await subscriptionService.subscription(obj);

      if (response.status === 200) {
        toast({
          title: "Subscription Successful",
          description: `You have successfully subscribed to ${selectedItem?.title}.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "An error occurred while subscribing. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setSubscriptionModal(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubscriptionModal(false);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white px-6 py-10 flex flex-col items-center lg:px-20">
      <div className="w-full">
        <h2 className="text-4xl sm:text-5xl font-bold text-left mb-6">
          Memberships
        </h2>
        <motion.div
          className="w-full md:w-[90%] mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <HoverEffect
            items={plans}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            onItemClick={handleSubscription}
          />
        </motion.div>
      </div>
      <div className="w-full mt-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-left mb-6">
          Just Visiting?
        </h2>
        <motion.div
          className="w-full md:w-[90%] mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HoverEffect
            items={visits}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            onItemClick={handleBooking}
          />
        </motion.div>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
            <p>
              You are booking: <strong>{bookingItem?.title}</strong>
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full p-2 rounded bg-gray-200 text-black"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 rounded bg-gray-200 text-black"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                onClick={confirmBooking}
              >
                Confirm Booking
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600 transition"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {subscriptionModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Confirm Subscription</h2>
            <p>
              You are subscribing to: <strong>{selectedItem?.title}</strong>
            </p>
            <p className="mt-2">
              Price: <strong>{selectedItem?.price}</strong>
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                onClick={confirmSubscription}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600 transition"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
