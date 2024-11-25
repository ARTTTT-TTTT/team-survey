import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { fetchCurrentUser } from '@api/auth'; 

interface AuthContextData {
  authToken: string | null;
  user: any;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

// ใช้ Custom Hook เพื่อเรียกใช้ Context ได้สะดวกขึ้น
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // โหลด token จาก Local Storage ตอนเริ่มต้น
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await fetchUserData();
      }
      setLoading(false);
    };
    loadToken();
  }, []);

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

  const login = async (token: string) => {
    setAuthToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await AsyncStorage.setItem('authToken', token);
    await fetchUserData();
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
        login,
        logout,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
