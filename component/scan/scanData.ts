// Shared content + config for the /scan landing page and its scalp scan flow.

export const PHONE_DISPLAY = "+91 98928 11033"
export const PHONE_TEL = "+919892811033"

export const SCAN_NAV = [
  { label: "Assessment", href: "#assessment", id: "assessment" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "Options", href: "#options", id: "options" },
  { label: "Why Us", href: "#why", id: "why" },
  { label: "Eligibility", href: "#eligibility", id: "eligibility" },
]

export const AGE_GROUPS = ["18–25", "26–35", "36–45", "46–55", "55+"]

export const HAIR_CONCERNS = [
  "Hair Fall",
  "Hair Thinning",
  "Receding Hairline",
  "Baldness",
  "Hair Transplant",
  "Scalp Concern",
  "Other",
] as const

export type HairConcern = (typeof HAIR_CONCERNS)[number]

export const CONCERN_DURATIONS = ["Less than 6 months", "6–12 months", "1–3 years", "More than 3 years"]

export const CONSULTATION_TIMES = ["Morning", "Afternoon", "Evening"]

export type TreatmentId = "prp" | "gfc" | "transplant" | "care"

export const TREATMENTS: { id: TreatmentId; title: string; description: string }[] = [
  {
    id: "prp",
    title: "PRP Therapy",
    description:
      "A non-surgical hair restoration approach that may help support hair health and improve the condition of weakened hair follicles in suitable cases.",
  },
  {
    id: "gfc",
    title: "GFC Therapy",
    description:
      "An advanced regenerative treatment approach designed to support hair follicle health and promote better hair quality in suitable candidates.",
  },
  {
    id: "transplant",
    title: "Hair Transplantation",
    description:
      "A restoration option for individuals experiencing significant hair loss or reduced hair density who may be suitable candidates.",
  },
  {
    id: "care",
    title: "Hair & Scalp Care",
    description: "Personalized recommendations based on your scalp condition, hair concerns and restoration goals.",
  },
]

// Which options are most relevant to discuss for each primary concern (shown on the scan result).
export const CONCERN_OPTIONS: Record<HairConcern, TreatmentId[]> = {
  "Hair Fall": ["prp", "gfc", "care"],
  "Hair Thinning": ["prp", "gfc", "care"],
  "Receding Hairline": ["gfc", "prp", "transplant"],
  Baldness: ["transplant", "gfc"],
  "Hair Transplant": ["transplant", "gfc"],
  "Scalp Concern": ["care", "prp"],
  Other: ["prp", "gfc", "transplant", "care"],
}

export const PERSONALIZATION_FACTORS = [
  "Hair loss pattern and stage",
  "Hair density and thinning areas",
  "Receding hairline or bald patches",
  "Scalp health and condition",
  "Donor hair availability (where applicable)",
  "Your hair restoration goals and expectations",
]

export const TREATMENT_NOTE =
  "Final treatment recommendations are provided after professional evaluation and consultation."

export const IMAGES = {
  logo: "https://res.cloudinary.com/muif2bou/image/upload/v1790064922/logo.png",
  hairFall: "https://res.cloudinary.com/muif2bou/image/upload/v1790064531/hair-loss.jpg",
  thinning: "https://res.cloudinary.com/muif2bou/image/upload/v1790064925/Reduced-Density.avif",
  receding: "https://res.cloudinary.com/muif2bou/image/upload/v1790064531/Hair-Transplants.avif",
  patchy: "https://res.cloudinary.com/muif2bou/image/upload/v1790064923/patchy.jpg",
  consult: "https://res.cloudinary.com/muif2bou/image/upload/v1790064532/image-about.avif",
  about: "https://res.cloudinary.com/muif2bou/image/upload/v1790069976/about-infinity.jpg",
  finalCta: "https://res.cloudinary.com/muif2bou/image/upload/v1790064530/final-cta-consultation.png",
}

export type ScanLead = {
  name: string
  phone: string
  ageGroup: string
  concern: string
  duration: string
  consultationTime: string
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "")
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits
}

export function isValidPhone(value: string) {
  return /^[6-9]\d{9}$/.test(normalizePhone(value))
}

export type ScanSource = "scalp-scan-flow"
export type PhotoStatus = "Captured" | "Uploaded" | "Skipped"
export type SavedLead = { leadId: string; uploadToken: string | null }

/** Saves the lead to the scan database (which also syncs it to TeleCRM). */
export async function submitScanLead(lead: ScanLead, source: ScanSource): Promise<SavedLead> {
  const response = await fetch("/api/scan/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source,
      name: lead.name.trim(),
      phone: normalizePhone(lead.phone),
      ageGroup: lead.ageGroup,
      concern: lead.concern,
      duration: lead.duration,
      consultationTime: lead.consultationTime,
      pageUrl: window.location.href,
    }),
  })

  const result = (await response.json().catch(() => ({}))) as Partial<SavedLead> & { success?: boolean; error?: string }
  if (!response.ok || !result.success || !result.leadId) throw new Error(result.error || "Unable to submit your request")
  return { leadId: result.leadId, uploadToken: result.uploadToken ?? null }
}

/** Downscales a photo to keep uploads small; returns a JPEG data URL. */
export function resizeImage(dataUrl: string, maxSide = 1024, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight))
      const canvas = document.createElement("canvas")
      canvas.width = Math.round(img.naturalWidth * scale)
      canvas.height = Math.round(img.naturalHeight * scale)
      const ctx = canvas.getContext("2d")
      if (!ctx) return reject(new Error("Canvas unavailable"))
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL("image/jpeg", quality))
    }
    img.onerror = () => reject(new Error("Could not read image"))
    img.src = dataUrl
  })
}

/** Attaches the scalp photo (or records a skip) to a lead saved by the scan flow. */
export async function uploadScanPhoto(saved: SavedLead, status: PhotoStatus, image: string | null) {
  if (!saved.uploadToken) return
  const payload = status === "Skipped" || !image ? null : await resizeImage(image)
  const response = await fetch(`/api/scan/leads/${encodeURIComponent(saved.leadId)}/photo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: saved.uploadToken, status: payload ? status : "Skipped", image: payload }),
    keepalive: !payload, // lets a "skip" finish even if the tab closes
  })
  if (!response.ok) throw new Error(`Photo upload failed (${response.status})`)
}

export const THANK_YOU_PATH = "/scan/thank-you"
