import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { getPage, replaceSeoHead, renderRobots, renderSitemap } from "./src/seo.js"

export default defineConfig({
  appType: "mpa",
  plugins: [react(), {
    name: "page-seo",
    transformIndexHtml: {
      order: "pre",
      handler: (html, context) => replaceSeoHead(html, getPage(context.originalUrl || context.path))
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split("?")[0]
        if (path !== "/sitemap.xml" && path !== "/robots.txt") {
          if (path && !getPage(path).noindex && !["/", "/index.html"].includes(path)) request.url = "/index.html"
          return next()
        }
        response.setHeader("Content-Type", path === "/sitemap.xml" ? "application/xml; charset=utf-8" : "text/plain; charset=utf-8")
        response.end(path === "/sitemap.xml" ? renderSitemap() : renderRobots())
      })
    }
  }]
})
