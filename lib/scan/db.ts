import "server-only"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/lib/generated/prisma/client"

// One client per server instance (and across dev hot reloads).
const globalForPrisma = globalThis as unknown as { scanPrisma?: PrismaClient }

function createClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error("DATABASE_URL is not set")
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
}

export const prisma = globalForPrisma.scanPrisma ?? createClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.scanPrisma = prisma
