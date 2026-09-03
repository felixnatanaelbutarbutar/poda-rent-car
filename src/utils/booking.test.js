import test from "node:test"
import assert from "node:assert/strict"
import {
  buildAmbulanceMessage,
  buildCarBookingMessage,
  calculateEstimate,
  createWhatsAppUrl,
  formatRupiah,
  getDailyRate,
  getPackageUsageLabel,
  isPackageAvailable
} from "./booking.js"

function detailLines(message) {
  return message.split("```")[1].trim().split("\n")
}

const vehicle = {
  allInPrice: 700000,
  selfDrivePrice: 350000
}

const allInOnlyVehicle = {
  allInPrice: 1700000,
  selfDrivePrice: null
}

test("formatRupiah memakai format Indonesia tanpa desimal", () => {
  assert.equal(formatRupiah(1700000), "Rp1.700.000")
})

test("menghitung estimasi tarif per hari", () => {
  assert.equal(calculateEstimate(vehicle, "all-in", 3), 2100000)
  assert.equal(calculateEstimate(vehicle, "self-drive", 2), 700000)
})

test("menolak durasi tidak valid", () => {
  assert.equal(calculateEstimate(vehicle, "all-in", 0), null)
  assert.equal(calculateEstimate(vehicle, "all-in", -1), null)
  assert.equal(calculateEstimate(vehicle, "all-in", 1.5), null)
})

test("membatasi Lepas Kunci berdasarkan data kendaraan", () => {
  assert.equal(isPackageAvailable(vehicle, "self-drive"), true)
  assert.equal(isPackageAvailable(allInOnlyVehicle, "self-drive"), false)
  assert.equal(getDailyRate(allInOnlyVehicle, "self-drive"), null)
})

test("menjelaskan batas waktu pemakaian setiap paket", () => {
  assert.equal(
    getPackageUsageLabel("all-in"),
    "Driver maksimal 12 jam perjalanan per hari"
  )
  assert.equal(getPackageUsageLabel("self-drive"), "Bebas 24 jam per hari")
})

test("membuat URL WhatsApp ke nomor tujuan dan meng-encode pesan", () => {
  const url = createWhatsAppUrl("6281376242320", "Halo & terima kasih\nPoda")
  assert.match(url, /^https:\/\/wa\.me\/6281376242320\?text=/)
  assert.match(url, /%26/)
  assert.match(url, /%0A/)
})

test("pesan mobil memakai format WhatsApp yang elegan dan titik dua sejajar", () => {
  const message = buildCarBookingMessage({
    name: "Budi",
    phone: "0812",
    vehicleName: "Innova Zenix",
    packageLabel: "All In — Driver + BBM",
    usageLabel: "Driver maksimal 12 jam perjalanan per hari",
    startDate: "2026-09-10",
    days: 3,
    passengers: 5,
    pickupLocation: "Bandara Silangit",
    destination: "Balige",
    formattedEstimate: "Rp2.100.000",
    notes: "Kursi anak"
  })
  const lines = detailLines(message)

  assert.match(message, /^\*PERMINTAAN SEWA MOBIL\*/)
  assert.match(message, /\*DETAIL PEMESANAN\*\n```/)
  assert.match(message, /Waktu pemakaian\s+: Driver maksimal 12 jam/)
  assert.match(message, /_Mohon konfirmasi.+Terima kasih\._$/)
  assert.equal(new Set(lines.map((line) => line.indexOf(":"))).size, 1)
})

test("pesan ambulans tidak memuat estimasi harga", () => {
  const message = buildAmbulanceMessage({
    name: "Budi",
    phone: "0812",
    dateTime: "2026-09-10 10:00",
    pickupLocation: "Silangit",
    destination: "Balige",
    needs: "Antar pasien"
  })

  assert.doesNotMatch(message, /Estimasi/)
  assert.match(message, /Mohon info ketersediaan dan harganya/)
  assert.match(message, /^\*PERMINTAAN SEWA AMBULANS\*/)
  assert.match(message, /\*DETAIL KEBUTUHAN\*\n```/)
  assert.equal(
    new Set(detailLines(message).map((line) => line.indexOf(":"))).size,
    1
  )
})
