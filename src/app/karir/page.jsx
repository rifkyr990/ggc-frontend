"use client";
import React, { useEffect, useState } from "react";
import api from "../lib/api";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const BACKENDLESS_URL = process.env.NEXT_PUBLIC_BACKENDLESS_URL_KARIR;

export default function KarirPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/lowongan")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal mengambil data karir");
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-yellow-100 pb-16">
      {/* Hero Section */}
      <div
        className="w-full relative flex flex-col items-center justify-center h-[45vh] min-h-[320px] mb-12 shadow-2xl overflow-hidden"
        style={{
          backgroundImage: `url('/image/bg-hero/3.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-green-900/30 to-yellow-700/20 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight text-center">
            Karir di Graha Gloria Groub
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl text-center">
            Bergabunglah bersama kami membangun masa depan properti Indonesia.
            Temukan peluang karir terbaik di industri real estate modern,
            inovatif, dan penuh prestise.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        <h2 className="text-3xl font-bold text-[#BFA14A] mb-8 text-center drop-shadow-sm">
          Lowongan Tersedia
        </h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-16 h-16 border-4 border-[#BFA14A]/30 border-t-[#BFA14A] rounded-full animate-spin mb-6"></div>
            <div className="text-lg font-medium text-[#BFA14A] tracking-wide">
              Mengambil data lowongan...
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="bg-red-100 text-red-600 px-6 py-4 rounded-xl shadow-lg">
              {error}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {jobs.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                Belum ada lowongan tersedia.
              </div>
            )}
            {jobs.map((job, idx) => (
              <div
                key={job.id || idx}
                className="group block rounded-3xl overflow-hidden shadow-2xl border border-[#BFA14A]/30 bg-white/80 backdrop-blur-lg hover:scale-[1.03] hover:shadow-yellow-200 hover:border-yellow-400 transition-all duration-300 relative"
                style={{ minHeight: 340 }}
              >
                {/* Gambar/ilustrasi posisi */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={job.imageUrl || "/loker.png"}
                    alt={job.posisi}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-[#BFA14A] text-white text-xs font-semibold px-4 py-1 rounded-tr-3xl shadow-lg backdrop-blur-md border border-yellow-300">
                    {job.perusahaan || "Real Estate"}
                  </span>
                </div>
                <div className="p-7 flex flex-col gap-3">
                  <h3 className="text-2xl font-bold mb-1 text-green-900 group-hover:text-yellow-600 transition-colors duration-200 drop-shadow-sm">
                    {job.posisi}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    <span className="bg-[#BFA14A]/10 text-[#BFA14A] px-2 py-1 rounded-full">
                      {job.lokasi || "Lokasi fleksibel"}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {job.jenis || "Full Time"}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {job.gaji || "Gaji tidak disebutkan"}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Deadline:{" "}
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                  <p className="text-green-800 text-base mb-2 line-clamp-3">
                    {job.deskripsi?.slice(0, 120) ||
                      "Deskripsi tidak tersedia."}
                  </p>
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Kualifikasi:</strong> {job.kualifikasi || "-"}
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Perusahaan:</strong> {job.perusahaan || "-"}
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Dibuat pada:</strong>{" "}
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "-"}
                  </div>
                  <div className="mt-auto flex justify-end">
                    <a
                      href={`https://wa.me/6282142991064?text=Halo%20HRD%2C%20saya%20ingin%20melamar%20untuk%20posisi%20${encodeURIComponent(
                        job.posisi
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-2 rounded-full bg-[#BFA14A] text-white font-semibold shadow-lg hover:bg-[#BFA14A]/80 transition-all duration-200"
                    >
                      Lamar Sekarang
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
