'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TokenManager, UserDataManager } from '@/lib/tokenManager';
import Loader from '../HashLoader/Loader';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = TokenManager.getToken();
            const userData = UserDataManager.getUserData();
            const isAuth = !!token && !!userData;

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

    if (isChecking) {
        return (
            <Loader color={"#0118D8"} size={32}/>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
