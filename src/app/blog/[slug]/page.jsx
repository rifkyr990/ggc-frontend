"use client"; 
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "@/app/lib/api";

const slugify = (str) => str && str.toString().toLowerCase().replace(/\s+/g, '-');

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [otherArticles, setOtherArticles] = useState([]);

    useEffect(() => {
        if (!slug) return;

        async function fetchBlog() {
            try {
                setLoading(true);
                setError(null);

                // Panggil API backendmu, filter by slug
                const res = await api.get('/articles', {
                    params: {
                        // misal backendmu support search by slug (kamu perlu sesuaikan backend)
                        search: slug.replace(/-/g, ' '),  // konversi slug ke kata (anggap slug dari title)
                        page: 1,
                        limit: 1,
                    }
                });
                
                const foundBlog = res.data.data.find(article => slugify(article.title) === slug);

                if (!foundBlog) {
                    setError("Blog tidak ditemukan");
                    setLoading(false);
                    return;
                }

                setBlog(foundBlog);
                setLoading(false);

                // Ambil artikel lain untuk sidebar (exclude current blog)
                const resOthers = await api.get('/articles', {
                    params: {
                        page: 1,
                        limit: 4,
                    }
                });

                const othersFiltered = resOthers.data.data.filter(
                    a => slugify(a.title) !== slug
                ).slice(0, 3);

                setOtherArticles(othersFiltered);
            } catch (err) {
                setError("Gagal mengambil data blog");
                setLoading(false);
            }
        }

        fetchBlog();
    }, [slug]);

    if (loading) return <div className="text-center py-20">Memuat blog...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!blog) return <div className="text-center py-20">Blog tidak ditemukan.</div>;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0f0a] via-[#e8f5e9] to-[#bfa14a]/10 py-16 px-2 md:px-0 flex justify-center items-start relative">
            <div className="w-full max-w-350 mx-auto flex flex-col md:flex-row gap-12 mt-20 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-0 md:p-0 border border-[#BFA14A]/30">
                {/* KONTEN UTAMA BLOG */}
                <div className="w-full md:w-4/5 lg:w-3/4 pl-10">
                    {/* Header Blog */}
                    <div className="relative mb-10 flex flex-col items-center text-center px-6 pt-10 pb-0 pl-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#BFA14A] drop-shadow-lg leading-tight">{blog.title}</h1>
                        <div className="flex items-center gap-3 text-xs text-green-700 mb-2">
                            <span>Diposting pada: {new Date(blog.createdAt).toLocaleDateString()}</span>
                            <span className="w-1 h-1 bg-[#43a047] rounded-full" />
                            <span>Oleh <span className="font-semibold text-[#388e3c]">{blog.author?.name || 'Admin'}</span></span>
                        </div>
                    </div>
                    {/* Gambar utama */}
                    <div className="relative w-full h-130 rounded-2xl overflow-hidden shadow-lg mb-8 border-2 border-[#BFA14A]/40">
                        <img 
                            src={blog.thumbnail || "/image/bg-hero/1.png"} 
                            alt={blog.title} 
                            className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent" />
                    </div>
                    {/* Konten utama */}
                    <div className="prose prose-lg max-w-none bg-white/90 rounded-xl p-8 shadow-xl mb-12 text-gray-900 border-l-4 border-[#43a047]" style={{backdropFilter: 'blur(2px)'}} dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
                </div>
                {/* SIDEBAR OTHER ARTICLE */}
                <aside className="w-full md:w-1/5 lg:w-1/4 md:sticky md:top-24 flex flex-col gap-6 pt-60 pr-10">
                    <div className="bg-gradient-to-br from-white via-[#e8f5e9] to-[#bfa14a]/10 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-[#BFA14A]/30">
                        <h2 className="text-xl font-bold text-[#BFA14A] mb-6">Other Article</h2>
                        {otherArticles.length === 0 ? (
                            <div className="text-green-700 text-sm">Tidak ada artikel lain.</div>
                        ) : (
                            otherArticles.map((art) => (
                                <Link
                                    key={art.id}
                                    href={`/blog/${slugify(art.title)}`}
                                    className="flex gap-4 items-center group hover:bg-[#bfa14a]/10 rounded-xl p-2 transition border-l-4 border-transparent hover:border-[#43a047]"
                                >
                                    <div className="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#e8f5e9] border border-[#BFA14A]/30">
                                        <img src={art.thumbnail || '/image/bg-hero/2.png'} alt={art.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <span className="uppercase text-xs font-semibold text-[#43a047] tracking-wider">{art.category || 'ARTICLE'}</span>
                                        <span className="font-semibold text-gray-900 group-hover:text-[#388e3c] line-clamp-2">{art.title}</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
