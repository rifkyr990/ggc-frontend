// components/Footer.tsx
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-black to-[#1a1a1a] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
            {/* CTA */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-semibold mb-6 md:mb-0">
                Make your dreams a <span className="text-orange-500 font-bold">reality</span>
            </h2>
            <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center gap-2">
                Contact with us
                <span className="ml-2">→</span>
            </button>
            </div>

            <hr className="border-gray-700 mb-10" />

            {/* Bottom Footer */}
            <div className="grid md:grid-cols-3 gap-8 text-sm">
            {/* Navigasi */}
            <div>
                <h3 className="font-bold mb-3">Navigasi</h3>
                <ul className="space-y-2 text-gray-400">
                <li><a href="#tentang">Tentang kami</a></li>
                <li><a href="#proyek">Proyek</a></li>
                <li><a href="#lokasi">Lokasi</a></li>
                <li><a href="#info">Info</a></li>
                </ul>
            </div>

            {/* Logo dan Sosial Media */}
            <div className="flex flex-col items-center justify-center">
                <div className="mb-4">
                <div>
                    <Image src="/image/logo.svg" alt="Logo" width={150} height={150} />
                </div>
                </div>
                <div className="flex space-x-4 text-xl text-white">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
                </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-end justify-center text-right text-gray-400">
                <p className="font-semibold text-white">
                © 2025 PT. Graha Gloria Cemerlang
                </p>
                <p>All rights reserved</p>
            </div>
            </div>
        </div>
        </footer>
    );
}
