import { SendMerchant } from "../../../components/SendMerchant";

export default function () {
    return (
        <div className="w-screen max-h-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Merchant Transfer
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">

                <SendMerchant/>

            </div>
        </div>
    )
}