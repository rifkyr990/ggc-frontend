"use client";

import { useEffect, useState } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import api from "../../lib/api";
import Select from "react-select";
import ProtectedRoute from "@/app/auth/ProtectedRouted";

const Button = ({ children, ...props }) => (
  <button
    className="rounded text-sm font-medium hover:opacity-90 transition"
    {...props}
  >
    {children}
  </button>
);

const TYPE_OPTIONS = [
  'Type 50',
  'Type 53',
  'Type 60',
  'Type 65',
  'Ruko'
];

const LOCATION_OPTION = [
  'Graha indah',
  'Graha Indah Ketanon',
  'Graha Indah Beji 1',
  'Graha Indah Beji 2',
]

const Page = () => {
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    hargaMulai: "",
    deskripsi: "",
    type: "",
    spesifikasi: {
      luasTanah: "",
      luasBangunan: "",
      kamarTidur: "",
      kamarMandi: "",
      listrik: "",
    },
    fasilitasIds: [],
    thumbnail: null,
    gambarLainnya: [],
  });

  const [fasilitasOptions, setFasilitasOptions] = useState([]);
  const [perumahanList, setPerumahanList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isClient, setIsClient] = useState(false);

  const fetchFasilitas = async () => {
    try {
      const res = await api.get("/fasilitas");
      const options = res.data.data.map((f) => ({
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
    setIsClient(true);
    fetchPerumahan();
    fetchFasilitas();
  }, []);

  useEffect(() => {
    fetchPerumahan();
  }, [page]);

  useEffect(() => {
    fetchPerumahan();
  }, [search]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (name.startsWith("spesifikasi.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        spesifikasi: {
          ...prev.spesifikasi,
          [key]: value,
        },
      }));
    } else if (type === "file") {
      if (name === "thumbnail") {
        setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
      } else if (name === "gambarLainnya") {
        setFormData((prev) => ({ ...prev, gambarLainnya: files }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectFasilitas = (selected) => {
    setFormData((prev) => ({
      ...prev,
      fasilitasIds: selected ? selected.map((item) => item.value) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "put" : "post";
    const endpoint = editId ? `/perumahan/${editId}` : "/perumahan/create";

    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("lokasi", formData.lokasi);
    data.append("hargaMulai", formData.hargaMulai);
    data.append("deskripsi", formData.deskripsi);
    data.append("type", formData.type);
    data.append("spesifikasi", JSON.stringify(formData.spesifikasi));
    data.append("fasilitasIds", JSON.stringify(formData.fasilitasIds));

    // Validasi thumbnail wajib diisi saat create
    if (!editId && !formData.thumbnail) {
      alert("Thumbnail wajib diisi!");
      return;
    }
    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }

    // Gambar lainnya (opsional, array of files)
    if (formData.gambarLainnya && formData.gambarLainnya.length > 0) {
      for (let i = 0; i < formData.gambarLainnya.length; i++) {
        data.append("gambarLainnya", formData.gambarLainnya[i]);
      }
    }

    try {
      await api[method](endpoint, data);
      fetchPerumahan(); // Refresh data
      resetForm();
    } catch (err) {
      console.error("Gagal simpan:", err?.response?.data || err.message);
      alert("Gagal simpan data");
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      nama: item.nama,
      lokasi: item.lokasi,
      hargaMulai: item.hargaMulai,
      deskripsi: item.deskripsi,
      type: item.type,
      spesifikasi: item.spesifikasi || {
        luasTanah: "",
        luasBangunan: "",
        kamarTidur: "",
        kamarMandi: "",
        listrik: "",
      },
      fasilitasIds: item.fasilitas?.map((f) => f.fasilitas.id) || [],
      thumbnail: null,
      gambarLainnya: [],
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      await api.delete(`/perumahan/${id}`);
      fetchPerumahan();
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      lokasi: "",
      hargaMulai: "",
      deskripsi: "",
      type: "",
      spesifikasi: {
        luasTanah: "",
        luasBangunan: "",
        kamarTidur: "",
        kamarMandi: "",
        listrik: "",
      },
      fasilitasIds: [],
      thumbnail: null,
      gambarLainnya: [],
    });
    setEditId(null);
  };

  return (
    <ProtectedRoute>
      <section>
        <Header />
        <Sidebar />
        <main className="md:ml-64 p-6 bg-gray-100 min-h-screen">
          <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editId ? "Edit Perumahan" : "Tambah Perumahan"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              encType="multipart/form-data"
            >
              {/* Nama */}
              <div>
                <label
                  htmlFor="nama"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama perumahan"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              {/* Lokasi */}
              <div>
                <label
                  htmlFor="lokasi"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Lokasi
                </label>
                <select name="lokasi" value={formData.lokasi} onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded" required>
                  <option value="">=== Pilih lokasi ===</option>
                  {LOCATION_OPTION.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                  ))}
                </select>
              </div>

              {/* Harga Mulai */}
              <div>
                <label
                  htmlFor="hargaMulai"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Harga Mulai (Rp)
                </label>
                <input
                  type="number"
                  id="hargaMulai"
                  name="hargaMulai"
                  value={formData.hargaMulai}
                  onChange={handleChange}
                  placeholder="Masukkan harga mulai"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>

              {/* Spesifikasi */}
              <fieldset className="border p-4 rounded border-gray-300">
                <legend className="text-gray-700 font-semibold mb-2">
                  Spesifikasi
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="luasTanah"
                      className="block mb-1 text-sm text-gray-700"
                    >
                      Luas Tanah (m²)
                    </label>
                    <input
                      type="number"
                      id="luasTanah"
                      name="spesifikasi.luasTanah"
                      value={formData.spesifikasi.luasTanah}
                      onChange={handleChange}
                      placeholder="Luas tanah"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      min="0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="luasBangunan"
                      className="block mb-1 text-sm text-gray-700"
                    >
                      Luas Bangunan (m²)
                    </label>
                    <input
                      type="number"
                      id="luasBangunan"
                      name="spesifikasi.luasBangunan"
                      value={formData.spesifikasi.luasBangunan}
                      onChange={handleChange}
                      placeholder="Luas bangunan"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      min="0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kamarTidur"
                      className="block mb-1 text-sm text-gray-700"
                    >
                      Kamar Tidur
                    </label>
                    <input
                      type="number"
                      id="kamarTidur"
                      name="spesifikasi.kamarTidur"
                      value={formData.spesifikasi.kamarTidur}
                      onChange={handleChange}
                      placeholder="Jumlah kamar tidur"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      min="0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kamarMandi"
                      className="block mb-1 text-sm text-gray-700"
                    >
                      Kamar Mandi
                    </label>
                    <input
                      type="number"
                      id="kamarMandi"
                      name="spesifikasi.kamarMandi"
                      value={formData.spesifikasi.kamarMandi}
                      onChange={handleChange}
                      placeholder="Jumlah kamar mandi"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="listrik"
                      className="block mb-1 text-sm text-gray-700"
                    >
                      Listrik (Watt)
                    </label>
                    <input
                      type="text"
                      id="listrik"
                      name="spesifikasi.listrik"
                      value={formData.spesifikasi.listrik}
                      onChange={handleChange}
                      placeholder="Daya listrik"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1">Type rumah</label>
                    <select name="type" value={formData.type} onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded" required>
                      <option value="">=== Pilih type ===</option>
                      {TYPE_OPTIONS.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Fasilitas */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fasilitas
                </label>
                {isClient && (
                  <Select
                    isMulti
                    options={fasilitasOptions}
                    value={fasilitasOptions.filter((opt) =>
                      formData.fasilitasIds.includes(opt.value)
                    )}
                    onChange={handleSelectFasilitas}
                    placeholder="Pilih fasilitas"
                  />
                )}
              </div>

              {/* Thumbnail */}
              <div>
                <label
                  htmlFor="thumbnail"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Thumbnail
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-600"
                />
                {formData.thumbnail && (
                  <p className="mt-1 text-xs text-gray-500">
                    File: {formData.thumbnail.name}
                  </p>
                )}
              </div>

              {/* Gambar Lainnya */}
              <div>
                <label
                  htmlFor="gambarLainnya"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Gambar Lainnya
                </label>
                <input
                  type="file"
                  id="gambarLainnya"
                  name="gambarLainnya"
                  accept="image/*"
                  onChange={handleChange}
                  multiple
                  className="block w-full text-sm text-gray-600"
                />
                {formData.gambarLainnya.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    {Array.from(formData.gambarLainnya)
                      .map((file) => file.name)
                      .join(", ")}
                  </p>
                )}
              </div>

              {/* Deskripsi */}
              <div>
                <label
                  htmlFor="deskripsi"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows={4}
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Tulis deskripsi di sini..."
                  required
                  className="w-full p-2 border border-gray-300 rounded resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  {editId ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </section>

          {/* search */}
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

          <section className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Lokasi</th>
                  <th className="px-4 py-3">Harga</th>
                  <th className="px-4 py-3 max-w-[200px]">Deskripsi</th>
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
    </ProtectedRoute>
  );
};

export default Page;
