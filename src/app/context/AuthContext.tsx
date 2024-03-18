// "use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User } from '../interfaces/User'; // Ensure this interface accurately reflects the user data
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean; // Add a loading state
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    const rehydrateUser = async () => {
      const token = Cookies.get('userToken');
      if (token) {
        try {
          // Assuming your token stores a stringified user object
          // In a real application, you might want to verify the token's validity with your backend
          const userData: User = JSON.parse(token);
          setUser(userData);
        } catch (error) {
          console.error('Failed to parse user data from token', error);
        }
      }
      setLoading(false); // Set loading to false after attempting to rehydrate user
    };

    rehydrateUser();
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
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
      return data.user;
    } catch (error) {
      toast.error('Login failed');
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out');
    Cookies.remove('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
