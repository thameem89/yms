import { validateEnquiry } from "@/lib/enquiries";
import { enquiryMailAvailable, sendEnquiry } from "@/lib/enquiry-mail";

const limitBytes = 16 * 1024;
const windowMs = 60_000;
const submissions = new Map<string, { expires: number; count: number }>();

function reserveAttempt(client: string) {
  const now = Date.now();
  for (const [address, entry] of submissions) {
    if (entry.expires <= now) submissions.delete(address);
  }
  const entry = submissions.get(client);
  if (entry) {
    if (entry.count >= 5) return false;
    entry.count += 1;
    return true;
  }
  if (submissions.size >= 5000) return false;
  submissions.set(client, { expires: now + windowMs, count: 1 });
  return true;
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  let length = 0;
  let body = "";
  const decoder = new TextDecoder("utf-8", { fatal: true });
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > limitBytes) {
      await reader.cancel();
      return null;
    }
    body += decoder.decode(value, { stream: true });
  }
  return JSON.parse(body + decoder.decode());
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") || new URL(request.url).host;
  if (origin) {
    try {
      if (new URL(origin).host !== host) return Response.json({ message: "This submission could not be accepted." }, { status: 403 });
    } catch {
      return Response.json({ message: "This submission could not be accepted." }, { status: 403 });
    }
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return Response.json({ message: "This submission could not be read." }, { status: 415 });
  }
  let data: unknown;
  try {
    data = await readBody(request);
  } catch {
    return Response.json({ message: "This submission could not be read." }, { status: 400 });
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return Response.json({ message: "This submission could not be read." }, { status: 400 });
  }

  const input = data as Record<string, unknown>;
  if (input.website) return Response.json({ message: "This submission could not be accepted." }, { status: 422 });
  const { values, errors } = validateEnquiry(input);
  if (Object.keys(errors).length) return Response.json({ errors, message: "Check the highlighted fields." }, { status: 422 });
  if (!enquiryMailAvailable()) return Response.json({ message: "Online enquiries are temporarily unavailable. Please email or call YMS directly." }, { status: 503 });

  const key = input.idempotencyKey;
  if (typeof key !== "string" || !/^[0-9a-f-]{36}$/i.test(key)) {
    return Response.json({ message: "Please reload the page and try again." }, { status: 400 });
  }
  const client = (process.env.VERCEL && request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim()) || "local";
  if (!reserveAttempt(client)) {
    return Response.json({ message: "Too many submissions. Wait a minute and try again." }, { status: 429, headers: { "Retry-After": "60" } });
  }

  try {
    await sendEnquiry(values, key);
    return Response.json({ message: "Your enquiry has been sent. Thank you for contacting YMS." }, { status: 201 });
  } catch (error) {
    console.error("YMS enquiry delivery failed", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ message: "We couldn’t send your enquiry. Try again or contact YMS directly." }, { status: 502 });
  }
}
