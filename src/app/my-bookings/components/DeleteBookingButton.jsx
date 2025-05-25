"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'


export default function DeleteBooking({ id }) {
    const router = useRouter()

    const handleDeleteBooking = async (id) => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                const confirmed = window.confirm("Are you sure you want to delete this item?");
                if (!confirmed) {
                    reject("Deletion cancelled.");
                    return;
                }

                try {
                    const res = await fetch(`https://fast-automobiles.vercel.app/api/service/${id}`, {
                        method: "DELETE",
                    });
                    const data = await res.json();

                    if (data.deletedCount > 0) {
                        resolve("Deleted Successfully");
                        router.refresh();
                    } else {
                        reject("Deletion failed.");
                    }
                } catch (error) {
                    reject("An error occurred while deleting.");
                }
            }),
            {
                loading: "Deleting...",
                success: "Item deleted successfully!",
                error: (errMsg) => errMsg || "Deletion cancelled.",
            }
        );
    };

    // console.log("Bookings:", bookingData)
    return (
        <button
            className='btn btn-sm bg-red-500 text-white hover:bg-red-700'
            onClick={() => handleDeleteBooking(id)}>Delete
        </button>
    )
}
