"use client"
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import { useRouter } from 'next/navigation'; // Ensure correct import path
import toast from 'react-hot-toast';

export const useRequireAuth = (redirectTo = '/login') => {
  const { user, loading } = useAuth(); // Destructure `loading` from the context
  const router = useRouter();

  useEffect(() => {
    // Only perform actions if loading is complete
    if (!loading) {
      // If loading is false and user is null, redirect and show a toast message
      if (user === null) {
        toast.error('You must be logged in to do this');
        router.push(redirectTo);
      }
    }
    // React to changes in `loading`, `user`, `router`, and `redirectTo`
  }, [loading, user, router, redirectTo]);

  return user;
};
