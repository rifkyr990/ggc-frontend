"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BACKENDLESS_URL = process.env.NEXT_PUBLIC_BACKENDLESS_URL_BLOG;

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Ganti spasi dengan -
        .replace(/[^\w\-]+/g, '')       // Hapus karakter non-word
        .replace(/\-\-+/g, '-')         // Ganti multiple - dengan single -
        .replace(/^-+/, '')             // Hapus - di awal
        .replace(/-+$/, '');            // Hapus - di akhir
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;

    // Hitung total halaman
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    // Ambil data blog untuk halaman saat ini
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    useEffect(() => {
        fetch(BACKENDLESS_URL)
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Gagal mengambil data blog");
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-400 mb-4"></div>
            <div className="text-lg text-gray-600">Memuat blog...</div>
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-red-100 text-red-600 px-6 py-4 rounded-xl shadow-lg">{error}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-yellow-100 pb-16">
            {/* Header Parallax */}
            <div
                className="w-full relative flex flex-col items-center justify-center h-[50vh] min-h-[340px] mb-12 shadow-lg overflow-hidden"
                style={{
                    backgroundImage: `url('/image/bg-hero/1.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Overlay gradasi hijau-gold */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-green-900/30 to-yellow-700/20  z-10" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight text-center">
                        Blog & Artikel
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl text-center">
                        Temukan inspirasi, tips, dan berita terbaru seputar properti, hunian, dan gaya hidup modern di blog kami.
                    </p>
                </div>
            </div>
            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {currentBlogs.length === 0 && <div className="col-span-full text-center text-gray-500">Tidak ada blog.</div>}
                    {currentBlogs.map((blog) => {
                        const slug = blog.slug || slugify(blog.title || blog.objectId);
                        const imageUrl = blog.imageUrl || `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80`;
                        const tanggal = new Date(blog.created || blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                        return (
                            <Link
                                key={blog.objectId}
                                href={`/blog/${slug}`}
                                className="group block rounded-tr-3xl overflow-hidden shadow-2xl border border-green-200 bg-white/70 backdrop-blur-lg hover:scale-[1.03] hover:shadow-yellow-200 hover:border-yellow-400 transition-all duration-300 relative"
                                style={{ minHeight: 420 }}
                            >
                                <div className="relative">
                                    <img
                                        src={imageUrl}
                                        alt={blog.title}
                                        className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <span className="absolute top-4 left-4 bg-yellow-400 text-white text-xs font-semibold px-4 py-1 rounded-tr-3xl shadow-lg backdrop-blur-md border border-yellow-300">
                                        {tanggal}
                                    </span>
                                </div>
                                <div className="p-7 flex flex-col gap-3">
                                    <h2 className="text-2xl font-bold mb-1 text-green-900 group-hover:text-yellow-600 transition-colors duration-200 drop-shadow-sm">
                                        {blog.title}
                                    </h2>
                                    <p className="text-green-800 text-base mb-2 line-clamp-3">
                                        {blog.summary || (blog.content?.slice(0, 120) + "...")}
                                    </p>
                                    <span className="text-xs text-green-600 mt-auto">Oleh <span className="font-semibold text-yellow-600">{blog.author || 'Admin'}</span></span>
                                </div>
                                <div className="absolute inset-0 pointer-events-none rounded-tr-3xl border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
                            </Link>
                        );
                    })}
                </div>
                {/* Paginasi */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 border border-green-300 bg-white text-green-700 rounded-l-md hover:bg-yellow-100 hover:text-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                Sebelumnya
                            </button>
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx + 1}
                                    onClick={() => setCurrentPage(idx + 1)}
                                    className={`px-4 py-2 border-t border-b border-green-300 bg-white text-green-700 hover:bg-yellow-100 hover:text-yellow-700 transition ${currentPage === idx + 1 ? 'font-bold text-yellow-700 bg-yellow-50 border-yellow-400' : ''}`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 border border-green-300 bg-white text-green-700 rounded-r-md hover:bg-yellow-100 hover:text-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                Berikutnya
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
} 