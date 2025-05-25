import BookingTable from '@/components/BookingTable'
import { headers } from 'next/headers'

const getBookingData = async () => {
    const res = await fetch('https://fast-automobiles.vercel.app/api/service',{
        headers: new Headers(await headers())
    })
    const data = await res.json()
    return data
}

export default async function MyBookings() {
    const data = await getBookingData()

    return (
        < BookingTable bookingData={data}></BookingTable>
    )
}
