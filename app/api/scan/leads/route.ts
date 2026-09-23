import { randomBytes } from "crypto"
import { after, NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/scan/db"
import { pushScanLeadToTeleCRM } from "@/lib/scan/telecrm"
import {
  AGE_GROUPS,
  CONCERN_DURATIONS,
  CONSULTATION_TIMES,
  HAIR_CONCERNS,
  isValidPhone,
  normalizePhone,
} from "@/component/scan/scanData"

export const runtime = "nodejs"

const SOURCES = ["scalp-scan-flow"] as const

const text = (value: unknown, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "")
const oneOf = (value: string, list: readonly string[]) => list.includes(value)

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }

  const source = text(body.source)
  const lead = {
    name: text(body.name, 100),
    phone: normalizePhone(text(body.phone, 20)),
    ageGroup: text(body.ageGroup),
    concern: text(body.concern),
    duration: text(body.duration),
    consultationTime: text(body.consultationTime),
    pageUrl: text(body.pageUrl, 500) || null,
  }

  if (!oneOf(source, SOURCES)) return NextResponse.json({ success: false, error: "Invalid source" }, { status: 400 })
  if (!lead.name) return NextResponse.json({ success: false, error: "Please enter your name." }, { status: 400 })
  if (!isValidPhone(lead.phone))
    return NextResponse.json({ success: false, error: "Please enter a valid 10-digit mobile number." }, { status: 400 })
  if (
    !oneOf(lead.ageGroup, AGE_GROUPS) ||
    !oneOf(lead.concern, HAIR_CONCERNS) ||
    !oneOf(lead.duration, CONCERN_DURATIONS) ||
    !oneOf(lead.consultationTime, CONSULTATION_TIMES)
  ) {
    return NextResponse.json({ success: false, error: "Please complete all the fields." }, { status: 400 })
  }

  // The scan uploads its photo (or a skip) afterwards, authorised by this token.
  const uploadToken = randomBytes(24).toString("hex")

  try {
    const saved = await prisma.scanLead.create({
      data: { ...lead, source, uploadToken, photoStatus: "Pending" },
      select: { id: true },
    })

    const dashboardUrl = `${req.nextUrl.origin}/scan/dashboard?lead=${saved.id}`
    // Sync to TeleCRM after responding so the visitor isn't kept waiting.
    after(async () => {
      const result = await pushScanLeadToTeleCRM({ ...lead, source, dashboardUrl })
      await prisma.scanLead.update({
        where: { id: saved.id },
        data: { telecrmStatus: result.status, telecrmLeadId: result.leadId },
      })
    })

    return NextResponse.json({ success: true, leadId: saved.id, uploadToken })
  } catch (err) {
    console.error("[scan leads] Save failed:", err)
    return NextResponse.json({ success: false, error: "Unable to save your details. Please try again." }, { status: 500 })
  }
}
