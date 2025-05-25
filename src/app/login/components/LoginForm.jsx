"use client";
import Link from 'next/link'
import React from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
    const router = useRouter()
    const handleLogin = async (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if (!email || !password) {
            toast.error("Enter email and password!")
            return
        }
        toast('Proccessing...')
        try {
            const response = await signIn("credentials", { email, password, callbackUrl: "/", redirect: false })
            console.log(response)
            if (response.ok) {
                toast.success("Login Successfull")
                router.push("/")
                form.reset()
            }
            else {
                toast.error("Authentication Failed")
                form.reset()
            }
        } catch (error) {
            console.log(error)
            alert('failed to authenticate')
        }

    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input type="email" name='email' className="input w-[450px]" placeholder="Type here" />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="password" name='password' className="input w-[450px]" placeholder="Type here" />
                </fieldset>
                <button className="btn mt-4 text-white bg-red-500 w-full hover:bg-red-700">Login</button>
                <p className='mt-2'>Do not have an account? <Link href={"/register"} className='text-red-500 font-semibold'>Register</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </>
    )
}

