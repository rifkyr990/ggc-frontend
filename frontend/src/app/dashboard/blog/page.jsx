'use client'
import React, { useState } from 'react'
import Header from '../header'
import Sidebar from '../sidebar'

const CATEGORY_OPTIONS = ['Teknologi', 'Kesehatan', 'Pendidikan', 'Olahraga']

const Button = ({ children, ...props }) => (
    <button
        className="rounded text-sm font-medium hover:opacity-90 transition"
        {...props}
    >
        {children}
    </button>
)

const Page = () => {
    const [articles, setArticles] = useState([
        {
            objectId: '1',
            title: 'Belajar React',
            categories: 'Teknologi',
            thumbnail: 'https://via.placeholder.com/150',
            content: 'React adalah library UI',
            created: new Date()
        },
        {
            objectId: '2',
            title: 'Olahraga Pagi',
            categories: 'Olahraga',
            thumbnail: 'https://via.placeholder.com/150',
            content: 'Olahraga penting untuk kesehatan.',
            created: new Date()
        }
    ])

    const [formData, setFormData] = useState({
        title: '',
        categories: '',
        thumbnail: '',
        content: ''
    })

    const [editId, setEditId] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (editId) {
        // Update artikel
        const updatedArticles = articles.map(article =>
            article.objectId === editId ? { ...article, ...formData } : article
        )
        setArticles(updatedArticles)
        setEditId(null)
        
        } else {
        // Tambah artikel baru
        const newArticle = {
            ...formData,
            objectId: Date.now().toString(),
            created: new Date()
        }
        setArticles([...articles, newArticle])
        }

        // Reset form
        setFormData({
            title: '',
            categories: '',
            thumbnail: '',
            content: ''
        })
    }

    const handleEditClick = (id) => {
    const articleToEdit = articles.find(item => item.objectId === id)
    if (articleToEdit) {
        setFormData({
            title: articleToEdit.title,
            categories: articleToEdit.categories,
            thumbnail: articleToEdit.thumbnail,
            content: articleToEdit.content
        })
        setEditId(id)
        }
    }

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus artikel ini?')) {
            setArticles(articles.filter(item => item.objectId !== id))
        }
    }

  return (
    <section>
        {/* Header & Sidebar */}
        <Header />
        <Sidebar />

        <main className="md:ml-64 p-6 bg-gray-100 min-h-screen">
        {/* Form Section */}
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editId ? 'Edit Artikel' : 'Tambah Artikel'}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Judul & Kategori */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1">Judul</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Judul Artikel"
                        className="w-full p-2 border border-gray-300 rounded placeholder-gray-400 text-gray-400"
                        required
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1">Kategori</label>
                    <select
                        name="categories"
                        value={formData.categories}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded text-gray-400"
                        required
                    >
                    <option value="">=== Pilih kategori ===</option>
                        {CATEGORY_OPTIONS.map((val) => (
                            <option key={val} value={val}>{val}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-700 mb-1">Thumbnail</label>
                <input
                    type="text"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="e.g : https://image.com/gambar.png"
                    className="w-full p-2 border border-gray-300 rounded placeholder-gray-400 text-gray-400"
                    required
                />
            </div>

            <div>
                <label className="block text-sm text-gray-700 mb-1">Deskripsi</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Deskripsi singkat"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded resize-none placeholder-gray-400 text-gray-400"
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
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                        <tr key={article.objectId} className="bg-gray-100 border-b-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-4 max-w-[120px] truncate">{article.title}</td>
                            <td className="px-4 py-4">{article.categories}</td>
                            <td className="px-4 py-4 max-w-[150px] truncate">{article.thumbnail}</td>
                            <td className="px-4 py-4 max-w-[150px] truncate">{article.content}</td>
                            <td className="px-4 py-4">{new Date(article.created).toLocaleDateString('id-ID')}</td>
                            <td className="px-4 py-4 flex flex-col sm:flex-row gap-2">
                                <Button className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:opacity-90 transition" onClick={() => handleEditClick(article.objectId)}>Edit</Button>
                                <Button className="bg-red-600 text-white px-5 py-2 rounded font-medium hover:opacity-90 transition" onClick={() => handleDelete(article.objectId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
      </main>
    </section>
  )
}

export default Page
