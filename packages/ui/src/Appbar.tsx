import { Button } from "./button";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from 'next/link';


interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="text-lg flex flex-col justify-center">
            <Link href="/">
                PayTM
            </Link>
        </div>
        <div className="flex justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            {
                user && (<Link href="/profile">
                    
                        <FaRegCircleUser size={24} />
                    
                </Link>)
            }
        </div>
    </div>
}