import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8")
const appSource = readFileSync(new URL("./App.jsx", import.meta.url), "utf8")

test("title dan description menargetkan pencarian rental mobil Silangit", () => {
  assert.match(html, /<title>Rental Mobil Silangit &amp; Lepas Kunci \| PodaRentCar<\/title>/)
  assert.match(html, /Rental mobil Silangit untuk jemput Bandara Silangit/)
  assert.match(html, /lepas kunci mulai Rp350\.000\/hari/)
})

test("structured data AutoRental valid dan memakai data bisnis yang diberikan", () => {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  assert.ok(match, "JSON-LD harus tersedia")

  const structuredData = JSON.parse(match[1])
  assert.equal(structuredData["@type"], "AutoRental")
  assert.equal(structuredData.name, "PodaRentCar")
  assert.equal(structuredData.telephone, "+6281376242320")
  assert.equal(structuredData.geo.latitude, 2.262573890513539)
})

test("halaman memiliki satu H1 yang memuat topik utama", () => {
  const headings = [...appSource.matchAll(/<h1>(.*?)<\/h1>/g)]
  assert.equal(headings.length, 1)
  assert.match(headings[0][1], /Rental mobil Silangit/)
})
