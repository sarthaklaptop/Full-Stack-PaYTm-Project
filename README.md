- Clone the repo

```jsx
git clone https://github.com/sarthaklaptop/Full-Stack-PaYTm-Project.git
```

- npm install
- Run postgres either locally or on the cloud (neon.tech) / Docker

```jsx
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

- Copy over all .env.example files to .env
- Update .env files everywhere with the right db url
- Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`
- Go to `apps/merchant-app` , run `npm run dev`
- Go to `apps/bank-weebhook` , run `npm run dev`
- For User
   - Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)
- For Merchant
   - Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)

## Tech Stack

**Client:** Next, Recoil, TailwindCSS

**Server:** Postgres, Prisma

## Screenshots

**User Dashboard:**
![User_Dashboard](file:///home/sarthaksystumm/Downloads/User_dashboard.png)
![User_Deposit](file:///home/sarthaksystumm/Downloads/User_deposit.png)
![User_To_Merchant](file:///home/sarthaksystumm/Downloads/User_merchant-transaction.png)

**Merchant Dashboard:**
![Merchant_Dashboard](file:///home/sarthaksystumm/Downloads/Merchant_Dashboard.png)
![Merchant_Transactions](file:///home/sarthaksystumm/Downloads/Merchant_Transactions.png)


