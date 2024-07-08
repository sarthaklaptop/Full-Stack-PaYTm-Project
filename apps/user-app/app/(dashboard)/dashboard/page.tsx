import { getServerSession } from "next-auth";
import { ProfileCard } from "../../../components/ProfileCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";


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


export default async function() {

    const user = await getUserInfo();

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
    </div>
}