import { fleet } from "./data/fleet.js"
import { servicePages } from "./data/services.js"
import { siteConfig } from "./data/site.js"
import { formatRupiah } from "./utils/booking.js"

const prices = fleet.flatMap((vehicle) => [vehicle.allInPrice, vehicle.selfDrivePrice]).filter(Number.isFinite)
const minimumPrice = Math.min(...prices)

export const homePage = {
  path: "/",
  title: "Rental Mobil Silangit & Lepas Kunci | PodaRentCar",
  description: `Rental mobil Silangit untuk jemput Bandara Silangit dan wisata Danau Toba. Pilih mobil dengan driver atau lepas kunci mulai ${formatRupiah(minimumPrice)}/hari.`,
  heading: "Rental mobil Silangit",
  navLabel: "Beranda"
}

export const notFoundPage = {
  path: "/404.html",
  title: "Halaman tidak ditemukan | PodaRentCar",
  description: "Temukan armada dan layanan rental mobil PodaRentCar di Bandara Silangit dan Danau Toba.",
  noindex: true
}

export const indexablePages = [homePage, ...servicePages]

export function normalizePath(pathname) {
  const path = pathname.split(/[?#]/)[0].replace(/\/index\.html$/, "/")
  return path === "/" || path.endsWith("/") ? path : path + "/"
}

export function getPage(pathname) {
  return indexablePages.find((page) => page.path === normalizePath(pathname)) || notFoundPage
}

export function absoluteUrl(path) {
  return new URL(path, siteConfig.url + "/").href
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character])
}

export function structuredData(page) {
  if (page.noindex) return null
  const businessId = absoluteUrl("/#business")
  const websiteId = absoluteUrl("/#website")
  const url = absoluteUrl(page.path)
  const business = {
    "@type": "AutoRental",
    "@id": businessId,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo-icon.png"),
    image: absoluteUrl(siteConfig.socialImage),
    description: "Rental mobil Bandara Silangit dan Danau Toba dengan pilihan mobil dengan driver dan lepas kunci.",
    telephone: "+" + siteConfig.whatsappNumber,
    priceRange: `${formatRupiah(minimumPrice)}–${formatRupiah(Math.max(...prices))} per hari`,
    areaServed: siteConfig.serviceAreas.map((name) => ({ "@type": "Place", name })),
    geo: { "@type": "GeoCoordinates", latitude: 2.262573890513539, longitude: 98.98723886710006 },
    hasMap: siteConfig.mapsExternalUrl,
    sameAs: [siteConfig.instagramUrl, siteConfig.tiktokUrl.split("?")[0]]
  }
  const graph = [
    business,
    { "@type": "WebSite", "@id": websiteId, url: absoluteUrl("/"), name: siteConfig.name, inLanguage: "id-ID", publisher: { "@id": businessId } },
    {
      "@type": "WebPage", "@id": url + "#webpage", url,
      name: page.title, description: page.description, inLanguage: "id-ID",
      isPartOf: { "@id": websiteId }, about: { "@id": businessId },
      mainEntity: { "@id": page.path === "/" ? businessId : url + "#service" },
      ...(page.path !== "/" && { breadcrumb: { "@id": url + "#breadcrumb" } })
    }
  ]
  if (page.path !== "/") {
    const selectedFleet = fleet.filter((vehicle) => page.vehicleIds.includes(vehicle.id))
    graph.push(
      {
        "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: page.navLabel, item: url }
        ]
      },
      {
        "@type": "Service", "@id": url + "#service", url,
        name: page.heading, description: page.description,
        provider: { "@id": businessId }, areaServed: business.areaServed,
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: page.heading,
          itemListElement: selectedFleet.map((vehicle) => ({
            "@type": "Offer", url: url + "#harga",
            priceSpecification: {
              "@type": "UnitPriceSpecification", priceCurrency: "IDR", unitCode: "DAY",
              price: page.packageType === "self-drive" ? vehicle.selfDrivePrice : vehicle.allInPrice
            },
            description: "Tarif dasar per hari. Ketersediaan, cakupan rute, syarat, dan harga final dikonfirmasi melalui WhatsApp.",
            itemOffered: { "@type": "Service", name: `Sewa ${vehicle.name} ${page.packageType === "self-drive" ? "lepas kunci" : "dengan driver"}`, provider: { "@id": businessId } }
          }))
        }
      }
    )
  }
  return { "@context": "https://schema.org", "@graph": graph }
}

export function renderSeoHead(page) {
  const url = absoluteUrl(page.path)
  const image = absoluteUrl(siteConfig.socialImage)
  const meta = (name, content, attribute = "name") => `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`
  const graph = structuredData(page)
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    meta("description", page.description),
    meta("robots", page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"),
    ...(!page.noindex ? [`<link rel="canonical" href="${escapeHtml(url)}" />`] : []),
    meta("og:locale", "id_ID", "property"), meta("og:type", "website", "property"),
    meta("og:site_name", siteConfig.name, "property"), meta("og:title", page.title, "property"),
    meta("og:description", page.description, "property"), meta("og:url", url, "property"),
    meta("og:image", image, "property"), meta("og:image:alt", "Pemandangan perjalanan di kawasan Danau Toba", "property"),
    meta("twitter:card", "summary_large_image"), meta("twitter:title", page.title),
    meta("twitter:description", page.description), meta("twitter:image", image),
    meta("twitter:image:alt", "Pemandangan perjalanan di kawasan Danau Toba"),
    ...(page.path === "/" ? ['<link rel="preload" as="image" href="/hero-poster.jpg" fetchpriority="high" />'] : []),
    ...(graph ? [`<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`] : [])
  ].join("\n    ")
}

export function replaceSeoHead(html, page) {
  return html.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => `<!--seo:start-->\n    ${renderSeoHead(page)}\n    <!--seo:end-->`)
}

export function renderSitemap() {
  // Omit lastmod until a reliable content modification date is available per page.
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePages.map((page) => `  <url><loc>${escapeHtml(absoluteUrl(page.path))}</loc></url>`).join("\n")}\n</urlset>\n`
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
}
