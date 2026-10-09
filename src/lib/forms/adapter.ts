/* Form submission adapters. The backend is not chosen yet (self-hosted on AWS, or a SaaS platform), so no vendor is
   hard-coded: every form on the site submits a FormSubmission to the active adapter (see ./index.ts).
   Guide: docs/forms.md. */

export type FormSubmission = {
  /** Which form: careers-application, contact, demo-request, sandbox-access */
  formId: string
  /** Text fields. Multi-value fields arrive comma-separated. */
  fields: Record<string, string>
  /** Uploaded files (the job application's CV) */
  files?: Record<string, File>
  meta: { page: string; timestamp: string }
}
export type FormResult = { ok: true } | { ok: false; error: string }
export interface FormAdapter { submit(s: FormSubmission): Promise<FormResult> }

/** Default while no backend exists: logs the submission in the browser console and reports success after a short
 *  delay, so every form can be tested end to end. Nothing is sent anywhere. */
export const consoleAdapter: FormAdapter = {
  submit: s => {
    // eslint-disable-next-line no-console
    console.info("[forms] submission (not sent: no backend configured)", s)
    return new Promise(resolve => setTimeout(() => resolve({ ok: true }), 600))
  },
}

/** Generic HTTP adapter: POSTs to `endpoint` and expects a 2xx response.
 *  Without files the body is JSON ({ formId, fields, meta }); with files (the CV) it is multipart/form-data with the
 *  same text fields plus formId and meta.page / meta.timestamp, so a single endpoint (e.g. API Gateway + Lambda) can
 *  accept both. */
export const httpAdapter = (endpoint: string): FormAdapter => ({
  submit: async s => {
    try {
      let res: Response
      if (s.files && Object.keys(s.files).length) {
        const fd = new FormData()
        fd.append("formId", s.formId)
        Object.entries(s.fields).forEach(([k, v]) => fd.append(k, v))
        Object.entries(s.files).forEach(([k, f]) => fd.append(k, f, f.name))
        fd.append("meta.page", s.meta.page)
        fd.append("meta.timestamp", s.meta.timestamp)
        res = await fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
      } else {
        res = await fetch(endpoint, { method: "POST", body: JSON.stringify(s), headers: { "Content-Type": "application/json", Accept: "application/json" } })
      }
      return res.ok ? { ok: true } : { ok: false, error: `HTTP ${res.status}` }
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) }
    }
  },
})

/** Turns a <form> into a FormSubmission: drops the honeypot, takes formId from the hidden "form-name" field
 *  (or the form's name), joins repeated fields with ", ", and keeps chosen files apart. */
export const toSubmission = (form: HTMLFormElement): FormSubmission => {
  const fields: Record<string, string> = {}
  const files: Record<string, File> = {}
  new FormData(form).forEach((v, k) => {
    if (k === "bot-field" || k === "form-name") return
    if (typeof v === "string") fields[k] = k in fields ? `${fields[k]}, ${v}` : v
    else if (v.size > 0) files[k] = v
  })
  const formId = (form.elements.namedItem("form-name") as HTMLInputElement | null)?.value || form.getAttribute("name") || form.id
  return { formId, fields, files: Object.keys(files).length ? files : undefined, meta: { page: window.location.pathname, timestamp: new Date().toISOString() } }
}
