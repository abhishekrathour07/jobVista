import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get('auth_token')?.value 
    const isPublicPath = path === '/login' || path === '/signup' || path === 'forgot-password'

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/forget-password',
        '/user',
        '/admin',
        '/admin/:path*',
        '/user/:path*',
    ]
}