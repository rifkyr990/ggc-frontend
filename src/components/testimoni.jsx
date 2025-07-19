"use client"
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
    {
        text: "Pelayanan sangat ramah dan proses transaksi berjalan lancar. Saya sangat puas dengan rumah yang saya dapatkan.",
        name: "Lara Madrigal",
        role: "Client",
        img: "/image/heros_test.png",
    },
    {
        text: "Tim sangat membantu dari awal hingga akhir. Semua pertanyaan saya dijawab dengan jelas dan profesional.",
        name: "Budi Santoso",
        role: "Client",
        img: "/image/heros_test2.webp",
    },
    {
        text: "Saya merekomendasikan GGC kepada siapa saja yang ingin mencari hunian nyaman dan strategis.",
        name: "Siti Rahmawati",
        role: "Client",
        img: "/image/heros_test3.webp",
    },
    {
        text: "Proses pembelian sangat mudah dan transparan. Terima kasih atas bantuannya!",
        name: "Andi Wijaya",
        role: "Client",
        img: "/image/heros_test2.webp",
    },
];

const CARD_COUNT = testimonials.length;
const DEGREE = 360 / CARD_COUNT;
const RADIUS = 300; // px, jarak translateZ (atur sesuai kebutuhan)

// Fungsi bantu circular
const getLeftIndex = (active, total) => (active - 1 + total) % total;
const getRightIndex = (active, total) => (active + 1) % total;

const Testimoni = () => {
    const [active, setActive] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleGoTo = (idx) => {
        if (idx === active || isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActive(idx);
            setIsAnimating(false);
        }, 600); // durasi animasi
    };

    // Handler untuk panah kiri/kanan
    const handlePrev = () => {
        if (isAnimating) return;
        handleGoTo(getLeftIndex(active, CARD_COUNT));
    };
    const handleNext = () => {
        if (isAnimating) return;
        handleGoTo(getRightIndex(active, CARD_COUNT));
    };

    return (
        <section className="w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center bg-white gap-0 md:gap-8 px-0 ">
            {/* Kiri: Testimoni */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                {/* Judul */}
                <div className="mb-4 text-center z-10">
                    <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-black mx-auto mb-4 rounded" />
                    <h1 className="font-bold text-4xl md:text-5xl m-0 text-gray-700">Testimoni Client</h1>
                </div>
                {/* Carousel 3D Cylinder + Panah */}
                <div className="relative w-full flex items-center justify-center min-h-[500px] z-10" style={{ perspective: 1200 }}>
                    {/* Carousel */}
                    <div
                        className="relative flex items-center justify-center w-[340px] h-[340px] mx-auto"
                        style={{
                            transform: `rotateY(${-active * DEGREE}deg)`,
                            transition: 'transform 0.6s cubic-bezier(.77,0,.18,1)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {testimonials.map((item, idx) => {
                            const rotateY = idx * DEGREE;
                            const isActive = idx === active;
                            // pointer-events: auto hanya untuk card aktif, none untuk lainnya
                            let zClass = isActive ? 'z-20' : 'z-0';
                            let pointerEvents = isActive ? 'pointer-events-auto' : 'pointer-events-none';
                            return (
                                <div
                                    key={idx}
                                    className={`absolute top-1/2 left-1/2 flex flex-col justify-between text-center min-h-[220px] w-[320px] max-w-[90vw] px-3 md:px-6 transition-all duration-500 select-none
                                        ${isActive ?
                                            'bg-white shadow-md border-t-4 border-b-4 border-t-[#ffa200] border-b-black cursor-default' :
                                            'bg-white/60 border-t border-b border-gray-200'}
                                        ${zClass} ${isAnimating ? 'pointer-events-none' : pointerEvents}
                                    `}
                                    style={{
                                        transform: `translate(-50%, -50%) rotateY(${rotateY}deg) translateZ(${RADIUS}px)`,
                                        transition: 'transform 0.6s cubic-bezier(.77,0,.18,1), box-shadow 0.3s',
                                        filter: isActive ? 'none' : 'blur(1px)',
                                        opacity: isActive ? 1 : 0.7,
                                    }}
                                >
                                    <p
                                        className={`text-lg md:text-xl mt-10 mb-8 min-h-[100px] transition-all duration-300
                                            ${isActive ? 'font-bold text-black' : 'font-normal text-gray-400'}
                                        `}
                                    >
                                        “{item.text}”
                                    </p>
                                    <div
                                        className={`flex items-center ${isActive ? 'justify-center' : 'justify-start'}
                                            ${isActive ? 'bg-black text-white py-4 w-full ' : ''} gap-4`}
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="text-left">
                                            <div className={`font-bold ${isActive ? 'text-white' : 'text-black'}`}>{item.name}</div>
                                            <div className={`text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>{item.role}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Carousel Indicator + Panah */}
                <div className="flex items-center gap-3 justify-center mt-10 z-10">
                    <button
                        onClick={handlePrev}
                        className="bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-orange-100 disabled:opacity-50"
                        aria-label="Sebelumnya"
                        disabled={isAnimating}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleGoTo(idx)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200
                                ${idx === active ? 'bg-black' : 'bg-gray-200'}
                            `}
                            aria-label={`Go to testimonial ${idx + 1}`}
                            disabled={isAnimating}
                        />
                    ))}
                    <button
                        onClick={handleNext}
                        className="bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-orange-100 disabled:opacity-50"
                        aria-label="Berikutnya"
                        disabled={isAnimating}
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            {/* Kanan: Foto dengan style seperti aboutSection */}
            <div className="w-full md:w-1/2 h-80 md:h-[600px] flex-shrink-0 flex items-center justify-center relative mb-8 md:mb-0">
                <div className="relative w-full h-80 md:h-[600px]">
                    <img
                        src="/image/heros_test2.webp"
                        alt="Foto Testimoni"
                        className="w-full h-80 md:h-[600px] object-cover rounded-tl-4xl relative z-1"
                    />
                    {/* Overlay tekstur noise */}
                    <div
                        className="absolute inset-0 rounded-tl-4xl pointer-events-none z-2"
                        style={{
                            backgroundImage: "url('/image/noise.jpg')",
                            opacity: 0.5,
                            mixBlendMode: "multiply",
                        }}
                    />
                </div>
                {/* Shadow tebal di bawah foto */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[98%] h-12 md:h-20 bg-black opacity-100 rounded-b-3xl blur-lg z-0" />
            </div>
        </section>
    );
};

export default Testimoni;
