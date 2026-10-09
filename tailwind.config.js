/** @type {import('tailwindcss').Config} */
/* The site's look comes from src/styles/tokens.css + rs.css (RS Software Design System v7.2), unchanged from the
   static site. Tailwind stays available for new work, with two guards so it can never change the existing design:
   - prefix "tw-": utilities are tw-mt-4, tw-grid… and can't collide with the site's own classes (.container, .grid, .mt-24…)
   - preflight off: Tailwind's CSS reset is not applied (rs.css has its own base styles)
   Theme colours, fonts and radii point at the design-system tokens, so tw-text-rs-blue etc. match the site. */
module.exports = {
  prefix: "tw-",
  corePlugins: { preflight: false },
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        "rs-blue": "var(--rs-blue-primary)", "rs-blue-hover": "var(--rs-blue-hover)",
        "rs-teal": "var(--rs-teal)", "rs-teal-bright": "var(--rs-teal-bright)", "rs-teal-light": "var(--rs-teal-light)",
        "rs-navy": "var(--rs-navy)", "rs-navy-deep": "var(--rs-navy-deep)", "rs-navy-footer": "var(--rs-navy-footer)",
        "rs-fg": "var(--rs-fg-default)", "rs-fg-body": "var(--rs-fg-body)", "rs-fg-muted": "var(--rs-fg-muted)",
        "rs-border": "var(--rs-border-default)",
        billedge: "var(--p-billedge)", payabbhi: "var(--p-payabbhi)", digitaledge: "var(--p-digitaledge)", intelliedge: "var(--p-intelliedge)",
      },
      fontFamily: {
        ui: "var(--rs-font-ui)", body: "var(--rs-font-body)", serif: "var(--rs-font-serif)", mono: "var(--rs-font-mono)",
        toc: "var(--rs-font-toc)", testi: "var(--rs-font-testi)", legal: "var(--rs-font-legal)",
      },
      borderRadius: { cta: "var(--rs-radius-cta)", card: "var(--rs-radius-xl)", band: "var(--rs-radius-2xl)", tile: "var(--rs-radius-3xl)" },
      maxWidth: { site: "var(--rs-container)" },
    },
  },
  plugins: [],
}
