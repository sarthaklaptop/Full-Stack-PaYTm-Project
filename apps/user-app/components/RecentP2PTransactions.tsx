import { Card } from "@repo/ui/card"

export const RecentP2PTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        toUser: number
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">
            No Recent transactions
        </div>
    </Card>
    }

    return <Card title="Recent Transactions">
        <div className="border p-6 mt-2 bg-white rounded-xl">
            {transactions.map(t => <div className="flex justify-between">
            <div>
                    <div className="text-sm">
                        <span className="text-green-700 font-bold">Received</span> INR FROM <span className="underline">{t.toUser}</span>
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

                {/* <hr /> */}
                {/* <br /> */}
            </div>)}
        </div>
    </Card>
}