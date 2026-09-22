import { mkdir, readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { resolve, dirname } from "node:path"
import { createServer } from "vite"
import { indexablePages, notFoundPage, replaceSeoHead, renderRobots, renderSitemap } from "../src/seo.js"

const root = fileURLToPath(new URL("..", import.meta.url))
const outDir = resolve(root, "dist")
const template = await readFile(resolve(outDir, "index.html"), "utf8")
const server = await createServer({ root, server: { middlewareMode: true, watch: null, hmr: false }, appType: "custom" })

try {
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx")
  for (const page of [...indexablePages, notFoundPage]) {
    const content = render(page.path)
    if (!content.includes("<h1") || !template.includes('<div id="root"></div>')) {
      throw new Error(`Prerender gagal: ${page.path}`)
    }
    const html = replaceSeoHead(template, page).replace('<div id="root"></div>', () => `<div id="root">${content}</div>`)
    const target = resolve(outDir, page.noindex ? "404.html" : "." + page.path, ...(page.noindex ? [] : ["index.html"]))
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html)
    console.log(`Prerendered ${page.path}`)
  }
  await writeFile(resolve(outDir, "sitemap.xml"), renderSitemap())
  await writeFile(resolve(outDir, "robots.txt"), renderRobots())
} finally {
  await server.close()
}
