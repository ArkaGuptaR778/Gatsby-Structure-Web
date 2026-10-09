/* The active form adapter: the one place to change when a backend is chosen (docs/forms.md).
   - GATSBY_FORMS_ENDPOINT set at build time → httpAdapter posts there.
   - Otherwise → consoleAdapter (logs, shows the success panel, sends nothing).
   To use another backend, write an adapter in ./adapter.ts (or a new file) and return it here. */
import { consoleAdapter, httpAdapter, toSubmission, type FormAdapter } from "./adapter"

export const activeAdapter: FormAdapter = process.env.GATSBY_FORMS_ENDPOINT ? httpAdapter(process.env.GATSBY_FORMS_ENDPOINT) : consoleAdapter

/** Bridge for the site's form script (static/assets/js/main.js): it validates the form, then calls
 *  window.RS_FORMS.submit(form) and shows the success panel or the error message. Called from gatsby-browser.js
 *  before the scripts load. */
export const registerForms = (): void => {
  ;(window as unknown as { RS_FORMS: { submit: (f: HTMLFormElement) => Promise<void> } }).RS_FORMS = {
    submit: async form => {
      const r = await activeAdapter.submit(toSubmission(form))
      if (!r.ok) throw new Error(r.error)
    },
  }
}

export * from "./adapter"
