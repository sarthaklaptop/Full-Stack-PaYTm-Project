"use client"

import { Card } from "@repo/ui/card"
import { ShowText } from "@repo/ui/showtext"
import { MdContentCopy } from "react-icons/md"

export const ProfileCard = ({user}: any) => {
    return(
        <div className="w-3/4">
            <Card title="Personal information">
                <div className="py-7 flex flex-col gap-2 ">
                    <div className="grid grid-cols-2 border p-6 items-center bg-white rounded-xl ">
                        <p className="w-1/3 flex items-center">Wallet id</p>
                        <div className="w-2/3 flex items-center">
                            <ShowText text = {user.id} icon={<MdContentCopy />}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border p-6 bg-white rounded-xl">
                        <p className="w-1/3">Name</p>
                        <ShowText  text = {user.name}/>
                    </div>
                    <div className="grid grid-cols-2 border p-6 bg-white rounded-xl">
                        <p className="w-1/3">Number</p>
                        <ShowText text = {user.number}/>
                    </div>
                </div>
            </Card>
        </div>
    )
}