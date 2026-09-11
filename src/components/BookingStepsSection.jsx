import { ArrowRight, CalendarCheck, Check, MapPin, MessageCircle, Sparkles } from "lucide-react"
import "../styles/booking-steps.css"

const steps = [
  {
    number: "01",
    badge: "Langkah 1",
    badgeType: "blue",
    icon: CalendarCheck,
    title: "Pilih Mobil & Tanggal",
    description:
      "Pilih kendaraan yang paling cocok untuk rombongan Anda. Tentukan paket sewa (Dengan Driver atau Lepas Kunci) dan durasi hari yang diperlukan.",
    feature: "10+ pilihan armada bersih & terawat"
  },
  {
    number: "02",
    badge: "Langkah 2",
    badgeType: "orange",
    icon: MapPin,
    title: "Tentukan Titik Jemput",
    description:
      "Tentukan lokasi penjemputan di Bandara Silangit, hotel, atau alamat rumah. Beritahu destinasi wisata Danau Toba yang ingin Anda kunjungi.",
    feature: "Siap jemput langsung di bandara"
  },
  {
    number: "03",
    badge: "Langkah 3",
    badgeType: "green",
    icon: MessageCircle,
    title: "Konfirmasi di WhatsApp",
    description:
      "Format pesanan tersusun rapi otomatis. Kirim ke WhatsApp kami untuk memastikan jadwal, ketersediaan unit, dan harga final tanpa biaya tersembunyi.",
    feature: "Respon cepat · Tanpa deposit awal",
    highlight: true
  }
]

export function BookingStepsSection({ onBook }) {
  return (
    <section className="booking-steps-section" id="cara-pesan" aria-labelledby="steps-section-title">
      <div className="container">
        {/* Section Header */}
        <div className="booking-steps__header">
          <span className="eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            Alur Pemesanan Cepat
          </span>
          <h2 id="steps-section-title">
            3 Langkah Mudah, <br />
            <em>Langsung Siap Jalan.</em>
          </h2>
          <p className="booking-steps__subtitle">
            Tanpa ribet daftar akun dan tanpa formulir panjang. Semua proses dibuat transparan, cepat, dan langsung terhubung bersama tim kami di WhatsApp.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <ol className="booking-steps__grid" role="list">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <li
                key={step.number}
                className={`booking-step-card ${step.highlight ? "booking-step-card--highlight" : ""}`}
              >
                {/* Top Badge & Number */}
                <div className="booking-step-card__top">
                  <span className={`booking-step-card__badge booking-step-card__badge--${step.badgeType}`}>
                    {step.badge}
                  </span>
                  <div className={`booking-step-card__icon-wrap booking-step-card__icon-wrap--${step.badgeType}`}>
                    <Icon size={24} strokeWidth={1.9} aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <div className="booking-step-card__body">
                  <h3 className="booking-step-card__title">{step.title}</h3>
                  <p className="booking-step-card__desc">{step.description}</p>
                </div>

                {/* Perk Badge */}
                <div className="booking-step-card__footer">
                  <div className="booking-step-card__perk">
                    <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                    <span>{step.feature}</span>
                  </div>
                </div>

                {/* Arrow Connector for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="booking-step-card__connector" aria-hidden="true">
                    <ArrowRight size={18} />
                  </div>
                )}
              </li>
            )
          })}
        </ol>

        {/* Bottom CTA Area */}
        <div className="booking-steps__cta-wrap">
          <button
            type="button"
            className="booking-steps__button"
            onClick={() => onBook && onBook()}
          >
            <span>Mulai Pesan Kendaraan</span>
            <ArrowRight size={19} aria-hidden="true" />
          </button>

          <div className="booking-steps__trust">
            <span>
              <Check size={15} aria-hidden="true" /> Tanpa registrasi akun
            </span>
            <span className="booking-steps__trust-dot" aria-hidden="true">•</span>
            <span>
              <Check size={15} aria-hidden="true" /> Konfirmasi langsung via WhatsApp
            </span>
            <span className="booking-steps__trust-dot" aria-hidden="true">•</span>
            <span>
              <Check size={15} aria-hidden="true" /> Tanpa deposit awal
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
