"use client";

import React, { useEffect, useState, useRef } from "react";

const slides = [
    {
        image: "/image/bg-hero/1.png",
        title: "Beautiful\nhomes made\nfor you",
        desc: "Find your dream home with us. Experience comfort, style, and a place to call your own."
    },
    {
        image: "/image/bg-hero/2.png",
        title: "Cozy Living\nfor Families",
        desc: "Discover a safe and comfortable home for your beloved family, surrounded by green spaces and complete facilities."
    },
    {
        image: "/image/bg-hero/3.png",
        title: "Future-Proof\nProperty Investment",
        desc: "Own a high-value property as your future investment, in a strategic location with competitive prices."
    },
    {
        image: "/image/bg-hero/4.png",
        title: "Modern and\nElegant Design",
        desc: "Homes with modern, elegant, and functional designs, offering the best comfort and lifestyle for you."
    },
];

const HeroSection = () => {
    const [current, setCurrent] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false); // Tambahan
    const [disableTransition, setDisableTransition] = useState(false); // Tambahan
    const timeoutRef = useRef(null);
    const slidesLength = slides.length;

    // Untuk looping mulus, tambahkan slide duplikat di akhir
    const extendedSlides = [...slides, slides[0]];

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
        setIsTransitioning(true);
        setCurrent((prev) => prev + 1);
    };

    const handleDotClick = (idx) => {
        if (idx === current % slidesLength) return;
        setIsTransitioning(true);
        setCurrent(idx);
    };

    // Setelah transisi ke slide duplikat (index == slides.length), reset ke 0 tanpa animasi
    useEffect(() => {
        if (!isTransitioning) return;
        if (current === slidesLength) {
            // Setelah animasi selesai, reset ke 0 tanpa animasi
            const timer = setTimeout(() => {
                setDisableTransition(true); // Nonaktifkan transisi
                setCurrent(0);
                setTimeout(() => {
                    setDisableTransition(false); // Aktifkan lagi setelah satu tick
                }, 20); // 20ms cukup
                setIsTransitioning(false);
            }, 700); // 700ms = durasi animasi transition
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setIsTransitioning(false), 700);
            return () => clearTimeout(timer);
        }
    }, [current, isTransitioning, slidesLength]);

    if (!hasMounted) return null;

    return (
        <section className="relative w-full min-h-screen flex items-center justify-start bg-black overflow-hidden">
            {/* Slides: 1 foto 1 main content */}
            <div
                className={`absolute inset-0 w-full h-full flex ${disableTransition ? '' : 'transition-transform duration-700 ease-in-out'}`}
                style={{
                    transform: `translateX(-${current * 100}vw)`
                }}
                onTransitionEnd={() => {
                    // Untuk menghindari bug jika user klik dot saat transisi looping
                    if (current === slidesLength) {
                        setIsTransitioning(false);
                        setDisableTransition(true);
                        setCurrent(0);
                        setTimeout(() => {
                            setDisableTransition(false);
                        }, 20);
                    }
                }}
            >
                {extendedSlides.map((slide, idx) => (
                    <div
                        key={idx}
                        className="w-screen h-full flex-shrink-0 relative flex items-center"
                    >
                        {/* Background Image */}
                        <img
                            src={slide.image}
                            alt={slide.title.replace(/\n/g, ' ')}
                            className={`absolute inset-0 w-full h-full object-cover object-center min-h-screen z-0 transition-transform duration-3000 ease-in-out ${idx === (current % slidesLength) ? 'scale-115' : 'scale-100'}`}
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
                            ${(idx === (current % slidesLength))
                                ? "w-8 h-2 bg-[#FFAC12] border-2 border-[#FFAC12] shadow-lg scale-110 rounded"
                                : "w-5 h-1 bg-white/60 border border-gray-300 opacity-70 hover:opacity-100 hover:scale-105 rounded"}
                        `}
                        aria-label={`Pilih gambar ${idx + 1}`}
                        style={{ cursor: 'pointer', padding: 0, margin: 0, boxShadow: idx === (current % slidesLength) ? '0 0 8px 2px #fde04788' : 'none' }}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;