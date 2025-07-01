This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

# 📦 Chat App (Next.js + Prisma + SQLite)

A real-time chat app built step-by-step to understand the end-to-end flow of a full-stack project using the modern Next.js App Router, Prisma ORM, and SQLite as the development database.

---

## 🧱 Tech Stack

| Layer    | Tool/Tech                                    |
| -------- | -------------------------------------------- |
| Frontend | Next.js 14 (App Router)                      |
| Styling  | TailwindCSS, Shadcn/ui                       |
| Backend  | Next.js API Routes                           |
| ORM      | Prisma                                       |
| Database | SQLite (dev), later PostgreSQL/MySQL         |
| Hosting  | Vercel (✅), Netlify (🔄 fix), Firebase (🔜) |

---

## ⚙️ Project Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd chat-app
npm install
```

### 2. Prisma Setup

```bash
npx prisma init
```

Update `prisma/schema.prisma`:

```prisma
model Message {
  id        String   @id @default(cuid())
  name      String
  text      String
  createdAt DateTime @default(now())
}
```

Then:

```bash
npx prisma migrate dev --name init
npx prisma studio  # optional: open DB UI
```

---

## 🔄 API Routes

Located in: `app/api/messages/route.ts`

### GET /api/messages

Fetch all chat messages from the database.

### POST /api/messages

Create a new message.

{
"name": "Anonymous",
"text": "Hello world"
}

---

## 🧠 System Architecture Overview

```
┌────────────────────────┐       ┌────────────────────┐       ┌──────────────────┐
│    Chat UI (Next.js)   │ ───▶  │  API Routes (POST) │ ───▶  │   Prisma Client  │
│  - /chat/page.tsx      │       │  - /api/messages   │       │ - create/find    │
│  - Uses fetch()        │       │  - Validates input │       │ - queries DB     │
└────────────────────────┘       └────────────────────┘       └────────┬─────────┘
                                                                       │
                                                                  ┌────▼──────┐
                                                                  │ SQLite DB │
                                                                  └───────────┘

```

---

## ✅ Features Built So Far

- Frontend UI: message input, send, and message list
- Messages stored in DB using Prisma
- `GET` and `POST` APIs connected to SQLite
- Hosted on Vercel (fully working end-to-end demo)

---

## 🔜 Upcoming Features / Roadmap

- [ ] Replace SQLite with PostgreSQL
- [ ] Add WebSocket or Firebase Realtime updates
- [ ] Add authentication (NextAuth.js or Clerk)
- [ ] Real-time typing indicator
- [ ] Progress bar-based project tracker
- [ ] Responsive design with dark mode

---

## 📂 Folder Structure

```

chat-app/
├── app/
│ ├── chat/page.tsx # Main chat page
│ └── api/messages/route.ts # API handlers
├── components/ # UI components (ChatBox, MessageList)
├── lib/prisma.ts # Singleton Prisma client setup
├── prisma/schema.prisma # DB schema
└── public/ # Static files

```

---

## 🧠 Learning Goals

- Understand end-to-end architecture of a full-stack app
- Practice system design and data modeling
- Get hands-on with modern tools (Prisma, App Router, Tailwind)
- Learn by building real-world features incrementally

---

## 🚀 Deployment

```bash
# Already deployed on Vercel
# Add .env and push to GitHub
vercel --prod
```
