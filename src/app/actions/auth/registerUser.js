"use server"

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
export const registerUser = async (payload) => {
    const userCollection = await dbConnect(collectionNameObj.userCollection);

    const { email, password } = payload;
    if (!email || !password) return null
    const user = await userCollection.findOne({ email: payload.email });

    if (!user) {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        payload.password = hashedPassword;
        // insert the user into the database
        const result = await userCollection.insertOne(payload);
        result.insertedId = result.insertedId.toString()
        return result
    }
    return null

}

