import BookingUpdateForm from '@/components/BookingUpdateForm'
import { headers } from 'next/headers'
import React from 'react'

export default async function UpdateBookings({ params }) {
    const p = await params
    const res = await fetch(`https://fast-automobiles.vercel.app/api/my-bookings/${p.id}`,{
        headers: new Headers(await headers())
    })
    const data = await res.json()
    return (
        <BookingUpdateForm data={data}></BookingUpdateForm>
    )
}
