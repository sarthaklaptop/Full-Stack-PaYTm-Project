import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import LineChart from "../../../components/Chart";
import { authOptions } from "../../../lib/auth";
import QRCode from "../../../components/QRCode";



async function getUserInfo() {
    const session = await getServerSession(authOptions);

    const merchant = await prisma.merchant.findFirst({
        where: {
            id: Number(session?.user?.id)
        }
    })


    return {
        name: merchant?.name,
        id: merchant?.id
    }
}

async function getTransactions() {

    const session = await getServerSession(authOptions);

    const transactions = await prisma.merchantOnRampTransaction.findMany({
        where: {
          merchantId: Number(session?.user?.id),
          status: 'Success'
        }
    })

    console.log(`transactions :- \n ${JSON.stringify(transactions)}`);

    const lables = transactions.map(transactions => transactions.amount);
    
    const data = transactions.map(transactions => transactions.amount);

    return {
        lables,
        data   
    }
}


export default async function() {

    const user = await getUserInfo();
    const txns = await getTransactions();


    // console.log(user);

    return <div className="w-screen max-h-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Merchant Dashboard
        </div>
        
        <div className="flex items-center justify-evenly">
            <div className="w-3/4">
                <LineChart data={txns} user={user}/>
            </div>
            <div>
                <QRCode user = {user}/>
            </div>
        </div>
    </div>
}