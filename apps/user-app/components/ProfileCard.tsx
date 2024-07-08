"use client"

import { Card } from "@repo/ui/card"
import { ShowText } from "@repo/ui/showtext"

export const ProfileCard = ({user}: any) => {
    return(
        <div className="w-3/4">
            <Card title="Personal information">
                <div className="py-7">
                    <div className="grid grid-cols-2">
                        <p>id</p>
                        <ShowText text = {user.id}/>
                    </div>
                    <div className="flex grid-cols-">
                        <p>Name</p>
                        <ShowText text = {user.name}/>
                    </div>
                    <div className="flex justify-between">
                        <p>Number</p>
                        <ShowText text = {user.number}/>
                    </div>
                </div>
            </Card>
        </div>
    )
}