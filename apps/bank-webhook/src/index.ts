import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

interface ToMerchantRequestBody {
    token: string;
    merchantId: string;
    amount: string;
}


app.post("/hdfcWebhook", async (req, res) => {
    console.log("Inside hdfcWebhook")
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.post("/toMerchant"), async (req: any, res: any) => {

    console.log("Inside toMerchant");

    // @ts-ignore
    const body = req.body as ToMerchantRequestBody;
    
    const paymentInformation = {
        token: body.token,
        merchantId: body.merchantId,
        amount: body.amount
    };

    try {

        await db.$transaction([
            db.merchantBalance.updateMany({
                where: {
                    merchantId: Number(paymentInformation.merchantId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.merchantOnRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })

        ])
        res.json({
            message: "Captured"
        })
        
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing user-merchant webhook"
        })
    }

}

app.listen(3003, () => {
    console.log("Server running on port 3003");
});