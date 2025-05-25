import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export default async function ServiceDetailsPage({ params }) {
    const p = await params
    console.log(p)
    const res = await fetch(`https://fast-automobiles.vercel.app/api/service/${p.id}`) //loading 
    console.log(res)
    const data = await res.json()

    return (
        <div>
            {/* banner */}
            <div className='flex justify-center'>
                <figure className=' relative'>
                    <Image
                        height={300}
                        width={1137}
                        alt={'banner'}
                        src={"/assets/images/checkout/checkout.png"}>
                    </Image>
                    <div className='absolute w-full h-full top-0 bg-gradient-to-r from-black/60 to-transparent'>
                        <div>
                            <h1 className='text-white text-3xl font-bold pt-32 ps-10'>Service Details</h1>
                        </div>
                    </div>
                </figure>

            </div>
            {/* banner */}

            <div className='flex flex-row mt-20 ms-16'>
                <div className='me-10'><Image src={data.img} width={752} height={400} alt={data.title}></Image></div>
                <div>
                    <p className='text-red-500 font-semibold text-2xl mt-4'>Price: {data.price} Taka</p>
                    <Link href={`/checkout/${data._id}`} className="btn btn-md w-25  mt-5 bg-red-500 text-white hover:bg-red-700">Checkout<FaArrowRight></FaArrowRight></Link>
                </div>
            </div>
            <p>{p.id}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}
