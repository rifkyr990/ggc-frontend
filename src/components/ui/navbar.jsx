"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProyek, setOpenProyek] = useState(false);
  const [openLokasi, setOpenLokasi] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const prevScrollY = useRef(0);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLogin(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
    window.location.href = "/auth/login";
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY > prevScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        // Scroll ke atas
        setShowNavbar(true);
      }
      prevScrollY.current = currentScrollY;
    };
    // Tambahkan event mousemove
    const handleMouseMove = (e) => {
      if (e.clientY < 40) {
        setShowNavbar(true);
      } else if (window.scrollY > 50 && prevScrollY.current < window.scrollY) {
        setShowNavbar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navTextColor = scrolled ? "text-black" : "text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-white/90 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
        style={{ willChange: "transform" }}
      >
        <nav className="flex items-center justify-between px-6 lg:px-40 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src={scrolled ? "/image/logo3.png" : "/image/logo_putih.png"}
                alt="Logo"
                width={150}
                height={150}
                style={{ cursor: "pointer" }}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 relative">
            <ul
              className={`flex items-center gap-6 text-sm font-medium ${navTextColor}`}
            >
              <li>
                <Link href="/">Beranda</Link>
              </li>
              <li>
                <Link href="/about">Tentang Kami</Link>
              </li>

              {/* Dropdown - Proyek */}
              <li className="relative group cursor-pointer">
                <div className="flex items-center gap-1">
                  <span>Proyek</span>
                  <svg
                    className="w-4 h-4 transform group-hover:rotate-180 transition duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <ul className="absolute top-6 left-0 w-40 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="#proyek1">Proyek 1</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="#proyek2">Proyek 2</Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown - Lokasi */}
              <li className="relative group cursor-pointer">
                <div className="flex items-center gap-1">
                  <span>Lokasi</span>
                  <svg
                    className="w-4 h-4 transform group-hover:rotate-180 transition duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <ul className="absolute top-6 left-0 w-40 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="#lokasi-jakarta">Jakarta</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="#lokasi-bandung">Bandung</Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown - Info */}
              <li className="relative group cursor-pointer">
                <div className="flex items-center gap-1">
                  <span>Info</span>
                  <svg
                    className="w-4 h-4 transform group-hover:rotate-180 transition duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <ul className="absolute top-6 left-0 w-40 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/karir">karir</Link>
                  </li>

                  {isLogin ? (
                    <>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <Link href="/dashboard">Dashboard</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link href="/auth/login">Login</Link>
                    </li>
                  )}
                </ul>
              </li>

              <li>
                <div className="[perspective:800px] w-32 h-10">
                  <Link href="/contact" className="group block w-full h-full">
                    <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 flex items-center justify-center bg-[#FFAC12] text-black font-semibold rounded-md transition-colors duration-300 group-hover:bg-orange-500 [backface-visibility:hidden]">
                        Contact Us <span className="text-white ml-2">→</span>
                      </div>
                      {/* Back Side */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black text-white font-semibold rounded-md [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        For More
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Hamburger (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl focus:outline-none transition-all duration-300 ease-in-out"
            >
              <svg
                className={`${navTextColor}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={28}
                height={28}
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            className={`md:hidden overflow-hidden px-8 py-6 transition-all duration-300 ease-in-out ${
              menuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            } ${
              scrolled || menuOpen
                ? "bg-white shadow-md text-black"
                : "bg-transparent text-white"
            }`}
          >
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li>
                <Link href="#tentang" onClick={() => setMenuOpen(false)}>
                  Tentang Kami
                </Link>
              </li>

              {/* Proyek Dropdown */}
              <li className="w-full">
                <button
                  onClick={() => setOpenProyek(!openProyek)}
                  className="flex justify-between items-center w-full"
                >
                  <span>Proyek</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      openProyek ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openProyek && (
                  <ul className="mt-2 ml-4 text-right text-sm flex flex-col gap-2">
                    <li>
                      <Link href="#proyek1" onClick={() => setMenuOpen(false)}>
                        Proyek 1
                      </Link>
                    </li>
                    <li>
                      <Link href="#proyek2" onClick={() => setMenuOpen(false)}>
                        Proyek 2
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Lokasi Dropdown */}
              <li className="w-full">
                <button
                  onClick={() => setOpenLokasi(!openLokasi)}
                  className="flex justify-between items-center w-full"
                >
                  <span>Lokasi</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      openLokasi ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openLokasi && (
                  <ul className="mt-2 ml-4 text-right text-sm flex flex-col gap-2">
                    <li>
                      <Link
                        href="#lokasi-jakarta"
                        onClick={() => setMenuOpen(false)}
                      >
                        Jakarta
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#lokasi-bandung"
                        onClick={() => setMenuOpen(false)}
                      >
                        Bandung
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Info Dropdown */}
              <li className="w-full">
                <button
                  onClick={() => setOpenInfo(!openInfo)}
                  className="flex justify-between items-center w-full"
                >
                  <span>Info</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      openInfo ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openInfo && (
                  <ul className="mt-2 ml-4 text-right text-sm flex flex-col gap-2">
                    <li>
                      <Link href="/blog" onClick={() => setMenuOpen(false)}>
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#info-news"
                        onClick={() => setMenuOpen(false)}
                      >
                        News
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Contact Button */}
              <li>
                <div className="[perspective:800px] w-32 h-10">
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="group block w-full h-full"
                  >
                    <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 flex items-center justify-center bg-[#FFAC12] text-black font-semibold rounded-md transition-colors duration-300 group-hover:bg-orange-500 [backface-visibility:hidden]">
                        Contact Us <span className="text-white ml-2">→</span>
                      </div>
                      {/* Back Side */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black text-white font-semibold rounded-md [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        For More
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>
      {/* Hamburger fixed saat navbar hilang */}
      {!showNavbar &&
        !menuOpen &&
        ((() => {
          console.log("Render hamburger fixed!");
          return null;
        })() || (
          <button
            onClick={() => {
              setMenuOpen(true);
              setShowNavbar(true);
            }}
            className="fixed top-4 right-6 z-[100] bg-white shadow-lg border-2 border-black rounded-full p-2 transition-all duration-300" // md:hidden dihapus sementara
            aria-label="Open menu"
          >
            <svg
              className="text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={32}
              height={32}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        ))}
    </>
  );
}
