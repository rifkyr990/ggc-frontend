"use client";

import React, { useEffect, useState, useRef } from "react";

const slides = [
    {
        image: "/image/bg-hero/1.png",
        title: "Beautiful\nhomes made\nfor you",
        desc: "In oculis quidem se esse admonere interesse enim maxime placeat, facere possimus, omnis. Et quidem faciunt, ut labore et accurate disserendum et harum quidem exercitus quid."
    },
    {
        image: "/image/bg-hero/2.png",
        title: "Hunian Nyaman\nuntuk Keluarga",
        desc: "Temukan rumah impian yang nyaman dan aman untuk keluarga tercinta, dengan lingkungan yang asri dan fasilitas lengkap."
    },
    {
        image: "/image/bg-hero/3.png",
        title: "Investasi Properti\nMasa Depan",
        desc: "Miliki properti bernilai tinggi sebagai investasi masa depan Anda, dengan lokasi strategis dan harga bersaing."
    },
    {
        image: "/image/bg-hero/4.png",
        title: "Desain Modern\ndan Elegan",
        desc: "Rumah dengan desain modern, elegan, dan fungsional, memberikan kenyamanan dan gaya hidup terbaik untuk Anda."
    },
];

const HeroSection = () => {
    const [current, setCurrent] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        setHasMounted(true);
        startAutoSlide();
        return () => stopAutoSlide();
    }, [current]);

    const startAutoSlide = () => {
        stopAutoSlide();
        timeoutRef.current = setTimeout(() => {
            handleNextSlide();
        }, 8000);
    };

    const stopAutoSlide = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleNextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const handleDotClick = (idx) => {
        if (idx === current) return;
        setCurrent(idx);
    };

    if (!hasMounted) return null;

    return (
        <section className="relative w-full min-h-screen flex items-center justify-start bg-gray-900 overflow-hidden">
            {/* Slides: 1 foto 1 main content */}
            <div
                className="absolute inset-0 w-full h-full flex transition-transform duration-1500 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}vw)`
                }}
            >
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className="w-screen h-full flex-shrink-0 relative flex items-center"
                    >
                        {/* Background Image */}
                        <img
                            src={slide.image}
                            alt={slide.title.replace(/\n/g, ' ')}
                            className={`absolute inset-0 w-full h-full object-cover object-center min-h-screen z-0 transition-transform duration-3000 ease-in-out ${idx === current ? 'scale-115' : 'scale-100'}`}
                            draggable="false"
                        />
                        <div className="absolute inset-0 bg-gray-900/50 z-10 transition-all duration-700" />
                        {/* Main Content */}
                        <div className="relative z-20 ml-[12vw] max-w-[600px]" style={{ marginTop: 'calc(12rem + 60px)' }}>
                            <h1 className="text-gray-200 text-5xl font-bold leading-tight mb-8 whitespace-pre-line transition-all duration-700">
                                {slide.title}
                            </h1>
                            <p className="text-white text-base leading-relaxed mb-12 max-w-[520px] transition-all duration-700">
                                {slide.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* CTA Button */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-[30] w-[80vw] max-w-[1200px]">
                <div className="bg-white p-8 px-10 flex items-center">
                    <button className="bg-transparent border-none text-gray-900 font-bold text-xl cursor-pointer flex items-center gap-2 focus:outline-none">
                        See all listings
                        <span className="text-[#FFAC12] text-3xl ml-2 text-shadow-lg">→</span>
                    </button>
                </div>
            </div>
            {/* Dots Navigation */}
            <div className="absolute left-1/2 bottom-30 -translate-x-1/2 z-[40] flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => handleDotClick(idx)}
                        className={`transition-all duration-300 focus:outline-none
                            ${idx === current
                                ? "w-8 h-2 bg-[#FFAC12] border-2 border-[#FFAC12] shadow-lg scale-110 rounded"
                                : "w-5 h-1 bg-white/60 border border-gray-300 opacity-70 hover:opacity-100 hover:scale-105 rounded"}
                        `}
                        aria-label={`Pilih gambar ${idx + 1}`}
                        style={{ cursor: 'pointer', padding: 0, margin: 0, boxShadow: idx === current ? '0 0 8px 2px #fde04788' : 'none' }}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;