import { ArrowUpRight } from "lucide-react"
import { servicePages } from "../data/services.js"
import "../styles/services.css"

const summaries = {
  "/rental-mobil-silangit-lepas-kunci/": "Pilihan mobil untuk mengemudi sendiri, tarif harian, dan syarat yang perlu disiapkan.",
  "/sewa-mobil-silangit-dengan-driver/": "Penjemputan bandara, pilihan mobil dengan driver, serta rincian cakupan paket.",
  "/sewa-hiace-silangit/": "Bandingkan Commuter dan Premio untuk perjalanan rombongan beserta bagasinya.",
  "/sewa-mobil-danau-toba/": "Rencanakan perjalanan ke Balige, Parapat, atau Samosir dari Bandara Silangit."
}

export function ServiceLinks({ currentPath }) {
  const pages = servicePages.filter((page) => page.path !== currentPath)

  return (
    <section className="service-links" id="layanan" aria-labelledby="service-links-heading">
      <div className="container">
        <div className="service-links__heading">
          <span className="eyebrow">Layanan PodaRentCar</span>
          <h2 id="service-links-heading">{currentPath ? "Sesuaikan layanan dengan perjalanan Anda" : "Temukan layanan rental yang Anda perlukan"}</h2>
          <p>Panduan memilih paket, kendaraan, dan rute dari Silangit ke Danau Toba.</p>
        </div>
        <div className="service-links__grid">
          {pages.map((page) => (
            <a className="service-links__card" key={page.path} href={page.path}>
              <h3>{page.navLabel}</h3>
              <p>{summaries[page.path]}</p>
              <span className="service-links__action">Lihat layanan <ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
