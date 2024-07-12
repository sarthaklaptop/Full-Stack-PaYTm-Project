import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '1111111111' },
    update: {},
    create: {
      number: '1111111111',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      Balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '2222222222' },
    update: {},
    create: {
      number: '2222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      Balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  })

  const merchant = await prisma.merchant.upsert({
    where: { email: 'sarthak@gmail.com' },
    update: {},
    create: {
      email: 'sarthak@gmail.com',
      password: await bcrypt.hash('bob', 10),
      name: 'Sarthak',
      MerchantBalance: {
        create: {
          amount: 250000,
          locked: 0,
        }
      },
      MerchantTransaction: {
        create: {
          amount: 250000,
          transactionDate: new Date('2024-02-22')
        }
      },
      Merchantwithdrawal: {
        create: {
          amount: 25000,
          withdrawDate: new Date('2022-12-21') 
        }
      },
      MerchantOnRampTransaction: {
        create: {
          startTime: new Date('2022-12-21'),
          status: "Success",
          amount: 2000,
          token: "token__22",
          fromUserId: alice.id
        }
      }
    }
  })
  console.log({ alice, bob, merchant})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })