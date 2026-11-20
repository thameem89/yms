"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { enquiryFields, enquiryTypes, formatEnquiry, validateEnquiry, type EnquiryErrors, type EnquiryType } from "@/lib/enquiries";
import { company } from "@/data/company";
import { Icon } from "@/components/actions";

const inputs = [
  { name: "name", autocomplete: "name", type: "text" },
  { name: "company", autocomplete: "organization", type: "text" },
  { name: "email", autocomplete: "email", type: "email" },
  { name: "phone", autocomplete: "tel", type: "tel" },
  { name: "country", autocomplete: "country-name", type: "text" },
] as const;

export function EnquiryForm({ initialType, onlineDelivery }: { initialType?: EnquiryType; onlineDelivery: boolean }) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "failure">("idle");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState<ReturnType<typeof formatEnquiry> | null>(null);
  const retry = useRef<{ payload: string; key: string }>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const input = Object.fromEntries(new FormData(form));
    const result = validateEnquiry(input);
    setErrors(result.errors);
    setDraft(null);
    if (Object.keys(result.errors).length) {
      setStatus("failure");
      setMessage("Check the highlighted fields.");
      const field = form.elements.namedItem(Object.keys(result.errors)[0]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    if (!onlineDelivery) {
      setStatus("idle");
      setMessage("");
      setDraft(formatEnquiry(result.values));
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const payload = JSON.stringify({ ...result.values, website: input.website });
      if (retry.current?.payload !== payload) retry.current = { payload, key: crypto.randomUUID() };

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.values, website: input.website, idempotencyKey: retry.current.key }),
      });
      const data = await response.json();
      setMessage(data.message);
      setErrors(data.errors ?? {});
      if (response.ok) {
        form.reset();
        retry.current = null;
        setStatus("success");
      } else {
        if (response.status >= 500 || response.status === 429) setDraft(formatEnquiry(result.values));
        setStatus("failure");
      }
    } catch {
      setDraft(formatEnquiry(result.values));
      setStatus("failure");
      setMessage("We couldn’t send your enquiry. Try again or contact YMS directly.");
    }
  }

  return <form className="enquiry-form" method="post" action="/api/enquiry" onSubmit={submit} onChange={() => { if (draft) setDraft(null); }} noValidate aria-busy={status === "sending"}>
    {!onlineDelivery && <p className="form-note">Prepare a draft, then send it from your email app.</p>}
    <fieldset disabled={status === "sending"}>
      <legend className="sr-only">Your enquiry details</legend>
      <div className="form-grid">
        {inputs.map(({ name, autocomplete, type }) => <div className="field" key={name}>
          <label htmlFor={name}>{enquiryFields[name].label}{enquiryFields[name].min ? " *" : ""}</label>
          <input id={name} name={name} type={type} autoComplete={autocomplete} required={enquiryFields[name].min > 0} maxLength={enquiryFields[name].max} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? name + "-error" : undefined} />
          {errors[name] && <p id={name + "-error"}>{errors[name]}</p>}
        </div>)}
        <div className="field"><label htmlFor="type">Enquiry type *</label><select id="type" name="type" required defaultValue={initialType ?? ""} aria-invalid={!!errors.type} aria-describedby={errors.type ? "type-error" : undefined}><option value="" disabled>Select an enquiry type</option>{enquiryTypes.map((type) => <option key={type}>{type}</option>)}</select>{errors.type && <p id="type-error">{errors.type}</p>}</div>
        <div className="field full"><label htmlFor="message">Message *</label><textarea id="message" name="message" required rows={5} maxLength={enquiryFields.message.max} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <p id="message-error">{errors.message}</p>}</div>
      </div>
      <div hidden><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <p className="form-note">YMS uses your details to respond to your enquiry. See our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
      <button className="button yellow" type="submit">{status === "sending" ? "Sending…" : onlineDelivery ? "Send enquiry" : "Prepare email draft"}<Icon name="arrow" /></button>
    </fieldset>
    <p className={"form-status " + status} role={status === "failure" ? "alert" : "status"}>{message}</p>
    {draft && <section className="enquiry-draft" aria-labelledby="enquiry-draft-title">
      <h3 id="enquiry-draft-title" ref={(heading) => { heading?.focus(); }} tabIndex={-1}>Your email draft is ready</h3>
      <p>Review the draft, then open your email app and send it to {company.email}. You can also copy the text into an email.</p>
      <div className="field"><label htmlFor="enquiry-draft-text">Draft message</label><textarea id="enquiry-draft-text" readOnly rows={6} value={draft.text} /></div>
      <a className="button dark" href={"mailto:" + company.email + "?subject=" + encodeURIComponent(draft.subject) + "&body=" + encodeURIComponent(draft.text)}>Open email app <Icon name="external" /></a>
    </section>}
  </form>;
}
