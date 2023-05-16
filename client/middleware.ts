import { NextRequest } from "next/server";

export function middleware(req:NextRequest) {
    const sessionCookie = req.cookies.get('session');
    req.cookies.set('new_cookie', 'my_new_cookie')

    if(req.nextUrl.pathname.startsWith('/tdsf')) {
        if(!sessionCookie) {
            console.log('go to hell')
        }
    }
}

export const config = {
    matcher: '/api/tmdb/:path*',
  };