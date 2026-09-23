import { NextResponse } from "next/server"
import { prisma } from "@/lib/scan/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value).replace(/\r?\n/g, " ")
  // Neutralise spreadsheet formulas, then quote.
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safe.replace(/"/g, '""')}"`
}

export async function GET(req: Request) {
  const origin = new URL(req.url).origin
  const leads = await prisma.scanLead.findMany({
    orderBy: { createdAt: "desc" },
    include: { photo: { select: { id: true } } },
  })

  const header = [
    "Submitted (IST)",
    "Name",
    "Phone",
    "Age Group",
    "Primary Hair Concern",
    "Experiencing For",
    "Preferred Consultation Time",
    "Scalp Photo",
    "Photo Link",
    "TeleCRM",
    "Page URL",
  ]
  const rows = leads.map((lead) => [
    lead.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    lead.name,
    lead.phone,
    lead.ageGroup,
    lead.concern,
    lead.duration,
    lead.consultationTime,
    lead.photoStatus ?? "N/A",
    lead.photo ? `${origin}/api/scan/leads/${lead.id}/photo` : "",
    lead.telecrmStatus,
    lead.pageUrl ?? "",
  ])

  const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n")
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="scan-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  })
}
