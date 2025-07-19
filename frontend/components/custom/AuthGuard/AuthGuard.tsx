'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TokenManager, UserDataManager } from '@/lib/tokenManager';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = TokenManager.getToken();
            const userData = UserDataManager.getUserData();
            const isAuth = !!token && !!userData;
            
            setIsAuthenticated(isAuth);
            
            // Define public paths that don't require authentication
            const publicPaths = ['/login', '/signup', '/forgot-password'];
            const isPublicPath = publicPaths.includes(pathname);
            
            // If user is authenticated and trying to access public paths, redirect to appropriate dashboard
            if (isAuth && isPublicPath) {
                const role = userData.role;
                if (role === 'User') {
                    router.replace('/user/home');
                } else {
                    router.replace('/admin/dashboard');
                }
                return;
            }
            
            // If user is not authenticated and trying to access protected paths, redirect to login
            if (!isAuth && !isPublicPath && pathname !== '/') {
                router.replace('/login');
                return;
            }
            
            setIsChecking(false);
        };

        checkAuth();
    }, [pathname, router]);

    // Show loading while checking authentication
    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
