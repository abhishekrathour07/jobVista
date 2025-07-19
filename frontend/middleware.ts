import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    
    // For client-side token authentication, we can't check localStorage in middleware
    // We'll handle route protection on the client-side instead
    // This middleware now only handles basic public path redirections
    
    // Allow all requests to pass through
    // Client-side components will handle authentication checks
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