import dbConnect, { collectionNameObj } from '@/lib/dbConnect'
import { FaArrowRight } from 'react-icons/fa'; 
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';

export default async function ServicesSecion() {
    // const res = await fetch("/services.json")
    const serviceCollection = dbConnect(collectionNameObj.serviceCollection) //connect to db using a function
    const data = await serviceCollection.find({}).toArray() //find all data and make an array

    return (
        <div className='grid gap-10 grid-cols-12 p-10'>
            {
                data.map(item => {
                    return (
                        <div className='col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-center shadow-sm px-4 py-10 rounded' key={item._id}>
                            <Image src={item.img} width={314} height={208} alt={item.title} />
                            <h1 className='text-2xl pt-2 font-bold'>{item.title}</h1>
                                <p className='font-bold text-red-500 me-20'>Price: {item.price} Taka</p>
                                <Link href={`/services/${item._id}`} className="btn btn-sm w-25 mt-4 bg-gray-700 text-white hover:bg-gray-900">Details<FaArrowRight></FaArrowRight></Link>
                        </div>
                    )
                })
            }
        </div>
    )

}
