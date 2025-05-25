import Image from 'next/image'
import React from 'react'
import RegisterForm from './components/RegisterForm'
import SocialLogin from '../login/components/SocialLogin'

export default function page() {
    return (
        <div>
            <h1 className='text-center font-bold text-3xl text-red-500'>Register</h1>
            <div className='flex flex-col md:flex-row justify-center items-center py-10'>
                <Image className='md:me-28' src={"/assets/images/login/login.svg"} alt='login png' height={302} width={260}></Image>
                <div>
                    <RegisterForm></RegisterForm>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    )
}