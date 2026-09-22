import assert from "node:assert/strict"
import test from "node:test"
import { fleet } from "./data/fleet.js"
import { siteConfig } from "./data/site.js"
import { absoluteUrl, getPage, homePage, indexablePages, renderSeoHead, renderSitemap, structuredData } from "./seo.js"

test("title dan description menargetkan pencarian rental mobil Silangit", () => {
  const html = renderSeoHead(homePage)
  assert.match(html, /<title>Rental Mobil Silangit &amp; Lepas Kunci \| PodaRentCar<\/title>/)
  assert.match(html, /Rental mobil Silangit untuk jemput Bandara Silangit/)
  assert.match(html, /lepas kunci mulai Rp350\.000\/hari/)
})

test("metadata dan data bisnis memakai domain www yang menjadi tujuan redirect publik", () => {
  assert.equal(siteConfig.url, "https://www.podarentcar.com")
  const html = renderSeoHead(homePage)
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  assert.ok(match, "JSON-LD harus tersedia")

  const data = JSON.parse(match[1])["@graph"].find((node) => node["@type"] === "AutoRental")
  assert.equal(data.name, "PodaRentCar")
  assert.equal(data.telephone, "+6281376242320")
  assert.equal(data.geo.latitude, 2.262573890513539)
  assert.equal(data.url, "https://www.podarentcar.com/")
  assert.equal(data["@id"], data.url + "#business")
  assert.ok(data.logo.startsWith(data.url))
  assert.ok(data.image.startsWith(data.url))
  assert.equal(data.aggregateRating, undefined)
  assert.equal(data.address, undefined, "Alamat belum dikonfirmasi; jangan dibuat-buat")
})

test("setiap layanan punya canonical, title, description unik dan tarif dari sumber armada", () => {
  for (const key of ["path", "title", "description"]) {
    assert.equal(new Set(indexablePages.map((page) => page[key])).size, indexablePages.length)
  }
  for (const page of indexablePages) {
    const head = renderSeoHead(page)
    assert.ok(head.includes(`rel="canonical" href="${absoluteUrl(page.path)}"`))
    assert.ok(head.includes(`property="og:url" content="${absoluteUrl(page.path)}"`))
    if (page.path === "/") continue
    const service = structuredData(page)["@graph"].find((node) => node["@type"] === "Service")
    const offers = service.hasOfferCatalog.itemListElement
    assert.ok(offers.length > 0)
    assert.equal(offers.length, page.vehicleIds.length)
    for (const offer of offers) {
      const vehicle = fleet.find((item) => offer.itemOffered.name.includes(item.name))
      assert.ok(vehicle)
      assert.equal(offer.priceSpecification.price, page.packageType === "self-drive" ? vehicle.selfDrivePrice : vehicle.allInPrice)
      assert.ok(offer.priceSpecification.price > 0)
    }
  }
})

test("URL tidak dikenal noindex dan tidak masuk sitemap; URL index.html dinormalisasi", () => {
  assert.equal(getPage("/index.html"), homePage)
  for (const page of indexablePages) assert.equal(getPage(page.path + "index.html"), page)
  assert.equal(getPage("/tidak-ada/").noindex, true)
  assert.match(renderSeoHead(getPage("/tidak-ada/")), /noindex, follow/)
  assert.doesNotMatch(renderSeoHead(getPage("/tidak-ada/")), /rel="canonical"/)
  assert.doesNotMatch(renderSitemap(), /404|lastmod|priority|changefreq/)
  assert.equal([...renderSitemap().matchAll(/<loc>/g)].length, indexablePages.length)
})

test("metadata meng-escape teks dan JSON-LD tidak dapat menutup script", () => {
  const head = renderSeoHead({ ...homePage, title: 'Rental <mobil> & "driver"', description: "</script><script>alert(1)</script>" })
  assert.match(head, /Rental &lt;mobil&gt; &amp; &quot;driver&quot;/)
  assert.doesNotMatch(head, /<script>alert/)
  assert.ok(JSON.parse(head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]))
})
