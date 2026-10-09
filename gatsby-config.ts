import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `RS Software`,
    description: `RS Software designs, builds and runs mission-critical payment ecosystems – from national rails like UPI and BBPS to AI-native fraud and risk platforms.`,
    siteUrl: `https://www.rssoftware.com`
  },
  /* Clean URLs with a trailing slash: /about/, /products/bill-edge/ */
  trailingSlash: "always",
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", {
    resolve: "gatsby-plugin-google-gtag",
    options: {
      trackingIds: [
        process.env.GA_TRACKING_ID || "G-XXXXXXXXXX",
      ],
    },
  }, "gatsby-plugin-image", {
    /* sitemap-index.xml + sitemap-0.xml (robots.txt points here). The 404 page and the HTML sitemap page are left out (as on the static site); the old-address redirect
       pages are written after the build (gatsby-node.ts onPostBuild), so they are never listed. */
    resolve: "gatsby-plugin-sitemap",
    options: { excludes: ["/404/", "/404.html", "/dev-404-page/", "/sitemap/"] },
  }, {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: "RS Software",
      short_name: "RS Software",
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#0075b7",
      display: "standalone",
      icon: "src/images/icon.png", // the RS mark (favicon-512)
      include_favicon: false, // the pages link favicon-32 / favicon-180 themselves (src/components/layout/Seo.tsx)
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};

export default config;
