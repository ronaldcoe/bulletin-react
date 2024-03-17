"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: any; // Consider defining a more specific type for your user object
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Consider defining a more specific type for your user object

  const login = async (email: string, password: string) => {
    // Implement login logic here, possibly setting the user state
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const data = await response.json();
            setUser(data.user);
    } catch (error) {
        console.error('Login failed', error);
        
    }
  };

  const logout = () => {
    setUser(null);
    // Clear cookies or any storage used for the session
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
