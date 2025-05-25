import DeleteBooking from '@/app/my-bookings/components/DeleteBookingButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function BookingTable({ bookingData }) {
    return (
        <div className="overflow-x-auto p-6 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Booking Records</h2>
            <table className="min-w-full divide-y divide-gray-200 border shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Due ($)</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Delete</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Edit</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {
                        bookingData?.map((item, idx) =>
                            <tr key={idx}>
                                <td className="px-4 py-2 text-sm text-gray-700">{item._id}</td>
                                <td className="px-4 py-2 text-sm text-gray-700"><Image src={item.service_img} height={50} width={50} alt='service img'></Image></td>
                                <td className="px-4 py-2 text-sm text-gray-700 font-medium">{item.service_name}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.phone}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.address}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.date}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">${item.due}</td>
                                <td className="px-4 py-2 text-sm text-red-500 font-bold ">
                                    <DeleteBooking id={item._id}></DeleteBooking>
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link href={`/my-bookings/${item._id}`} className='btn btn-sm bg-yellow-500 text-white hover:bg-yellow-700'>Edit
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
