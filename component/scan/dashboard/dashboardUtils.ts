import type { LeadFilters } from "@/lib/scan/leads-query"

export const DASHBOARD_PATH = "/scan/dashboard"

export function formatIST(date: Date, withTime = true) {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit", hour12: true } : {}),
  })
}

/** Builds a dashboard URL that keeps the current filters, with overrides. */
export function dashboardHref(filters: LeadFilters, overrides: Partial<Record<keyof LeadFilters | "lead", string | number | null>>) {
  const params = new URLSearchParams()
  const merged: Record<string, string | number | null | undefined> = { ...filters, ...overrides }
  for (const [key, value] of Object.entries(merged)) {
    if (value === null || value === undefined || value === "") continue
    if (key === "page" && Number(value) <= 1) continue
    params.set(key, String(value))
  }
  const query = params.toString()
  return query ? `${DASHBOARD_PATH}?${query}` : DASHBOARD_PATH
}

export function photoUrl(leadId: string) {
  return `/api/scan/leads/${encodeURIComponent(leadId)}/photo`
}
