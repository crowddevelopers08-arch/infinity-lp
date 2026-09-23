import "server-only"

// TeleCRM sync for scalp scan leads. Uses the same TELECRM_API_URL / TELECRM_API_KEY as the other landing pages.

type TelecrmResult = { status: string; leadId: string | null }

function normalizePhoneForTeleCRM(phone: string) {
  const digits = phone.replace(/\D/g, "")
  return digits.length === 10 ? `91${digits}` : digits
}

function readLeadId(data: Record<string, unknown>): string | null {
  const nested = (data.data && typeof data.data === "object" ? data.data : {}) as Record<string, unknown>
  const id = data.leadId ?? data.id ?? data.LeadID ?? nested.leadId ?? nested.id ?? nested.LeadID
  if (id) return String(id)
  for (const key of ["leadIds", "modifiedLeadIds"]) {
    const list = data[key]
    if (Array.isArray(list) && list.length) return String(list[0])
  }
  return null
}

/** Explicit failure inside a 2xx body. The autoupdatelead endpoint normally returns no such marker. */
function isRejected(data: Record<string, unknown>) {
  if (data.success === false) return true
  const status = String(data.status ?? "").toLowerCase()
  return ["error", "failed", "failure"].includes(status)
}

async function send(phone: string, name: string | undefined, notes: string[]): Promise<TelecrmResult> {
  const url = process.env.TELECRM_API_URL
  const key = process.env.TELECRM_API_KEY
  if (!url || !key) return { status: "Not configured", leadId: null }

  const fields: Record<string, string> = { phone: normalizePhoneForTeleCRM(phone) }
  if (name) fields.name = name

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
        "X-Client-ID": "nextjs-website-integration",
      },
      body: JSON.stringify({ fields, actions: notes.map((text) => ({ type: "SYSTEM_NOTE", text })) }),
      signal: AbortSignal.timeout(15000),
    })

    if (res.status === 204) return { status: "Synced", leadId: null }

    const text = await res.text()
    if (!res.ok) {
      console.warn("[TeleCRM scan] Rejected:", res.status, text.slice(0, 300))
      return { status: `Failed (${res.status})`, leadId: null }
    }

    // A 2xx means TeleCRM accepted the lead. autoupdatelead is an upsert and usually answers with
    // no body (or one without a lead id), so the body is only read to enrich the result — never to
    // downgrade a successful HTTP call.
    if (!text.trim()) return { status: "Synced", leadId: null }

    let data: Record<string, unknown>
    try {
      data = JSON.parse(text) as Record<string, unknown>
    } catch {
      console.warn("[TeleCRM scan] Accepted with non-JSON body:", res.status, text.slice(0, 300))
      return { status: "Synced", leadId: null }
    }

    if (isRejected(data)) {
      console.warn("[TeleCRM scan] Rejected in body:", res.status, text.slice(0, 300))
      return { status: `Failed (${res.status})`, leadId: null }
    }
    return { status: "Synced", leadId: readLeadId(data) }
  } catch (err) {
    console.warn("[TeleCRM scan] Request failed:", err instanceof Error ? err.message : err)
    return { status: "Failed (network)", leadId: null }
  }
}

export type TelecrmLeadInput = {
  source: string
  name: string
  phone: string
  ageGroup: string
  concern: string
  duration: string
  consultationTime: string
  pageUrl?: string | null
  dashboardUrl: string
}

export function pushScanLeadToTeleCRM(lead: TelecrmLeadInput) {
  const formName = "Scalp Scan"
  const details = [
    `Form Name: ${formName}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Age Group: ${lead.ageGroup}`,
    `Primary Hair Concern: ${lead.concern}`,
    `Experiencing For: ${lead.duration}`,
    `Preferred Consultation Time: ${lead.consultationTime}`,
    `URL: ${lead.pageUrl || "Not specified"}`,
    `Dashboard: ${lead.dashboardUrl}`,
  ]
  return send(lead.phone, lead.name, [`Details: ${details.join(" | ")}`, ...details])
}

/** Adds a note to the existing TeleCRM lead once the scalp photo step finishes. */
export function pushScanPhotoNoteToTeleCRM(phone: string, photoStatus: string, dashboardUrl: string) {
  const note =
    photoStatus === "Skipped"
      ? "Scalp Photo: Skipped by patient"
      : `Scalp Photo: ${photoStatus} — view in dashboard: ${dashboardUrl}`
  return send(phone, undefined, [note])
}
