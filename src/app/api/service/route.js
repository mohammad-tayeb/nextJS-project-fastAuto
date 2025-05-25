import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

//data receiving from user and sending to DB
export const POST = async (req) => {
    const body = await req.json()
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
    const result = await bookingCollection.insertOne(body)
    return NextResponse.json(result)
}


// getting data from DB and sending the response to backend
export const GET = async (req) => {
    const session = await getServerSession(authOptions)
    if (session) {
        const email = session?.user?.email;
        const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
        const result = await bookingCollection.find({ email }).toArray()
        return NextResponse.json(result)
    }

}