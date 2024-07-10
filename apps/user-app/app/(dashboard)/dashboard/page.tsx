import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import LineChart from "../../../components/Chart";


async function getUserInfo() {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.user?.id)
        }
    })


    return {
        name: user?.name,
        number: user?.number,
        id: user?.id
    }
}

async function getTransactions() {

    const session = await getServerSession(authOptions);

    const transactions = await prisma.onRampTransaction.findMany({
        where: {
          userId: Number(session?.user?.id),
          status: 'Success'
        }
    })

    const lables = transactions.map(transactions => transactions.startTime.toISOString());
    
    const data = transactions.map(transactions => transactions.amount);

    return {
        lables,
        data   
    }
}


export default async function() {

    const user = await getUserInfo();
    const txns = await getTransactions();


    console.log(user);

    return <div className="w-screen max-h-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Dashboard
        </div>
        
        <div>
            <LineChart data={txns} user={user}/>
        </div>
    </div>
}