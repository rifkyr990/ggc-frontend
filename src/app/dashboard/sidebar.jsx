"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Blog", path: "/dashboard/blog" },
    { name: "Perumahan", path: "/dashboard/perumahan" },
    { name: "Fasilitas", path: "/dashboard/fasilitas" },
  ];

  return (
    <aside className="w-64 h-[100vh] fixed top-0 left-0 md:block z-101 flex items-center justify-center bg-transparent">
      <div className="bg-gray-900 shadow-2xl border p-6 w-full h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-10 text-gray-100">
          Admin Dashboard
        </h1>
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`hover:text-yellow-400 ${
                    pathname === item.path
                      ? "text-yellow-400 font-semibold"
                      : "text-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
