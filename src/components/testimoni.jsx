"use client"
import React, { useState } from "react";

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

const Testimoni = () => {
    const [active, setActive] = useState(1);
    const [direction, setDirection] = useState(0); // -1: kiri, 1: kanan
    const [isAnimating, setIsAnimating] = useState(false);

    const getVisibleTestimonials = () => {
        const prev = (active - 1 + testimonials.length) % testimonials.length;
        const next = (active + 1) % testimonials.length;
        return [testimonials[prev], testimonials[active], testimonials[next]];
    };

    const handleGoTo = (idx) => {
        if (idx === active || isAnimating) return;
        setDirection(idx > active ? 1 : -1);
        setIsAnimating(true);
        setTimeout(() => {
            setActive(idx);
            setIsAnimating(false);
        }, 400); // durasi animasi
    };

    const visible = getVisibleTestimonials();

    // Animasi slide wrapper
    let slideClass = '';
    if (isAnimating) {
        slideClass = direction === 1 ? '-translate-x-[33%] opacity-0' : 'translate-x-[33%] opacity-0';
    } else {
        slideClass = 'translate-x-0 opacity-100';
    }

    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-white">
            {/* Judul */}
            <div className="mb-4 text-center">
                <div className="h-1 w-20 bg-[#F9B233] mx-auto mb-4 rounded" />
                <h1 className="font-bold text-4xl md:text-5xl m-0">Testimoni Client</h1>
            </div>
            {/* Carousel */}
            <div className="overflow-hidden w-full max-w-5xl">
                <div
                    className={`flex justify-center items-start gap-10 mt-10 transition-all duration-500 ease-in-out ${slideClass}`}
                >
                    {visible.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex-1 rounded-lg flex flex-col justify-between text-center min-h-[220px] px-3 md:px-6 transition-all duration-300
                ${idx === 1 ?
                                'bg-white shadow-md border-t-4 border-b-4 border-t-[#F9B233] border-b-black' :
                                'bg-transparent'}
            `}
                        >
                            <p
                                className={`text-lg md:text-xl mt-10 mb-8 min-h-[100px] transition-all duration-300
                ${idx === 1 ? 'font-bold text-black' : 'font-normal text-gray-400'}
                `}
                            >
                                “{item.text}”
                            </p>
                            <div
                                className={`flex items-center ${idx === 1 ? 'justify-center' : 'justify-start'}
                ${idx === 1 ? 'bg-black text-white rounded px-8 py-4 w-[260px] mx-auto' : ''} gap-4`}
                            >
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="text-left">
                                    <div className={`font-bold ${idx === 1 ? 'text-white' : 'text-black'}`}>{item.name}</div>
                                    <div className={`text-sm ${idx === 1 ? 'text-white' : 'text-gray-500'}`}>{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Carousel Indicator */}
            <div className="flex gap-3 justify-center mt-10">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleGoTo(idx)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200
                        ${idx === active ? 'bg-black' : 'bg-gray-200'}
            `}
                        aria-label={`Go to testimonial ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimoni;
