import "server-only"
import type { Prisma } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/scan/db"

export const HT_PAGE_SIZE = 25

export type HtLeadFilters = {
  q: string
  budget: string
  location: string
  page: number
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

function startOfTodayIST() {
  const istNow = Date.now() + IST_OFFSET_MS
  return new Date(Math.floor(istNow / DAY_MS) * DAY_MS - IST_OFFSET_MS)
}

function buildWhere(filters: HtLeadFilters): Prisma.HtLeadWhereInput {
  const and: Prisma.HtLeadWhereInput[] = []
  const q = filters.q.trim()
  if (q) {
    const digits = q.replace(/\D/g, "")
    and.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
        ...(digits.length >= 3 ? [{ phone: { contains: digits } }] : []),
      ],
    })
  }
  if (filters.budget) and.push({ budget: filters.budget })
  if (filters.location === "yes") and.push({ locationComfortable: true })
  if (filters.location === "no") and.push({ locationComfortable: false })
  return and.length ? { AND: and } : {}
}

export async function getHtLeads(filters: HtLeadFilters) {
  const where = buildWhere(filters)
  const [total, leads] = await Promise.all([
    prisma.htLead.count({ where }),
    prisma.htLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (filters.page - 1) * HT_PAGE_SIZE,
      take: HT_PAGE_SIZE,
    }),
  ])
  return { total, leads, pages: Math.max(1, Math.ceil(total / HT_PAGE_SIZE)) }
}

export async function getHtLeadStats() {
  const [total, today, comfortable, synced] = await Promise.all([
    prisma.htLead.count(),
    prisma.htLead.count({ where: { createdAt: { gte: startOfTodayIST() } } }),
    prisma.htLead.count({ where: { locationComfortable: true } }),
    prisma.htLead.count({ where: { telecrmStatus: "Synced" } }),
  ])
  return { total, today, comfortable, synced }
}

/** Every lead matching the filters (no paging), newest first — used by the CSV export. */
export function getAllHtLeads(filters: Omit<HtLeadFilters, "page">) {
  return prisma.htLead.findMany({ where: buildWhere({ ...filters, page: 1 }), orderBy: { createdAt: "desc" } })
}

export type HtDashboardLead = Awaited<ReturnType<typeof getHtLeads>>["leads"][number]
