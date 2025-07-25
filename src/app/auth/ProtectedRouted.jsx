'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'admin@gmail.com';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        if (user && user.email === ADMIN_EMAIL) {
            setAuthorized(true);
        } else {
            router.push('/');
        }

        setIsChecking(false);
    }, [router]);

    if (isChecking) {
        return <div className="text-center mt-10">Memeriksa izin akses...</div>;
    }

    return authorized ? <>{children}</> : null;
};

export default ProtectedRoute;
