"use client";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import { fetchPerumahan, fetchSimilarPerumahan } from "@/backendlessApi";
import PropertyContactForm from "@/components/PropertyContactForm";
import { BedDouble, Bath, Snowflake, Home, MapPin, BadgeCheck, ListChecks, User2 } from "lucide-react";
import SimilarListing from "@/components/SimilarListing";

const dummyAgent = {
    name: "Kayley Hall",
    profile: "#",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
};

const slugify = (str) => str && str.toString().toLowerCase().replace(/\s+/g, '-');

const PropertyDetailPage = ({ params }) => {
    const { slug } = React.use(params);
    const [property, setProperty] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSlug, setSelectedSlug] = useState(slug);
    const [error, setError] = useState(null);
    const topRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPerumahan({ slug: selectedSlug });
                const prop = data && data.length > 0 ? data[0] : undefined;
                setProperty(prop);
                if (prop) {
                    const sim = await fetchSimilarPerumahan({ location: prop.location, excludeSlug: slugify(prop.name), limit: 4 });
                    setSimilar(sim);
                } else {
                    setSimilar([]);
                }
            } catch (err) {
                setProperty(undefined);
                setSimilar([]);
                setError("Gagal memuat data. Silakan coba lagi.");
            }
            setLoading(false);
            // Scroll ke atas
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: "smooth" });
            }
        };
        fetchData();
    }, [selectedSlug]);

    const handleSimilarClick = (slug) => {
        if (slug === selectedSlug) return; // Jangan fetch ulang jika slug sama
        setSelectedSlug(slug);
    };

    // Gallery logic
    // Ambil gambar utama dari property.img, dan buat array 5 gambar sama untuk thumbnail
    const galleryImages = property?.img ? Array(5).fill(property.img) : ["/image/bg-hero/1.png"];
    // Dummy images untuk thumbnail
    const dummyImages = [
        "/image/bg-hero/1.png",
        "/image/bg-hero/2.png",
        "/image/bg-hero/3.png",
        "/image/bg-hero/4.png",
        "/image/heros_test.png"
    ];
    const [mainImage, setMainImage] = useState(property?.img?.replace('/public', '') || property?.img_url || dummyImages[0]);
    useEffect(() => {
        setMainImage(property?.img?.replace('/public', '') || property?.img_url || dummyImages[0]);
    }, [property?.img, property?.img_url]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></span>
                    <p className="text-xl text-gray-600">Memuat data properti...</p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">Properti tidak ditemukan atau terjadi error.</p>
            </div>
        );
    }

    return (
        <div ref={topRef} className="relative min-h-screen pb-10 bg-gradient-to-br from-blue-100 via-white to-purple-100">
            {/* Error Handling */}
            {error && (
                <div className="max-w-2xl mx-auto my-8 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                    {error}
                </div>
            )}
            {/* Thumbnail utama dengan overlay hitam transparan */}
            <div className="w-full h-30 relative mb-4">
                <img
                    src={property.img?.replace('/public', '') || property.img_url || property.images?.[0] || "/image/bg-hero/1.png"}
                    alt={property.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            {/* Glass Header */}
            <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-tr-3xl px-10 py-8 flex justify-between items-center mx-4 mt-8 mb-8" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.37)'}}>
                <div>
                    <div className="font-extrabold text-3xl text-gray-900 tracking-wide drop-shadow-lg">{property.name || '-'}</div>
                    <div className="flex items-center gap-2 text-sm text-blue-700 mt-2"><MapPin size={18} /> {property.location || '-'}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1"><BadgeCheck size={16} /> {property.lookingFor || '-'} <span className="mx-1">|</span> <Home size={16} /> {property.propertyType || '-'}</div>
                </div>
                <div className="text-right">
                    <div className="font-bold text-2xl text-purple-700 drop-shadow-lg">{property.price ? `Rp${property.price.toLocaleString()}` : '-'}</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 mt-4 px-4">
                {/* Left: Images & Details */}
                <div className="flex-1">
                    {/* Main Image */}
                    <div className="rounded-tr-3xl overflow-hidden mb-6 shadow-2xl border-2 border-white/40 bg-white/30 backdrop-blur-xl" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.25)'}}>
                        <img
                            src={mainImage}
                            alt={property.name}
                            className="w-full h-[420px] object-cover scale-105 hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-4 mb-8 justify-start">
                        {dummyImages.map((img, idx) => (
                            <button
                                key={idx}
                                className={`rounded-xl overflow-hidden w-24 h-20 shadow border-2 ${mainImage === img ? 'border-#979797' : 'border-white/40'} bg-white/30 backdrop-blur-xl hover:scale-105 transition-transform duration-300`}
                                onClick={() => setMainImage(img)}
                                style={{ outline: mainImage === img ? '2px solid #979797' : 'none' }}
                            >
                                <img src={img} alt={`thumb-${idx}`} className="object-cover w-full h-full" />
                            </button>
                        ))}
                    </div>
                    {/* Details */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 mb-8 flex flex-wrap gap-6 items-center text-base font-semibold text-gray-800 border border-white/30 shadow-lg">
                        <div className="flex items-center gap-2"><BedDouble className="text-blue-600" size={22} /> {property.beds ?? property.details?.bedrooms ?? '-'}</div>
                        <div className="flex items-center gap-2"><Bath className="text-purple-600" size={22} /> {property.baths ?? property.details?.bathrooms ?? '-'}</div>
                        <div className="flex items-center gap-2"><Snowflake className="text-cyan-500" size={22} /> {property.ac ?? property.details?.ac ?? '-'}</div>
                        <div className="flex items-center gap-2"><Home className="text-orange-500" size={22} /> {property.propertyType || '-'}</div>
                        <div className="flex items-center gap-2"><MapPin className="text-green-500" size={22} /> {property.location || '-'}</div>
                    </div>
                    {/* Description */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-lg border border-white/30">
                        <div className="font-bold text-2xl mb-4 text-gray-900 flex items-center gap-2"><ListChecks className="text-orange-500" size={24}/> Deskripsi</div>
                        <div className="text-gray-700 text-base leading-relaxed">
                            {Array.isArray(property.description)
                                ? property.description.map((desc, idx) => <div key={idx} className="mb-3">{desc}</div>)
                                : property.description || '-'}
                        </div>
                    </div>
                    {/* Features */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-lg border border-white/30">
                        <div className="font-bold text-2xl mb-4 text-gray-900 flex items-center gap-2"><ListChecks className="text-green-500" size={24}/> Fitur</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                            {(property.features || []).length > 0 ? property.features.map((f, idx) => (
                                <div key={idx} className="flex items-center text-base text-gray-700 gap-2"><BadgeCheck className="text-green-500" size={20}/> {f}</div>
                            )) : <div className="text-gray-400 col-span-3">Tidak ada fitur khusus</div>}
                        </div>
                    </div>
                </div>
                {/* Right: Agent & Form */}
                <div className="w-full lg:w-[400px] flex-shrink-0">
                    <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-8 mb-10 shadow-2xl border border-white/30">
                        <div className="flex items-center mb-8">
                            <img src={dummyAgent.avatar} alt="agent" className="w-20 h-20 rounded-full mr-5 border-4 border-white/60 shadow-lg" />
                            <div>
                                <div className="font-semibold text-xl text-gray-900 flex items-center gap-2"><User2 className="text-blue-600" size={20}/>{dummyAgent.name}</div>
                                <a href={dummyAgent.profile} className="text-sm text-blue-700 hover:underline">Lihat profil</a>
                            </div>
                        </div>
                        <PropertyContactForm />
                    </div>
                </div>
            </div>
            {/* Similar Listings */}
            <SimilarListing
              location={property.location}
              excludeSlug={slugify(property.name)}
            />
        </div>
    );
};

export default PropertyDetailPage;