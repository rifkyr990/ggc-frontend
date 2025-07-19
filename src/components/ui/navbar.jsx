'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

const navTextColor = scrolled ? 'text-black' : 'text-white'

    return (
    <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}
    >
    <nav className="flex items-center justify-between px-6 lg:px-40 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <Image
            src="/image/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
            <ul className={`flex items-center gap-6 text-sm font-medium ${navTextColor}`}>
                <li><Link href="#tentang">Tentang Kami</Link></li>
                <li><Link href="#proyek">Proyek</Link></li>
                <li><Link href="#lokasi">Lokasi</Link></li>
                <li><Link href="#info">Info</Link></li>
                <li>
                <Link
                    href="#contact"
                    className="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-5 py-2 rounded-md flex items-center gap-2 transition"
                >
                    Contact Us <span className="text-white">→</span>
                </Link>
                </li>
            </ul>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-2xl focus:outline-none"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
                </svg>
            </button>
        </div>
    </nav>

      {/* Mobile Menu */}
    {menuOpen && (
        <div className={`md:hidden px-6 pb-6 transition-all duration-300 ${scrolled ? 'bg-white shadow-md text-black' : 'bg-transparent'}`}>
            <ul className="flex flex-col gap-4 text-sm font-medium justify-center items-end">
                <li><Link href="#tentang" onClick={() => setMenuOpen(false)}>Tentang Kami</Link></li>
                <li><Link href="#proyek" onClick={() => setMenuOpen(false)}>Proyek</Link></li>
                <li><Link href="#lokasi" onClick={() => setMenuOpen(false)}>Lokasi</Link></li>
                <li><Link href="#info" onClick={() => setMenuOpen(false)}>Info</Link></li>
                <li>
                    <Link
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-4 py-2 rounded-md flex items-center gap-2 transition w-fit"
                    >
                    Contact Us <span className="text-white">→</span>
                    </Link>
                </li>
          </ul>
        </div>
      )}
    </header>
  )
}
