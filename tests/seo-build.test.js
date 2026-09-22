import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { indexablePages, absoluteUrl } from "../src/seo.js"
import { fleet } from "../src/data/fleet.js"

const dist = resolve("dist")
const readPage = (path) => readFileSync(resolve(dist, "." + path, "index.html"), "utf8")
const sitemap = readFileSync(resolve(dist, "sitemap.xml"), "utf8")

for (const page of indexablePages) {
  test(`HTML produksi ${page.path} dapat dibaca tanpa JavaScript`, () => {
    const html = readPage(page.path)
    assert.match(html, /<html lang="id">/)
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1)
    assert.ok(html.includes(page.heading))
    assert.doesNotMatch(html, /<div id="root"><\/div>/)
    assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1)
    assert.ok(html.includes(`rel="canonical" href="${absoluteUrl(page.path)}"`))
    assert.ok(sitemap.includes(`<loc>${absoluteUrl(page.path)}</loc>`))
    assert.doesNotMatch(html, /noindex|https:\/\/podarentcar\.com/)
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
    assert.ok(schema["@graph"].some((node) => node["@type"] === "AutoRental"))
    const service = schema["@graph"].find((node) => node["@type"] === "Service")
    for (const offer of service?.hasOfferCatalog.itemListElement || []) {
      const target = new URL(offer.url)
      assert.equal(target.pathname, page.path)
      assert.ok(html.includes(`id="${target.hash.slice(1)}"`), "Tautan harga dalam schema memiliki target nyata")
    }
    for (const linked of indexablePages.filter((other) => other !== page && other.path !== "/")) {
      assert.ok(html.includes(`href="${linked.path}"`), `Tautan ${linked.path} tersedia`)
    }
    for (const [, href] of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const target = resolve(dist, "." + href, ...(href.endsWith("/") ? ["index.html"] : []))
      assert.ok(existsSync(target), `Tujuan internal tersedia: ${href}`)
    }
    // Fragment-only and same-page links must resolve to a real element.
    for (const [, id] of html.matchAll(/href="#([^"\s]+)"/g)) {
      assert.ok(html.includes(`id="${id}"`), `Anchor tersedia: #${id}`)
    }
    const vehicles = page.path === "/" ? fleet : fleet.filter((vehicle) => page.vehicleIds.includes(vehicle.id))
    for (const vehicle of vehicles) assert.ok(html.includes(vehicle.name), `${vehicle.name} ada di HTML awal`)
  })
}

test("404 statis tidak diindeks dan robots menunjuk sitemap yang sama", () => {
  const html = readFileSync(resolve(dist, "404.html"), "utf8")
  assert.match(html, /noindex, follow/)
  assert.match(html, /Halaman tidak ditemukan/)
  assert.doesNotMatch(sitemap, /404/)
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, indexablePages.length)
  assert.equal(readFileSync(resolve(dist, "robots.txt"), "utf8"), `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`)
})
