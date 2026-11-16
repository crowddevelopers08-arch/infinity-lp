import { NextRequest } from "next/server";
import { POST as saveSubmission } from "../submissions/route";
import { locationOptions, questions } from "@/lib/form-options";
import { prisma } from "@/lib/scan/db";

export const runtime = "nodejs";

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function badRequest(error: string) {
  return Response.json({ success: false, error }, { status: 400 });
}

// Receives the /ht step-by-step funnel and saves it through the same pipeline
// (TeleCRM + Google Sheet + CSV) as every other lead form on the site.
export async function POST(request: NextRequest) {
  const input = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  const name = clean(input?.name, 120);
  const phone = clean(input?.phone, 20);
  const email = clean(input?.email, 120);
  const city = clean(input?.city, 120);
  const pageUrl = clean(input?.pageUrl, 500);
  const answers = Array.isArray(input?.answers) ? input.answers : [];
  const digits = phone.replace(/\D/g, "");

  if (!name) return badRequest("Please enter your name.");
  if (digits.length < 10 || digits.length > 13 || !/^[+\d\s()-]+$/.test(phone)) return badRequest("Please enter a valid phone number.");
  if (!city) return badRequest("Please enter your city / area.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return badRequest("Please enter a valid email address.");
  if (questions.some((question, i) => !Number.isInteger(answers[i]) || !question.options[answers[i] as number])) return badRequest("Please answer all the questions.");

  const [budget, planning, stopping] = questions.map((question, i) => question.options[answers[i] as number]);
  const locationComfortable = input?.locationComfortable === true ? locationOptions[0] : locationOptions[1];

  // /api/submissions stores one "concern" text per lead, so the funnel answers are packed into it.
  const concern = [
    `Budget: ${budget}`,
    `Planning: ${planning}`,
    `Stopping them: ${stopping}`,
    `City: ${city}`,
    `Email: ${email || "Not provided"}`,
    `Location: ${locationComfortable}`,
  ].join(" | ");

  const forwarded = new NextRequest(new URL("/api/submissions", request.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: "ht funnel", name, phone, concern, pageUrl }),
  });
  const response = await saveSubmission(forwarded);
  const result = (await response.clone().json().catch(() => null)) as
    | { telecrm?: { synced?: boolean; statusCode?: number; result?: unknown } | null }
    | null;

  // TeleCRM replies `200 {"result":"Accepted"}` on success, which /api/submissions' own check
  // doesn't recognise, so judge the reply here for the dashboard instead.
  const telecrm = result?.telecrm;
  const telecrmAccepted =
    telecrm?.synced === true ||
    (typeof telecrm?.statusCode === "number" &&
      telecrm.statusCode >= 200 &&
      telecrm.statusCode < 300 &&
      String(telecrm.result ?? "").toLowerCase() === "accepted");

  // The dashboard at /ht/admin-dashboard reads from the database, so every lead is stored there too.
  let storedInDatabase = false;
  try {
    await prisma.htLead.create({
      data: {
        name,
        phone,
        email: email || null,
        city,
        budget,
        planning,
        concern: stopping,
        locationComfortable: input?.locationComfortable === true,
        pageUrl: pageUrl || null,
        telecrmStatus: telecrmAccepted ? "Synced" : telecrm ? "Not synced" : "Not configured",
      },
    });
    storedInDatabase = true;
  } catch (error) {
    console.error("Failed to save /ht lead to the database", error);
  }

  // Don't make the visitor retry (and create a duplicate) when the lead was saved somewhere.
  if (!response.ok && storedInDatabase) return Response.json({ success: true });
  return response;
}
