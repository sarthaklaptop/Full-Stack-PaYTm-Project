import { getServerSession } from "next-auth";
import { ProfileCard } from "../../../components/ProfileCard";
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
    
    console.log("Labels:", lables);
    console.log("Data:", data);

    // const dataset = {
    //     label: "GFG",
    //     data: data,
    //     fill: false,
    //     borderColor: 'rgb(75, 192, 192)',
    //     tension: 0.1,
    // }

    // console.log(`Dataset ${dataset}`)
    
    // const chartData = {
    //     labels: lables,
    //     datasets: [dataset],
    // }

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
        <div className="gap-4 p-4">
            <div>
                <ProfileCard user={user}/>
            </div>
        </div>
        <div>
            <LineChart data={txns}/>
        </div>
    </div>
}