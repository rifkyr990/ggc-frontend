import { useEffect, useState } from "react";
import { Bed, Bath, Snowflake } from "lucide-react";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import api from "@/app/lib/api";

const SimilarListing = () => {
  const [propertyData, setPropertyData] = useState({ data: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Ambil properti random (tanpa filter)
  const fetchRandom = async () => {
    try {
      const res = await api.get("/perumahan", {
        params: { page: 1 },
      });
      let data = res.data.data || res.data;
      // Acak array dan ambil 4
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      setPropertyData({ data: data.slice(0, 4), totalPages: 1 });
      setLoading(false);
    } catch (err) {
      setError("Gagal fetch data properti serupa.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchRandom();
  }, []);

  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  const { data: properties } = propertyData;

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
      <div className="flex items-center mb-10">
        <span className="border-l-8 border-orange-500 h-12 mr-6 rounded-xl"></span>
        <span className="font-extrabold text-4xl text-gray-900 tracking-wider drop-shadow-lg">
          Similar Listings
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 w-full max-w-5xl min-h-[300px]">
        {loading ? (
          <div className="col-span-4 flex flex-col items-center justify-center min-h-[40vh] w-full">
            <div className="w-16 h-16 border-4 border-orange-300/30 border-t-orange-500 rounded-full animate-spin mb-6"></div>
            <div className="text-lg font-medium text-orange-600 tracking-wide">
              Mengambil data properti serupa...
            </div>
          </div>
        ) : (
          properties.map((property, idx) => (
            <div
              key={property.id || idx}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[440px] max-h-[440px] min-w-[300px] max-w-[300px] mx-auto border border-orange-300/30 hover:scale-105 transition-transform duration-200 cursor-pointer gap-7"
              onClick={() => router.push(`/property/${property.id}`)}
            >
              <div className="h-[180px] w-[300px] overflow-hidden flex-shrink-0 mx-auto">
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
                  <span className="bg-orange-300/10 text-orange-500 px-2 py-1 rounded-full">
                    {property.lokasi}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    Rp {property.hargaMulai?.toLocaleString("id-ID")}
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
                  {property.fasilitas?.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      {f.fasilitas?.iconUrl && (
                        <img
                          src={f.fasilitas.iconUrl}
                          alt={f.fasilitas.nama}
                          className="w-4 h-4"
                        />
                      )}
                      {f.fasilitas?.nama}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SimilarListing;
