"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, BedDouble, Bath, BadgeCheck, ListChecks } from "lucide-react";
import api from "@/app/lib/api"; // pastikan path ini sesuai dengan strukturmu
import SimilarListing from "@/components/SimilarListing";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const PropertyDetailPage = () => {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/perumahan/${params.id}`);
        const data = res.data;

        const mapped = {
          name: data.nama,
          location: data.lokasi,
          price: data.hargaMulai,
          img: data.thumbnail,
          images: data.gambarLainnya || [],
          description: data.deskripsi,
          spesifikasi: data.spesifikasi || {},
          fasilitas:
            data.fasilitas?.map((f) => ({
              nama: f.fasilitas.nama,
              icon: f.fasilitas.iconUrl,
            })) || [],
        };

        setProperty(mapped);
        setMainImage(mapped.img);
      } catch (err) {
        console.error("Error:", err);
        setError("Gagal mengambil data properti.");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchProperty();
  }, [params?.id]);

  if (loading) return <p className="p-4">Memuat data...</p>;
  if (error || !property)
    return (
      <p className="p-4 text-red-500">
        Properti tidak ditemukan atau terjadi error.
      </p>
    );

  return (
    <>
    <Navbar/>
    <div
      className="min-h-screen w-full relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${property.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "none",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60 backdrop-blur-[6px] z-0" />
      <div
        className="relative z-10 max-w-7xl w-full mx-auto px-4 py-10 mt-24 rounded-tr-3xl shadow-2xl border border-yellow-200 bg-white/30 backdrop-blur-[8px] bg-clip-padding"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
      >
        <h1 className="text-6xl font-extrabold mb-2 text-white drop-shadow-lg text-center">
          {property.name}
        </h1>
        {/* Main Image as floating card */}
        <div
          className="relative w-full h-[500px] mb-4 rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-300 bg-white/40 backdrop-blur-[4px] flex items-center justify-center"
          style={{ boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.17)" }}
        >
          <img
            src={mainImage || property.img}
            alt={property.name}
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500 rounded-2xl"
            style={{ mixBlendMode: "multiply" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/60 via-transparent to-transparent" />
        </div>
        {/* Thumbnail Gallery */}
        {property.images.length > 0 && (
          <div className="flex gap-3 mb-8 justify-center flex-wrap">
            {[property.img, ...property.images].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`border-2 rounded-lg overflow-hidden w-28 h-20 flex items-center justify-center transition-all duration-200 ${
                  mainImage === img
                    ? "border-yellow-500 scale-105"
                    : "border-gray-200"
                }`}
                style={{ background: "#fff" }}
                aria-label={`Gambar ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Gambar ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}

        <p className="text-2xl font-bold text-yellow-700 mb-6 bg-yellow-50/80 px-4 py-2 rounded-xl inline-block shadow backdrop-blur-[2px]">
          Harga mulai:{" "}
          <span className="text-green-700">
            Rp{property.price.toLocaleString()}
          </span>
        </p>

        <div className="mb-6 bg-white/60 rounded-xl p-6 shadow border-l-8 border-yellow-400 backdrop-blur-[2px]">
          <h2 className="font-bold text-xl flex items-center gap-2 text-green-800 mb-2">
            <ListChecks className="text-yellow-600" /> Deskripsi
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        <div className="mb-6 bg-white/60 rounded-xl p-6 shadow border-l-8 border-green-400 backdrop-blur-[2px]">
          <h2 className="font-bold text-xl flex items-center gap-2 text-yellow-700 mb-2">
            <ListChecks className="text-green-600" /> Spesifikasi
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
            <li>
              Luas Tanah:{" "}
              <span className="text-yellow-700 font-semibold">
                {property.spesifikasi.luasTanah || "-"} m²
              </span>
            </li>
            <li>
              Luas Bangunan:{" "}
              <span className="text-yellow-700 font-semibold">
                {property.spesifikasi.luasBangunan || "-"} m²
              </span>
            </li>
            <li>
              Kamar Tidur:{" "}
              <span className="text-green-700 font-semibold">
                {property.spesifikasi.kamarTidur || "-"}
              </span>
            </li>
            <li>
              Kamar Mandi:{" "}
              <span className="text-green-700 font-semibold">
                {property.spesifikasi.kamarMandi || "-"}
              </span>
            </li>
            <li>
              Garasi:{" "}
              <span className="text-yellow-700 font-semibold">
                {property.spesifikasi.garasi ? "Tidak Ada" : "ada"}
              </span>
            </li>
            <li>
              Listrik:{" "}
              <span className="text-green-700 font-semibold">
                {property.spesifikasi.listrik || "-"}
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-4 bg-gradient-to-r from-yellow-50/80 via-green-50/80 to-yellow-100/80 rounded-xl p-6 shadow border-l-8 border-yellow-300 backdrop-blur-[2px]">
          <h2 className="font-bold text-xl flex items-center gap-2 text-green-800 mb-2">
            <ListChecks className="text-yellow-600" /> Fasilitas
          </h2>
          {property.fasilitas.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 pl-2 mt-2">
              {property.fasilitas.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 bg-white/70 rounded-lg px-3 py-2 shadow-sm border border-yellow-100 backdrop-blur-[1px]"
                >
                  <img
                    src={f.icon}
                    alt={f.nama}
                    className="w-6 h-6 drop-shadow-md"
                  />
                  <span className="text-green-900 font-medium">{f.nama}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Tidak ada fasilitas tersedia.</p>
          )}
        </div>
        <div className="mb-6 bg-white/60 rounded-xl p-6 shadow border-l-8 border-green-400 backdrop-blur-[2px]">
          <h2 className="font-bold text-xl flex items-center gap-2 text-green-800 mb-2">
            <ListChecks className="text-yellow-600" /> Lokasi
          </h2>
          <iframe
            src={property.location}
            className="w-full h-[400px] rounded-md border-2 border-gray-300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="relative z-10 max-w-[1500px] w-full mx-auto px-4 mt-16 mb-10">
        <SimilarListing excludeId={params.id} />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PropertyDetailPage;
