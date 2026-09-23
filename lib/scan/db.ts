import "server-only"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/lib/generated/prisma/client"

// One client per server instance (and across dev hot reloads).
const globalForPrisma = globalThis as unknown as { scanPrisma?: PrismaClient }

let client: PrismaClient | undefined

function getClient(): PrismaClient {
  if (!client) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) throw new Error("DATABASE_URL is not set")
    client = globalForPrisma.scanPrisma ?? new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
    if (process.env.NODE_ENV !== "production") globalForPrisma.scanPrisma = client
  }
  return client
}

// The client is built on first use, not on import: `next build` loads every route module to
// collect page data, and that must not require DATABASE_URL to be present at build time.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const instance = getClient()
    const value = Reflect.get(instance, prop) as unknown
    // Top-level helpers ($transaction, $queryRaw, ...) lose `this` when read through the proxy.
    return typeof value === "function" ? value.bind(instance) : value
  },
})
