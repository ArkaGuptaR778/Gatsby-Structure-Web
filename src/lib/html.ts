/* Browser-safe HTML helpers for templates that mix Markdown-rendered HTML with markup in one element
   (src/lib/md.ts reads files, so it is build-time only). */

/** Escape text for HTML (same as Python's html.escape with quote=True). */
export const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")

/** dangerouslySetInnerHTML value */
export const html = (s: string) => ({ __html: s })
