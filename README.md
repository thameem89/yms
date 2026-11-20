# YMS Engineering LLC website

Next.js App Router website with TypeScript, Tailwind CSS, optimized local photography and a Resend-backed enquiry endpoint.

## Local development

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

The dev server defaults to [localhost:3000](http://localhost:3000). Company and portfolio content lives in [src/data](src/data). See the [migration inventory](MIGRATION.md) and [content-review register](CONTENT_REVIEW.md) for sourcing and items requiring client approval.

## Deployment on Vercel

Import this repository as a Next.js project. Use the default Next.js build and configure the site’s domains after verifying the preview. Production metadata uses `https://www.ymsengineering.com` as the canonical origin. Deploy the Next.js runtime so the enquiry endpoint and image optimizer are available.

Set these server-side environment variables on the applicable Vercel environments. For local delivery, use `.env.local` with the names listed in [.env.example](.env.example).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend sending key. Store as a sensitive variable. |
| `ENQUIRY_FROM_EMAIL` | Sender address on a domain verified by Resend. |
| `ENQUIRY_TO_EMAIL` | Optional destination override. Defaults to the corporate enquiry address in `src/data/company.ts`. |

The form reports success only after the provider accepts the email. Missing mail configuration returns an unavailable message and visitors can reach YMS directly by phone or email. The server applies field and request-size validation, a same-origin check, a honeypot and a per-instance rate limit. The limit is local to each runtime instance. The adapter uses Resend idempotency keys to cover retries of the same form payload. [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email)

Before public cutover, confirm the content-review items with YMS, verify photo usage rights, and smoke-test a configured enquiry through to the destination inbox.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

Playwright starts the production build with mail delivery disabled and checks the UI, validation, unavailable response, simulated delivery acknowledgement, and the adapter contract. The suite also covers both navigation layouts, gallery interaction, legacy redirects, sitemap routes, metadata, internal links, representative images, viewport overflow, accessibility and the custom 404. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use an existing Chromium executable.

The local homepage production build scored 93 on Lighthouse mobile performance and 100 on desktop performance. Accessibility, Best Practices and SEO scored 100 on both profiles. These lab results were measured in Chrome on 20 November 2026.
