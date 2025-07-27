"use client";
import React, { useEffect, useState } from "react";
import { Bed, Bath, Snowflake } from "lucide-react";
import api from "@/app/lib/api"; // pastikan api.get('/perumahan/filter')
import Link from "next/link";

export default function FindPlace() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [type, setType] = useState("");
  const [hargaMin, setHargaMin] = useState("");
  const [hargaMax, setHargaMax] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Opsi filter
  const filterOptionsArr = [
    { label: "Nama", state: nama, setter: setNama, options: ["Graha Indah Majan", "Graha Indah Beji 1", "Graha Indah Beji 2", "Graha Indah Ketanon"] },
    { label: "Type", state: type, setter: setType, options: ["Cluster", "Townhouse", "Type 50"] },
    { label: "Harga Min", state: hargaMin, setter: setHargaMin, options: [] },
    { label: "Harga Max", state: hargaMax, setter: setHargaMax, options: [] },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (nama) params.append("nama", nama);
      if (type) params.append("type", type);
      if (hargaMin) params.append("hargaMin", hargaMin);
      if (hargaMax) params.append("hargaMax", hargaMax);
      params.append("page", currentPage);

      const res = await api.get(`/perumahan/filter?${params.toString()}`);
      const { data, totalPages: tp } = res.data;
      setProperties(data);
      setTotalPages(tp || 1);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [nama, type, hargaMin, hargaMax, currentPage]);

  return (
    <div className="bg-[#f5f5f7] min-h-screen flex flex-col items-center py-8 px-6 sm:px-12 md:px-40 lg:px-56">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-black mx-auto mb-4 rounded" />
        <h1 className="font-bold text-4xl md:text-5xl m-0 text-gray-700 mb-5">Find Your Dream Home</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Choose location, house type, and price to start finding the best place to live.
        </p>
      </div>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-8 w-full max-w-4xl justify-center">
        {filterOptionsArr.map(({ label, state, setter, options }, idx) => (
          <div key={idx} className="flex flex-col flex-1 min-w-[140px] max-w-[240px]">
            <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
            {options.length ? (
              <select
                value={state}
                onChange={(e) => setter(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih {label.toLowerCase()}</option>
                {options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                type={label.toLowerCase().includes("harga") ? "number" : "text"}
                value={state}
                onChange={(e) => setter(e.target.value)}
                placeholder={`Masukkan ${label.toLowerCase()}`}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            )}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-7xl">
        {loading ? (
          <div className="col-span-full flex flex-col items-center py-20">
            <svg
              className="animate-spin h-12 w-12 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-gray-600 text-lg">Mengambil data properti...</p>
          </div>
        ) : properties.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg py-20">
            Tidak ada properti ditemukan.
          </p>
        ) : (
          properties.map((p) => (
            <Link
              key={p.id}
              href={`/property/${p.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300"
            >
              <img
                src={p.thumbnail || "/image/heros_test.png"}
                alt={p.nama}
                className="object-cover w-full h-48"
                loading="lazy"
              />
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-semibold text-xl text-gray-800 truncate">{p.nama}</h2>
                <div className="text-sm text-gray-600 mb-2">
                  Rp {p.hargaMulai.toLocaleString("id-ID")}
                  {p.spesifikasi?.luasBangunan && ` · ${p.spesifikasi.luasBangunan} m²`}
                </div>
                <div className="flex items-center gap-6 text-gray-500 text-sm mt-auto">
                  <div className="flex items-center gap-1">
                    <Bed className="w-5 h-5" />
                    <span>{p.spesifikasi?.kamarTidur || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-5 h-5" />
                    <span>{p.spesifikasi?.kamarMandi || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Snowflake className="w-5 h-5" />
                    <span>AC</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-600">
                  {p.fasilitas.map((f) => (
                    <div key={f.fasilitasId} className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                      {f.fasilitas.iconUrl && (
                        <img src={f.fasilitas.iconUrl} alt={f.fasilitas.nama} className="w-4 h-4" />
                      )}
                      {f.fasilitas.nama}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === i + 1
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              } transition`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
