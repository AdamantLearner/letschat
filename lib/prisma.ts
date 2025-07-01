// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Use a global variable to persist PrismaClient across hot reloads in development
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Optional: shows queries in terminal
  });

// Avoid creating new clients in dev (hot reload safe)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}

export const prisma = prismaClient;
