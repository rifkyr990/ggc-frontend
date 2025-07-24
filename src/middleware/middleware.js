import { NextResponse } from 'next/server';

export function middleware(request) {
    const isLoggedIn = request.cookies.get('user'); // Atau baca dari token/session

    const protectedRoutes = ['/dashboard'];

    const url = request.nextUrl.pathname;

    if (protectedRoutes.includes(url) && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
