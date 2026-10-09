import * as React from "react"
import Header, { type NavKey } from "./Header"
import Footer from "./Footer"

/** Page shell: skip link + floating header, <main id="main">, footer. Each page's first section runs up behind the header. */
const Layout: React.FC<{ active?: NavKey; children: React.ReactNode }> = ({ active = "", children }) => (
  <>
    <Header active={active} />
    <main id="main">{children}</main>
    <Footer />
  </>
)
export default Layout
