'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function merchantTransfer(to: string, amount: number) {
    console.log("Inside Merchant Transfer");

    const session = await getServerSession(authOptions);
    const userId = await session?.user?.id;

    if(!userId) {
        return {
            message: "Error while sending"
        }
    }
    
    const toMerchant = await prisma.merchant.findFirst({
        where: {
            id: Number(to)
        }
    })

    if(!toMerchant) {
        return {
            message: "Merchant not found"
        }
    }

    const checkBalance = await prisma.balance.findFirst({
        where: {
            userId: userId
        }
    })

    if(!checkBalance) {
        return {
            message: "User balance not found"
        }
    }

    if(checkBalance.amount < amount) {
        return {
            message: "Insufficient Balance"
        }
    }

    await prisma.$transaction(async (tx) => {
        
    })

}