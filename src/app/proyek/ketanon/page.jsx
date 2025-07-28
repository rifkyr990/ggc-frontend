"use client";
import React, { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const brochureImages = [
  "/image/proyek/ketanon/1.png",
  "/image/proyek/ketanon/2.png",
  "/image/proyek/ketanon/3.png",
  "/image/proyek/ketanon/4.png",
  "/image/proyek/ketanon/5.png",
  "/image/proyek/ketanon/6.png",
  "/image/proyek/ketanon/7.png",
  "/image/proyek/ketanon/8.png",
  "/image/proyek/ketanon/9.png",
  "/image/proyek/ketanon/10.png",
  "/image/proyek/ketanon/11.png",
  "/image/proyek/ketanon/12.png",
  "/image/proyek/ketanon/13.png",
  "/image/proyek/ketanon/14.png",
  "/image/proyek/ketanon/15.png",
];

export default function ProyekKetanonPage() {
  const [current, setCurrent] = useState(0);
  const total = brochureImages.length;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-gray-800 overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-10 relative w-full pt-24">
        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-gradient-radial from-white/20 via-transparent to-transparent rounded-full blur-2xl z-0" />
        {/* Cinema screen */}
        <div className="relative z-10 w-full max-w-full mx-auto bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-700 p-0 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-2 text-center drop-shadow-lg tracking-wide animate-pulse pt-8">
            Graha Indah Ketanon
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 text-center italic">
            "Hunian Modern di Lokasi Strategis Ketanon"
            <br />
            <span className="text-yellow-300 font-semibold">
              Segera Miliki Rumah Impian Anda di Ketanon!
            </span>
          </p>

          {/* Kelebihan Proyek */}
          <section className="w-full max-w-3xl mx-auto mb-10 px-4">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
              Kelebihan Graha Indah Ketanon
            </h2>
            <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">★</span> Lokasi
                premium di kawasan Ketanon, mudah diakses
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">★</span> Lingkungan
                nyaman, aman, dan asri
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">★</span> Harga
                kompetitif & banyak pilihan tipe rumah
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">★</span> Fasilitas
                lengkap (taman, area bermain, keamanan 24 jam)
              </li>
            </ul>
          </section>

          {/* Jenis-jenis Tipe Rumah */}
          <section className="w-full max-w-5xl mx-auto mb-12 px-4">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
              Pilihan Tipe Rumah
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Tipe 50 */}
              <div className="bg-gray-800 rounded-xl shadow-lg border-2 border-yellow-400 flex flex-col items-center p-4">
                <img
                  src="/image/proyek/ketanon/3.png"
                  alt="Tipe 50"
                  className="w-full h-40 object-cover rounded-lg mb-3 border border-yellow-300"
                />
                <h3 className="text-xl font-bold text-yellow-300 mb-1">Tipe 50</h3>
                <p className="text-gray-200 text-center text-sm">
                  Rumah nyaman, 2 kamar tidur, 1 kamar mandi, carport dan taman kecil.
                </p>
              </div>
              {/* Tipe 53 */}
              <div className="bg-gray-800 rounded-xl shadow-lg border-2 border-yellow-400 flex flex-col items-center p-4">
                <img
                  src="/image/proyek/ketanon/4.png"
                  alt="Tipe 53"
                  className="w-full h-40 object-cover rounded-lg mb-3 border border-yellow-300"
                />
                <h3 className="text-xl font-bold text-yellow-300 mb-1">Tipe 53</h3>
                <p className="text-gray-200 text-center text-sm">
                  Rumah lebih luas, 2-3 kamar tidur, 2 kamar mandi, carport & taman depan.
                </p>
              </div>
              {/* Tipe 60 */}
              <div className="bg-gray-800 rounded-xl shadow-lg border-2 border-yellow-400 flex flex-col items-center p-4">
                <img
                  src="/image/proyek/ketanon/5.png"
                  alt="Tipe 60"
                  className="w-full h-40 object-cover rounded-lg mb-3 border border-yellow-300"
                />
                <h3 className="text-xl font-bold text-yellow-300 mb-1">Tipe 60</h3>
                <p className="text-gray-200 text-center text-sm">
                  Rumah keluarga besar, ruang tamu luas, 3 kamar tidur, 2 kamar mandi, carport & taman lebih besar.
                </p>
              </div>
              {/* Custom */}
              <div className="bg-gray-800 rounded-xl shadow-lg border-2 border-yellow-400 flex flex-col items-center p-4">
                <img
                  src="/image/proyek/ketanon/1.png"
                  alt="Custom"
                  className="w-full h-40 object-cover rounded-lg mb-3 border border-yellow-300"
                />
                <h3 className="text-xl font-bold text-yellow-300 mb-1">Custom</h3>
                <p className="text-gray-200 text-center text-sm">
                  Desain rumah sesuai kebutuhan & keinginan Anda. Konsultasi gratis dengan tim kami!
                </p>
              </div>
            </div>
          </section>
          {/* Fullscreen Brosur Slide */}
          <div className="relative w-screen max-w-full h-[70vh] flex items-center justify-center overflow-hidden">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-yellow-400 rounded-full p-3 shadow-lg focus:outline-none"
              aria-label="Sebelumnya"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <img
              src={brochureImages[current]}
              alt={`Brosur ${current + 1}`}
              className="object-contain w-full h-full rounded-xl shadow-2xl border-4 border-yellow-400 bg-black transition-all duration-500"
              loading="lazy"
            />
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-yellow-400 rounded-full p-3 shadow-lg focus:outline-none"
              aria-label="Selanjutnya"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            {/* Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {brochureImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === current ? "bg-yellow-400" : "bg-gray-500"
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>
          <a
            href="https://wa.me/+6285645353662"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 mb-8 px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Hubungi Admin
          </a>
        </div>
        {/* Cinema floor effect */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-gray-900/80 to-transparent z-0" />
      </main>
      <Footer />
    </div>
  );
}
