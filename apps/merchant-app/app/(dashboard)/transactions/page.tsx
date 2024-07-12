import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getBalance() {

    const session = await getServerSession(authOptions);

    const balance = await prisma.merchantBalance.findFirst({
        where: {
            merchantId: Number(session?.user?.id)
        }
    })

    return {
        amount: balance?.amount || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);

    const txns = await prisma.merchantOnRampTransaction.findMany({
        where: {
            merchantId: Number(session?.user?.id)
        }
    })

    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        fromUserId: t.fromUserId
    }))

}

export default async function () {

    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    // console.log(`transactions :- ${transactions}`)
    console.log(transactions)


    return(
        <div className="w-screen max-h-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transactions
            </div>
            <div>
                <BalanceCard amount={balance.amount} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    )
}