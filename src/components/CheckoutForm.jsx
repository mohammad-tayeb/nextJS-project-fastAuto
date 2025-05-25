"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CheckoutForm({ data }) {
    const router = useRouter()
    const session = useSession()  //get the user info "session.data.user"
    console.log(data)
    const handleCheckout = async (e) => {
        toast.loading("Processing User Info")
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const date = form.date.value;
        const due = form.due.value;
        const bookingPayload = {
            name, email, date, phone, address, due, service_id: data._id, service_name: data.title, service_img: data.img
        }
        console.log(bookingPayload)

        const res = await fetch('https://fast-automobiles.vercel.app/api/service', {
            method: "POST",
            body: JSON.stringify(bookingPayload)
        })
        const postedResponse = await res.json()
         console.log(postedResponse)
         if(postedResponse.insertedId){
            toast.dismiss()
            toast.success("Order Placed Successfully")
            router.push("/my-bookings")
         }
    }

    return (
        <div className="mx-14 mt-10">
            <div className="mt-3 text-center text-4xl font-bold">Checkout</div>
            <div className="mt-3 text-center text-2xl text-red-500">Service Name: {data?.title}</div>
            <form onSubmit={handleCheckout} className="p-8">
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
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4  shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="date"
                    />
                    <input
                        required
                        type="number"
                        name="due"
                        defaultValue={data?.price}
                        readOnly
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Due Amount*"
                    />
                </div>
                <div className="flex gap-4 my-2">
                    <input
                        required
                        type="number"
                        name="phone"
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4  shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Phone*"
                    />
                    <input
                        type="text"
                        name="address"
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Address*"
                    />
                </div>
                <div className="text-center my-10">
                    <button className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">
                        Checkout
                    </button>
                </div>
            </form>
        </div>
    );
};
