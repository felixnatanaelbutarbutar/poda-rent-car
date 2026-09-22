import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone, Users } from "lucide-react"
import { fleet } from "../data/fleet.js"
import { allInExcludes, allInIncludes, selfDriveExcludes, selfDriveIncludes, siteConfig } from "../data/site.js"
import { createWhatsAppUrl, formatRupiah, getDailyRate, getPackageLabel, getPackageUsageLabel } from "../utils/booking.js"
import { Logo } from "./Logo.jsx"
import { ServiceLinks } from "./ServiceLinks.jsx"
import "../styles/services.css"

function serviceWhatsApp(page, vehicle) {
  return createWhatsAppUrl(siteConfig.whatsappNumber, [
    "Halo PodaRentCar, saya ingin menanyakan " + page.navLabel.toLowerCase() + ".",
    vehicle ? "Pilihan kendaraan: " + vehicle.name : "Mohon bantu pilihkan kendaraan sesuai kebutuhan saya.",
    "Paket: " + getPackageLabel(page.packageType),
    "Tanggal mulai: ",
    "Durasi: ",
    "Jumlah penumpang dan bagasi: ",
    "Lokasi jemput: ",
    "Tujuan/rute: ",
    "Mohon konfirmasi ketersediaan, syarat, cakupan paket, dan harga final. Terima kasih."
  ].join("\n"))
}

