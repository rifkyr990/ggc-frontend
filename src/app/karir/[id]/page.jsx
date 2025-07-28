"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../lib/api";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function KarirDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/lowongan/${id}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal mengambil detail karir");
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-black pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-30">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
              <div className="w-16 h-16 border-4 border-[#BFA14A]/30 border-t-[#BFA14A] rounded-full animate-spin mb-6"></div>
              <div className="text-lg font-medium text-[#BFA14A] tracking-wide">
                Mengambil detail lowongan...
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
              <div className="bg-red-100 text-red-600 px-6 py-4 rounded-xl shadow-lg">
                {error}
              </div>
            </div>
          ) : !job ? (
            <div className="text-center text-gray-500">
              Lowongan tidak ditemukan.
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-[#BFA14A]/30 p-12 md:p-16">
              <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
                <img
                  src={job.imageUrl || "/loker.png"}
                  alt={job.posisi}
                  className="w-[340px] h-[340px] object-cover object-center rounded-3xl shadow-2xl border-4 border-yellow-400 bg-white/30"
                />
                <div className="flex-1">
                  <h1 className="text-4xl font-extrabold text-yellow-300 mb-4 drop-shadow-lg">
                    {job.posisi}
                  </h1>
                  <div className="flex flex-wrap gap-3 text-base mb-4">
                    <span className="bg-yellow-900/80 text-yellow-200 px-4 py-2 rounded-full font-semibold">
                      {job.lokasi || "Lokasi fleksibel"}
                    </span>
                    <span className="bg-gray-800/80 text-gray-100 px-4 py-2 rounded-full font-semibold">
                      {job.jenis || "Full Time"}
                    </span>
                    <span className="bg-green-900/80 text-green-200 px-4 py-2 rounded-full font-semibold">
                      {job.gaji || "Gaji tidak disebutkan"}
                    </span>
                    <span className="bg-yellow-700/80 text-yellow-100 px-4 py-2 rounded-full font-semibold">
                      Deadline:{" "}
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                  <div className="text-lg text-yellow-100 mb-2">
                    <strong>Perusahaan:</strong> {job.perusahaan || "-"}
                  </div>
                  <div className="text-lg text-yellow-100 mb-2">
                    <strong>Dibuat pada:</strong>{" "}
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-yellow-300 mb-3">
                  Deskripsi Pekerjaan
                </h2>
                <p className="text-yellow-100 text-lg whitespace-pre-line">
                  {job.deskripsi || "Deskripsi tidak tersedia."}
                </p>
              </div>
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-yellow-300 mb-3">
                  Kualifikasi
                </h2>
                <p className="text-yellow-100 text-lg whitespace-pre-line">
                  {job.kualifikasi || "-"}
                </p>
              </div>
              <div className="flex justify-end">
                <a
                  href={`https://wa.me/+6285645353662?text=Halo%20HRD%2C%20saya%20ingin%20melamar%20untuk%20posisi%20${encodeURIComponent(
                    job.posisi
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-full bg-yellow-400 text-green-900 font-extrabold text-lg shadow-xl hover:bg-yellow-300 transition-all duration-200"
                >
                  Lamar Sekarang
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
