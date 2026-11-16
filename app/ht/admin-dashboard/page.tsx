import type { Metadata } from "next"
import Link from "next/link"
import { questions } from "@/lib/form-options"
import { getHtLeads, getHtLeadStats, type HtLeadFilters } from "@/lib/ht/leads-query"

export const metadata: Metadata = {
  title: "Hair Transplant Leads Dashboard",
  robots: { index: false, follow: false },
}

// Always render with fresh data from the database.
export const dynamic = "force-dynamic"

const DASHBOARD_PATH = "/ht/admin-dashboard"
const budgetOptions = questions[0].options

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? ""

const formatIST = (date: Date) =>
  date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

function href(filters: HtLeadFilters, overrides: Partial<Record<keyof HtLeadFilters, string | number>>) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries({ ...filters, ...overrides })) {
    if (value === "" || value === undefined) continue
    if (key === "page" && Number(value) <= 1) continue
    params.set(key, String(value))
  }
  const query = params.toString()
  return query ? `${DASHBOARD_PATH}?${query}` : DASHBOARD_PATH
}

function exportHref(filters: HtLeadFilters) {
  const params = new URLSearchParams()
  if (filters.q) params.set("q", filters.q)
  if (filters.budget) params.set("budget", filters.budget)
  if (filters.location) params.set("location", filters.location)
  const query = params.toString()
  return `${DASHBOARD_PATH}/export${query ? `?${query}` : ""}`
}

export default async function HtAdminDashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const filters: HtLeadFilters = {
    q: first(params.q).slice(0, 100),
    budget: first(params.budget),
    location: first(params.location),
    page: Math.max(1, Number.parseInt(first(params.page), 10) || 1),
  }

  let data: { stats: Awaited<ReturnType<typeof getHtLeadStats>>; list: Awaited<ReturnType<typeof getHtLeads>> } | null = null
  let loadError = ""
  try {
    const [stats, list] = await Promise.all([getHtLeadStats(), getHtLeads(filters)])
    data = { stats, list }
  } catch (error) {
    console.error("HT dashboard failed to load", error)
    loadError = error instanceof Error ? error.message : "Unknown error"
  }

  const hasFilters = Boolean(filters.q || filters.budget || filters.location)

  return (
    <main className="min-h-screen bg-[#fffafa] px-4 py-8 font-[family-name:var(--font-merriweather)] text-[#231f20] sm:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#f52227]">Infinity Aesthetics Clinic</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Hair Transplant Leads</h1>
            <p className="mt-1 text-sm text-[#62595c]">Leads submitted through the /ht consultation form.</p>
          </div>
          {data && (
            <a
              href={exportHref(filters)}
              className="rounded-full bg-[#231f20] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#f52227]"
            >
              Export CSV
            </a>
          )}
        </header>

        {loadError || !data ? (
          <div role="alert" className="mt-8 rounded-2xl border border-[#f52227]/20 bg-[#fff0f0] p-6 text-sm leading-relaxed text-[#cf1c20]">
            <p className="font-bold">Couldn&apos;t load the leads.</p>
            <p className="mt-1 break-words">{loadError}</p>
            <p className="mt-3 text-[#62595c]">
              If this is the first time using this dashboard, create the table once with <code className="rounded bg-white px-1.5 py-0.5">npx prisma migrate deploy</code>.
            </p>
          </div>
        ) : (
          <>
            <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Total leads", data.stats.total],
                ["Today", data.stats.today],
                ["Comfortable with location", data.stats.comfortable],
                ["Synced to TeleCRM", data.stats.synced],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#eadfe0] bg-white p-4 shadow-[0_8px_24px_rgba(35,31,32,0.05)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#62595c]">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-[#231f20]">{value}</p>
                </div>
              ))}
            </section>

            <form method="get" action={DASHBOARD_PATH} className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-[#eadfe0] bg-white p-3">
              <input
                name="q"
                defaultValue={filters.q}
                placeholder="Search name, phone or city"
                className="min-w-[200px] flex-1 rounded-xl border border-[#eadfe0] bg-[#fffafa] px-4 py-2.5 text-sm outline-none focus:border-[#f52227]"
              />
              <select name="budget" defaultValue={filters.budget} className="rounded-xl border border-[#eadfe0] bg-[#fffafa] px-3 py-2.5 text-sm outline-none focus:border-[#f52227]">
                <option value="">All budgets</option>
                {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <select name="location" defaultValue={filters.location} className="rounded-xl border border-[#eadfe0] bg-[#fffafa] px-3 py-2.5 text-sm outline-none focus:border-[#f52227]">
                <option value="">Any location answer</option>
                <option value="yes">Comfortable with location</option>
                <option value="no">Not comfortable</option>
              </select>
              <button type="submit" className="rounded-xl bg-[#f52227] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#cf1c20]">Filter</button>
              {hasFilters && <Link href={DASHBOARD_PATH} className="px-2 text-sm font-bold text-[#62595c] underline">Clear</Link>}
            </form>

            <p className="mt-4 text-sm text-[#62595c]">
              {data.list.total} lead{data.list.total === 1 ? "" : "s"}{hasFilters ? " match your filters" : ""}
            </p>

            <div className="mt-3 overflow-x-auto rounded-2xl border border-[#eadfe0] bg-white shadow-[0_8px_24px_rgba(35,31,32,0.05)]">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="border-b border-[#eadfe0] bg-[#fff5f5] text-xs uppercase tracking-wider text-[#62595c]">
                  <tr>
                    {["Received", "Name", "Phone", "City", "Budget", "Planning", "What's stopping them", "Location", "TeleCRM"].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-bold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1e8e9]">
                  {data.list.leads.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-[#62595c]">No leads yet.</td>
                    </tr>
                  )}
                  {data.list.leads.map((lead) => (
                    <tr key={lead.id} className="align-top hover:bg-[#fffafa]">
                      <td className="whitespace-nowrap px-4 py-3 text-[#62595c]">{formatIST(lead.createdAt)}</td>
                      <td className="px-4 py-3 font-bold">
                        {lead.name}
                        {lead.email && <span className="block text-xs font-normal text-[#62595c]">{lead.email}</span>}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} className="font-bold text-[#f52227] hover:underline">{lead.phone}</a>
                      </td>
                      <td className="px-4 py-3">{lead.city}</td>
                      <td className="px-4 py-3">{lead.budget}</td>
                      <td className="px-4 py-3">{lead.planning}</td>
                      <td className="px-4 py-3">{lead.concern}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${lead.locationComfortable ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                          {lead.locationComfortable ? "Comfortable" : "Not comfortable"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${lead.telecrmStatus === "Synced" ? "bg-emerald-50 text-emerald-700" : "bg-[#fff0f0] text-[#cf1c20]"}`}>
                          {lead.telecrmStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.list.pages > 1 && (
              <nav aria-label="Pagination" className="mt-5 flex items-center justify-center gap-3 text-sm font-bold">
                {filters.page > 1 && <Link href={href(filters, { page: filters.page - 1 })} className="rounded-full border border-[#eadfe0] bg-white px-4 py-2 hover:border-[#f52227]">← Previous</Link>}
                <span className="text-[#62595c]">Page {filters.page} of {data.list.pages}</span>
                {filters.page < data.list.pages && <Link href={href(filters, { page: filters.page + 1 })} className="rounded-full border border-[#eadfe0] bg-white px-4 py-2 hover:border-[#f52227]">Next →</Link>}
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  )
}
