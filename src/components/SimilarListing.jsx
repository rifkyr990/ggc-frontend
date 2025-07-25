import { useEffect, useState } from "react";
import { fetchSimilarPerumahan } from "@/backendlessApi";
import { BedDouble, Bath, Snowflake, Home, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import slugify from "slugify";

const SimilarListing = ({ location, excludeSlug }) => {
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const sim = await fetchSimilarPerumahan({ location, excludeSlug, limit: 4 });
                setSimilar(sim);
            } catch (err) {
                setSimilar([]);
            }
            setLoading(false);
        };
        if (location && excludeSlug) {
            fetchData();
        }
    }, [location, excludeSlug]);

    return (
        <div className="max-w-7xl mx-auto mt-20 px-4">
            <div className="flex items-center mb-10">
                <span className="border-l-8 border-orange-500 h-12 mr-6 rounded-xl"></span>
                <span className="font-extrabold text-4xl text-gray-900 tracking-wider drop-shadow-lg">Similar Listings</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {loading ? (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center justify-center min-h-[40vh] w-full">
                        <div className="w-16 h-16 border-4 border-orange-300/30 border-t-orange-500 rounded-full animate-spin mb-6"></div>
                        <div className="text-lg font-medium text-orange-600 tracking-wide">Mengambil data properti serupa...</div>
                    </div>
                ) : similar.length === 0 ? (
                    <div className="col-span-4 text-gray-500">Tidak ada properti serupa.</div>
                ) : similar.map((sim, idx) => (
                    <div
                        key={idx}
                        className="bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/30 transform hover:scale-105 transition-transform duration-300 flex flex-col cursor-pointer"
                        onClick={() => router.push(`/property/${slugify(sim.name, { lower: true })}`)}
                    >
                        <img src={sim.img?.replace('/public', '') || sim.img_url || sim.images?.[0] || "/image/bg-hero/1.png"} alt={sim.name} className="w-full h-48 object-cover" />
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="font-semibold text-xl text-gray-900 mb-1">{sim.name}</div>
                                <div className="text-sm text-blue-700 mb-2 flex items-center gap-2"><MapPin size={16} />{sim.location || '-'} <span className="mx-1">|</span> <Home size={16} />{sim.propertyType || '-'}</div>
                                <div className="font-bold text-orange-600 mb-2">{sim.price ? `Rp${sim.price.toLocaleString()}` : '-'}</div>
                            </div>
                            <div className="flex justify-between items-center text-gray-700 text-base mt-2">
                                <div className="flex items-center gap-1"><BedDouble size={18} />{sim.beds ?? sim.details?.bedrooms ?? '-'}</div>
                                <div className="flex items-center gap-1"><Bath size={18} />{sim.baths ?? sim.details?.bathrooms ?? '-'}</div>
                                <div className="flex items-center gap-1"><Snowflake size={18} />{sim.ac ?? sim.details?.ac ?? '-'}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarListing; 