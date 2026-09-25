"use client"

import Image from "next/image"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  LuArrowLeft,
  LuArrowRight,
  LuCamera,
  LuCheck,
  LuImageUp,
  LuLock,
  LuPhone,
  LuRefreshCw,
  LuScanFace,
  LuSwitchCamera,
  LuX,
} from "react-icons/lu"
import { track } from "../track"
import {
  AGE_GROUPS,
  CONCERN_DURATIONS,
  CONCERN_OPTIONS,
  CONSULTATION_TIMES,
  HAIR_CONCERNS,
  IMAGES,
  PERSONALIZATION_FACTORS,
  PHONE_DISPLAY,
  PHONE_TEL,
  TREATMENTS,
  TREATMENT_NOTE,
  isValidPhone,
  submitScanLead,
  uploadScanPhoto,
  THANK_YOU_PATH,
  type HairConcern,
  type PhotoStatus,
  type SavedLead,
  type ScanShot,
  type ScanLead,
} from "./scanData"
import { ScanFrame, TreatmentOptionCard } from "./ScanSections"

type Stage = "quiz" | "camera" | "analyzing" | "result"
type AnswerKey = keyof ScanLead
type Answers = Partial<Record<AnswerKey, string>>

type Question = {
  id: AnswerKey
  title: string
  subtext: string
  type: "text" | "tel" | "choice"
  placeholder?: string
  options?: readonly string[]
}

const QUESTIONS: Question[] = [
  {
    id: "name",
    title: "What's your full name?",
    subtext: "Let's start your scalp assessment.",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    id: "phone",
    title: "Your phone number?",
    subtext: "Our team will contact you on this number to guide you through the next steps.",
    type: "tel",
    placeholder: "10-digit mobile number",
  },
  { id: "ageGroup", title: "What's your age group?", subtext: "Select one option.", type: "choice", options: AGE_GROUPS },
  {
    id: "concern",
    title: "What's your primary hair concern?",
    subtext: "Select the one that bothers you most.",
    type: "choice",
    options: HAIR_CONCERNS,
  },
  {
    id: "duration",
    title: "How long have you been experiencing this concern?",
    subtext: "Select one option.",
    type: "choice",
    options: CONCERN_DURATIONS,
  },
  {
    id: "consultationTime",
    title: "Preferred consultation time?",
    subtext: "We'll reach out during your preferred time.",
    type: "choice",
    options: CONSULTATION_TIMES,
  },
]

// The scalp photo is the final step of the progress bar.
const TOTAL_STEPS = QUESTIONS.length + 1

