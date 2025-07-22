'use client'
import React, { useState, useRef, useEffect } from 'react'
import Header from '../header'
import Sidebar from '../sidebar'
import { Edit } from 'lucide-react'

const Page = () => {
    return (
        <section>
            <Header />
            <Sidebar />
            <main className="md:ml-64 p-6">
                <section className='bg-white p-4 rounded-lg shadow mb-8'>
                    <h2 className="text-xl font-semibold mb-4">Fasilitas</h2>
                    <form action="" className='flex flex-col gap-4'>
                        <div className="flex-1">
                            <label htmlFor="fasilitas" className="mb-2">Fasilitas:</label>
                            <input type="text" id="fasilitas" className="my-2 w-full border border-gray-300 p-2 rounded" />

                        </div>
                        <div className="flex-1">
                            <label htmlFor="icon" className="mb-2">URL Icon:</label>
                            <input type="text" id="icon" className=" my-2 w-full border border-gray-300 p-2 rounded" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Submit</button>
                        </div>
                    </form>
                </section>
            </main>
        </section>
    )
}

export default Page;