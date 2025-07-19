// components/Footer.tsx
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

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
            {/* Navigasi */}
            <div>
                    <h3 className="font-bold text-lg mb-3">Navigasi</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>
                            <Link href="#tentang" className="hover:text-orange-400 transition">Tentang kami</Link>
                        </li>
                        {/* Dropdown Proyek */}
                        <li className="group relative">
                            <span className="hover:text-orange-400 transition cursor-pointer flex items-center gap-1">
                                Proyek
                                <svg className="w-4 h-4 group-hover:rotate-180 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                            <ul className="absolute left-0 mt-2 w-40 bg-[#18120b] text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                                <li className="px-4 py-0 hover:bg-orange-400/10"><Link href="#proyek1">Proyek 1</Link></li>
                                <li className="px-4 py-0 hover:bg-orange-400/10"><Link href="#proyek2">Proyek 2</Link></li>
                            </ul>
                        </li>
                        {/* Dropdown Lokasi */}
                        <li className="group relative">
                            <span className="hover:text-orange-400 transition cursor-pointer flex items-center gap-1">
                                Lokasi
                                <svg className="w-4 h-4 group-hover:rotate-180 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                            <ul className="absolute left-0 mt-2 w-40 bg-[#18120b] text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                                <li className="px-4 py-0 hover:bg-orange-400/10"><Link href="#lokasi-jakarta">Jakarta</Link></li>
                                <li className="px-4 py-0 hover:bg-orange-400/10"><Link href="#lokasi-bandung">Bandung</Link></li>
                            </ul>
                        </li>
                        {/* Dropdown Info */}
                        <li className="group relative">
                            <span className="hover:text-orange-400 transition cursor-pointer flex items-center gap-1">
                                Info
                                <svg className="w-4 h-4 group-hover:rotate-180 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                            <ul className="absolute left-0 mt-2 w-40 bg-[#18120b] text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                                <li className="px-4 py-0 hover:bg-orange-400/10"><Link href="#info-blog">Blog</Link></li>
                                <li className="px-4 py-0 hover:bg-orange-400/10"><Link href="#info-news">News</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#contact" className="hover:text-orange-400 transition">Contact Us</Link>
                        </li>
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
