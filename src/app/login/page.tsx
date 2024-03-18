"use client"

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Call your backend API to authenticate the user
    // For demonstration, we're using the login function directly
    
    try {
      const result = await login(email, password);
  
      if (result) {
        toast.success('Logged in');
        router.push('/');
      } else {
        toast.error('Invalid email or password');
      }
    }
    catch (error) {
      console.error('Login failed', error);
    }
   
  };

  return (
    <div className="md:fit bg-white mx-auto flex rounded shadow">
    <div className="p-8 bg-blue-50 w-[500px] flex flex-col justify-between hidden md:flex">
        <h1 className="text-xl text-blue-700 font-bold">Bulletin App</h1>
        <Image src="./signup.svg" className='block mx-auto w-64 h-64' width={100} height={100} alt='image'/>
        <a href="https://ronaldcoello.com/" className="text-xs hover:underline" target="_blank">Made by Ronald Coello</a>
    </div>
    <div className="py-8 px-4 md:px-32 w-full md:max-w-[550px] min-w-[300px] z-10">
        <h1 className="text-md mb-8 font-bold text-gray-700">Log in</h1>

        <form onSubmit={handleSubmit}>
        <label className='label'>
          Email
          <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className='label'>
          Password
          <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='button w-full mt-8' onClick={(e:any)=> handleSubmit(e)}>Log In</button>
        <hr className="mt-8" />
        <a href="/signup" className="block text-center border w-full hover:bg-slate-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8">Create an account</a>
      </form>
    </div>
</div>
    
  );
}
