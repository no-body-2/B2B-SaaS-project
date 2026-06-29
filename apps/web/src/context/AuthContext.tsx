'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 초기화 시 로컬 세션 또는 백엔드 세션 확인
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const at = localStorage.getItem('accessToken');
        if (at) {
          const res = await apiClient.user.getMe();
          setUser(res.data);
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
        // 토큰이 유효하지 않으면 정리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await apiClient.auth.login({ email, password });
      const { user: userPayload, accessToken, refreshToken } = res.data;
      
      // 토큰 및 세션 정보 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('currentUser', JSON.stringify(userPayload));
      
      setUser(userPayload);
    } catch (err) {
      console.error('Login request failed:', err);
      throw err;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await apiClient.auth.register({ email, password, name });
    } catch (err) {
      console.error('Registration request failed:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiClient.auth.logout();
    } catch (err) {
      console.error('Logout error (continuing client clean):', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      setUser(null);
    }
  };

  const deleteAccount = async () => {
    try {
      await apiClient.user.deleteMe();
    } catch (err) {
      console.error('Account delete error:', err);
      throw err;
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
