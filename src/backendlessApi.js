export async function fetchPerumahan({ lookingFor, location, propertyType, price } = {}) {
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
    return res.json();
} 