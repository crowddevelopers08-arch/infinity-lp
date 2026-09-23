import "server-only"
import type { Prisma } from "@/lib/generated/prisma/client"
import { prisma } from "./db"

export const PAGE_SIZE = 25

export type LeadFilters = {
  q: string
  concern: string
  photo: string
  page: number
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

function startOfTodayIST() {
  const istNow = Date.now() + IST_OFFSET_MS
  return new Date(Math.floor(istNow / DAY_MS) * DAY_MS - IST_OFFSET_MS)
}

function buildWhere(filters: LeadFilters): Prisma.ScanLeadWhereInput {
  const and: Prisma.ScanLeadWhereInput[] = []
  const q = filters.q.trim()
  if (q) {
    const digits = q.replace(/\D/g, "")
    and.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        ...(digits.length >= 3 ? [{ phone: { contains: digits } }] : []),
      ],
    })
  }
  if (filters.concern) and.push({ concern: filters.concern })
  if (filters.photo === "with") and.push({ photo: { isNot: null } })
  if (filters.photo === "without") and.push({ photo: { is: null } })
  return and.length ? { AND: and } : {}
}

export async function getLeads(filters: LeadFilters) {
  const where = buildWhere(filters)
  const [total, leads] = await Promise.all([
    prisma.scanLead.count({ where }),
    prisma.scanLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (filters.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      omit: { uploadToken: true },
      include: { photo: { select: { id: true } } },
    }),
  ])
  return { total, leads, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) }
}

export async function getLeadStats() {
  const [total, today, withPhoto, synced] = await Promise.all([
    prisma.scanLead.count(),
    prisma.scanLead.count({ where: { createdAt: { gte: startOfTodayIST() } } }),
    prisma.scanPhoto.count(),
    prisma.scanLead.count({ where: { telecrmStatus: "Synced" } }),
  ])
  return { total, today, withPhoto, synced }
}

export function getLead(id: string) {
  return prisma.scanLead.findUnique({
    where: { id },
    omit: { uploadToken: true },
    include: { photo: { select: { id: true, createdAt: true } } },
  })
}

export type DashboardLead = Awaited<ReturnType<typeof getLeads>>["leads"][number]
export type DashboardLeadDetail = NonNullable<Awaited<ReturnType<typeof getLead>>>
