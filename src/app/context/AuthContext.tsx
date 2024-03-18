"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User } from '../interfaces/User';
import toast from 'react-hot-toast';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null); 

  
  useEffect(() => {
    const rehydrateUser = async () => {
      const token = Cookies.get('userToken');
      if (token) {
        
        setUser(JSON.parse(token));
      }
    };

    rehydrateUser();
  }, []);

  const login = async (email: string, password: string) => {
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const data = await response.json();
            if (!response.ok) {
              throw new Error('Login failed');
            }
            setUser(data.user);
            Cookies.set('userToken', JSON.stringify(data.user), { expires: 7 });
            return data
    } catch (error) {
        return null        
    }
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out');
    Cookies.remove('userToken');
  
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
