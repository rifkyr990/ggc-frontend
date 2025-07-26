"use client";
import React, { useEffect, useState } from "react";
import { Bed, Bath, Snowflake } from "lucide-react";
import api from "@/app/lib/api";
import Link from "next/link";

export default function FindPlace() {
  const [propertyData, setPropertyData] = useState({ data: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Filter states
  const [lookingFor, setLookingFor] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState("");

  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

  const fetchPerumahan = async ({
    lookingFor = "",
    lokasi = "",
    propertyType = "",
    price = "",
    page = 1,
  }) => {
    try {
      const res = await api.get("/perumahan", {
        params: {
          lookingFor,
          lokasi,
          propertyType,
          price,
          page,
          limit: ITEMS_PER_PAGE,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Gagal fetch data:", err);
      throw err;
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPerumahan({
      lookingFor,
      lokasi: location,
      propertyType,
      price,
      page: currentPage,
    })
      .then((res) => {
        setPropertyData({ data: res.data, totalPages: res.totalPages });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [lookingFor, location, propertyType, price, currentPage]);

  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  const { data: properties, totalPages } = propertyData;

  const filterOptionsArr = [
    {
      label: "Looking For",
      state: lookingFor,
      setter: setLookingFor,
      options: [...new Set(properties.map((p) => p.nama).filter(Boolean))],
    },
    {
      label: "Location",
      state: location,
      setter: setLocation,
      options: [...new Set(properties.map((p) => p.lokasi).filter(Boolean))],
    },
    {
      label: "Property Type",
      state: propertyType,
      setter: setPropertyType,
      options: [
        ...new Set(
          properties.map((p) => p.spesifikasi?.luasBangunan).filter(Boolean)
        ),
      ],
    },
    {
      label: "Price",
      state: price,
      setter: setPrice,
      options: [
        ...[
          ...new Set(properties.map((p) => p.hargaMulai).filter(Boolean)),
        ].sort((a, b) => a - b),
      ].map((harga) => `Rp ${harga.toLocaleString("id-ID")}`),
    },
  ];

  return (
    <div className="bg-[#f5f5f7] min-h-[140vh] flex flex-col items-center justify-start py-16 px-6 md:px-32">
      {/* Header */}
      <div className="mb-12 w-full max-w-7xl">
        <div className="mb-4 h-1 w-30 bg-gradient-to-r from-orange-500 to-black rounded-full" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
          Find your next place to live
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-16 w-full max-w-7xl">
        {filterOptionsArr.map(({ label, state, setter, options }, idx) => (
          <div key={idx} className="flex-1 flex flex-col">
            <label className="mb-2 text-xs font-light text-gray-700 tracking-wide">
              {label}
            </label>
            <select
              value={state}
              onChange={(e) => setter(e.target.value)}
              className="bg-white/40 backdrop-blur-md border border-[#BFA14A] text-gray-800 rounded-2xl shadow-lg p-4 focus:ring-2 focus:ring-[#BFA14A] focus:outline-none transition placeholder:text-gray-400 hover:shadow-xl hover:border-[#FFD700] appearance-none font-medium tracking-wide relative pr-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg fill='gold' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1.25rem center",
                backgroundSize: "1.2em",
              }}
            >
              <option value="">Pilih</option>
              {options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl min-h-[300px]">
        {loading ? (
          <div className="col-span-3 flex flex-col items-center justify-center min-h-[40vh] w-full">
            <div className="w-16 h-16 border-4 border-[#BFA14A]/30 border-t-[#BFA14A] rounded-full animate-spin mb-6"></div>
            <div className="text-lg font-medium text-[#BFA14A] tracking-wide">
              Mengambil data properti...
            </div>
          </div>
        ) : (
          properties.map((property, idx) => (
            <Link
              key={property.id || idx}
              href={`/property/${property.id}`}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[440px] max-w-xs mx-auto border border-[#BFA14A]/30 hover:scale-105 transition-transform duration-200"
              style={{ width: "320px", height: "500px" }}
            >
              <div className="h-60 w-full overflow-hidden">
                <img
                  src={property.thumbnail || "/image/heros_test.png"}
                  alt={property.nama}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-2">
                <div className="font-semibold text-lg text-gray-900 mb-1">
                  {property.nama}
                </div>
                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  <span className="bg-[#BFA14A]/10 text-[#BFA14A] px-2 py-1 rounded-full">
                    {property.lokasi}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    Rp {property.hargaMulai.toLocaleString("id-ID")}
                  </span>
                  {property.spesifikasi?.luasBangunan && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {property.spesifikasi.luasBangunan} m²
                    </span>
                  )}
                </div>
                <div className="flex justify-between text-gray-500 text-sm border-t pt-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Bed className="w-5 h-5 text-gray-700" />{" "}
                    {property.spesifikasi?.kamarTidur ?? 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-5 h-5 text-gray-700" />{" "}
                    {property.spesifikasi?.kamarMandi ?? 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <Snowflake className="w-5 h-5 text-gray-700" /> AC
                  </div>
                </div>

                {/* Optional: Tampilkan fasilitas */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {property.fasilitas.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      {f.fasilitas.iconUrl && (
                        <img
                          src={f.fasilitas.iconUrl}
                          alt={f.fasilitas.nama}
                          className="w-4 h-4"
                        />
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
        <div className="flex items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
