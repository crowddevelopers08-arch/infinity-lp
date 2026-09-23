import Image from "next/image"
import Link from "next/link"
import {
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuImageOff,
  LuRefreshCw,
  LuSearch,
  LuUsers,
} from "react-icons/lu"
import type { DashboardLead, DashboardLeadDetail, LeadFilters } from "@/lib/scan/leads-query"
import { HAIR_CONCERNS, IMAGES } from "../scanData"
import LeadDetailPanel from "./LeadDetailPanel"
import { PhotoStatusBadge, TelecrmBadge } from "./StatusBadge"
import { DASHBOARD_PATH, dashboardHref, formatIST, photoUrl } from "./dashboardUtils"

type Props = {
  filters: LeadFilters
  stats: { total: number; today: number; withPhoto: number; synced: number }
  leads: DashboardLead[]
  total: number
  pages: number
  selected: DashboardLeadDetail | null
}

const selectClass =
  "rounded-xl border border-[#eadfe0] bg-white px-3 py-2.5 text-sm text-[#231f20] outline-none focus:border-[#f52227] focus:ring-2 focus:ring-[#f52227]/10"

function Thumb({ lead, size = "size-14" }: { lead: DashboardLead; size?: string }) {
  if (!lead.photo) {
    return (
      <span className={`grid ${size} flex-none place-items-center rounded-xl border border-dashed border-[#eadfe0] bg-[#fffafa] text-[#62595c]/50`}>
        <LuImageOff className="size-5" aria-hidden />
      </span>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- served from the scan API, not optimisable
    <img
      src={photoUrl(lead.id)}
      alt={`Scalp photo of ${lead.name}`}
      loading="lazy"
      className={`${size} flex-none rounded-xl border border-[#eadfe0] object-cover`}
    />
  )
}

export default function DashboardView({ filters, stats, leads, total, pages, selected }: Props) {
  const photoRate = stats.total ? Math.round((stats.withPhoto / stats.total) * 100) : 0
  const cards = [
    { label: "Total Leads", value: stats.total, note: "All time" },
    { label: "Today", value: stats.today, note: "Since midnight IST" },
    { label: "With Scalp Photo", value: stats.withPhoto, note: `${photoRate}% of leads` },
    { label: "Synced to TeleCRM", value: stats.synced, note: `of ${stats.total}` },
  ]
  const hasFilters = Boolean(filters.q || filters.concern || filters.photo)

  return (
    <main className="min-h-screen bg-[#fffafa] text-[#231f20]">
      {/* header */}
      <header className="sticky top-0 z-30 border-b border-[#eadfe0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Image src={IMAGES.logo} alt="Infinity Aesthetics Clinic" width={170} height={60} className="h-10 w-auto" priority />
            <span className="hidden h-8 w-px bg-[#eadfe0] sm:block" />
            <div className="hidden min-w-0 sm:block">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f52227]">Scalp Scan</p>
              <h1 className="truncate text-base font-bold leading-tight">Leads Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={dashboardHref(filters, {})}
              className="grid size-10 place-items-center rounded-full border border-[#eadfe0] bg-white text-[#231f20] transition-colors hover:border-[#f52227] hover:text-[#f52227]"
              aria-label="Refresh"
              title="Refresh"
            >
              <LuRefreshCw className="size-4" />
            </Link>
            <a
              href="/api/scan/leads/export"
              className="inline-flex items-center gap-2 rounded-full bg-[#231f20] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#f52227]"
            >
              <LuDownload className="size-4" aria-hidden />
              <span className="hidden sm:inline">Export CSV</span>
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        {/* stats */}
        <section aria-label="Summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={card.label}
              className={`rounded-2xl border p-4 sm:p-5 ${
                index === 0 ? "border-transparent bg-[#171415] text-white" : "border-[#eadfe0] bg-white"
              }`}
            >
              <p className={`text-xs font-bold uppercase tracking-wider ${index === 0 ? "text-[#ff5b5f]" : "text-[#62595c]"}`}>
                {card.label}
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums">{card.value.toLocaleString("en-IN")}</p>
              <p className={`mt-1 text-xs ${index === 0 ? "text-white/55" : "text-[#62595c]"}`}>{card.note}</p>
            </div>
          ))}
        </section>

        {/* filters (plain GET form — works without JS) */}
        <form method="get" action={DASHBOARD_PATH} className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-[#eadfe0] bg-white p-3">
          <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-[#eadfe0] bg-[#fffafa] px-3 focus-within:border-[#f52227] focus-within:ring-2 focus-within:ring-[#f52227]/10">
            <LuSearch className="size-4 flex-none text-[#62595c]" aria-hidden />
            <span className="sr-only">Search</span>
            <input
              name="q"
              defaultValue={filters.q}
              placeholder="Search name or phone"
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-[#62595c]/60"
            />
          </label>
          <select name="concern" defaultValue={filters.concern} className={selectClass} aria-label="Concern">
            <option value="">All concerns</option>
            {HAIR_CONCERNS.map((concern) => (
              <option key={concern} value={concern}>
                {concern}
              </option>
            ))}
          </select>
          <select name="photo" defaultValue={filters.photo} className={selectClass} aria-label="Photo">
            <option value="">Any photo</option>
            <option value="with">With photo</option>
            <option value="without">Without photo</option>
          </select>
          <button type="submit" className="rounded-xl bg-[#f52227] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#231f20]">
            Apply
          </button>
          {hasFilters && (
            <Link href={DASHBOARD_PATH} className="px-2 text-sm font-bold text-[#62595c] underline-offset-4 hover:text-[#f52227] hover:underline">
              Clear
            </Link>
          )}
        </form>

        <p className="mt-5 text-sm text-[#62595c]">
          <strong className="text-[#231f20]">{total.toLocaleString("en-IN")}</strong> lead{total === 1 ? "" : "s"}
          {hasFilters ? " match your filters" : ""}
        </p>

        {leads.length === 0 ? (
          <div className="mt-3 grid place-items-center rounded-2xl border border-dashed border-[#eadfe0] bg-white px-6 py-16 text-center">
            <LuUsers className="size-10 text-[#eadfe0]" aria-hidden />
            <p className="mt-3 font-bold">{hasFilters ? "No leads match these filters" : "No leads yet"}</p>
            <p className="mt-1 text-sm text-[#62595c]">
              {hasFilters ? "Try clearing a filter." : "Leads from /scan will appear here as soon as they're submitted."}
            </p>
          </div>
        ) : (
          <>
            {/* desktop table */}
            <div className="mt-3 hidden overflow-hidden rounded-2xl border border-[#eadfe0] bg-white lg:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#eadfe0] bg-[#fffafa] text-xs uppercase tracking-wider text-[#62595c]">
                  <tr>
                    <th className="px-4 py-3 font-bold">Photo</th>
                    <th className="px-4 py-3 font-bold">Patient</th>
                    <th className="px-4 py-3 font-bold">Concern</th>
                    <th className="px-4 py-3 font-bold">Age</th>
                    <th className="px-4 py-3 font-bold">Experiencing For</th>
                    <th className="px-4 py-3 font-bold">Pref. Time</th>
                    <th className="px-4 py-3 font-bold">Scalp Photo</th>
                    <th className="px-4 py-3 font-bold">TeleCRM</th>
                    <th className="px-4 py-3 font-bold">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f6eeee]">
                  {leads.map((lead) => {
                    const href = dashboardHref(filters, { lead: lead.id })
                    return (
                      <tr key={lead.id} className={`transition-colors hover:bg-[#fff5f5] ${selected?.id === lead.id ? "bg-[#fff5f5]" : ""}`}>
                        <td className="px-4 py-3">
                          <Link href={href} scroll={false} aria-label={`Open ${lead.name}`}>
                            <Thumb lead={lead} />
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <Link href={href} scroll={false} className="font-bold hover:text-[#f52227]">
                            {lead.name}
                          </Link>
                          <a href={`tel:+91${lead.phone}`} className="block text-xs text-[#62595c] hover:text-[#f52227]">
                            +91 {lead.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3 font-bold">{lead.concern}</td>
                        <td className="px-4 py-3">{lead.ageGroup}</td>
                        <td className="px-4 py-3">{lead.duration}</td>
                        <td className="px-4 py-3">{lead.consultationTime}</td>
                        <td className="px-4 py-3">
                          <PhotoStatusBadge status={lead.photoStatus} hasPhoto={Boolean(lead.photo)} />
                        </td>
                        <td className="px-4 py-3">
                          <TelecrmBadge status={lead.telecrmStatus} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-[#62595c]">{formatIST(lead.createdAt)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* mobile / tablet cards */}
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:hidden">
              {leads.map((lead) => (
                <li key={lead.id} className="min-w-0">
                  <Link
                    href={dashboardHref(filters, { lead: lead.id })}
                    scroll={false}
                    className="flex gap-3 rounded-2xl border border-[#eadfe0] bg-white p-3 transition-colors hover:border-[#f52227]"
                  >
                    <Thumb lead={lead} size="size-20" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 truncate font-bold">{lead.name}</p>
                        <span className="shrink-0">
                          <TelecrmBadge status={lead.telecrmStatus} />
                        </span>
                      </div>
                      <p className="text-xs text-[#62595c]">+91 {lead.phone}</p>
                      <p className="mt-1.5 text-sm font-bold text-[#f52227]">{lead.concern}</p>
                      <p className="text-xs text-[#62595c]">
                        {lead.ageGroup} · {lead.duration} · {lead.consultationTime}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <PhotoStatusBadge status={lead.photoStatus} hasPhoto={Boolean(lead.photo)} />
                        <span className="text-[0.7rem] text-[#62595c]">{formatIST(lead.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* pagination */}
            {pages > 1 && (
              <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-2">
                {filters.page > 1 ? (
                  <Link
                    href={dashboardHref(filters, { page: filters.page - 1 })}
                    className="inline-flex items-center gap-1 rounded-full border border-[#eadfe0] bg-white px-4 py-2 text-sm font-bold hover:border-[#f52227]"
                  >
                    <LuChevronLeft className="size-4" /> Prev
                  </Link>
                ) : null}
                <span className="px-3 text-sm text-[#62595c]">
                  Page {filters.page} of {pages}
                </span>
                {filters.page < pages ? (
                  <Link
                    href={dashboardHref(filters, { page: filters.page + 1 })}
                    className="inline-flex items-center gap-1 rounded-full border border-[#eadfe0] bg-white px-4 py-2 text-sm font-bold hover:border-[#f52227]"
                  >
                    Next <LuChevronRight className="size-4" />
                  </Link>
                ) : null}
              </nav>
            )}
          </>
        )}
      </div>

      {selected && <LeadDetailPanel lead={selected} closeHref={dashboardHref(filters, { lead: null })} />}
    </main>
  )
}
