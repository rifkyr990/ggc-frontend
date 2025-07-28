// components/Footer.tsx
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-[#1a1a1a] text-white px-6 py-12 z-200 bottom-0 w-full">
      <div className="max-w-7xl mx-auto">
        {/* CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-semibold mb-6 md:mb-0">
            Make your dreams a{" "}
            <span className="text-[#FFAC12] font-bold">reality</span>
          </h2>
          <Link href="/contact" className="bg-[#FFAC12] hover:bg-white text-black font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center gap-2">
            Contact with us
            <span className="ml-2">→</span>
          </Link>
        </div>

        <hr className="border-gray-700 mb-10" />

        {/* Bottom Footer */}
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          {/* Navigasi */}
          <div>
            <h3 className="font-bold text-lg mb-3">Navigasi</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-400 transition"
                >
                  Tentang kami
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-400 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/proyek"
                  className="hover:text-orange-400 transition"
                >
                  Proyek
                </Link>
              </li>
              <li>
                <Link
                  href="/lokasi"
                  className="hover:text-orange-400 transition"
                >
                  Lokasi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition">
                  Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo dan Sosial Media */}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
              <div>
                <Image
                  src="/image/logo.png"
                  alt="Logo"
                  width={150}
                  height={150}
                />
              </div>
            </div>
            <div className="flex space-x-4 text-xl text-white pt-4">
              <a href="https://instagram.com/grahagloria.group" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-lg">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100087394959439&locale=id_ID" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-lg">
                <FaFacebook />
              </a>
              <a href="https://www.tiktok.com/@graha.gloria" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-lg">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-end justify-center text-right text-gray-400">
            <p className="font-semibold text-white">
              2025 PT. Graha Gloria Group
            </p>
            <p>All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
