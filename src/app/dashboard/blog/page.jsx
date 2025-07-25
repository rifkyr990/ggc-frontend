'use client';
import React, { useState, useEffect } from 'react';
import Header from '../header';
import Sidebar from '../sidebar';
import api from '../../lib/api'; // Import axios instance
import ProtectedRoute from '@/app/auth/ProtectedRouted';

const CATEGORY_OPTIONS = ['News', 'Diskon'];
const DEFAULT_FORM = {
    title: '',
    content: '',
    categories: '',
    thumbnail: '',
    authorId: 1, 
};

const Page = () => {
    const [formData, setFormData] = useState(DEFAULT_FORM);
    const [articles, setArticles] = useState([]);
    const [editId, setEditId] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    // Ambil data artikel saat pertama load
    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async (page = 1) => {
        try {
            const res = await api.get('/articles', {
                params: {
                    page,
                    limit: 5,
                    search: searchQuery,
                },
                });
            setArticles(res.data.data);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.page);
        } catch (err) {
            console.error('Gagal ambil artikel:', err);
        }
    };


    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('content', formData.content);
                formDataToSend.append('category', formData.categories);
                formDataToSend.append('authorId', formData.authorId);

            if (thumbnailFile) {
                formDataToSend.append('thumbnail', thumbnailFile);
            }


            if (editId) {
                await api.put(`/articles/${editId}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/articles/', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            fetchArticles();
            setFormData(DEFAULT_FORM);
            setEditId(null);
        } catch (err) {
            console.error('Gagal simpan artikel:', err.response?.data || err.message);
        }
    };

    const handleEditClick = (id) => {
        const article = articles.find((a) => a.id === id);
        if (article) {
        setFormData({
            title: article.title,
            content: article.content,
            categories: article.category,
            thumbnail: article.thumbnail,
            authorId: article.authorId,
        });
        setEditId(id);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus artikel ini?')) return;

        try {
            await api.delete(`/articles/${id}`);
            fetchArticles();
        } catch (err) {
            console.error('Gagal hapus artikel:', err);
        }
    };

    const Button = ({ children, ...props }) => (
        <button
        className="rounded text-sm font-medium hover:opacity-90 transition"
        {...props}
        >
        {children}
        </button>
    );

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    return (
        <ProtectedRoute>
            <section>
            <Header />
            <Sidebar />

            <main className="md:ml-64 p-6 bg-gray-100 min-h-screen">
                <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {editId ? 'Edit Artikel' : 'Tambah Artikel'}
                    </h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-700 mb-1">Judul</label>
                                <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Judul Artikel"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-gray-700 mb-1">Kategori</label>
                                <select
                                    name="categories"
                                    value={formData.categories}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                >
                                <option value="">=== Pilih kategori ===</option>
                                {CATEGORY_OPTIONS.map((val) => (
                                    <option key={val} value={val}>
                                    {val}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>

                        {/* Thumbnail & Deskripsi */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Thumbnail (Upload)</label>
                            <input
                                type="file"
                                name="thumbnail"
                                accept="image/*"
                                onChange={(e) => setThumbnailFile(e.target.files[0])}
                                className="w-full p-2 border border-gray-300 rounded bg-white"
                                required={!editId} // wajib diisi saat create
                            />
                        </div>
                        <div>
                        <label className="block text-sm text-gray-700 mb-1">Deskripsi</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded resize-none"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                            >
                                {editId ? 'Update' : 'Tambah'}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Table Section */}
                <section className="relative overflow-x-auto shadow-md rounded-lg">
                    <div className="mb-4 flex gap-2 justify-end">
                        <input
                            type="text"
                            placeholder="Cari judul artikel..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
                        />
                        <button
                            onClick={() => fetchArticles(1)}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Cari
                        </button>
                    </div>

                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">Judul</th>
                                <th className="px-4 py-3">Kategori</th>
                                <th className="px-4 py-3">Thumbnail</th>
                                <th className="px-4 py-3">Isi konten</th>
                                <th className="px-4 py-3">Tanggal</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-4">{article.title}</td>
                                <td className="px-4 py-4">{article.category}</td>
                                <td className="px-4 py-4 max-w-[120px] truncate">
                                    <a href={article.thumbnail} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                    Lihat
                                    </a>
                                </td>
                                <td className="px-4 py-4 max-w-[150px] truncate">{article.content}</td>
                                <td className="px-4 py-4">
                                    {new Date(article.createdAt).toLocaleDateString('id-ID')}
                                </td>
                                <td className="px-4 py-4 flex flex-col sm:flex-row gap-2">
                                    <Button className="bg-blue-600 text-white px-4 py-2" onClick={() => handleEditClick(article.id)}>
                                    Edit
                                    </Button>
                                    <Button className="bg-red-600 text-white px-4 py-2" onClick={() => handleDelete(article.id)}>
                                    Delete
                                    </Button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center my-4 gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </section>
            </main>
        </section>
        </ProtectedRoute>
    );
};

export default Page;
