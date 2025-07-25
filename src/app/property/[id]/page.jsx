'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, BedDouble, Bath, BadgeCheck, ListChecks } from 'lucide-react';
import api from '@/app/lib/api'; // pastikan path ini sesuai dengan strukturmu

const PropertyDetailPage = () => {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          fasilitas: data.fasilitas?.map(f => ({
            nama: f.fasilitas.nama,
            icon: f.fasilitas.iconUrl,
          })) || []
        };

        setProperty(mapped);
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
  if (error || !property) return <p className="p-4 text-red-500">Properti tidak ditemukan atau terjadi error.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
      <div className="text-gray-600 flex items-center gap-2 mb-4">
        <MapPin size={18} /> {property.location}
      </div>

      <img src={property.img} alt={property.name} className="w-full h-64 object-cover rounded mb-6" />

      <p className="text-xl font-semibold text-purple-600 mb-4">
        Harga mulai: Rp{property.price.toLocaleString()}
      </p>

      <div className="mb-4">
        <h2 className="font-bold text-lg flex items-center gap-2"><ListChecks /> Deskripsi</h2>
        <p className="text-gray-700 mt-2">{property.description}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-lg flex items-center gap-2"><ListChecks /> Spesifikasi</h2>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>Luas Tanah: {property.spesifikasi.luasTanah || '-'} m²</li>
          <li>Luas Bangunan: {property.spesifikasi.luasBangunan || '-'} m²</li>
          <li>Kamar Tidur: {property.spesifikasi.kamarTidur || '-'}</li>
          <li>Kamar Mandi: {property.spesifikasi.kamarMandi || '-'}</li>
          <li>Garasi: {property.spesifikasi.garasi ? 'Ada' : 'Tidak ada'}</li>
          <li>Listrik: {property.spesifikasi.listrik || '-'}</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-lg flex items-center gap-2"><ListChecks /> Fasilitas</h2>
        {property.fasilitas.length > 0 ? (
          <ul className="grid grid-cols-2 gap-2 pl-2 mt-2">
            {property.fasilitas.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <img src={f.icon} alt={f.nama} className="w-5 h-5" />
                <span>{f.nama}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Tidak ada fasilitas tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailPage;
