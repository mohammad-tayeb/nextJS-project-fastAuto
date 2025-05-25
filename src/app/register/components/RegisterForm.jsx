"use client"
import React from 'react';
import Link from 'next/link';  // ✅ Important import
import { registerUser } from '@/app/actions/auth/registerUser';

export default function RegisterForm() {
    const handleRegister = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value
        const email = form.email.value;
        const password = form.password.value;
        await registerUser({ name, email, password })
    }
    return (
        <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input type="text" name='name' className="input w-[450px]" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input type="email" name='email' className="input w-[450px]" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="password" name='password' className="input w-[450px]" placeholder="Type here" />
            </fieldset>
            <button className="btn mt-4 text-white bg-red-500 w-full hover:bg-red-700">Register</button>
            <p className='mt-2'>
                Already have an account? <Link href="/login" className='text-red-500 font-semibold'>Login</Link>
            </p>
        </form>
    );
}
