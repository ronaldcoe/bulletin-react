"use client"

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// import axios from 'axios'; // Assuming you use axios for HTTP requests

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Call your backend API to authenticate the user
    // For demonstration, we're using the login function directly
    login(email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
