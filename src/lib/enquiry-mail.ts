import { company } from "@/data/company";
import { formatEnquiry, type Enquiry } from "@/lib/enquiries";

export function enquiryMailAvailable() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL);
}

export async function sendEnquiry(values: Enquiry, idempotencyKey: string, deliver: typeof fetch = fetch) {
  const { subject, text } = formatEnquiry(values);
  const response = await deliver("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.RESEND_API_KEY,
      "Content-Type": "application/json",
      "Idempotency-Key": "yms-enquiry-" + idempotencyKey,
    },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL,
      to: [process.env.ENQUIRY_TO_EMAIL || company.email],
      reply_to: values.email,
      subject,
      text,
    }),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Enquiry email provider responded with HTTP " + response.status);
  const result = await response.json();
  if (typeof result.id !== "string" || !result.id) throw new Error("Enquiry email provider did not return a reference");
}
