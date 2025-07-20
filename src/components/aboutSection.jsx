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
            {/* Left Image */}
            <div className="w-full md:w-1/2 h-80 md:h-[600px] flex-shrink-0 flex items-center justify-center relative">
                <div className="relative w-full h-80 md:h-[600px]">
                    <video
                        src="/video/about.mp4"
                        className="w-full h-80 md:h-[600px] object-cover rounded-tr-4xl relative z-1"
                        autoPlay
                        loop
                        muted
                        controls
                    />
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
                <button className="flex items-center px-8 py-4 bg-black text-white font-semibold rounded-tl-2xl  rounded-br-2xl rounded-tr-lg rounded-bl-lg shadow hover:bg-gray-900 transition-all duration-200">
                        Learn more
                        <span className="ml-2 text-[#FFAC12] text-xl">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
