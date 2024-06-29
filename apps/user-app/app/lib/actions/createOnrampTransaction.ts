"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnrampTransaction (amount: number, provider: string) {
    // alert("Clicked inside createOnrampTransaction")
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session?.user?.id;

    // console.log(`Inside OnClick Transactions`)
    
    if(!userId) {
        return {
            message: "User not logged in"
        }
    } 

    // console.log(`user id found ${userId}`)
    
    await prisma.onRampTransaction.create({
        data : {
            userId: Number(userId),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })

    // console.log(`On ramp transaction created and uodated in db ${traasaction}`)

    return {
        message: "On ramp  transaction added"
    }
}