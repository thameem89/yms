import { test, expect } from "@playwright/test";
import { sendEnquiry } from "../src/lib/enquiry-mail";

const enquiry = {
  name: "QA Test", email: "qa@example.test", company: "Test Company", phone: "", country: "UAE",
  type: "Project Enquiry", message: "This message is used only in an automated test.",
};

test("mail adapter sends the expected fields and requires a provider reference", async ({}, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Mail delivery is independent of the browser viewport.");
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.ENQUIRY_FROM_EMAIL;
  const originalTo = process.env.ENQUIRY_TO_EMAIL;
  process.env.RESEND_API_KEY = "test-token";
  process.env.ENQUIRY_FROM_EMAIL = "website@example.test";
  process.env.ENQUIRY_TO_EMAIL = "routing@example.test";

  try {
    const mock: typeof fetch = async (url, init) => {
      expect(url).toBe("https://api.resend.com/emails");
      expect(init?.headers).toMatchObject({ Authorization: "Bearer test-token", "Idempotency-Key": "yms-enquiry-qa-request" });
      expect(JSON.parse(String(init?.body))).toMatchObject({
        from: "website@example.test", to: ["routing@example.test"], reply_to: "qa@example.test",
        subject: "YMS website enquiry — Project Enquiry", text: expect.stringContaining(enquiry.message),
      });
      return Response.json({ id: "mock-provider-id" });
    };
    await expect(sendEnquiry(enquiry, "qa-request", mock)).resolves.toBeUndefined();
    await expect(sendEnquiry(enquiry, "qa-request", async () => Response.json({}))).rejects.toThrow("did not return a reference");
    await expect(sendEnquiry(enquiry, "qa-request", async () => new Response(null, { status: 429 }))).rejects.toThrow("HTTP 429");
  } finally {
    for (const [name, value] of Object.entries({ RESEND_API_KEY: originalKey, ENQUIRY_FROM_EMAIL: originalFrom, ENQUIRY_TO_EMAIL: originalTo })) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});
