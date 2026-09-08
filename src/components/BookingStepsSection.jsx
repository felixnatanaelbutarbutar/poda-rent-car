import { ArrowRight, CalendarCheck, Check, MapPin, MessageCircle, Route } from "lucide-react"
import "../styles/booking-steps.css"

const bookingSteps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Pilih mobil & tanggal",
    description: "Temukan kendaraan yang pas, lalu tentukan paket, tanggal, durasi, dan jumlah penumpang.",
    detail: "Mobil pilihan. Jadwal Anda."
  },
  {
    number: "02",
    icon: Route,
    title: "Ceritakan rute perjalanan",
    description: "Isi lokasi penjemputan, tujuan, dan kebutuhan khusus agar kami dapat menyiapkan perjalanan Anda.",
    detail: "Dari titik jemput, ke tujuan Anda."
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Lanjutkan di WhatsApp",
    description: "Kirim ringkasan pesanan yang sudah tersusun. Tim kami akan mengonfirmasi ketersediaan unit dan harga final.",
    detail: "Detail jelas sebelum berangkat."
  }
]

export function BookingStepsSection({ onBook }) {
  return (
    <section className="booking-journey" id="cara-pesan" aria-labelledby="booking-journey-title">
      <div className="container booking-journey__layout">
        <div className="booking-journey__intro">
          <span className="booking-journey__eyebrow"><span aria-hidden="true" /> Cara pesan</span>
          <h2 id="booking-journey-title">Tiga langkah,<br />lalu lanjut di <em>WhatsApp</em></h2>
          <p className="booking-journey__description">Perjalanan yang menyenangkan dimulai dari rencana yang jelas. Siapkan detailnya, kami bantu langkah selanjutnya.</p>
          <button className="booking-journey__cta" type="button" onClick={() => onBook()}>
            <span>Mulai pesan kendaraan</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
          <p className="booking-journey__note"><Check size={16} aria-hidden="true" /> Tanpa perlu membuat akun</p>
          <div className="booking-journey__signature" aria-hidden="true">
            <MapPin size={18} />
            <span>Rencana Anda</span>
            <span className="booking-journey__signature-line" />
            <span>Perjalanan kita</span>
          </div>
        </div>

        <div className="booking-journey__guide">
          <div className="booking-journey__guide-heading">
            <span>Alur pemesanan</span>
            <span>01 — 03</span>
          </div>
          <ol className="booking-journey__steps" role="list">
            {bookingSteps.map(({ number, icon: Icon, title, description, detail }) => (
              <li className="booking-journey__step" key={number}>
                <span className="booking-journey__number" aria-hidden="true">{number}</span>
                <div className="booking-journey__step-content">
                  <div className="booking-journey__step-heading">
                    <h3>{title}</h3>
                    <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <p>{description}</p>
                  <span className="booking-journey__detail">{detail}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="booking-journey__confirmation">
            <MessageCircle size={18} aria-hidden="true" />
            <p>Pesanan dikonfirmasi langsung bersama tim kami.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
