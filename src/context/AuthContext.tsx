'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
  user: { name: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('pace-fest-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (email: string) => {
    const newUser = { name: email.split('@')[0], email };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('pace-fest-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('pace-fest-user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
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
