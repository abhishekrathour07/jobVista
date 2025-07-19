'use client'

import { useEffect, useState } from 'react';
import { TokenManager, UserDataManager } from '@/lib/tokenManager';
import profileService from '@/services/Profile.services';

export interface UserData {
    userId: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loadUser = async () => {
        try {
            const token = TokenManager.getToken();
            const localUserData = UserDataManager.getUserData();

            if (!token) {
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            // If we have local data, use it immediately
            if (localUserData) {
                setUser(localUserData);
                setIsAuthenticated(true);
            }

            // Try to fetch fresh data from API
            try {
                const response = await profileService.loggedinUserDetail();
                const freshUserData = response?.data;
                setUser(freshUserData);
                UserDataManager.setUserData(freshUserData);
                setIsAuthenticated(true);
            } catch (error) {
                // If API fails but we have token and local data, stay authenticated
                if (localUserData && token) {
                    setIsAuthenticated(true);
                } else {
                    // If no local data and API fails, clear everything
                    TokenManager.removeToken();
                    UserDataManager.removeUserData();
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (userData: UserData, token: string) => {
        TokenManager.setToken(token);
        UserDataManager.setUserData(userData);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        TokenManager.removeToken();
        UserDataManager.removeUserData();
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        loadUser();
    }, []);

    return {
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshUser: loadUser
    };
};
