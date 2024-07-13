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
            userId: Number(userId)
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

    try {
        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
            await tx.$queryRaw`SELECT * FROM "MerchantBalance" WHERE "merchantId" = ${Number(to)} FOR UPDATE`;
    
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(userId)},
            });
    
            if(!fromBalance) {
                throw new Error('Your Balance cant be fetched');
            }
    
            if (fromBalance.amount < amount) {
                // toast.error('Insufficient funds')
                throw new Error('Insufficient funds');
            }
    
            await tx.balance.update({
                where: { userId: Number(userId) },
                data: { amount: { decrement: amount } },
            });
    
            await tx.merchantBalance.update({
                where: { merchantId: Number(to) },
                data: { amount: { increment: amount } },
            })
    
            const token = Math.random().toString();
    
            await tx.merchantOnRampTransaction.create({
                data: {
                    merchantId: Number(to),
                    amount: amount,
                    startTime: new Date(),
                    fromUserId: Number(userId),
                    status: "Success",
                    token: token
                }
            })
    
            // toast.success
            
        })
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error.message
        };
    }

}