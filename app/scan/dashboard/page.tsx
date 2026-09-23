import type { Metadata } from "next"
import DashboardView from "@/component/scan/dashboard/DashboardView"
import { getLead, getLeads, getLeadStats, type LeadFilters } from "@/lib/scan/leads-query"

export const metadata: Metadata = {
  title: "Scan Leads Dashboard",
  robots: { index: false, follow: false },
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? ""

// Always render with fresh data from the database.
export const dynamic = "force-dynamic"

export default async function ScanDashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const filters: LeadFilters = {
    q: first(params.q).slice(0, 100),
    concern: first(params.concern),
    photo: first(params.photo),
    page: Math.max(1, Number.parseInt(first(params.page), 10) || 1),
  }
  const leadId = first(params.lead)

  const [stats, { leads, total, pages }, selected] = await Promise.all([
    getLeadStats(),
    getLeads(filters),
    leadId ? getLead(leadId) : Promise.resolve(null),
  ])

  return (
    <div className="font-[family-name:var(--font-merriweather)]">
      <DashboardView filters={filters} stats={stats} leads={leads} total={total} pages={pages} selected={selected} />
    </div>
  )
}
