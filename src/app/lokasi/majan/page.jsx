"use client";
import React from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function LokasiMajanPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-white to-yellow-100 py-16 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 max-w-4xl w-full border-4 border-yellow-400">
          <h1 className="text-5xl font-extrabold mb-2 text-yellow-500 drop-shadow-lg text-center tracking-wide">
            Graha Indah Majan
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
          <div className="mb-6 flex flex-col gap-2 items-center">
            <p className="text-lg font-semibold text-blue-900">
              <span className="inline-block mr-2 align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-yellow-500 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5V6.75A2.25 2.25 0 0012.75 4.5h-1.5A2.25 2.25 0 009 6.75v3.75m6 0V17.25A2.25 2.25 0 0112.75 19.5h-1.5A2.25 2.25 0 019 17.25V10.5m6 0H9"
                  />
                </svg>
              </span>
              Alamat: Jl. Raya Beji No.123, Majan, Kabupaten Tulungagung, Jawa
              Timur
            </p>
          </div>
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg border-2 border-yellow-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.123456789!2d111.123456789!3d-8.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e785123456789ab%3A0x123456789abcdef!2sGraha%20Indah%20Beji%201!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Graha Indah Majan di Google Maps"
            ></iframe>
          </div>
          <p className="text-center text-blue-900 text-lg font-medium">
            Detail halaman untuk lokasi:{" "}
            <span className="text-yellow-600 font-bold">Graha Indah Majan</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
