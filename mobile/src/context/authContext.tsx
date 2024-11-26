import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'axios';

import { fetchCurrentUser } from '@api/auth';

interface AuthContextData {
    authToken: string | null;
    user: any;
    loading: boolean;
    checkTokenChange: () => Promise<void>;
    handleLoginSuccess: (token: string) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<
    React.PropsWithChildren<AuthProviderProps>
> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadToken();
        // ถูกเรียก 2 รอบ รอแก้ไข
    }, []);

    const loadToken = async () => {
        const token = await AsyncStorage.getItem('authToken');
        console.log('loadToken');
        if (token) {
            setAuthToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await fetchUserData();
        }
        setLoading(false);
    };

    const checkTokenChange = async () => {
        const storedToken = await AsyncStorage.getItem('authToken');

        // ตรวจสอบถ้า token ใน AsyncStorage ไม่ตรงกับ authToken ที่มีอยู่
        if (storedToken !== authToken) {
            console.log('Token has changed, loading new token...');
            await loadToken();
        }
    };

    const fetchUserData = async () => {
        if (!authToken) return;

        try {
            const userData = await fetchCurrentUser(authToken);
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        }
    };

    const handleLoginSuccess = async (token: string) => {
        setAuthToken(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem('authToken', token);
        await fetchUserData();
        router.push('/dashboard');
    };

    const logout = async () => {
        setAuthToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        await AsyncStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                user,
                loading,
                handleLoginSuccess,
                logout,
                checkTokenChange,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
