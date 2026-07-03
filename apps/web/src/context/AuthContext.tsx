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
  googleLogin: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 유저 정보에 name 필드가 누락되었거나 firstName/lastName이 분리되었을 경우 보정하는 헬퍼
  const formatUser = (rawUser: any): User | null => {
    if (!rawUser) return null;
    const nameCombined = (rawUser.firstName || rawUser.lastName)
      ? `${rawUser.firstName || ''} ${rawUser.lastName || ''}`.trim()
      : (rawUser.name || rawUser.email);
    return {
      id: rawUser.id || rawUser.userId,
      email: rawUser.email,
      name: nameCombined,
    };
  };

  // 초기화 시 로컬 세션 또는 백엔드 세션 확인
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const at = localStorage.getItem('accessToken');
        if (at) {
          const res = await apiClient.user.getMe();
          setUser(formatUser(res.data));
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
      
      setUser(formatUser(userPayload));
    } catch (err) {
      console.error('Login request failed:', err);
      throw err;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const trimmedName = name.trim();
      let lastName = '';
      let firstName = trimmedName;

      // 이름 분석 파싱
      if (trimmedName.includes(' ')) {
        const parts = trimmedName.split(' ');
        lastName = parts[0];
        firstName = parts.slice(1).join(' ');
      } else if (trimmedName.length > 1 && trimmedName.length <= 4) {
        lastName = trimmedName.substring(0, 1);
        firstName = trimmedName.substring(1);
      }

      await apiClient.auth.register({ 
        email, 
        password, 
        firstName, 
        lastName 
      });
    } catch (err) {
      console.error('Registration request failed:', err);
      throw err;
    }
  };

  const googleLogin = async (code: string) => {
    try {
      let userPayload;
      let accessToken;
      let refreshToken;

      // 백엔드 소스코드 보호를 위해 프런트엔드 단독 시뮬레이션 처리
      if (code.startsWith('mock-')) {
        userPayload = {
          id: 'usr-google-mock-1',
          email: 'mock-google-user@example.com',
          firstName: '모의구글',
          lastName: '유저',
        };
        accessToken = `mock_google_at_${Date.now()}`;
        refreshToken = `mock_google_rt_${Date.now()}`;
      } else {
        const res = await apiClient.auth.googleLogin({ code });
        userPayload = res.data.user;
        accessToken = res.data.accessToken;
        refreshToken = res.data.refreshToken;
      }
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('currentUser', JSON.stringify(userPayload));
      
      setUser(formatUser(userPayload));
    } catch (err) {
      console.error('Google login failed:', err);
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
    <AuthContext.Provider value={{ user, loading, login, register, logout, deleteAccount, googleLogin }}>
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
