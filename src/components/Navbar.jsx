"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    const { data: session, status } = useSession()
    console.log(session, status)
    const navOptions = () => {
        return (
            <>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/about"}>About</Link></li>
                <li><Link href={"/services"}>Services</Link></li>
                <li><Link href={"/blog"}>Blog</Link></li>
                <li><Link href={"/my-bookings"}>Bookings</Link></li>

            </>
        )
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navOptions()}
                    </ul>
                </div>
                <Link href={"/"} className="md:ms-6 text-xl font-bold"><span className='text-red-500'>FAST</span><span className='text-gray-600'>AUTO</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions()}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    status == 'authenticated' ?
                        <><button onClick={() => signOut()} className='btn btn-md btn-ghost me-5 font-semibold'>Logout</button></>
                        :
                        <><Link className='btn btn-sm btn-ghost me-5' href={"/login"}>Login</Link></>
                }
                <Link href={"/appointments"} className="text-red-500 font-bold md:me-5">Appointment</Link>
            </div>
        </div>
    )
}
