import React from "react";
import Image from "next/image";

const AboutSection = () => {
    return (
        <section className="flex flex-col lg:flex-row items-center justify-between py-30 bg-white">
            {/* Left Image */}
            <div className="w-full md:w-1/2 h-80 md:h-[600px] flex-shrink-0 flex items-center justify-center relative">
                <div className="relative w-full h-80 md:h-[600px]">
                    <img
                        src="/image/about.png"
                        alt="About GGC"
                        className="w-full h-80 md:h-[600px] object-cover rounded-tr-4xl relative z-1"
                    />
                </div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-1/2 lg:pr-16 ml-10">
                <div className="mb-4 h-1 w-30 bg-gradient-to-r from-orange-500 to-black rounded-full" />
                <h2 className="text-3xl font-bold mb-4 text-black">About GGC</h2>
                <p className="text-gray-600 mb-8">
                    Torquatos nostros? quos dolores eos, qui dolorem ipsum per se texit,
                    ne ferae quidem se repellere, idque instituit docere sic: omne
                    animal, simul atque integre iudicante itaque aiunt hanc quasi
                    involuta aperiri, altera occulta quaedam et voluptatem accusantium
                    doloremque.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button
                        className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800">
                        Learn more <span className="text-orange-400">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
