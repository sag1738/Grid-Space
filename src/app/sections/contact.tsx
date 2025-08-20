'use client';

import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="bg-[#020617] text-white py-16 px-6 sm:px-12 lg:px-20">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-left mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in touch
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mx-auto w-full sm:w-[90%]">
          {/* Contact Form */}
          <motion.div 
            className="lg:w-[60%] w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form className="mt-6 space-y-4 w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="First Name" className="w-full sm:flex-1 bg-transparent border border-white p-3 rounded-md focus:outline-none" />
                <input type="text" placeholder="Last Name" className="w-full sm:flex-1 bg-transparent border border-white p-3 rounded-md focus:outline-none" />
              </div>
              <input type="text" placeholder="Company" className="w-full bg-transparent border border-white p-3 rounded-md focus:outline-none" />
              <input type="email" placeholder="Email" className="w-full bg-transparent border border-white p-3 rounded-md focus:outline-none" />
              <textarea placeholder="Write your request here..." className="w-full bg-transparent border border-white p-3 rounded-md focus:outline-none"></textarea>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="privacy" className="w-4 h-4 mt-1" />
                <label htmlFor="privacy" className="text-sm text-gray-400">I authorize the processing of my personal data in accordance with the Privacy policy</label>
              </div>
              <button className="w-full bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">Enquire Now</button>
            </form>
          </motion.div>

          {/* Contact Illustration */}
          <motion.div 
            className="justify-center hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image src="/Contact.png" width={700} height={400} alt="Contact Illustration" className="object-contain" />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-600 pt-8 w-full sm:w-[90%] mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <motion.div 
          className="flex flex-col items-center sm:items-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-bold text-gray-400 mb-4">GridSpace</h3>
          <div className="flex gap-4 text-2xl text-gray-400 mb-6">
            <FaInstagram />
            <FaFacebookF />
            <FaWhatsapp />
            <FaLinkedinIn />
          </div>
        </motion.div>
        <motion.div 
          className="mt-6 sm:mt-0 flex flex-col items-center sm:items-start text-gray-400"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className='text-2xl font-bold'>Contact</h3>
          <p className="mt-2 text-xl">+977 987654321</p>
          <p className="text-xl">+977 986756453</p>
          <p className="text-xl">info@gridspace.com</p>
        </motion.div>
      </footer>
    </section>
  );
}