'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const pathname = usePathname()

    const pathToTitle = {
        '/dashboard': 'Dashboard',
        '/dashboard/blog': 'Blog',
        '/dashboard/perumahan': 'Perumahan',
        '/dashboard/fasilitas': 'Fasilitas',
    }

    const pageTitle = pathToTitle[pathname] || 'Dashboard'

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        alert('Logged out!')
    }

  return (
    <header className="md:ml-64 bg-gray-800 shadow p-4 py-8 flex justify-between items-center sticky top-0 z-10 text-white">
        <h2 className="text-xl font-semibold">{pageTitle}</h2>
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-5 focus:outline-none">
                <Image
                    src="/image/profile.svg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            <span className="hidden md:block hover:text-yellow-400">Admin</span>
            </button>

            {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                Logout
                </button>
            </div>
            )}
        </div>
    </header>
  )
}

export default Header
