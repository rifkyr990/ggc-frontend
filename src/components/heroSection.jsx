"use client"
import React, { useEffect, useState } from "react";

const images = [
    "/image/heros_test.png",
    "/image/heros_test2.webp",
    "/image/heros_test3.webp",
];

const HeroSection = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000); // Ganti gambar setiap 4 detik
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-start bg-cover bg-center transition-all duration-700"
            style={{
                backgroundImage: `url('${images[current]}')`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-[1] transition-all duration-700" />
            {/* Content */}
            <div className="relative z-[2] ml-[12vw] max-w-[600px]">
                <h1 className="text-white text-6xl font-bold leading-tight mb-8">
                    Beautiful<br />homes made<br />for you
                </h1>
                <p className="text-gray-200 text-lg leading-relaxed mb-12 max-w-[520px]">
                    In oculis quidem se esse admonere interesse enim maxime placeat, facere possimus, omnis. Et quidem faciunt, ut labore et accurate disserendum et harum quidem exercitus quid.
                </p>
            </div>
            {/* Button */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-[3] w-[80vw] max-w-[1200px]">
                <div className="bg-white rounded p-8 px-10 flex items-center shadow-lg">
                    <button
                        className="bg-transparent border-none text-gray-900 font-bold text-xl cursor-pointer flex items-center gap-2 focus:outline-none"
                    >
                        See all listings
                        <span className="text-yellow-400 text-3xl ml-2 text-shadow-lg">→</span>
                    </button>
                </div>
            </div>
            {/* Dots Indicator */}
            <div className="absolute left-1/2 bottom-30 -translate-x-1/2 z-[4] flex gap-2">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? "bg-yellow-400" : "bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
