'use client';
import React from "react";
import Link from "next/link";

const CallOut = () => {
    return (
        <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Background Parallax */}
            <div
                className="absolute inset-0 bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage: "url('image/heros_test2.webp')",
                }}
                aria-hidden="true"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-950/80" />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-xl md:text-4xl font-bold text-white mb-3">
                    Wujudkan Hunian Impian Bersama Graha Gloria Group
                </h1>
                <p className="text-sm md:text-base text-white max-w-2xl mb-6">
                    Graha Gloria Group berkomitmen menghadirkan hunian berkualitas dengan desain modern, lingkungan asri, dan nilai investasi tinggi. Temukan rumah yang nyaman, aman, dan sesuai kebutuhan keluarga Anda bersama kami. Percayakan masa depan hunian Anda pada pengembang terpercaya!
                </p>
                <div className="flip-card" style={{ perspective: '800px' }}>
                    <button href="/contact" className="flip-card-inner" tabIndex={0}>
                        <span className="flip-card-front">
                            Pelajari lebih lanjut
                            <span className="icon">→</span>
                        </span>
                        <span className="flip-card-back">
                            Siap konsultasi?
                            <span className="icon">💬</span>
                        </span>
                    </button>
                    <style jsx>{`
                        .flip-card {
                            display: inline-block;
                        }
                        .flip-card-inner {
                            position: relative;
                            width: 12rem;
                            height: 3rem;
                            background: transparent;
                            border: none;
                            outline: none;
                            cursor: pointer;
                            transform-style: preserve-3d;
                            transition: transform 0.6s cubic-bezier(0.4,0.2,0.2,1);
                            text-decoration: none;
                            display: block;
                        }
                        .flip-card:hover .flip-card-inner,
                        .flip-card:focus-within .flip-card-inner {
                            transform: rotateY(180deg);
                        }
                        .flip-card-front, .flip-card-back {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 0.75rem;
                            font-weight: 600;
                            font-size: 1rem;
                            gap: 0.375rem;
                            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                            backface-visibility: hidden;
                            transition: background 0.5s, color 0.5s;
                        }
                        .flip-card-front {
                            background: #FFAC12;
                            color: #111;
                            z-index: 2;
                        }
                        .flip-card-back {
                            background: #111;
                            color: #fff;
                            transform: rotateY(180deg);
                            z-index: 1;
                        }
                        .icon {
                            font-size: 1.1rem;
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
};

export default CallOut;
