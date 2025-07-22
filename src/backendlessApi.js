import slugify from 'slugify';

export async function fetchPerumahan({ lookingFor, location, propertyType, price, slug } = {}) {
    let url = process.env.NEXT_PUBLIC_BACKENDLESS_URL;
    let whereArr = [];
    if (lookingFor) whereArr.push(`lookingFor='${lookingFor}'`);
    if (location) whereArr.push(`location='${location}'`);
    if (propertyType) whereArr.push(`propertyType='${propertyType}'`);
    if (price) whereArr.push(`price='${price}'`);
    let params = [];
    if (whereArr.length > 0) {
        params.push(`where=${encodeURIComponent(whereArr.join(' AND '))}`);
    }
    params.push('pageSize=30');
    if (params.length > 0) {
        url += (url.includes('?') ? '&' : '?') + params.join('&');
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Gagal fetch data perumahan');
    const data = await res.json();
    if (slug) {
        // Filter di FE pakai slugify(name)
        return data.filter(item => slugify(item.name, { lower: true }) === slug);
    }
    return data;
}

// Ambil properti serupa: lokasi sama didahulukan, sisanya acak, exclude properti dengan slug tertentu
export async function fetchSimilarPerumahan({ location, excludeSlug, limit = 4 }) {
    let url = process.env.NEXT_PUBLIC_BACKENDLESS_URL;
    let params = [];
    let whereArr = [];
    if (location) whereArr.push(`location='${location}'`);
    if (whereArr.length > 0) {
        params.push(`where=${encodeURIComponent(whereArr.join(' AND '))}`);
    }
    params.push('pageSize=20'); // ambil lebih banyak untuk filter FE
    if (params.length > 0) {
        url += (url.includes('?') ? '&' : '?') + params.join('&');
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Gagal fetch similar perumahan');
    const data = await res.json();
    // Filter FE: exclude properti yang sama, ambil limit
    let slugify = (str) => str && str.toString().toLowerCase().replace(/\s+/g, '-');
    let filtered = data.filter(item => slugify(item.name) !== excludeSlug);
    // Jika kurang dari limit, ambil properti lain secara acak
    if (filtered.length < limit) {
        // Fetch all (tanpa filter lokasi)
        let resAll = await fetch(process.env.NEXT_PUBLIC_BACKENDLESS_URL + '?pageSize=30');
        let all = await resAll.json();
        let others = all.filter(item => slugify(item.name) !== excludeSlug && (!location || item.location !== location));
        // Acak dan ambil sisa
        for (let i = others.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [others[i], others[j]] = [others[j], others[i]];
        }
        filtered = filtered.concat(others.slice(0, limit - filtered.length));
    }
    return filtered.slice(0, limit);
} 