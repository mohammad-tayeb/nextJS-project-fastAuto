import Image from 'next/image'
import React from 'react'
import LoginForm from './components/LoginForm'

export default function Login() {
    return (
        <div>
            <h1 className='text-center font-bold text-3xl text-red-500'>Login</h1>
            <div className='flex flex-col md:flex-row justify-center items-center py-10'>
                <Image className='md:me-28' src={"/assets/images/login/login.svg"} alt='login png' height={302} width={260}></Image>
                {/* right side */}
                <div>
                    <LoginForm></LoginForm>
                </div>
                {/* right side */}
            </div>
        </div>
    )
}