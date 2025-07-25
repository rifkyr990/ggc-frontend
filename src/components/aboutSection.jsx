"use client"
import React from "react";
import Image from "next/image";

const AboutSection = () => {
    return (
        <section className="w-screen min-h-screen flex flex-col md:flex-row items-center justify-center bg-white p-0 md:p-0 m-0 rounded-none relative">
            <div
                className="absolute left-0 bottom-0 w-full z-0"
                style={{
                    height: "30%",
                    backgroundColor: "#f5f5f7"
                }}
            />

            {/* Left Video */}
            <div className="w-full md:w-1/2 h-80 md:h-[600px] flex-shrink-0 flex items-center justify-center relative">
                <div className="relative w-full h-80 md:h-[600px]">
                
                    {/* Tampilkan thumbnail, lalu ganti dengan iframe saat diklik */}
                    {(() => {
                        const [showVideo, setShowVideo] = React.useState(false);
                        const [loading, setLoading] = React.useState(false);
                        const [iframeLoaded, setIframeLoaded] = React.useState(false);

                        // Handler ketika tombol play di klik
                        const handlePlayClick = () => {
                            setLoading(true);
                            setShowVideo(true);
                        };

                        // Jika showVideo true, render iframe dan loading spinner jika belum loaded
                        if (showVideo) {
                            return (
                                <div className="w-full h-full relative">
                                    {!iframeLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-60 rounded-tr-4xl">
                                            <div className="flex flex-col items-center">
                                                <svg className="animate-spin h-12 w-12 text-[#FFAC12] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                </svg>
                                                <span className="text-white font-semibold">Memuat video...</span>
                                            </div>
                                        </div>
                                    )}
                                    <iframe
                                        className="w-full h-full rounded-tr-4xl"
                                        src="https://screenpal.com/player/cTirDUnIhvQ?autoplay=1"
                                        title="Tentang GGG"
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                        style={{
                                            border: "none",
                                        }}
                                        onLoad={() => setIframeLoaded(true)}
                                    ></iframe>
                                </div>
                            );
                        }

                        // Jika belum play, tampilkan thumbnail
                        return (
                            <div
                                className="w-full h-full rounded-tr-4xl cursor-pointer relative group"
                                onClick={handlePlayClick}
                                style={{
                                    backgroundColor: "#000",
                                }}
                            >
                                <Image
                                    src="/image/bg-hero/1.png"
                                    alt="Thumbnail Video Tentang GGG"
                                    fill
                                    className="object-cover rounded-tr-4xl"
                                    style={{ zIndex: 1 }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="bg-white bg-opacity-80 rounded-full p-4 group-hover:scale-110 transition-transform">
                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                            <circle cx="24" cy="24" r="24" fill="#FFAC12" />
                                            <polygon points="20,16 34,24 20,32" fill="white" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[98%] h-12 md:h-20 bg-black opacity-60 rounded-b-3xl blur-lg z-0" />
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-1/2 lg:pr-16 ml-10">

                <div className="mb-4 h-1 w-30 bg-gradient-to-r from-[#FFAC12] to-black rounded-full" />
                <h2 className="text-3xl font-bold mb-4 text-gray-700">About GGG</h2>

                <p className="text-gray-600 mb-8">
                    GGG (Graha Gloria Grup) adalah perusahaan pengembang properti yang berfokus pada pembangunan hunian berkualitas tinggi dengan desain modern dan lingkungan yang asri. Kami berkomitmen memberikan solusi tempat tinggal terbaik bagi keluarga Indonesia melalui inovasi, integritas, dan pelayanan profesional. Bersama GGG, Anda dapat mewujudkan impian memiliki rumah yang nyaman, aman, dan bernilai investasi tinggi.
                </p>
                <div className="flex flex-wrap gap-4">
                <a
                    href="/about"
                    className="flex items-center px-8 py-4 bg-black text-white font-semibold rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg shadow hover:bg-gray-900 transition-all duration-200"
                >
                    Learn more
                    <span className="ml-2 text-[#FFAC12] text-xl">→</span>
                </a>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
