"use client";

import React, { useState, useEffect } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import api from "../../lib/api";
import Select from "react-select";

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
    lokasi: "",
    hargaMulai: "",
    deskripsi: "",
    thumbnail: null,
    fasilitasIds: [],
    gambarLainnya: [],
    spesifikasi: {
      luasTanah: "",
      luasBangunan: "",
      kamarTidur: "",
      kamarMandi: "",
      garasi: false,
      listrik: "",
    },
  });

  const [perumahanList, setPerumahanList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState(null);
  const [fasilitasOptions, setFasilitasOptions] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const fetchFasilitas = async () => {
    try {
      const res = await api.get("/fasilitas"); // asumsi: res.data = [{ id: 1, nama: 'Kolam Renang' }]
      const options = res.data.map((f) => ({
        value: f.id,
        label: f.nama,
      }));
      setFasilitasOptions(options);
    } catch (err) {
      console.error("Gagal fetch fasilitas:", err);
    }
  };

  const fetchPerumahan = async () => {
    try {
      const res = await api.get("/perumahan", {
        params: { search, page },
      });
      setPerumahanList(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchPerumahan();
  }, [page]);

  useEffect(() => {
    fetchPerumahan();
  }, [search]);

  useEffect(() => {
    fetchPerumahan();
    fetchFasilitas(); // tambahkan ini
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name.startsWith("spesifikasi.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        spesifikasi: { ...prev.spesifikasi, [key]: value },
      }));
    } else if (type === "file") {
      if (name === "thumbnail") {
        setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
      } else if (name === "gambarLainnya") {
        // Convert FileList to Array
        setFormData((prev) => ({ ...prev, gambarLainnya: Array.from(files) }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("nama", formData.nama);
    form.append("lokasi", formData.lokasi);
    form.append("hargaMulai", formData.hargaMulai);
    form.append("deskripsi", formData.deskripsi);
    // Validasi thumbnail wajib diisi saat create
    if (!editId && !formData.thumbnail) {
      alert("Thumbnail wajib diisi!");
      return;
    }
    if (formData.thumbnail) {
      form.append("thumbnail", formData.thumbnail);
    }
    const fasilitasIds = formData.fasilitasIds.map(Number);
    form.append("fasilitasIds", JSON.stringify(fasilitasIds));
    if (formData.gambarLainnya && formData.gambarLainnya.length > 0) {
      for (let i = 0; i < formData.gambarLainnya.length; i++) {
        form.append("gambarLainnya", formData.gambarLainnya[i]);
      }
    }
    form.append("spesifikasi", JSON.stringify(formData.spesifikasi));

    try {
      if (editId) {
        await api.put(`/perumahan/${editId}`, form);
      } else {
        await api.post("/perumahan/create", form);
      }
      fetchPerumahan();
      setFormData({
        nama: "",
        lokasi: "",
        hargaMulai: "",
        deskripsi: "",
        thumbnail: null,
        fasilitasIds: [],
        gambarLainnya: [],
        spesifikasi: {
          luasTanah: "",
          luasBangunan: "",
          kamarTidur: "",
          kamarMandi: "",
          garasi: false,
          listrik: "",
        },
      });
      setEditId(null);
    } catch (err) {
      let msg = "Gagal submit data.";
      if (err.response && err.response.data && err.response.data.message) {
        msg += "\n" + err.response.data.message;
      } else if (err.message) {
        msg += "\n" + err.message;
      }
      alert(msg);
      console.error(err);
    }
  };

  const handleEdit = async (item) => {
    // Jika fasilitasOptions belum tersedia, tunggu sampai selesai fetch
    if (fasilitasOptions.length === 0) {
      await fetchFasilitas(); // pastikan ini async
    }

    setEditId(item.id);
    setFormData({
      nama: item.nama,
      lokasi: item.lokasi,
      hargaMulai: item.hargaMulai,
      deskripsi: item.deskripsi,
      thumbnail: null,
      gambarLainnya: [],
      fasilitasIds: item.fasilitas?.map((f) => f.id) || [],
      spesifikasi: item.spesifikasi || {
        luasTanah: "",
        luasBangunan: "",
        kamarTidur: "",
        kamarMandi: "",
        garasi: false,
        listrik: "",
      },
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus?")) {
      try {
        await api.delete(`/perumahan/${id}`);
        fetchPerumahan();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!isMounted) {
    // Sembunyikan select dulu saat server render
    return null;
  }

  return (
    <section>
      <Header />
      <Sidebar />
      <main className="md:ml-64 p-6 bg-gray-100 min-h-screen">
        {/* Form */}
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editId ? "Edit Perumahan" : "Tambah Perumahan"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            encType="multipart/form-data"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="nama"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Nama Perumahan
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama Perumahan"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lokasi"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Lokasi
                </label>
                <input
                  type="text"
                  name="lokasi"
                  placeholder="Lokasi Perumahan"
                  value={formData.lokasi}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="hargaMulai"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Harga Mulai
                </label>
                <input
                  type="number"
                  name="hargaMulai"
                  placeholder="ex: 500000000"
                  value={formData.hargaMulai}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="spesifikasi.luasTanah"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Luas Tanah
                </label>
                <input
                  type="number"
                  name="spesifikasi.luasTanah"
                  placeholder="ex: 100"
                  value={formData.spesifikasi.luasTanah}
                  onChange={handleChange}
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="spesifikasi.luasBangunan"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Luas Bangunan
                </label>
                <input
                  type="number"
                  name="spesifikasi.luasBangunan"
                  placeholder="ex: 100"
                  value={formData.spesifikasi.luasBangunan}
                  onChange={handleChange}
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="spesifikasi.kamarTidur"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Kamar Tidur
                </label>
                <input
                  type="number"
                  name="spesifikasi.kamarTidur"
                  placeholder="ex: 3"
                  value={formData.spesifikasi.kamarTidur}
                  onChange={handleChange}
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="spesifikasi.kamarMandi"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Kamar Mandi
                </label>
                <input
                  type="number"
                  name="spesifikasi.kamarMandi"
                  placeholder="ex: 2"
                  value={formData.spesifikasi.kamarMandi}
                  onChange={handleChange}
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="spesifikasi.listrik"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Listrik
                </label>
                <input
                  type="text"
                  name="spesifikasi.listrik"
                  value={formData.spesifikasi.listrik}
                  onChange={handleChange}
                  placeholder="ex: 2200 Watt"
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Thumbnail
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="p-2 border rounded w-full border-gray-400"
                  required={!editId}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="gambarLainnya"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Gambar Lainnya
                </label>
                <input
                  type="file"
                  name="gambarLainnya"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  className="p-2 border rounded w-full border-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fasilitas
                </label>
                <Select
                  isMulti
                  name="fasilitasIds"
                  options={fasilitasOptions}
                  value={fasilitasOptions.filter((opt) =>
                    formData.fasilitasIds.includes(opt.value)
                  )}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      fasilitasIds: selected.map((s) => s.value),
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="deskripsi" className="text-sm text-gray-700">
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                placeholder="Tulis deskripsi di sini..."
                className="p-2 border border-gray-400 rounded resize-none"
                rows={4}
                onChange={handleChange}
                value={formData.deskripsi}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                {editId ? "Update" : "Tambah"}
              </button>
            </div>
          </form>
        </section>

        {/* Search */}
        <div className="mb-4 flex gap-2 justify-end">
          <input
            type="text"
            placeholder="Cari nama perumahan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full max-w-sm border-gray-400"
          />
          <button
            onClick={fetchPerumahan}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cari
          </button>
        </div>

        {/* Tabel */}
        <section className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Lokasi</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Deskripsi</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {perumahanList.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.lokasi}</td>
                  <td className="px-4 py-2">
                    Rp {parseInt(item.hargaMulai).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2 truncate max-w-[200px]">
                    {item.deskripsi}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button
                        className="bg-blue-500 text-white px-5 py-2 rounded"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-600 text-white px-5 py-2 rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="my-4 flex justify-center items-center gap-4">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              Prev
            </Button>
            <span>
              Halaman {page} / {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="bg-gray-200 px-3 py-1"
            >
              Next
            </Button>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Page;
