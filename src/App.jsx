import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  Camera,
  CarFront,
  ExternalLink,
  Fuel,
  Headphones,
  MapPin,
  Menu,
  MessageCircle,
  Music2,
  Navigation,
  Phone,
  Plane,
  Route,
  ShieldCheck,
  Ship,
  Users,
  X
} from "lucide-react"
import { fleet, fleetFilters } from "./data/fleet"
import { faqItems } from "./data/faq"
import { siteConfig } from "./data/site"
import { createWhatsAppUrl, formatRupiah } from "./utils/booking"
import { Logo } from "./components/Logo"
import { HeroIllustration } from "./components/HeroIllustration"
import { VehicleCard } from "./components/VehicleCard"
import { BookingDialog } from "./components/BookingDialog"
import { RentalPackagesSection } from "./components/RentalPackagesSection"
import { BookingStepsSection } from "./components/BookingStepsSection"
import { ServiceLinks } from "./components/ServiceLinks"

const navLinks = [
  { href: "#armada", label: "Armada" },
  { href: "#paket", label: "Paket Sewa" },
  { href: "#cara-pesan", label: "Cara Pesan" },
  { href: "#lokasi", label: "Lokasi" }
]

const startingPrice = Math.min(
  ...fleet.flatMap((vehicle) =>
    [vehicle.allInPrice, vehicle.selfDrivePrice].filter((price) => price !== null && price !== undefined)
  )
)

