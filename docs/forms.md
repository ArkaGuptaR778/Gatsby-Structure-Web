# Forms

The site has four forms. None is tied to a vendor: every form submits through one adapter in `src/lib/forms`,
so choosing a backend later is a change in one file.

| Form | Page(s) | `formId` | Fields |
|---|---|---|---|
| Job application | `/careers/<slug>/`, `/careers/apply/` | `careers-application` | role, name, email, phone, location, notice, cover, cv (file: .pdf/.doc/.docx, max 8 MB), consent |
| Contact | `/contact/` | `contact` | name, email, company, position, phone, country, interest, product, orgtype, size, message, consent, marketing |
| Request a demo | `/request-demo/` | `demo-request` | name, email, company, position, product, orgtype, message, consent |
| Sandbox access | `/sandbox/` | `sandbox-access` | name, email, company, position, product, orgtype, message, consent |

The home page email box is not a form submission: it opens `/contact/?email=…` with the address filled in.
Links can prefill forms: `?topic=` (contact enquiry type), `?product=`, `?role=`, `?email=`.

## How a submission flows

1. **Markup**: the pages render the forms (`src/components/forms/`, `src/components/sections/careers/JobForm.tsx`).
   Each has a hidden `form-name` field (the `formId`) and a hidden honeypot field (`bot-field`).
2. **Validation and UI**: `static/assets/js/main.js` (the site's proven form script) checks required fields, email,
   phone and the CV file, shows the error messages, disables the button while sending, then shows the success panel
   or an error message with a mailto fallback (`fallbackEmail` in `static/assets/js/config.js`). Submissions with
   the honeypot filled are dropped silently.
3. **Sending**: main.js calls `window.RS_FORMS.submit(form)`, registered by `gatsby-browser.js` from
   `src/lib/forms/index.ts`. It turns the form into a `FormSubmission` and passes it to the **active adapter**:

```ts
type FormSubmission = { formId: string; fields: Record<string, string>; files?: Record<string, File>; meta: { page: string; timestamp: string } }
interface FormAdapter { submit(s: FormSubmission): Promise<{ ok: true } | { ok: false; error: string }> }
```

## Adapters (`src/lib/forms/adapter.ts`)

- **`consoleAdapter`** (default): logs the submission in the browser console and shows the success panel.
  **Nothing is sent.** Use it until a backend exists; don't launch with it.
- **`httpAdapter(endpoint)`**: used automatically when `GATSBY_FORMS_ENDPOINT` is set at build time (locally in
  `.env.production`, on GitHub as a repository variable, which `.github/workflows/deploy.yml` passes to the build).
  Without files it POSTs JSON `{ formId, fields, meta }`; with a CV it POSTs `multipart/form-data` with the same fields
  plus `formId`, `meta.page`, `meta.timestamp` and the file. Any 2xx response counts as success. The endpoint must
  allow cross-origin requests from `https://www.rssoftware.com` (CORS).

The choice is made in one line in `src/lib/forms/index.ts` (`activeAdapter`).

## Adding a backend later

- **AWS**: API Gateway (HTTP API, CORS for the site's domain) → Lambda. The Lambda validates the fields, drops
  submissions with `bot-field`, stores the CV in S3 (private bucket; or return a pre-signed URL first if files may
  exceed API Gateway's 10 MB payload), and emails the team with SES (and/or writes to DynamoDB / the CRM). Point
  `GATSBY_FORMS_ENDPOINT` at the API URL; the existing `httpAdapter` needs no change.
- **SaaS** (Formspree, Getform, Basin, HubSpot…): if the service accepts a JSON or multipart POST to a URL,
  set `GATSBY_FORMS_ENDPOINT` to it. If it needs its own client or field names, write a small adapter next to
  `httpAdapter` (e.g. `hubspotAdapter`) and return it from `activeAdapter`.
- Add spam protection server-side as well (rate limiting, CAPTCHA if needed); the honeypot only stops simple bots.
