'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  type: 'admin' | 'participant';
  yearOfStudy?: number;
  collegeName?: string;
  location?: string;
  usn?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (type: 'admin' | 'participant', credentials: any) => Promise<void>;
  register: (type: 'admin' | 'participant', data: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedToken = localStorage.getItem('auth-token');
    const storedUser = localStorage.getItem('auth-user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = async (type: 'admin' | 'participant', credentials: any) => {
    try {
      const endpoint = type === 'admin' ? '/api/admin/login' : '/api/participant/login';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);
      setIsLoggedIn(true);

      localStorage.setItem('auth-token', data.token);
      localStorage.setItem('auth-user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (type: 'admin' | 'participant', data: any) => {
    try {
      const endpoint = type === 'admin' ? '/api/admin/register' : '/api/participant/register';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Registration failed');
      }

      setToken(responseData.token);
      setUser(responseData.user);
      setIsLoggedIn(true);

      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('auth-user', JSON.stringify(responseData.user));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
