import { NextRequest } from "next/server"
import { getAllHtLeads } from "@/lib/ht/leads-query"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const HEADERS = ["Received (IST)", "Name", "Phone", "Email", "City", "Budget", "Planning", "Stopping them", "Comfortable with location", "TeleCRM", "Page URL"]

// Quotes the value for CSV and neutralises spreadsheet formulas (=, +, -, @) typed by visitors.
function cell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safe.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  try {
    const leads = await getAllHtLeads({
      q: (params.get("q") ?? "").slice(0, 100),
      budget: params.get("budget") ?? "",
      location: params.get("location") ?? "",
    })
    const rows = leads.map((lead) =>
      [
        lead.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true }),
        lead.name,
        lead.phone,
        lead.email ?? "",
        lead.city,
        lead.budget,
        lead.planning,
        lead.concern,
        lead.locationComfortable ? "Yes" : "No",
        lead.telecrmStatus,
        lead.pageUrl ?? "",
      ].map(cell).join(","),
    )
    return new Response(`﻿${[HEADERS.map(cell).join(","), ...rows].join("\r\n")}\r\n`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="ht-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("HT leads export failed", error)
    return Response.json({ error: "Unable to export leads" }, { status: 500 })
  }
}
