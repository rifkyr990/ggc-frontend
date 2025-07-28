"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    text: "Pelayanan sangat ramah dan proses transaksi berjalan lancar. Saya sangat puas dengan rumah yang saya dapatkan.",
    name: "Lara Madrigal",
    role: "Client",
    img: "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-14.jpg",
  },
  {
    text: "Tim sangat membantu dari awal hingga akhir. Semua pertanyaan saya dijawab dengan jelas dan profesional.",
    name: "Budi Santoso",
    role: "Client",
    img: "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-14.jpg",
  },
  {
    text: "Saya merekomendasikan GGC kepada siapa saja yang ingin mencari hunian nyaman dan strategis.",
    name: "Siti Rahmawati",
    role: "Client",
    img: "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-14.jpg",
  },
  {
    text: "Proses pembelian sangat mudah dan transparan. Terima kasih atas bantuannya!",
    name: "Andi Wijaya",
    role: "Client",
    img: "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-14.jpg",
  },
];

const CARD_COUNT = testimonials.length;
const DEGREE = 360 / CARD_COUNT;

const Testimoni = () => {
  const [active, setActive] = useState(0); // Mulai dari testimonial pertama (indeks 0)
  const [isAnimating, setIsAnimating] = useState(false);
  const [radius, setRadius] = useState(300);

  // Update radius berdasarkan lebar viewport supaya carousel responsif
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setRadius(150);
      } else if (window.innerWidth < 768) {
        setRadius(220);
      } else {
        setRadius(300);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLeftIndex = (active, total) => (active - 1 + total) % total;
  const getRightIndex = (active, total) => (active + 1) % total;

  const handleGoTo = (idx) => {
    if (idx === active || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setIsAnimating(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    handleGoTo(getLeftIndex(active, CARD_COUNT));
  };

  const handleNext = () => {
    if (isAnimating) return;
    handleGoTo(getRightIndex(active, CARD_COUNT));
  };

  return (
    <section className="w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-center bg-white gap-6 px-4 py-8">
      {/* Bagian kiri: Testimoni */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        {/* Judul */}
        <div className="mb-4 text-center z-10">
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-black mx-auto mb-4 rounded" />
          <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl m-0 text-gray-700">
            Testimoni Client
          </h1>
        </div>

        {/* Carousel 3D */}
        <div
          className="relative w-full flex items-center justify-center min-h-[280px] sm:min-h-[360px] md:min-h-[500px] z-10"
          style={{ perspective: radius * 4 }}
        >
          <div
            className="relative flex items-center justify-center w-[90vw] max-w-[340px] h-[280px] sm:h-[340px] md:h-[340px] mx-auto"
            style={{
              transform: `rotateY(${-active * DEGREE}deg)`,
              transition: "transform 0.6s cubic-bezier(.77,0,.18,1)",
              transformStyle: "preserve-3d",
            }}
          >
            {testimonials.map((item, idx) => {
              const rotateY = idx * DEGREE;
              const isActive = idx === active;
              const zClass = isActive ? "z-20" : "z-0";
              const pointerEvents = isActive ? "pointer-events-auto" : "pointer-events-none";

              return (
                <div
                  key={idx}
                  className={`absolute top-1/2 left-1/2 flex flex-col justify-between text-center min-h-[160px] sm:min-h-[220px] w-[90vw] max-w-[320px] px-3 transition-all duration-500 select-none
                    ${
                      isActive
                        ? "bg-white shadow-md border-t-4 border-b-4 border-t-[#ffa200] border-b-black cursor-default"
                        : "bg-white/60 border-t border-b border-gray-200"
                    } ${zClass} ${
                    isAnimating ? "pointer-events-none" : pointerEvents
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${rotateY}deg) translateZ(${radius}px)`,
                    transition:
                      "transform 0.6s cubic-bezier(.77,0,.18,1), box-shadow 0.3s",
                    filter: isActive ? "none" : "blur(1px)",
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  <p
                    className={`text-sm sm:text-base md:text-lg mt-6 sm:mt-10 mb-4 sm:mb-8 min-h-[60px] sm:min-h-[100px] transition-all duration-300 ${
                      isActive ? "font-bold text-black" : "font-normal text-gray-400"
                    }`}
                  >
                    {item.text}
                  </p>
                  <div
                    className={`flex items-center ${
                      isActive ? "justify-center" : "justify-start"
                    } ${
                      isActive
                        ? "bg-gray-800 rounded-3xl pb-2 sm:pb-4 text-white py-2 sm:py-4 w-full mb-2 sm:mb-4"
                        : ""
                    } gap-2 sm:gap-4`}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div
                        className={`font-bold ${
                          isActive ? "text-white" : "text-black"
                        } text-xs sm:text-sm md:text-base`}
                      >
                        {item.name}
                      </div>
                      <div
                        className={`text-[10px] sm:text-xs md:text-sm ${
                          isActive ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigasi panah dan indikator */}
        <div className="flex items-center gap-2 sm:gap-3 justify-center mt-6 sm:mt-10 z-10 flex-wrap">
          <button
            onClick={handlePrev}
            className="bg-white border border-gray-300 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shadow hover:bg-orange-100 disabled:opacity-50"
            aria-label="Sebelumnya"
            disabled={isAnimating}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleGoTo(idx)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                idx === active ? "bg-black" : "bg-gray-200"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
              disabled={isAnimating}
            />
          ))}
          <button
            onClick={handleNext}
            className="bg-white border border-gray-300 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shadow hover:bg-orange-100 disabled:opacity-50"
            aria-label="Berikutnya"
            disabled={isAnimating}
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Bagian kanan: foto */}
      <div className="hidden md:flex w-1/3 h-[300px] md:h-[600px] flex-shrink-0 items-end justify-end relative right-0 ml-4 md:ml-10">
        <div className="relative w-full h-full flex justify-end">
          <img
            src="/image/bg-hero/1.png"
            alt="Foto Testimoni"
            className="w-full h-full object-cover rounded-tl-4xl rounded-br-4xl relative z-10"
          />
          <div
            className="absolute inset-0 rounded-tl-4xl pointer-events-none z-20"
            style={{
              backgroundImage: "url('/image/noise.jpg')",
              opacity: 0.5,
              mixBlendMode: "multiply",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[98%] h-8 md:h-20 bg-black opacity-100 rounded-b-3xl blur-lg z-0" />
      </div>
    </section>
  );
};

export default Testimoni;
