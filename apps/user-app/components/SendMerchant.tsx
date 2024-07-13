"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/P2PTransfer";
import { merchantTransfer } from "../app/lib/actions/MerchantTransfer";
import toast from "react-hot-toast";

interface TransferResponse {
    success: boolean;
    message: string;
}

export function SendMerchant() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handleSend = async () => {
        const response: TransferResponse | any = await merchantTransfer(number, Number(amount) * 100);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      };

    return <div className="h-[90vh] w-full">
        <>
           <Card title="Send to Merchant">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Merchant Id" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button 
                            onClick={handleSend}
                        // onClick={async () => {
                        //     await merchantTransfer(number, Number(amount)*100)
                        // }}
                        >Send</Button>
                    </div>
                </div>
            </Card>
        </>
    </div>
}