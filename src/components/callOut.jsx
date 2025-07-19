import React from "react";

const CallOut = () => {
    return (
        <section
            className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden"
        >
            {/* Background Parallax */}
            <div
                className="absolute inset-0 bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage: "url('image/heros_test2.webp')",
                }}
                aria-hidden="true"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-950" style={{ opacity: 0.5 }} />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    You’re in good hands
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10">
                    Torquatos nostros? quos dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se repellere, idque instituit docere sic: omne animal, simul atque integre iudicante itaque aiunt hanc quasi involuta aperiri, altera occulta quaedam et voluptatem accusantium doloremque.
                </p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-12 rounded-xl text-lg flex items-center gap-3 transition">
                    Learn more
                    <span className="text-xl">→</span>
                </button>
            </div>
        </section>
    );
};

export default CallOut;
