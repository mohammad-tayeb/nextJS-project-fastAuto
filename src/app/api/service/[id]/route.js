import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/authOptions"
import { revalidatePath } from "next/cache"

//get single service data from DB
export const GET = async (req, { params }) => {
    // get the param
    const p = await params
    //get the single data using the param
    const serviceCollection = dbConnect(collectionNameObj.serviceCollection)
    const data = await serviceCollection.findOne({ _id: new ObjectId(p.id) })  //p.id because folder name is id
    console.log(data)
    return NextResponse.json(data)
}


//delete single booking data from DB
export const DELETE = async (req, { params }) => {
    const p = await params;
    const query = { _id: new ObjectId(p.id) }
    // validate user
    const session = getServerSession(authOptions)
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection);
    const userDataFromDB = bookingCollection.findOne(query) //getting the data that user wants to delete
    // conditionaly delete
    if (session?.user?.email === userDataFromDB.email) {
        const res = await bookingCollection.deleteOne(query)
        revalidatePath("/my-bookings")
        return NextResponse.json(res)
    }
    else {
        return NextResponse.json({ message: "Forbidden Action", success: false }, { status: 401 })
    }
}