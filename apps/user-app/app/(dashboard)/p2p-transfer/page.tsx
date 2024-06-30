import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { RecentP2PTransactions } from "../../../components/RecentP2PTransactions";

async function getRecentP2PTransaction() {
    const session = await getServerSession(authOptions);

    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }

    })

    console.log(txns)

    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        toUser: t.toUserId        
    }))
}

export default async function() {

    const transactions = await getRecentP2PTransaction();

    return <div className="w-screen max-h-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P Transfer
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">

            <div>
                <SendCard/>
            </div>

            <div>
                <RecentP2PTransactions transactions = {transactions}/>
            </div>

        </div>

        
            
    </div>
}