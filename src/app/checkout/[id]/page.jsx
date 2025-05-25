import CheckoutForm from '@/components/CheckoutForm'
import React from 'react'

export default async function CheckoutPage({ params }) {
    const p = await params
    console.log(p)
    const res = await fetch(`https://fast-automobiles.vercel.app/api/service/${p.id}`)
    console.log(res)
    const data = await res.json()
    return (
        <div>
            <CheckoutForm data={data}></CheckoutForm>
        </div>
    )
}
