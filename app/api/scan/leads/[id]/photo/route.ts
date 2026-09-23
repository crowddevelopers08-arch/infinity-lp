import { createHash, timingSafeEqual } from "crypto"
import { after, NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/scan/db"
import { pushScanPhotoNoteToTeleCRM } from "@/lib/scan/telecrm"

export const runtime = "nodejs"

const MAX_BYTES = 2 * 1024 * 1024 // images are resized in the browser first; this is a safety cap
const UPLOAD_WINDOW_MS = 60 * 60 * 1000 // a visitor can retake / replace their photo for an hour
const STATUSES = ["Captured", "Uploaded", "Skipped"] as const

function sameToken(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest()
  const hb = createHash("sha256").update(b).digest()
  return timingSafeEqual(ha, hb)
}

// Trust the file's own bytes, not the declared type.
function sniffImageType(bytes: Buffer) {
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg"
  if (bytes.length > 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return "image/png"
  if (bytes.length > 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP")
    return "image/webp"
  return null
}

/** Attach the scalp photo (or record a skip) to a lead created by the scan flow. */
export async function POST(req: NextRequest, ctx: RouteContext<"/api/scan/leads/[id]/photo">) {
  const { id } = await ctx.params
  let body: { token?: unknown; status?: unknown; image?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }

  const token = typeof body.token === "string" ? body.token : ""
  const status = typeof body.status === "string" ? body.status : ""
  if (!token || !STATUSES.includes(status as (typeof STATUSES)[number])) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }

  const lead = await prisma.scanLead.findUnique({
    where: { id },
    select: { uploadToken: true, phone: true, createdAt: true },
  })
  if (
    !lead?.uploadToken ||
    !sameToken(token, lead.uploadToken) ||
    Date.now() - lead.createdAt.getTime() > UPLOAD_WINDOW_MS
  ) {
    return NextResponse.json({ success: false, error: "Not allowed" }, { status: 403 })
  }

  let photo: { mimeType: string; data: Buffer } | null = null
  if (status !== "Skipped") {
    const match = typeof body.image === "string" ? /^data:image\/[a-z+]+;base64,([A-Za-z0-9+/=]+)$/.exec(body.image) : null
    const bytes = match ? Buffer.from(match[1], "base64") : null
    const mimeType = bytes ? sniffImageType(bytes) : null
    if (!bytes || !mimeType) return NextResponse.json({ success: false, error: "Unsupported image" }, { status: 400 })
    if (bytes.length > MAX_BYTES) return NextResponse.json({ success: false, error: "Image is too large" }, { status: 413 })
    photo = { mimeType, data: bytes }
  }

  await prisma.$transaction([
    photo
      ? prisma.scanPhoto.upsert({
          where: { leadId: id },
          create: { leadId: id, mimeType: photo.mimeType, data: new Uint8Array(photo.data) },
          update: { mimeType: photo.mimeType, data: new Uint8Array(photo.data) },
        })
      : prisma.scanPhoto.deleteMany({ where: { leadId: id } }),
    prisma.scanLead.update({ where: { id }, data: { photoStatus: status } }),
  ])

  const dashboardUrl = `${req.nextUrl.origin}/scan/dashboard?lead=${id}`
  after(() => pushScanPhotoNoteToTeleCRM(lead.phone, status, dashboardUrl))

  return NextResponse.json({ success: true })
}

/** Serves a lead's scalp photo to the dashboard. */
export async function GET(_req: NextRequest, ctx: RouteContext<"/api/scan/leads/[id]/photo">) {
  const { id } = await ctx.params
  const photo = await prisma.scanPhoto.findUnique({ where: { leadId: id }, select: { mimeType: true, data: true } })
  if (!photo) return new NextResponse("Not found", { status: 404 })
  return new NextResponse(new Uint8Array(photo.data), {
    headers: {
      "Content-Type": photo.mimeType,
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
