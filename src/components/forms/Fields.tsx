/* Form building blocks. Markup mirrors the static site's forms, so assets/css/rs.css styles them and
   static/assets/js/main.js validates them, shows errors and the success panel, and hands the data to the
   submission adapter in src/lib/forms (wired up in gatsby-browser.js). */
import * as React from "react"
import Icon from "../ui/Icon"
import { html } from "../../lib/html"

type FieldProps = { label: string; name: string; type?: string; required?: boolean; placeholder?: string; autoComplete?: string }

/** Label + input (or textarea) + error slot. id is "f-<name>". */
export const Field: React.FC<FieldProps> = ({ label, name, type = "text", required = false, placeholder, autoComplete }) => {
  const id = `f-${name}`
  return (
    <div className="field"><label htmlFor={id}>{`${label}${required ? " *" : ""}`}</label>
      {type === "textarea"
        ? <textarea id={id} name={name} required={required} placeholder={placeholder}></textarea>
        : <input id={id} type={type} name={name} required={required} autoComplete={autoComplete} placeholder={placeholder} />}
      <div className="err" role="alert"></div></div>
  )
}

/** Label + select. `options` are [value, label] pairs; the first, empty option is `first`. */
export const Select: React.FC<{ label: string; name: string; options: [string, string][]; required?: boolean; first?: string }> = ({ label, name, options, required = false, first = "Select an option…" }) => (
  <div className="field"><label htmlFor={`f-${name}`}>{`${label}${required ? " *" : ""}`}</label>
    <select id={`f-${name}`} name={name} required={required}><option value="">{first}</option>{options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select>
    <div className="err" role="alert"></div></div>
)
/** Options whose value is the label itself. */
export const same = (list: string[]): [string, string][] => list.map(x => [x, x])

/** Form id field and honeypot: bots fill "bot-field", people never see it; such submissions are dropped. */
export const Hidden: React.FC<{ name: string }> = ({ name }) => (
  <>
    <input type="hidden" name="form-name" value={name} />
    <p className="hp" aria-hidden="true"><label>Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
  </>
)

/** Required consent checkbox. `textHtml` may contain links. */
export const Consent: React.FC<{ name?: string; textHtml?: string; required?: boolean }> = ({ name = "consent", required = true,
  textHtml = 'I agree all personal data I submit may be processed in the manner and purposes described in RS Software’s <a href="/legal/#terms">terms of use</a> and <a href="/legal/#privacy">privacy policy</a>.' }) => (
  <label className="check"><input type="checkbox" name={name} value="yes" required={required} /><span dangerouslySetInnerHTML={html(textHtml + (required ? " *" : ""))} /></label>
)

/** Success panel shown in place of the form after a successful submission. */
export const Success: React.FC<{ id: string; title: string; message: string; formId: string; again?: string }> = ({ id, title, message, formId, again = "Send another message" }) => (
  <div className="form-success" id={id} role="status"><div className="form-success__icon"><Icon name="check" /></div><h3>{title}</h3><p>{message}</p><button className="btn btn-outline" type="button" data-reset-form={formId}>{again}</button></div>
)
