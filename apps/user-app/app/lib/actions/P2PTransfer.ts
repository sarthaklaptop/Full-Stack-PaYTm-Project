"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    // console.log("Inside P2P transfer")
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(userId) },
          });
          if( !fromBalance ) {
            throw new Error("Your Balance can't be fetched");
          }

          if (fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(userId) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(userId),
                toUserId: toUser.id,
                amount,
                timestamp: new Date()
            }
          })
    });
}