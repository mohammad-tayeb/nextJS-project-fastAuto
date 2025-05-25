"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function BookingUpdateForm({ data }) {
    const router = useRouter()
    const session = useSession()  //get the user info "session.data.user"
    console.log(data)
    const handleUpdateBooking = async (e) => {
        toast.loading("Processing User Info")
        e.preventDefault()
        const form = e.target;
        const phone = form.phone.value;
        const address = form.address.value;
        const date = form.date.value;
        const bookingPayload = {
            date, phone, address
        }
        console.log("Update Data:", bookingPayload)

        const res = await fetch(`https://fast-automobiles.vercel.app/api/my-bookings/${data._id}`, {
            method: "PATCH",
            body: JSON.stringify(bookingPayload)
        })
        const updateResponse = await res.json()
        console.log(updateResponse)
        if (updateResponse.modifiedCount>0) {
            toast.dismiss()
            toast.success("Updated Successfully")
        }
        router.push("/my-bookings")
    }

    return (
        <div className="mx-14 mt-10">
            <div className="mt-3 text-center text-4xl font-bold">Update</div>
            <div className="mt-3 text-center text-2xl text-red-500">Service Name: {data?.service_name}</div>
            <form onSubmit={handleUpdateBooking} className="p-8">
                <div className="flex gap-4 my-2">
                    <input
                        type="text"
                        name="name"
                        defaultValue={session?.data?.user?.name}
                        readOnly
                        required
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4  shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Full Name *"
                    />
                    <input
                        required
                        type="email"
                        readOnly
                        defaultValue={session?.data?.user?.email}
                        name="email"
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Email *"
                    />
                </div>
                <div className="flex gap-4 my-2">
                    <input
                        required
                        type="date"
                        name="date"
                        defaultValue={data.date}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4  shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="date"
                    />
                    <input
                        required
                        type="number"
                        name="due"
                        defaultValue={data?.due}
                        readOnly
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Due Amount*"
                    />
                </div>
                <div className="flex gap-4 my-2">
                    <input
                        required
                        type="number"
                        defaultValue={data?.phone}
                        name="phone"
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4  shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Phone*"
                    />
                    <input
                        type="text"
                        name="address"
                        defaultValue={data?.address}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Address*"
                    />
                </div>
                <div className="text-center my-10">
                    <button className="btn btn-sm bg-red-500 hover:bg-red-700 px-8 py-5 text-sm font-semibold text-white">
                        Update Booking
                    </button>
                </div>
            </form>
        </div>
    );
};