export default function ScanFlow() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState<Stage>("quiz")
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")
  const [photos, setPhotos] = useState<ScanShot[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Stage>("quiz")
  const advancingRef = useRef(false)
  const savedLeadRef = useRef<SavedLead | null>(null)

  useEffect(() => {
    stageRef.current = stage
  }, [stage])

  const openFlow = useCallback(() => {
    // Resume an unfinished scan; start fresh after a completed one.
    if (stageRef.current === "result") {
      setStage("quiz")
      setStep(0)
      setAnswers({})
      setError("")
      setPhotos([])
      savedLeadRef.current = null
    }
    setOpen(true)
    track("scan_start", { page: "scan" })
  }, [])

  // Every scan CTA on the page is a plain `a[href="#scan"]`, so sections can stay server components.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest('a[href="#scan"], button[data-start-scan]')
      if (!trigger) return
      event.preventDefault()
      openFlow()
    }
    document.addEventListener("click", onClick)
    // Support direct links to /scan#scan.
    const frame = window.requestAnimationFrame(() => {
      if (window.location.hash === "#scan") openFlow()
    })
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener("click", onClick)
    }
  }, [openFlow])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }, [stage, step])

  const question = QUESTIONS[step]

  const setAnswer = (id: AnswerKey, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setError("")
  }

  const validate = (q: Question, value = answers[q.id] || "") => {
    if (q.type === "text" && !value.trim()) return "Please enter your name."
    if (q.type === "tel" && !isValidPhone(value)) return "Please enter a valid 10-digit mobile number."
    if (q.type === "choice" && !value) return "Please make a selection to continue."
    return ""
  }

  const submitLead = async (finalAnswers: Answers) => {
    setSubmitting(true)
    setError("")
    try {
      savedLeadRef.current = await submitScanLead(finalAnswers as ScanLead, "scalp-scan-flow")
      track("lead_submit", { form: "scalp-scan-flow" })
      setDirection("forward")
      setStage("camera")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit your details. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const goNext = (overrideValue?: string) => {
    const value = overrideValue ?? answers[question.id] ?? ""
    const message = validate(question, value)
    if (message) {
      setError(message)
      return
    }
    track("scan_step", { step: step + 1, question: question.id })
    if (step < QUESTIONS.length - 1) {
      setDirection("forward")
      setStep(step + 1)
      return
    }
    // Last question: save the lead before moving on to the scalp photo.
    void submitLead({ ...answers, [question.id]: value })
  }

  const goBack = () => {
    setError("")
    setDirection("backward")
    if (stage === "camera") return // lead is already saved; back from camera is not offered
    if (step > 0) setStep(step - 1)
    else setOpen(false)
  }

  const choose = (value: string) => {
    if (advancingRef.current) return
    advancingRef.current = true
    setAnswer(question.id, value)
    // Brief pause so the selected state is visible before advancing, like the reference flow.
    window.setTimeout(() => {
      advancingRef.current = false
      goNext(value)
    }, 260)
  }

  const finishCamera = (shots: ScanShot[], status: PhotoStatus) => {
    setPhotos(shots)
    setStage("analyzing")
    // Upload in the background; the visitor's summary never waits on it.
    if (savedLeadRef.current) {
      uploadScanPhoto(savedLeadRef.current, status, shots).catch((err) => console.warn("[scan] photo upload:", err))
    }
  }

  const finishAnalyzing = useCallback(() => setStage("result"), [])

  if (!open) return null

  const progressStep = stage === "quiz" ? step + 1 : TOTAL_STEPS
  const progress = stage === "quiz" ? (step / TOTAL_STEPS) * 100 : stage === "camera" ? ((TOTAL_STEPS - 1) / TOTAL_STEPS) * 100 : 100
  const firstName = answers.name?.trim().split(/\s+/)[0]
  // The summary shows two photos side by side, so it gets a wider layout.
  const wide = stage === "result"
  const animation = direction === "forward" ? "scan-step-in" : "scan-step-in-reverse"

  return (
    <div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-label="Scalp scan"
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#fffafa] font-[family-name:var(--font-merriweather)] text-[#231f20]"
    >
      {/* top bar */}
      <div className="sticky top-0 z-20 border-b border-[#eadfe0] bg-white/95 backdrop-blur">
        <div className={`mx-auto flex ${wide ? "max-w-5xl" : "max-w-3xl"} items-center justify-between gap-3 px-4 pt-3 sm:px-6`}>
          <Image src={IMAGES.logo} alt="Infinity Aesthetics and Clinic" width={500} height={250} className="h-auto w-24 sm:w-28" />
          <button
            type="button"
            aria-label="Close scalp scan"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-full bg-[#fff0f0] text-[#231f20] transition-colors hover:bg-[#f52227] hover:text-white"
          >
            <LuX className="size-4" />
          </button>
        </div>
        {stage !== "result" && (
          <div className={`mx-auto ${wide ? "max-w-5xl" : "max-w-3xl"} px-4 pb-3 pt-2 sm:px-6`}>
            <div className="mb-2 flex items-center justify-between">
              {stage === "quiz" ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#62595c] transition-colors hover:text-[#f52227]"
                >
                  <LuArrowLeft className="size-4" /> Back
                </button>
              ) : (
                <span className="text-xs font-bold uppercase tracking-widest text-[#f52227]">
                  {stage === "camera" ? "Scalp Photo" : "Analysing"}
                </span>
              )}
              <span className="rounded-full bg-[#231f20] px-3.5 py-1 text-xs font-bold text-white">
                {progressStep} / {TOTAL_STEPS}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#eadfe0]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f52227] to-[#ef565a] transition-all duration-500 ease-out"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className={`mx-auto w-full ${wide ? "max-w-5xl" : "max-w-3xl"} px-4 py-6 sm:px-6 sm:py-10`}>
        {stage === "quiz" && (
          <div className="rounded-[1.75rem] border border-[#eadfe0] bg-white p-5 shadow-[0_20px_60px_rgba(35,31,32,0.08)] sm:p-8">
            <div key={`q-${step}`} className={animation}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#f52227]">Question {step + 1}</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
                {question.title}
                {question.id === "phone" && firstName ? (
                  <span className="text-[#f52227]">{`, ${firstName}`}</span>
                ) : null}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#62595c]">{question.subtext}</p>

              <div className="mt-6">
                {question.type === "choice" ? (
                  <div className={`grid gap-3 ${question.options!.length > 4 ? "sm:grid-cols-2" : ""}`}>
                    {question.options!.map((option) => {
                      const selected = answers[question.id] === option
                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={submitting}
                          onClick={() => choose(option)}
                          className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all duration-200 sm:text-base ${
                            selected
                              ? "border-[#f52227] bg-[#f52227] text-white shadow-[0_12px_28px_rgba(245,34,39,0.25)]"
                              : "border-[#eadfe0] bg-[#fffafa] hover:-translate-y-0.5 hover:border-[#f52227] hover:bg-white"
                          }`}
                        >
                          {option}
                          <span
                            className={`grid size-6 flex-none place-items-center rounded-full border-2 ${
                              selected ? "border-white bg-white text-[#f52227]" : "border-[#eadfe0]"
                            }`}
                          >
                            {selected && <LuCheck className="size-3.5" strokeWidth={3} />}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      goNext()
                    }}
                  >
                    <div className="flex items-center overflow-hidden rounded-2xl border border-[#eadfe0] bg-[#fffafa] transition focus-within:border-[#f52227] focus-within:ring-2 focus-within:ring-[#f52227]/10">
                      {question.type === "tel" && (
                        <span className="border-r border-[#eadfe0] px-4 py-4 text-sm font-bold text-[#62595c]">+91</span>
                      )}
                      <input
                        key={question.id}
                        autoFocus
                        type={question.type}
                        inputMode={question.type === "tel" ? "numeric" : "text"}
                        autoComplete={question.type === "tel" ? "tel-national" : "name"}
                        maxLength={question.type === "tel" ? 14 : 80}
                        value={answers[question.id] || ""}
                        onChange={(event) => setAnswer(question.id, event.target.value)}
                        placeholder={question.placeholder}
                        className="w-full bg-transparent px-4 py-4 text-base outline-none placeholder:text-[#62595c]/55"
                      />
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        className="btn-wave relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#f52227] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#231f20] sm:w-auto"
                      >
                        <span className="relative z-10">Continue</span>
                        <LuArrowRight className="relative z-10 size-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {submitting && <p className="mt-5 text-sm font-bold text-[#62595c]">Saving your details…</p>}
              {error && (
                <p role="alert" className="mt-5 rounded-xl border border-[#f52227]/20 bg-[#fff0f0] px-4 py-3 text-sm text-[#cf1c20]">
                  {error}
                </p>
              )}
            </div>

            <p className="mt-6 flex items-center gap-2 border-t border-[#eadfe0] pt-4 text-xs text-[#62595c]">
              <LuLock className="size-3.5 flex-none text-[#f52227]" aria-hidden />
              Your information will remain confidential.
            </p>
          </div>
        )}

        {stage === "camera" && <CameraStep firstName={firstName} onDone={finishCamera} />}

        {stage === "analyzing" && <AnalyzingStep photo={photos[0]?.src ?? null} onDone={finishAnalyzing} />}

        {stage === "result" && (
          <ResultStep
            answers={answers}
            photos={photos}
            onConfirm={() => {
              track("scan_complete", { concern: answers.concern })
              router.push(THANK_YOU_PATH)
            }}
            onRetake={() => {
              setPhotos([])
              setStage("camera")
            }}
          />
        )}
      </div>
    </div>
  )
}

/* ── Camera capture ─────────────────────────────────────────── */

// The team reviews the scalp from all sides: hairline, both temples/sides and the crown.
const SHOTS = [
  {
    label: "Front",
    title: "Front of your scalp",
    tip: "Face the camera, tilt your head slightly down and keep your hairline clearly visible in good light.",
  },
  {
    label: "Left",
    title: "Left side of your scalp",
    tip: "Turn your head to the right so your left temple and side of the scalp face the camera.",
  },
  {
    label: "Right",
    title: "Right side of your scalp",
    tip: "Turn your head to the left so your right temple and side of the scalp face the camera.",
  },
  {
    label: "Back",
    title: "Back of your scalp",
    tip: "Turn around and capture your crown and back of the head. Switch to the back camera or ask someone to help.",
  },
] as const

function CameraStep({ firstName, onDone }: { firstName?: string; onDone: (shots: ScanShot[], status: PhotoStatus) => void }) {
  const [shotIndex, setShotIndex] = useState(0)
  const [taken, setTaken] = useState<(ScanShot & { source: PhotoStatus })[]>([])
  const shot = SHOTS[shotIndex]
  const [captureSource, setCaptureSource] = useState<PhotoStatus>("Captured")
  // Only mounted client-side, after the user has started the scan.
  const [supported] = useState(() => typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia)
  const [state, setState] = useState<"starting" | "live" | "captured" | "error">(supported ? "starting" : "error")
  const [message, setMessage] = useState(
    supported ? "Opening camera…" : "Camera is not supported in this browser. You can upload a photo instead.",
  )
  const [facing, setFacing] = useState<"user" | "environment">("user")
  const [captured, setCaptured] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Bumped whenever the camera is stopped, so a permission prompt that resolves late can't leave a stream running.
  const sessionRef = useRef(0)

  const stopCamera = () => {
    sessionRef.current += 1
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }

  const startStream = useCallback((mode: "user" | "environment") => {
    const session = sessionRef.current
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { ideal: mode }, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      })
      .then(async (stream) => {
        if (session !== sessionRef.current) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setState("live")
        setMessage("") // the current shot's tip is shown while live
      })
      .catch(() => {
        if (session !== sessionRef.current) return
        setState("error")
        setMessage("Allow camera permission and try again, or upload a photo instead.")
      })
  }, [])

  const openCamera = (mode: "user" | "environment") => {
    if (!supported) return
    stopCamera()
    setCaptured(null)
    setState("starting")
    setMessage("Opening camera…")
    startStream(mode)
  }

  useEffect(() => {
    if (supported) startStream("user")
    return () => stopCamera()
  }, [supported, startStream])

  const capture = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || !video.videoWidth) {
      setState("error")
      setMessage("Camera preview is not ready. Please try again.")
      return
    }
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    if (facing === "user") {
      // Match the mirrored preview the user saw.
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    setCaptured(canvas.toDataURL("image/jpeg", 0.9))
    setCaptureSource("Captured")
    setState("captured")
    setMessage(`${shot.label} photo captured. Review it below.`)
    stopCamera()
    track("scan_photo", { method: "camera", view: shot.label })
  }

  const finish = (list: (ScanShot & { source: PhotoStatus })[]) => {
    stopCamera()
    if (!list.length) return onDone([], "Skipped")
    const status: PhotoStatus = list.some((item) => item.source === "Captured") ? "Captured" : "Uploaded"
    onDone(
      list.map(({ label, src }) => ({ label, src })),
      status,
    )
  }

  // Moves on to the next view, or finishes after the last one.
  const advance = (list: (ScanShot & { source: PhotoStatus })[]) => {
    setTaken(list)
    if (shotIndex < SHOTS.length - 1) {
      setShotIndex(shotIndex + 1)
      openCamera(facing)
      return
    }
    finish(list)
  }

  const acceptShot = () => {
    if (!captured) return
    advance([...taken, { label: shot.label, src: captured, source: captureSource }])
  }

  const switchCamera = () => {
    const next = facing === "user" ? "environment" : "user"
    setFacing(next)
    void openCamera(next)
  }

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      stopCamera()
      setCaptured(String(reader.result))
      setCaptureSource("Uploaded")
      setState("captured")
      setMessage(`${shot.label} photo added. Review it below.`)
      track("scan_photo", { method: "upload", view: shot.label })
    }
    reader.readAsDataURL(file)
    event.target.value = "" // allow picking the same file for the next view
  }

  return (
    <div className="scan-step-in text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-[#f52227]">Share Your Hair Details</p>
      <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
        {shotIndex === 0 ? `${firstName ? `Thanks, ${firstName}! ` : ""}Now let's scan your scalp` : `Now the ${shot.title.toLowerCase()}`}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#62595c]">
        We need {SHOTS.length} photos: the front, left side, right side and back of your scalp.
      </p>

      <ol className="mx-auto mt-5 grid max-w-md grid-cols-4 gap-2">
        {SHOTS.map((item, index) => {
          const done = taken.some((t) => t.label === item.label)
          const current = index === shotIndex
          return (
            <li
              key={item.label}
              className={`flex items-center justify-center gap-1.5 rounded-full border px-2 py-2 text-xs font-bold ${
                current
                  ? "border-[#f52227] bg-[#fff0f0] text-[#231f20]"
                  : done
                    ? "border-[#f52227]/30 bg-white text-[#231f20]"
                    : "border-[#eadfe0] bg-white text-[#62595c]"
              }`}
            >
              <span
                className={`grid size-5 flex-none place-items-center rounded-full text-[0.65rem] ${
                  done || current ? "bg-[#f52227] text-white" : "border-2 border-[#eadfe0]"
                }`}
              >
                {done ? <LuCheck className="size-3" strokeWidth={3} /> : index + 1}
              </span>
              {item.label}
            </li>
          )
        })}
      </ol>

      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#62595c]">{state === "live" ? shot.tip : message}</p>

      <div className="relative mx-auto mt-6 w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-[#eadfe0] bg-[#171415] shadow-[0_30px_80px_rgba(35,31,32,0.2)]">
        {captured ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={captured} alt={`${shot.title} photo`} className="aspect-[3/4] w-full object-cover" />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{ transform: facing === "user" ? "scaleX(-1)" : undefined }}
              className={`aspect-[3/4] w-full object-cover ${state === "live" || state === "starting" ? "block" : "hidden"}`}
            />
            {state === "error" && (
              <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 p-8 text-white/70">
                <span className="grid size-14 place-items-center rounded-full border border-white/10 bg-white/5">
                  <LuCamera className="size-7" />
                </span>
                <p className="text-sm">Camera unavailable</p>
              </div>
            )}
            {state === "live" && <ScanFrame />}
          </>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[#f52227] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
          {shot.label} · {shotIndex + 1}/{SHOTS.length}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {state === "live" && (
          <>
            <button
              type="button"
              onClick={capture}
              className="btn-wave relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#f52227] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(245,34,39,0.28)] transition-colors hover:bg-[#231f20]"
            >
              <LuScanFace className="relative z-10 size-5" />
              <span className="relative z-10">Capture Photo</span>
            </button>
            <button
              type="button"
              onClick={switchCamera}
              className="inline-flex items-center gap-2 rounded-full border border-[#eadfe0] bg-white px-5 py-3.5 text-sm font-bold transition-colors hover:border-[#f52227] hover:text-[#f52227]"
            >
              <LuSwitchCamera className="size-4" /> Switch Camera
            </button>
          </>
        )}

        {state === "captured" && captured && (
          <>
            <button
              type="button"
              onClick={() => void openCamera(facing)}
              className="inline-flex items-center gap-2 rounded-full border border-[#eadfe0] bg-white px-5 py-3.5 text-sm font-bold transition-colors hover:border-[#f52227] hover:text-[#f52227]"
            >
              <LuRefreshCw className="size-4" /> Retake
            </button>
            <button
              type="button"
              onClick={acceptShot}
              className="btn-wave relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#f52227] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(245,34,39,0.28)] transition-colors hover:bg-[#231f20]"
            >
              <span className="relative z-10">
                {shotIndex < SHOTS.length - 1 ? `Next: ${SHOTS[shotIndex + 1].label} Side` : "Analyse My Scalp"}
              </span>
              <LuArrowRight className="relative z-10 size-4" />
            </button>
          </>
        )}

        {state === "error" && supported && (
          <button
            type="button"
            onClick={() => void openCamera(facing)}
            className="inline-flex items-center gap-2 rounded-full bg-[#231f20] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#f52227]"
          >
            <LuCamera className="size-4" /> Open Camera
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 text-[#231f20] underline-offset-4 hover:text-[#f52227] hover:underline"
        >
          <LuImageUp className="size-4 text-[#f52227]" /> Upload {shot.label.toLowerCase()} photo
        </button>
        <button
          type="button"
          onClick={() => {
            if (shotIndex > 0) {
              // Skip just this view and carry on with the rest.
              track("scan_photo", { method: "skipped", view: shot.label })
              advance(taken)
              return
            }
            stopCamera()
            track("scan_photo", { method: "skipped" })
            onDone([], "Skipped")
          }}
          className="text-[#62595c] underline-offset-4 hover:text-[#f52227] hover:underline"
        >
          {shotIndex > 0 ? `Skip ${shot.label.toLowerCase()} photo` : "Skip for now"}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
      <canvas ref={canvasRef} className="hidden" />

      <p className="mx-auto mt-6 flex max-w-md items-start justify-center gap-2 text-xs leading-relaxed text-[#62595c]">
        <LuLock className="mt-0.5 size-3.5 flex-none text-[#f52227]" aria-hidden />
        Your photo stays on your device and is only used to prepare this summary.
      </p>
    </div>
  )
}

/* ── Analysing animation ───────────────────────────────────── */

function AnalyzingStep({ photo, onDone }: { photo: string | null; onDone: () => void }) {
  const [done, setDone] = useState(0)

  useEffect(() => {
    const tick = window.setInterval(() => setDone((count) => Math.min(count + 1, PERSONALIZATION_FACTORS.length)), 520)
    const finish = window.setTimeout(onDone, 520 * PERSONALIZATION_FACTORS.length + 700)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(finish)
    }
  }, [onDone])

  return (
    <div className="scan-step-in text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-[#f52227]">Scalp Scan</p>
      <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">Preparing your hair summary…</h2>

      <div className="relative mx-auto mt-6 aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-[#eadfe0] bg-[#171415] shadow-[0_30px_80px_rgba(35,31,32,0.2)]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" className="size-full object-cover opacity-85" />
        ) : (
          <div className="grid size-full place-items-center">
            <LuScanFace className="size-20 text-white/25" />
          </div>
        )}
        <ScanFrame />
      </div>

      <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left">
        {PERSONALIZATION_FACTORS.map((factor, index) => {
          const complete = index < done
          return (
            <li
              key={factor}
              className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                complete ? "border-[#f52227]/30 bg-white text-[#231f20]" : "border-transparent text-[#62595c]/50"
              }`}
            >
              <span
                className={`grid size-5 flex-none place-items-center rounded-full ${
                  complete ? "bg-[#f52227] text-white" : "border-2 border-[#eadfe0]"
                }`}
              >
                {complete && <LuCheck className="size-3" strokeWidth={3} />}
              </span>
              {factor}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ── Result ────────────────────────────────────────────────── */

function ResultStep({
  answers,
  photos,
  onConfirm,
  onRetake,
}: {
  answers: Answers
  photos: ScanShot[]
  onConfirm: () => void
  onRetake: () => void
}) {
  const concern = (answers.concern || "Other") as HairConcern
  const options = (CONCERN_OPTIONS[concern] ?? CONCERN_OPTIONS.Other).map((id) => TREATMENTS.find((t) => t.id === id)!)
  const firstName = answers.name?.trim().split(/\s+/)[0]

  const summary = [
    { label: "Primary Hair Concern", value: answers.concern },
    { label: "Experiencing For", value: answers.duration },
    { label: "Age Group", value: answers.ageGroup },
    { label: "Preferred Consultation Time", value: answers.consultationTime },
  ]

  return (
    <div className="scan-step-in space-y-5">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#171415] p-6 text-white sm:p-8">
        <span aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full border border-[#f52227]/20" />
        <p className="text-xs font-bold uppercase tracking-widest text-[#ff5b5f]">Your Scalp Scan Summary</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
          {firstName ? `${firstName}, your` : "Your"} assessment is ready.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
          Our team will review your concern and help you understand possible next steps.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
          {photos.length ? (
            <div className={`grid gap-3 ${photos.length > 1 ? "grid-cols-2" : "mx-auto w-full max-w-60"}`}>
              {photos.map((shot) => (
                <figure key={shot.label} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={`${shot.label} of your scalp`} className="size-full object-cover" />
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider backdrop-blur">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={onRetake}
              className="mx-auto flex aspect-[3/4] w-full max-w-60 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs font-bold text-white/60 hover:text-white"
            >
              <LuCamera className="size-7" />
              Add scalp photos
            </button>
          )}

          <dl className="grid grid-cols-2 gap-2.5">
            {summary.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5">
                <dt className="text-[0.65rem] font-bold uppercase tracking-wider text-white/50">{item.label}</dt>
                <dd className="mt-1 text-sm font-bold">{item.value || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-[#eadfe0] bg-white p-5 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#f52227]">Explore Suitable Options</p>
        <h3 className="mt-2 text-xl font-bold leading-snug sm:text-2xl">
          Hair restoration options to discuss for <span className="italic text-[#f52227]">{concern}</span>
        </h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {options.map((option) => (
            <TreatmentOptionCard key={option.id} {...option} />
          ))}
        </div>
        <p className="mt-5 flex items-start gap-3 rounded-2xl bg-[#fff5f5] px-4 py-3 text-sm leading-relaxed text-[#62595c]">
          <span className="mt-0.5 rounded-full bg-[#f52227] px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
            Note
          </span>
          {TREATMENT_NOTE}
        </p>
      </div>

      <div className="rounded-[1.75rem] border border-[#eadfe0] bg-white p-5 sm:p-8">
        <h3 className="text-xl font-bold leading-snug sm:text-2xl">
          Your Hair Loss Is Unique. <span className="italic text-[#f52227]">Your Treatment Plan Should Be Too.</span>
        </h3>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {PERSONALIZATION_FACTORS.map((factor) => (
            <li key={factor} className="flex items-start gap-2.5 text-sm font-bold">
              <LuCheck className="mt-0.5 size-4 flex-none text-[#f52227]" strokeWidth={3} />
              {factor}
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky bottom-0 -mx-4 border-t border-[#eadfe0] bg-white/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:rounded-[1.75rem] sm:border sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="hidden text-sm leading-relaxed text-[#62595c] sm:block">
            Take the first step towards a personalized hair restoration consultation.
          </p>
          <div className="flex gap-2.5">
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => track("call_click", { branch: "Infinity Clinic", page: "scan-result" })}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="grid size-12 flex-none place-items-center rounded-full border border-[#eadfe0] bg-[#fffafa] text-[#f52227] transition-colors hover:border-[#f52227]"
            >
              <LuPhone className="size-5" />
            </a>
            <button
              type="button"
              onClick={onConfirm}
              className="btn-wave relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#f52227] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(245,34,39,0.28)] transition-colors hover:bg-[#231f20] sm:flex-none"
            >
              <span className="relative z-10">Get My Scalp Assessment</span>
              <LuArrowRight className="relative z-10 size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
