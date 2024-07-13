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


### User Dashboard
<img src="https://github.com/user-attachments/assets/912cdab1-d3a3-479e-8e84-10a3fcbc8126" width="800">

<img src="https://github.com/user-attachments/assets/0f0992f2-a5eb-4881-936f-bc384d6762b0" width="800">

<img src="https://github.com/user-attachments/assets/568b6495-c338-4791-a981-3add4f2a8120" width="800">


### Merchant Dashboard
<img src="https://github.com/user-attachments/assets/fe1a63ac-7bd9-4ed7-abfb-f9cad6f38c6b" width="800">
<img src="https://github.com/user-attachments/assets/8cbd9fb9-c5c8-4252-9d3e-b10f12d51bf5" width="800">



