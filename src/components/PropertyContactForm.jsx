"use client";
import React, { useState } from "react";

export default function PropertyContactForm() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError('');
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                setForm({ name: '', phone: '', email: '', message: '' });
            } else {
                setError(data.error || 'Gagal mengirim pesan.');
            }
        } catch (err) {
            setError('Terjadi kesalahan.');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 8, border: '1px solid #eee' }}
                required
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 8, border: '1px solid #eee' }}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 8, border: '1px solid #eee' }}
                required
            />
            <textarea
                name="message"
                placeholder="Hello, I am interested in.."
                value={form.message}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 8, border: '1px solid #eee', minHeight: 60 }}
                required
            />
            <button
                type="submit"
                style={{ width: '100%', background: '#181818', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px #0001', cursor: loading ? 'not-allowed' : 'pointer' }}
                disabled={loading}
            >
                {loading ? 'Mengirim...' : 'Learn more'} <span style={{ marginLeft: 8 }}>→</span>
            </button>
            {success && <div style={{ color: 'green', marginTop: 8 }}>Pesan berhasil dikirim!</div>}
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </form>
    );
} 