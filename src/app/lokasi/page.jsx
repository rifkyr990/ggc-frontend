"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const locations = [
  { name: "Graha Indah Beji 1", path: "/lokasi/beji1" },
  { name: "Graha Indah Beji 2", path: "/lokasi/beji2" },
  { name: "Graha Indah Ketanon", path: "/lokasi/ketanon" },
  { name: "Graha Indah Majan", path: "/lokasi/majan" },
];

export default function LokasiPage() {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url(/image/bg-hero/1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradasi gold-green agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-white/30 to-yellow-200/70 z-0" />
        {/* Ornamental gold circle */}
        <div className="absolute -top-32 -left-32 w-60 md:w-96 h-60 md:h-96 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-30 rounded-full blur-3xl z-0" />
        {/* Ornamental green circle */}
        <div className="absolute -bottom-32 -right-32 w-60 md:w-96 h-60 md:h-96 bg-gradient-to-br from-green-400 to-green-700 opacity-30 rounded-full blur-3xl z-0" />
        <div className="flex flex-col items-center justify-center w-full z-10 px-2 sm:px-4">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8 bg-clip-text text-white bg-white drop-shadow-2xl tracking-wider font-serif text-center pt-20 border-b-4 border-yellow-400"
            style={{
              WebkitTextStroke: "1px gold", // warna border kuning tua
              textStroke: "1px gold", // fallback untuk browser lain
            }}
          >
            Pilih Lokasi
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-md sm:max-w-xl md:max-w-4xl z-10 place-items-center">
            {locations.map((loc) => (
              <Link
                key={loc.path}
                href={loc.path}
                className="block group w-full max-w-xs sm:max-w-sm md:max-w-md"
              >
                <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border-4 border-yellow-400 group-hover:border-green-500 group-hover:shadow-green-200 transition-all duration-300 cursor-pointer text-center relative overflow-hidden flex flex-col items-center justify-center">
                  {/* Gold shimmer effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-100 via-transparent to-green-100 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none z-0" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 group-hover:text-yellow-600 transition-colors duration-300 font-serif drop-shadow-sm z-10 relative">
                    {loc.name}
                  </span>
                  <div className="mt-3 sm:mt-4 flex justify-center">
                    <span className="inline-block w-12 sm:w-16 h-1 rounded-full bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
