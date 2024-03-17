"use client"
import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
export default function Signup () {
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState<string | null>(null);


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({name, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
                
            })
            if (response.ok) {
                toast.success(response.statusText);
            } else {
                toast.error(response.statusText);
            }
           
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <div className="md:fit bg-white mx-auto flex rounded shadow">
        <div className="p-8 bg-blue-50 w-[500px] flex-col justify-between hidden md:flex">
        <h1 className="text-xl text-blue-700 font-bold">Bulletin App</h1>
        <Image src="./signup.svg" className='block mx-auto w-64 h-64' width={100} height={100} alt='image'/>
        <a href="https://ronaldcoello.com/" className="text-xs hover:underline" target="_blank">Made by Ronald Coello</a>
    </div>
    <div className="py-8 px-4 md:px-32 w-full md:max-w-[550px] min-w-[300px]">
        <h1 className="text-md mb-8 font-bold text-gray-700">Start by creating an account</h1>
        <form>
            <label className='label'>
            Name
            <input className='input' type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            </label>
            <label className='label'>
            Email
            <input className='input' type="email" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
            </label>
            <label className='label'>
            Password
            <input className='input' type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            </label>
            <label className='label'>
            Password confirmation
            <input className='input' type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)} />
            </label>
            <button className='button mt-8 w-full' onClick={(e)=>handleSubmit(e)}>Sign Up</button>
        </form>
        
    </div>
</div>
       

    );
}