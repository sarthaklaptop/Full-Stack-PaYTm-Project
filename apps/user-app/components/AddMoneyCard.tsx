"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { ChangeEvent, useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnrampTransaction } from "../app/lib/actions/createOnrampTransaction";
import toast from "react-hot-toast";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

async function onButtonClick(amount: number, provider: string) {
    await createOnrampTransaction(amount * 100, provider);
    toast.success("Processing Your Transactions")

}

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");


    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} type={"number"} placeholder={"Amount"} onChange={(val) => {
            setAmount(Number(val))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(amount) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === amount)?.redirectUrl || "");
            setProvider(SUPPORTED_BANKS.find(x => x.name === amount)?.name || "");
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => { onButtonClick(amount, provider) }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}