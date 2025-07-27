"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "../lib/api";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        // Sesuaikan limit dengan blogsPerPage
        const res = await api.get(
          `/articles?page=${currentPage}&limit=${blogsPerPage}`
        );
        setBlogs(res.data.data);
      } catch (err) {
        setError("Gagal memuat blog.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-400 mb-4"></div>
        <div className="text-lg text-gray-600">Memuat blog...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-100 text-red-600 px-6 py-4 rounded-xl shadow-lg">
          {error}
        </div>
      </div>
    );

  if (blogs.length === 0)
    return (
      <div className="text-center text-gray-500 py-20">Tidak ada blog.</div>
    );

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-yellow-100 pb-16">
      {/* Header Parallax */}
      <div
        className="w-full relative flex flex-col items-center justify-center h-[50vh] min-h-[340px] mb-12 shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url('/image/bg-hero/1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-green-900/30 to-yellow-700/20 z-10" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight text-center">
            Blog & Artikel
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl text-center">
            Temukan inspirasi, tips, dan berita terbaru seputar properti,
            hunian, dan gaya hidup modern di blog kami.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => {
            const slug = slugify(blog.title || blog.id);
            const imageUrl =
              blog.thumbnail ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
            const tanggal = new Date(blog.createdAt).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            );
            return (
              <Link
                key={blog.id}
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
                    {blog.summary || blog.content?.slice(0, 120) + "..."}
                  </p>
                  <span className="text-xs text-green-600 mt-auto">
                    Oleh{" "}
                    <span className="font-semibold text-yellow-600">
                      {blog.author?.name || "Admin"}
                    </span>
                  </span>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-tr-3xl border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {/* Kalau backend kasih totalPages, bisa tambahkan pagination disini */}
      </div>
    </div>
    <Footer/>
    </>
  );
}
