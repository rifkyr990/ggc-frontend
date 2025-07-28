"use client";
import React, { useEffect, useState } from "react";
import api from "../../lib/api"; // Pastikan ini Axios instance ke URL backend
import ProtectedRoute from "@/app/auth/ProtectedRouted";
import Header from "../header";
import Sidebar from "../sidebar";

const JENIS_OPTIONS = ["Fulltime", "Freelance", "Magang"];
const LOKASI_OPTIONS = ["Jakarta", "Bandung", "Surabaya", "Remote", "Lainnya"];

const DEFAULT_FORM = {
  posisi: "",
  lokasi: "",
  deskripsi: "",
  kualifikasi: "",
  jenis: "",
  gaji: "",
  deadline: "",
};

const Page = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [lowongans, setLowongans] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLowongans();
  }, []);

  const fetchLowongans = async () => {
    try {
      const res = await api.get("/lowongan");
      setLowongans(res.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/lowongan/${editId}`, formData);
      } else {
        await api.post("/lowongan", formData);
      }
      setFormData(DEFAULT_FORM);
      setEditId(null);
      fetchLowongans();
    } catch (err) {
      console.error("Gagal menyimpan data:", err.response?.data || err.message);
    }
  };

  const handleEdit = (id) => {
    const item = lowongans.find((l) => l.id === id);
    if (item) {
      setFormData({
        posisi: item.posisi,
        lokasi: item.lokasi,
        deskripsi: item.deskripsi,
        kualifikasi: item.kualifikasi,
        jenis: item.jenis,
        gaji: item.gaji || "",
        deadline: item.deadline?.slice(0, 10) || "",
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await api.delete(`/lowongan/${id}`);
      fetchLowongans();
    } catch (error) {
      console.error("Gagal menghapus:", error);
    }
  };

  return (
    <ProtectedRoute>
      <section>
        <Header />
        <Sidebar />
        <main className="md:ml-64 p-6 bg-gray-100 min-h-screen">
          <section className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Lowongan" : "Tambah Lowongan"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Posisi
                  </label>
                  <input
                    name="posisi"
                    value={formData.posisi}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Jenis
                  </label>
                  <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">-- Pilih Jenis --</option>
                    {JENIS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lokasi
                  </label>
                  <select
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">-- Pilih Lokasi --</option>
                    {LOKASI_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gaji</label>
                  <input
                    type="number"
                    name="gaji"
                    value={formData.gaji}
                    onChange={handleChange}
                    placeholder="Contoh: 7000000"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Kualifikasi
                </label>
                <textarea
                  name="kualifikasi"
                  value={formData.kualifikasi}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  {editId ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </section>

          {/* Table */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-md font-semibold mb-4">Daftar Lowongan</h3>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2">Posisi</th>
                  <th className="px-4 py-2">Jenis</th>
                  <th className="px-4 py-2">Lokasi</th>
                  <th className="px-4 py-2">Deadline</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {lowongans.map((l) => (
                  <tr key={l.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{l.posisi}</td>
                    <td className="px-4 py-2">{l.jenis}</td>
                    <td className="px-4 py-2">{l.lokasi}</td>
                    <td className="px-4 py-2">
                      {new Date(l.deadline).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(l.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </section>
    </ProtectedRoute>
  );
};

export default Page;
