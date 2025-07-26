"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const pathToTitle = {
    "/dashboard": "Dashboard",
    "/dashboard/blog": "Blog",
    "/dashboard/perumahan": "Perumahan",
    "/dashboard/fasilitas": "Fasilitas",
  };

  const pageTitle = pathToTitle[pathname] || "Dashboard";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <header className="md:ml-64 bg-gray-800 shadow p-4 py-8 flex justify-between items-center sticky top-0 z-100 text-white">
      <h2 className="text-xl font-semibold">{pageTitle}</h2>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 py-1 rounded transition-colors duration-200"
        >
          Home
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-5 focus:outline-none"
          >
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
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50 p-2">
              {/* Hanya tampil di mobile (md ke bawah) */}
              <ul className="flex flex-col md:hidden">
                <Link href="/dashboard" className="px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/blog"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Blog
                </Link>
                <Link
                  href="/dashboard/perumahan"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Perumahan
                </Link>
                <Link
                  href="/dashboard/fasilitas"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Fasilitas
                </Link>
              </ul>

              {/* Logout untuk semua ukuran layar */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
