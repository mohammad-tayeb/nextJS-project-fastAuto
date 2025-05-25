"use client"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { GithubLoginButton } from 'react-social-login-buttons'
import { GoogleLoginButton } from 'react-social-login-buttons'

export default function SocialLogin() {
    const session = useSession()
    const router = useRouter()
    const handleSocialLogin = async (providerName) => {
        toast("Processing...")
        signIn(providerName)
    }
    useEffect(()=>{
        if(session?.status == "authenticated"){
            router.push("/")
        }
    },[session?.status])
    return (
        <div className='mt-5 mb-10'>
            <div onClick={() => handleSocialLogin("google")}>
                <GoogleLoginButton style={{ fontSize: '14px', padding: '8px 12px', height: '40px' }} />
            </div>
            <div onClick={() => handleSocialLogin("github")}>
                <GithubLoginButton style={{ fontSize: '14px', padding: '8px 12px', height: '40px' }} />
            </div>
        </div>
    )
}
