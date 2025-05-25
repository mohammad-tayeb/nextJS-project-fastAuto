import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

//get single service data from DB
export const GET = async (req, { params }) => {
    // get the param
    const p = await params
    //get the single data using the param
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
    const query = { _id: new ObjectId(p.id) }
    const data = await bookingCollection.findOne(query)  //p.id because folder name is id
    // validation
    const session = await getServerSession(authOptions)
    if (session?.user?.email === data.email) {
        return NextResponse.json(data)
    }
    else{
        return NextResponse.json({ message: "Forbidden Action!" }, { status: 403 })
    }
}


// update single booking data
export const PATCH = async (req, { params }) => {
    // get the param
    const p = await params
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
    const body = await req.json()

    // validation
    const query = { _id: new ObjectId(p.id) }
    const session = await getServerSession(authOptions)
    const currentBookingData = await bookingCollection.findOne(query)
    if (session?.user?.email === currentBookingData.email) {
        const filter = {
            $set: { ...body }
        }

        const option = {
            upsert: true
        }
        const result = await bookingCollection.updateOne(query, filter, option)
        revalidatePath("/my-bookings")
        return NextResponse.json(result)
    }
    else {
        return NextResponse.json({ message: "Forbidden Update!" }, { status: 403 })
    }
}