"use client";

import React, { useState, useEffect } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import api from "../../lib/api";
import ProtectedRoute from "@/app/auth/ProtectedRouted";

const Button = ({ children, ...props }) => (
  <button
    className="rounded text-sm font-medium hover:opacity-90 transition"
    {...props}
  >
    {children}
  </button>
);

const Page = () => {
  const [formData, setFormData] = useState({
    nama: "",
    icon: null, // ganti iconUrl jadi icon
  });

  const [fasilitas, setFasilitas] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  // Ambil data fasilitas
  const fetchFasilitas = async () => {
    setTableLoading(true);
    try {
      const res = await api.get("/fasilitas", {
        params: { search, page },
      });
      setFasilitas(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Gagal fetch data:", error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchFasilitas();
  }, [page, search]);

  // Handle input form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ nama: "", icon: null });
    setEditId(null);
  };

  // Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.icon) {
      alert("Nama dan icon harus diisi");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("icon", formData.icon);

    try {
      if (editId) {
        await api.put(`/fasilitas/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/fasilitas", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchFasilitas();
      resetForm();
    } catch (error) {
      console.error("Gagal simpan:", error.response?.data || error.message);
      alert("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({ nama: item.nama, icon: null });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus fasilitas ini?")) return;
    setTableLoading(true);
    try {
      await api.delete(`/fasilitas/${id}`);
      fetchFasilitas();
    } catch (error) {
      console.error("Gagal hapus:", error.response?.data || error.message);
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <section>
        <Header />
        <Sidebar />
        <main className="md:ml-64 p-6">
          {/* Form Fasilitas */}
          <section className="bg-white p-4 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Fasilitas" : "Tambah Fasilitas"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex-1">
                <label htmlFor="nama" className="mb-2">
                  Nama Fasilitas:
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="my-2 w-full border border-gray-300 p-2 rounded"
                  placeholder="ex: taman bermain"
                  required
                />
              </div>

              <div className="flex-1">
                <label htmlFor="icon" className="mb-2">
                  Upload Icon:
                </label>
                <input
                  type="file"
                  name="icon"
                  accept="image/*"
                  onChange={handleChange}
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Loading..." : editId ? "Update" : "Submit"}
                </Button>
                {editId && (
                  <Button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Batal
                  </Button>
                )}
              </div>
            </form>
          </section>

          {/* Table Fasilitas */}
          <section className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Nama fasilitas</th>
                  <th className="px-4 py-3">Icon</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tableLoading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8">
                      Loading...
                    </td>
                  </tr>
                ) : fasilitas.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  fasilitas.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{item.nama}</td>
                      <td className="px-4 py-2">
                        <img
                          src={item.iconUrl}
                          alt={item.nama}
                          className="w-8 h-8"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <Button
                            className="bg-blue-500 text-white px-5 py-2 rounded"
                            onClick={() => handleEdit(item)}
                            disabled={tableLoading}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-red-600 text-white px-5 py-2 rounded"
                            onClick={() => handleDelete(item.id)}
                            disabled={tableLoading}
                          >
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="my-4 flex justify-center items-center gap-4">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || tableLoading}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                Prev
              </Button>
              <span>
                Halaman {page} / {totalPages}
              </span>
              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || tableLoading}
                className="bg-gray-200 px-3 py-1"
              >
                Next
              </Button>
            </div>
          </section>
        </main>
      </section>
    </ProtectedRoute>
  );
};

export default Page;
