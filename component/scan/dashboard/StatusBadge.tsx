const TONES = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warn: "border-amber-200 bg-amber-50 text-amber-700",
  bad: "border-[#f52227]/25 bg-[#fff0f0] text-[#cf1c20]",
  muted: "border-[#eadfe0] bg-[#fffafa] text-[#62595c]",
}

export function StatusBadge({ tone, children }: { tone: keyof typeof TONES; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold ${TONES[tone]}`}>
      {children}
    </span>
  )
}

export function PhotoStatusBadge({ status, hasPhoto }: { status: string | null; hasPhoto: boolean }) {
  if (hasPhoto) return <StatusBadge tone="good">{status ?? "Photo"}</StatusBadge>
  if (status === "Pending") return <StatusBadge tone="warn">Not completed</StatusBadge>
  if (status === "Skipped") return <StatusBadge tone="muted">Skipped</StatusBadge>
  return <StatusBadge tone="muted">No photo step</StatusBadge>
}

export function TelecrmBadge({ status }: { status: string }) {
  if (status === "Synced") return <StatusBadge tone="good">Synced</StatusBadge>
  if (status === "Pending") return <StatusBadge tone="warn">Pending</StatusBadge>
  if (status === "Not configured") return <StatusBadge tone="muted">Not configured</StatusBadge>
  return <StatusBadge tone="bad">{status}</StatusBadge>
}
