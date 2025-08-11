### Bean Counter
An APP that manages shared transactions between two people. The basic feature is that it allows users to record transactions in a shared board with details including date, item, total amount, number of people involved, and who paid. Both users in a shared board can add and edit all transactions, with tracking of who added each transaction.

## Database Schema

### Shared Boards (`shared_boards`)
- `id`: UUID primary key
- `user1_id`: First user in the shared board (references auth.users)
- `user2_id`: Second user in the shared board (references auth.users)
- `board_name`: Name of the shared board (default: 'Shared Expenses')
- `created_at`, `updated_at`: Timestamps

### Transactions (`transactions`)
- `id`: UUID primary key
- `shared_board_id`: References the shared board this transaction belongs to
- `date`: Transaction date
- `item`: Description/name of the transaction
- `total_amount`: Total amount of the transaction
- `people_involved`: Number of people sharing this transaction (default: 2)
- `paid_by_user_id`: Which user paid for this transaction (references auth.users)
- `added_by_user_id`: Which user added this transaction record (references auth.users)
- `created_at`, `updated_at`: Timestamps

Later on, we will add the feature for users to one-click transfer debt to the other person and mark the debt as cleared.

### Platform
- Web

### Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
