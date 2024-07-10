import prisma from '@repo/db/client';
import { authOptions } from '../../lib/auth';
import { ProfileCard } from '../../../components/ProfileCard';
import { getServerSession } from "next-auth";
import { Card } from '@repo/ui/card';


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

export default async function () {

    const user = await getUserInfo();

    return <div  className="w-screen max-h-screen m-10">
        <Card title='Profile'>
            <div className="gap-4 p-4 ">
                <div>
                    <ProfileCard user={user}/>
                </div>
            </div>
        </Card>
    </div>
    
}