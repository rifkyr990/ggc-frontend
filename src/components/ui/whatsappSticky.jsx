import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

const WhatsappSticky = () => {
  return (
    <div>
      <a
        href="https://wa.me/6285645353662?text=Halo%20Graha%20Gloria%2C%20saya%20ingin%20konsultasi%20properti"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 flex items-end group"
        aria-label="WhatsApp"
      >
        {/* Bubble Dialog */}
        <span className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-in-out mb-5 mr-2 select-none flex items-center">
          <span className="relative">
            <span className="px-4 py-2 bg-white text-green-700 rounded-2xl shadow-lg font-semibold text-base whitespace-nowrap border border-green-200">
              Hubungi Kami
            </span>
            {/* Bubble Arrow */}
            <span className="absolute -bottom-2 left-6 w-4 h-4 overflow-hidden">
              <span className="block w-4 h-4 bg-white border-l border-b border-green-200 rotate-45 transform origin-top-left"></span>
            </span>
          </span>
        </span>
        <span className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all group">
          <FaWhatsapp className="w-7 h-7 drop-shadow-lg group-hover:scale-110 transition-transform" />
        </span>
        <span className="sr-only">Chat WhatsApp</span>
      </a>
    </div>
  )
}

export default WhatsappSticky
