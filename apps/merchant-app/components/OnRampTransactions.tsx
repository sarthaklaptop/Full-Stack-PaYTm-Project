import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        fromUserId: number
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
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div>
                         
                        <span className={`text-sm ${
                            t.status == "Success" ? 'text-green-500' :
                            t.status == "Processing" ? 'text-gray-500':
                            'text-red-500'
                            }`}>
                            { 
                                t.status == "Success" ? 'Received INR' : 
                                t.status == "Processing" ? 'Processing' : 
                                'Failed'
                            }
                        </span>
                        &nbsp; 
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                    <div className="text-slate-600 text-sm">
                        from User <span className="text-black">{t.fromUserId}</span> 
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {
                        t.status == "Success" ? '+Rs' : 
                        t.status == "Processing" ? `${<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            
                          </svg>}` : 
                        ''
                    }
                    &nbsp; {t.amount / 100}   
                </div>

            </div>)}
        </div>
    </Card>
}