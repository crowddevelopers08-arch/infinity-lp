import Link from "next/link"
import { LuExternalLink, LuImageOff, LuMessageCircle, LuPhone, LuX } from "react-icons/lu"
import type { DashboardLeadDetail } from "@/lib/scan/leads-query"
import { PhotoStatusBadge, TelecrmBadge } from "./StatusBadge"
import { formatIST, photoUrl } from "./dashboardUtils"

export default function LeadDetailPanel({ lead, closeHref }: { lead: DashboardLeadDetail; closeHref: string }) {
  const fields = [
    { label: "Full Name", value: lead.name },
    { label: "Phone Number", value: `+91 ${lead.phone}` },
    { label: "Age Group", value: lead.ageGroup },
    { label: "Primary Hair Concern", value: lead.concern },
    { label: "Experiencing For", value: lead.duration },
    { label: "Preferred Consultation Time", value: lead.consultationTime },
    { label: "Submitted", value: formatIST(lead.createdAt) },
  ]

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`Lead: ${lead.name}`}>
      <Link href={closeHref} scroll={false} aria-label="Close" className="absolute inset-0 bg-[#171415]/60 backdrop-blur-[2px]" />

      <aside className="relative flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white shadow-[0_0_80px_rgba(0,0,0,0.3)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eadfe0] bg-white px-5 py-4">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f52227]">Lead Details</p>
            <h2 className="truncate text-lg font-bold">{lead.name}</h2>
          </div>
          <Link
            href={closeHref}
            scroll={false}
            aria-label="Close"
            className="grid size-10 flex-none place-items-center rounded-full bg-[#fff0f0] transition-colors hover:bg-[#f52227] hover:text-white"
          >
            <LuX className="size-5" />
          </Link>
        </div>

        <div className="space-y-5 p-5">
          {/* photo */}
          <div className="overflow-hidden rounded-2xl border border-[#eadfe0] bg-[#171415]">
            {lead.photo ? (
              <a href={photoUrl(lead.id)} target="_blank" rel="noreferrer" className="group relative block">
                {/* eslint-disable-next-line @next/next/no-img-element -- served from the scan API */}
                <img src={photoUrl(lead.id)} alt={`Scalp photo of ${lead.name}`} className="max-h-[420px] w-full object-contain" />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#231f20] opacity-0 transition-opacity group-hover:opacity-100">
                  <LuExternalLink className="size-3.5" /> Open full size
                </span>
              </a>
            ) : (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 text-white/50">
                <LuImageOff className="size-10" aria-hidden />
                <p className="text-sm font-bold">No scalp photo</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#62595c]">
            <span className="font-bold text-[#231f20]">Scalp photo:</span>
            <PhotoStatusBadge status={lead.photoStatus} hasPhoto={Boolean(lead.photo)} />
            {lead.photo && <span>added {formatIST(lead.photo.createdAt)}</span>}
          </div>

          {/* contact */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:+91${lead.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f52227] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#231f20]"
            >
              <LuPhone className="size-4" /> Call
            </a>
            <a
              href={`https://wa.me/91${lead.phone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eadfe0] px-4 py-3 text-sm font-bold transition-colors hover:border-[#f52227] hover:text-[#f52227]"
            >
              <LuMessageCircle className="size-4" /> WhatsApp
            </a>
          </div>

          {/* all collected fields */}
          <dl className="grid grid-cols-2 gap-2">
            {fields.map((field) => (
              <div key={field.label} className="rounded-xl border border-[#eadfe0] bg-[#fffafa] p-3">
                <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-[#62595c]">{field.label}</dt>
                <dd className="mt-1 text-sm font-bold">{field.value}</dd>
              </div>
            ))}
          </dl>

          {/* TeleCRM */}
          <div className="rounded-xl border border-[#eadfe0] p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold">TeleCRM</p>
              <TelecrmBadge status={lead.telecrmStatus} />
            </div>
            {lead.telecrmLeadId && <p className="mt-1 text-xs text-[#62595c]">Lead ID: {lead.telecrmLeadId}</p>}
          </div>

          {lead.pageUrl && (
            <p className="break-all text-xs text-[#62595c]">
              <span className="font-bold text-[#231f20]">Page:</span> {lead.pageUrl}
            </p>
          )}
          <p className="text-xs text-[#62595c]/70">Lead ID: {lead.id}</p>
        </div>
      </aside>
    </div>
  )
}
