import React, { useState } from "react";

export default function PropertyContactForm() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text =
            `Halo Graha Gloria,%0ASaya ingin menghubungi Anda melalui website.%0A` +
            `Nama: ${form.name}%0A` +
            `No HP: ${form.phone}%0A` +
            `Email: ${form.email}%0A` +
            `Pesan: ${form.message}`;
        const waUrl = `https://wa.me/6285645353662?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white/90 shadow-2xl rounded-2xl p-8 max-w-lg w-full mx-auto border border-yellow-300"
        >
            <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
                Connect Us
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                    Nama Lengkap
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nama Anda"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
                    Nomor HP
                </label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@domain.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                    Pesan
                </label>
                <textarea
                    name="message"
                    id="message"
                    placeholder="Pesan Anda"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none min-h-[80px]"
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-xl shadow-lg hover:from-yellow-500 hover:to-yellow-400 transition-all text-lg flex items-center justify-center gap-2"
            >
                Hubungi Kami
            </button>
        </form>
    );
}