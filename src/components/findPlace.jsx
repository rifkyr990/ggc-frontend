"use client"
import React, { useEffect, useState } from "react";
import { Bed, Bath, Snowflake } from "lucide-react";
import { fetchPerumahan } from "../backendlessApi";
import Link from "next/link";
import slugify from "slugify";

export default function FindPlace() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Tambah state untuk halaman
    const itemsPerPage = 6;
    // State filter
    const [lookingFor, setLookingFor] = useState("");
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchPerumahan({ lookingFor, location, propertyType, price })
            .then((data) => {
                setProperties(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [lookingFor, location, propertyType, price]);

    // Jangan return loading di sini, tapi tampilkan loading di grid properti
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    // Hitung paginasi
    const totalPages = Math.ceil(properties.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedProperties = properties.slice(startIdx, endIdx);

    return (
        <div className="bg-[#f5f5f7] min-h-[140vh] flex flex-col items-center justify-start py-16 px-6 md:px-32">
            {/* Header */}
            <div className="mb-12 w-full max-w-7xl">
                <div className="mb-4 h-1 w-30 bg-gradient-to-r from-orange-500 to-black rounded-full" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-700">Find your next place to live</h1>
            </div>
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-6 mb-16 w-full max-w-7xl">
                {/* Looking For */}
                <div className="flex-1 flex flex-col">
                    <label className="mb-2 text-xs font-light text-gray-700 tracking-wide flex items-center gap-2">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#BFA14A" strokeWidth="2"/><path d="M20 20L16.65 16.65" stroke="#BFA14A" strokeWidth="2" strokeLinecap="round"/></svg>
                        Looking For
                    </label>
                    <select
                        className="bg-white/40 backdrop-blur-md border border-[#BFA14A] text-gray-800 rounded-2xl shadow-lg p-4 focus:ring-2 focus:ring-[#BFA14A] focus:outline-none transition placeholder:text-gray-400 hover:shadow-xl hover:border-[#FFD700] appearance-none font-medium tracking-wide relative pr-10"
                        style={{backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'gold\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em'}}
                        value={lookingFor}
                        onChange={e => setLookingFor(e.target.value)}
                    >
                        <option value="" className="py-3 px-2 text-gray-400">Pilih</option>
                        <option value="Dijual" className="py-3 px-2">Dijual</option>
                        <option value="Disewa" className="py-3 px-2">Disewa</option>
                    </select>
                </div>
                {/* Location */}
                <div className="flex-1 flex flex-col">
                    <label className="mb-2 text-xs font-light text-gray-700 tracking-wide flex items-center gap-2">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 21s-6-5.686-6-10A6 6 0 0 1 18 11c0 4.314-6 10-6 10Z" stroke="#BFA14A" strokeWidth="2"/><circle cx="12" cy="11" r="2" stroke="#BFA14A" strokeWidth="2"/></svg>
                        Location
                    </label>
                    <select
                        className="bg-white/40 backdrop-blur-md border border-[#BFA14A] text-gray-800 rounded-2xl shadow-lg p-4 focus:ring-2 focus:ring-[#BFA14A] focus:outline-none transition placeholder:text-gray-400 hover:shadow-xl hover:border-[#FFD700] appearance-none font-medium tracking-wide relative pr-10"
                        style={{backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'gold\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em'}}
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    >
                        <option value="" className="py-3 px-2 text-gray-400">Pilih Lokasi</option>
                        {[...new Set(properties.map(p => p.location).filter(Boolean))].map((loc, i) => (
                            <option key={i} value={loc} className="py-3 px-2">{loc}</option>
                        ))}
                    </select>
                </div>
                {/* Property Type */}
                <div className="flex-1 flex flex-col">
                    <label className="mb-2 text-xs font-light text-gray-700 tracking-wide flex items-center gap-2">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="8" rx="2" stroke="#BFA14A" strokeWidth="2"/><path d="M7 10V6a5 5 0 0 1 10 0v4" stroke="#BFA14A" strokeWidth="2"/></svg>
                        Property Type
                    </label>
                    <select
                        className="bg-white/40 backdrop-blur-md border border-[#BFA14A] text-gray-800 rounded-2xl shadow-lg p-4 focus:ring-2 focus:ring-[#BFA14A] focus:outline-none transition placeholder:text-gray-400 hover:shadow-xl hover:border-[#FFD700] appearance-none font-medium tracking-wide relative pr-10"
                        style={{backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'gold\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em'}}
                        value={propertyType}
                        onChange={e => setPropertyType(e.target.value)}
                    >
                        <option value="" className="py-3 px-2 text-gray-400">Pilih</option>
                        <option value="Rumah" className="py-3 px-2">Rumah</option>
                        <option value="Apartemen" className="py-3 px-2">Apartemen</option>
                        <option value="Ruko" className="py-3 px-2">Ruko</option>
                    </select>
                </div>
                {/* Price */}
                <div className="flex-1 flex flex-col">
                    <label className="mb-2 text-xs font-light text-gray-700 tracking-wide flex items-center gap-2">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 3v18M6 7h12M6 17h12" stroke="#BFA14A" strokeWidth="2"/></svg>
                        Price
                    </label>
                    <select
                        className="bg-white/40 backdrop-blur-md border border-[#BFA14A] text-gray-800 rounded-2xl shadow-lg p-4 focus:ring-2 focus:ring-[#BFA14A] focus:outline-none transition placeholder:text-gray-400 hover:shadow-xl hover:border-[#FFD700] appearance-none font-medium tracking-wide relative pr-10"
                        style={{backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'gold\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em'}}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    >
                        <option value="" className="py-3 px-2 text-gray-400">Pilih</option>
                        <option value="<500jt" className="py-3 px-2"> &lt; 500jt</option>
                        <option value="500jt-1M" className="py-3 px-2">500jt - 1M</option>
                        <option value=">1M" className="py-3 px-2"> &gt; 1M</option>
                    </select>
                </div>
            </div>
            {/* Property Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl min-h-[300px]">
                {loading ? (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center justify-center min-h-[40vh] w-full">
                        <div className="w-16 h-16 border-4 border-[#BFA14A]/30 border-t-[#BFA14A] rounded-full animate-spin mb-6"></div>
                        <div className="text-lg font-medium text-[#BFA14A] tracking-wide">Mengambil data properti...</div>
                    </div>
                ) : (
                    paginatedProperties.map((property, idx) => (
                        <Link
                            key={property.objectId || idx}
                            href={`/property/${slugify(property.name, { lower: true })}`}
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[440px] max-w-xs mx-auto border border-[#BFA14A]/30 hover:scale-105 transition-transform duration-200"
                            style={{ textDecoration: "none" }}
                        >
                            <div className="h-60 w-full overflow-hidden">
                                <img
                                    src={property.img?.replace('/public', '') || property.img_url || "/image/heros_test.png"}
                                    alt={property.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between gap-2">
                                <div className="font-semibold text-lg text-gray-900 mb-1">{property.name}</div>
                                <div className="flex flex-wrap gap-2 text-xs mb-2">
                                    <span className="bg-[#BFA14A]/10 text-[#BFA14A] px-2 py-1 rounded-full">{property.lookingFor}</span>
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{property.location}</span>
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{property.propertyType}</span>
                                    <span className="bg-[#BFA14A]/10 text-[#BFA14A] px-2 py-1 rounded-full">{property.price}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm border-t pt-2 mt-2">
                                    <div className="flex items-center gap-1">
                                        <Bed className="w-5 h-5 text-gray-700" /> {property.beds}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bath className="w-5 h-5 text-gray-700" /> {property.baths}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Snowflake className="w-5 h-5 text-gray-700" /> {property.ac}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center gap-2 mt-10">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
