'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Blog', path: '/dashboard/blog' },
        { name: 'Perumahan', path: '/dashboard/perumahan' },
        { name: 'Fasilitas', path: '/dashboard/fasilitas' },
    ]

    return (
        <aside className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-5 hidden md:block">
            <h1 className="text-2xl font-bold mb-10">Admin Dashboard</h1>
            <nav>
                <ul className="space-y-4">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`hover:text-yellow-400 ${pathname === item.path ? 'text-yellow-400 font-semibold' : ''}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