function SectionHeader({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={"section-header section-header--" + align}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export default function App() {
  const heroRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [initialPackage, setInitialPackage] = useState("all-in")

  const filteredFleet = activeFilter === "all"
    ? fleet
    : fleet.filter((vehicle) => vehicle.categories.includes(activeFilter))

  const quickWhatsApp = createWhatsAppUrl(
    siteConfig.whatsappNumber,
    "Halo PodaRentCar, saya ingin bertanya tentang rental mobil di Bandara Silangit dan Danau Toba."
  )

  const pickupWhatsApp = createWhatsAppUrl(
    siteConfig.whatsappNumber,
    "Halo PodaRentCar 👋\n\nSaya ingin tanya, apakah bisa jemput di lokasi saya?\n\nTolong konfirmasi ketersediaan driver dan perkiraan biayanya. Terima kasih!"
  )

  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  function openBooking(vehicle = null, packageType = "all-in") {
    setSelectedVehicle(vehicle)
    setInitialPackage(packageType)
    setBookingOpen(true)
    setMobileMenuOpen(false)
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Lewati ke isi utama</a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navigasi utama">
            {navLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
          <div className="site-header__actions">
            <a className="header-phone" href={quickWhatsApp} target="_blank" rel="noreferrer" aria-label={"Hubungi WhatsApp " + siteConfig.whatsappDisplay}>
              <Phone size={17} aria-hidden="true" /><span>{siteConfig.whatsappDisplay}</span>
            </a>
            <button className="button button--primary header-book" type="button" onClick={() => openBooking()}>
              Pesan Mobil
            </button>
            <button className="icon-button menu-button" type="button" onClick={() => setMobileMenuOpen((current) => !current)} aria-expanded={mobileMenuOpen} aria-controls="mobile-nav" aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}>
              {mobileMenuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <nav id="mobile-nav" className={"mobile-nav" + (mobileMenuOpen ? " is-open" : "")} aria-label="Navigasi seluler">
          <div className="container">
            {navLinks.map((link) => <a href={link.href} key={link.href} onClick={closeMobileMenu}>{link.label}</a>)}
            <button className="button button--primary button--full" type="button" onClick={() => openBooking()}>Pesan Mobil</button>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero hero--video-background" id="beranda" ref={heroRef}>
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__content">
              <div className="hero__location"><MapPin size={16} aria-hidden="true" /> Rental mobil lokal di Silangit</div>
              <h1>Rental mobil Silangit untuk perjalanan <span className="hero__title-accent">Danau Toba</span> yang lebih tenang.</h1>
              <div className="hero__actions">
                <button className="button button--primary button--large" type="button" onClick={() => openBooking()}>
                  Pilih mobil sekarang <ArrowRight size={19} aria-hidden="true" />
                </button>
                <a className="button button--soft button--large" href={quickWhatsApp} target="_blank" rel="noreferrer">
                  <MessageCircle size={19} aria-hidden="true" /> Tanya via WhatsApp
                </a>
              </div>
              <div className="hero__starting-price">
                <span>Mulai dari</span>
                <strong>{formatRupiah(startingPrice)}</strong>
                <small>/hari lepas kunci</small>
              </div>
              <p className="hero__price-note">Melayani penjemputan bandara, wisata Danau Toba, serta perjalanan dalam dan luar kota.</p>
            </div>
          </div>
          <HeroIllustration />
        </section>

        <section className="trust-strip" aria-label="Keunggulan utama">
          <div className="container trust-strip__grid">
            <div><span><Plane size={21} aria-hidden="true" /></span><p><strong>Jemput Bandara</strong><small>Awali perjalanan tanpa repot</small></p></div>
            <div><span><Route size={21} aria-hidden="true" /></span><p><strong>Dalam & luar kota</strong><small>Rute dikonfirmasi lebih dulu</small></p></div>
            <div><span><Clock size={21} aria-hidden="true" /></span><p><strong>Driver maks. 12 jam/hari</strong><small>Untuk paket sewa All In</small></p></div>
            <div><span><Headphones size={21} aria-hidden="true" /></span><p><strong>Pesan langsung</strong><small>Konsultasi lewat WhatsApp</small></p></div>
          </div>
        </section>

        <section className="seo-intro" aria-labelledby="layanan-rental-silangit">
          <div className="container seo-intro__grid">
            <div className="seo-intro__title">
              <span className="seo-intro__icon"><CarFront size={25} aria-hidden="true" /></span>
              <div>
                <span className="eyebrow eyebrow--small">Layanan lokal terpercaya</span>
                <h2 id="layanan-rental-silangit">Rental mobil Silangit untuk bandara, wisata, dan lepas kunci</h2>
              </div>
            </div>
            <div className="seo-intro__copy">
              <p>PodaRentCar melayani sewa mobil di sekitar Bandara Silangit menuju Balige, Parapat, Pulau Samosir, dan kawasan Danau Toba. Armada tersedia untuk keluarga, perjalanan bisnis, tamu VIP, hingga rombongan.</p>
              <p>Anda dapat memilih rental mobil All In dengan driver atau mobil lepas kunci untuk kendaraan tertentu. Harga harian, kapasitas, serta jenis bahan bakar ditampilkan agar pemesanan lebih mudah.</p>
              <a className="text-link" href="#armada">Lihat harga rental mobil <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="section fleet-section" id="armada">
          <div className="container">
            <SectionHeader eyebrow="Armada PodaRentCar" title="Pilihan mobil dan harga rental di Silangit" description="Dari perjalanan berdua hingga rombongan besar. Bandingkan tarif per hari, kapasitas, bahan bakar, dan paket yang Anda perlukan." />
            <div className="filter-chips" aria-label="Filter jenis kendaraan">
              {fleetFilters.map((filter) => (
                <button type="button" key={filter.id} className={activeFilter === filter.id ? "is-active" : ""} aria-pressed={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)}>{filter.label}</button>
              ))}
            </div>
            <p className="fleet-count" aria-live="polite">Menampilkan {filteredFleet.length} kendaraan</p>
            <div className="fleet-grid">
              {filteredFleet.map((vehicle) => <VehicleCard vehicle={vehicle} onChoose={(choice) => openBooking(choice)} key={vehicle.id} />)}
            </div>
            <div className="fleet-note"><BadgeCheck size={20} aria-hidden="true" /><p><strong>Butuh foto unit terbaru?</strong> Minta foto dan cek ketersediaan kendaraan langsung melalui WhatsApp sebelum memesan.</p></div>
          </div>
        </section>

        <RentalPackagesSection fleet={fleet} onChoose={(packageType) => openBooking(null, packageType)} />

        <BookingStepsSection onBook={() => openBooking()} />
        <ServiceLinks />
        <section className="section confidence-section">
          <div className="container confidence-grid">
            <div>
              <SectionHeader eyebrow="Perjalanan lebih jelas" title="Informasi penting ada sebelum Anda berangkat" description="Kami menampilkan harga awal, kapasitas, bahan bakar, serta isi paket agar diskusi di WhatsApp lebih singkat dan tepat." />
              <a className="text-link" href="#armada">Lihat seluruh armada <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <div className="confidence-cards">
              <article><span><Users size={23} aria-hidden="true" /></span><h3>Kapasitas terlihat</h3><p>Pilih mobil berdasarkan jumlah orang yang ikut.</p></article>
              <article><span><Fuel size={23} aria-hidden="true" /></span><h3>Bahan bakar jelas</h3><p>Ketahui tipe BBM atau konfirmasi varian unit.</p></article>
              <article><span><Ship size={23} aria-hidden="true" /></span><h3>Biaya luar paket</h3><p>Ferry, tol, parkir, dan tiket wisata dijelaskan.</p></article>
              <article><span><ShieldCheck size={23} aria-hidden="true" /></span><h3>Konfirmasi final</h3><p>Unit, rute, syarat, dan harga dipastikan via WhatsApp.</p></article>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div>
              <SectionHeader eyebrow="Pertanyaan umum" title="Sebelum Anda memesan" description="Jawaban singkat untuk hal yang paling sering perlu dipastikan." />
              <a className="button button--soft" href={quickWhatsApp} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> Pertanyaan lain?</a>
            </div>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>{item.question}</span><ChevronDown size={20} aria-hidden="true" /></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section location-section" id="lokasi">
          <div className="container location-grid">
            <div className="location-card">
              <span className="eyebrow">Area layanan</span>
              <h2>Dekat Bandara Silangit, menuju seluruh pesona Danau Toba</h2>
              <p>Gunakan titik peta untuk merencanakan penjemputan. Jadwal dan titik bertemu final dikonfirmasi bersama tim.</p>
              <ul>
                <li><Plane size={19} aria-hidden="true" /><span><strong>Bandara Silangit</strong><small>Penjemputan tersedia</small></span></li>
                <li><MapPin size={19} aria-hidden="true" /><span><strong>Danau Toba & sekitarnya</strong><small>Balige, Parapat, Samosir, dan rute lain</small></span></li>
                <li><Route size={19} aria-hidden="true" /><span><strong>Dalam & luar kota</strong><small>Cakupan dan tambahan biaya dikonfirmasi</small></span></li>
              </ul>
              <div className="location-actions">
                <a className="button button--whatsapp" href={pickupWhatsApp} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> Tanya lokasi jemput</a>
                <a className="button button--soft" href={siteConfig.mapsExternalUrl} target="_blank" rel="noreferrer"><ExternalLink size={18} aria-hidden="true" /> Buka Google Maps</a>
              </div>
            </div>
            <div className="map-frame">
              <iframe src={siteConfig.mapsEmbedUrl} width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Peta lokasi layanan PodaRentCar di sekitar Bandara Silangit" />
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta__inner">
            <div><span className="eyebrow eyebrow--light">Siap menjelajah?</span><h2>Ceritakan rute Anda, kami bantu pilihkan kendaraannya.</h2></div>
            <button className="button button--light button--large" type="button" onClick={() => openBooking()}>Mulai pesan <ArrowRight size={19} aria-hidden="true" /></button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__brand"><Logo /><p>Rental mobil untuk penjemputan Bandara Silangit, wisata Danau Toba, dan perjalanan dalam maupun luar kota.</p></div>
          <div><h2>Jelajahi</h2>{navLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}<a href="#layanan">Panduan layanan rental</a></div>
          <div><h2>Hubungi</h2><a href={quickWhatsApp} target="_blank" rel="noreferrer"><Phone size={16} aria-hidden="true" /> {siteConfig.whatsappDisplay}</a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><Camera size={16} aria-hidden="true" /> {siteConfig.instagramHandle}</a><a href={siteConfig.tiktokUrl} target="_blank" rel="noreferrer"><Music2 size={16} aria-hidden="true" /> TikTok PodaRentCar</a></div>
        </div>
        <div className="container site-footer__bottom"><span>© {new Date().getFullYear()} PodaRentCar</span><span>Bandara Silangit · Danau Toba</span></div>
      </footer>

      <div className={"mobile-sticky" + (showSticky && !bookingOpen ? " is-visible" : "")} aria-hidden={!showSticky || bookingOpen}>
        <div><small>Harga mulai</small><strong>{formatRupiah(startingPrice)}<span>/hari</span></strong></div>
        <button className="button button--primary" type="button" onClick={() => openBooking()}>Pesan sekarang</button>
      </div>

      <BookingDialog open={bookingOpen} fleet={fleet} initialVehicle={selectedVehicle} initialPackage={initialPackage} onClose={() => setBookingOpen(false)} />
    </>
  )
}
