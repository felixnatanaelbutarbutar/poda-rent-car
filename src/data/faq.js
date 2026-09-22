import { fleet } from "./fleet.js"
import { formatRupiah } from "../utils/booking.js"

const rentalCars = fleet.filter((vehicle) => !vehicle.priceOnRequest)
const selfDriveMinimum = Math.min(...rentalCars.map((vehicle) => vehicle.selfDrivePrice).filter(Number.isFinite))
const driverMinimum = Math.min(...rentalCars.map((vehicle) => vehicle.allInPrice).filter(Number.isFinite))

export const faqItems = [
  {
    question: "Berapa harga rental mobil Silangit per hari?",
    answer: `Tarif lepas kunci mulai ${formatRupiah(selfDriveMinimum)}/hari dan paket dengan driver mulai ${formatRupiah(driverMinimum)}/hari. Estimasi mengikuti jenis mobil dan durasi sewa. Rute, ketersediaan unit, biaya di luar paket, dan harga final dikonfirmasi melalui WhatsApp.`
  },
  {
    question: "Apa perbedaan All In dan Lepas Kunci?",
    answer:
      "All In mencakup jasa driver dengan layanan maksimal 12 jam perjalanan per hari. Lepas Kunci mencakup unit kendaraan tanpa driver, dengan pemakaian bebas 24 jam per hari."
  },
  {
    question: "Mobil apa saja yang bisa Lepas Kunci?",
    answer:
      "Lepas Kunci tersedia untuk Innova Reborn, Avanza Veloz, Avanza All New, serta Rush atau Terios. Ketersediaan unit dan persyaratan tetap dikonfirmasi lewat WhatsApp."
  },
  {
    question: "Apakah harga berlaku untuk luar kota?",
    answer:
      "Kami melayani perjalanan dalam dan luar kota. Tarif All In yang tercantum mencakup area Danau Toba; rute di luar cakupan tersebut dikonfirmasi melalui WhatsApp."
  },
  {
    question: "Apakah antar-jemput Bandara Silangit gratis?",
    answer:
      "Pada paket All In tersedia gratis satu kali penjemputan bandara di awal pemakaian dan satu kali pengantaran ke bandara di akhir pemakaian."
  },
  {
    question: "Apakah tiket ferry dan biaya parkir sudah termasuk?",
    answer:
      "Belum. Parkir, tol, tiket ferry, tiket destinasi, serta makan dan penginapan driver tidak termasuk dalam tarif All In."
  },
  {
    question: "Apakah estimasi di website merupakan harga final?",
    answer:
      "Belum. Estimasi dihitung dari tarif harian dikali jumlah hari. Ketersediaan, rute, syarat, dan harga final dikonfirmasi melalui WhatsApp."
  },
  {
    question: "Bagaimana menanyakan layanan ambulans?",
    answer:
      "Pada kartu Ambulans di daftar armada, pilih Tanya harga via WhatsApp. Sampaikan waktu dan rute kebutuhan Anda; harga serta ketersediaan dikonfirmasi langsung."
  }
]