export function ServicePage({ page }) {
  const vehicles = page.vehicleIds.map((id) => fleet.find((vehicle) => vehicle.id === id)).filter(Boolean)
  const isSelfDrive = page.packageType === "self-drive"
  const lowestRate = Math.min(...vehicles.map((vehicle) => getDailyRate(vehicle, page.packageType)))
  const whatsappUrl = serviceWhatsApp(page)
  const includes = isSelfDrive ? selfDriveIncludes : allInIncludes
  const excludes = isSelfDrive ? selfDriveExcludes : allInExcludes

  return (
    <div className="service-page">
      <a className="skip-link" href="#service-main">Langsung ke isi halaman</a>
      <header className="service-header">
        <div className="container service-header__inner">
          <Logo href="/" />
          <nav className="service-header__nav" aria-label="Navigasi utama">
            <a href="/#armada">Semua armada</a>
            <a className="button button--whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />Tanya WhatsApp</a>
          </nav>
        </div>
      </header>

      <main id="service-main">
        <div className="container">
          <nav className="service-breadcrumbs" aria-label="Breadcrumb">
            <ol><li><a href="/">Beranda</a></li><li aria-current="page">{page.navLabel}</li></ol>
          </nav>
        </div>

        <section className="service-hero" aria-labelledby="service-title">
          <div className="container service-hero__grid">
            <div className="service-hero__copy">
              <span className="eyebrow">Silangit · Danau Toba</span>
              <h1 id="service-title">{page.heading}</h1>
              <p>{page.intro}</p>
              <a className="button button--primary button--large" href="#harga">Bandingkan pilihan mobil <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
            <aside className="service-hero__summary" aria-label="Ringkasan paket">
              <span className="service-hero__package">{getPackageLabel(page.packageType)}</span>
              <span className="service-hero__rate-label">Tarif katalog mulai</span>
              <p className="service-hero__price">{formatRupiah(lowestRate)}<span>/ hari</span></p>
              <p className="service-hero__usage">{getPackageUsageLabel(page.packageType)}</p>
              <p className="service-note">Ketersediaan, rute, syarat, dan harga akhir dikonfirmasi melalui WhatsApp.</p>
            </aside>
          </div>
        </section>

        <section className="service-fleet container" id="harga" aria-labelledby="service-fleet-title">
          <div className="service-section-heading">
            <span className="eyebrow">Pilihan kendaraan</span>
            <h2 id="service-fleet-title">Bandingkan tarif dan kapasitas</h2>
            <p>Tarif dasar per kendaraan per hari untuk paket {isSelfDrive ? "lepas kunci" : "dengan driver"}. Estimasi sewa adalah tarif harian dikalikan jumlah hari.</p>
          </div>
          <div className="service-fleet__grid">
            {vehicles.map((vehicle) => (
              <article className="service-vehicle" key={vehicle.id}>
                <div className="service-vehicle__image"><img src={vehicle.image} alt={vehicle.imageAlt} width="800" height="500" loading="lazy" decoding="async" /></div>
                <div className="service-vehicle__body">
                  <h3>{vehicle.name}</h3>
                  <p className="service-vehicle__capacity"><Users size={18} aria-hidden="true" />{isSelfDrive ? `Hingga ${vehicle.totalSeatsSelfDrive} orang termasuk pengemudi` : `Hingga ${vehicle.passengerCapacityWithDriver} penumpang + driver`}</p>
                  <p className="service-vehicle__price">{formatRupiah(getDailyRate(vehicle, page.packageType))}<span>/ hari</span></p>
                  <a className="button button--outline" href={serviceWhatsApp(page, vehicle)} target="_blank" rel="noopener noreferrer" aria-label={"Tanya ketersediaan " + vehicle.name + " via WhatsApp"}>Tanya ketersediaan <ArrowUpRightIcon /></a>
                </div>
              </article>
            ))}
          </div>
          <p className="service-note service-fleet__note">Kapasitas dan konfigurasi kursi perlu dikonfirmasi terhadap unit aktual. Ruang bagasi dapat berkurang saat seluruh kursi terisi. Tarif belum termasuk biaya di luar paket.</p>
        </section>

        <section className="service-package container" aria-labelledby="service-package-title">
          <div className="service-section-heading"><span className="eyebrow">Cakupan sewa</span><h2 id="service-package-title">Pahami paket sebelum memesan</h2></div>
          <div className="service-package__grid">
            <div className="service-package__panel"><h3>Termasuk dalam paket</h3><ul>{includes.map((item) => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
            <div className="service-package__panel service-package__panel--subtle"><h3>Di luar paket</h3><ul>{excludes.map((item) => <li key={item}><span className="service-package__dash" aria-hidden="true">—</span><span>{item}</span></li>)}</ul></div>
          </div>
        </section>

        <div className="service-guide container">
          <div className="service-guide__content">
            {page.sections.map((section) => (
              <section className="service-guide__section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
              </section>
            ))}
          </div>
          <aside className="service-guide__booking" aria-labelledby="service-booking-title">
            <span className="eyebrow">Rencana perjalanan Anda</span>
            <h2 id="service-booking-title">Siapkan detail, lalu cek ketersediaan</h2>
            <p>Kirim tanggal mulai, jumlah hari, penumpang, barang bawaan, lokasi jemput, dan rute yang Anda inginkan.</p>
            <a className="button button--whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />Tanya via WhatsApp</a>
            <p className="service-note">Permintaan melalui WhatsApp belum menjadi konfirmasi pemesanan. Unit dan harga akhir perlu disepakati bersama.</p>
          </aside>
        </div>

        <section className="service-faq" aria-labelledby="service-faq-title">
          <div className="container">
            <div className="service-section-heading"><span className="eyebrow">Sebelum berangkat</span><h2 id="service-faq-title">Pertanyaan tentang layanan ini</h2></div>
            <div className="service-faq__grid">
              {page.faqs.map((faq) => <article className="service-faq__item" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}
            </div>
          </div>
        </section>

        <ServiceLinks currentPath={page.path} />
      </main>

      <footer className="service-footer">
        <div className="container service-footer__inner">
          <div><strong>{siteConfig.name}</strong><p>Rental mobil Bandara Silangit dan Danau Toba.</p><a className="service-footer__phone" href={"tel:+" + siteConfig.whatsappNumber}><Phone size={17} aria-hidden="true" />{siteConfig.whatsappDisplay}</a></div>
          <a className="service-footer__home" href="/"><ArrowLeft size={18} aria-hidden="true" />Kembali ke semua layanan</a>
        </div>
      </footer>
    </div>
  )
}

function ArrowUpRightIcon() {
  return <ArrowRight size={17} aria-hidden="true" />
}
