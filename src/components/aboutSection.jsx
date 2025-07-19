import React from "react";

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
            {/* Gambar Kiri */}
            <div className="w-full md:w-1/2 h-80 md:h-[600px] flex-shrink-0 flex items-center justify-center relative">
                <div className="relative w-full h-80 md:h-[600px]">
                    <img
                        src="/image/heros_test.png"
                        alt="About GGC"
                        className="w-full h-80 md:h-[600px] object-cover rounded-tr-4xl relative z-1"
                    />
                    {/* Overlay tekstur noise */}
                    <div
                        className="absolute inset-0 rounded-tr-4xl pointer-events-none z-2"
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
            {/* Konten Kanan */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 md:py-0">
                {/* Garis dan Judul */}
                <div className="mb-4">
                    <div className="w-20 h-1 bg-yellow-400 mb-2 rounded-full" />
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">About GGC</h2>
                </div>
                {/* Deskripsi */}
                <p className="text-gray-600 mb-8 text-lg md:text-xl">
                    Torquatos nostros? quos dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se repellere, idque instituit docere sic: omne animal, simul atque integre iudicante itaque aiunt hanc quasi involuta aperiri, altera occulta quaedam et voluptatem accusantium doloremque.
                </p>
                {/* Tombol */}
                <div className="flex gap-4">
                    <button className="flex items-center px-8 py-4 bg-black text-white font-semibold rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg shadow hover:bg-gray-900 transition-all duration-200">
                        Learn more
                        <span className="ml-2 text-yellow-400 text-xl">→</span>
                    </button>
                    <button className="flex items-center px-8 py-4 border-2 border-black font-semibold bg-white rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg hover:bg-gray-100 transition-all duration-200">
                        Brosur
                        <span className="ml-2 text-yellow-400 text-xl">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
