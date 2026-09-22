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
  return message.split("\n").filter((line) => /^[A-Za-z. ]+ : /.test(line))
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
  const message = "Halo & terima kasih\nPoda + keluarga #1?"
  const url = createWhatsAppUrl("6281376242320", message)
  assert.match(url, /^https:\/\/wa\.me\/6281376242320\?text=/)
  assert.match(url, /%26/)
  assert.match(url, /%0A/)
  assert.equal(new URL(url).searchParams.get("text"), message)
  assert.equal(new URL(url).hash, "")
})

test("pesan mobil memuat bagian pemesanan dan titik dua sejajar", () => {
  const message = buildCarBookingMessage({
    name: "Budi",
    phone: "0812",
    vehicleName: "Innova Zenix",
    packageLabel: "All In — Dengan Driver",
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
  assert.deepEqual(
    message.match(/^\*.+\*$/gm),
    ["*PERMINTAAN SEWA MOBIL*", "*Pemesan*", "*Kendaraan*", "*Jadwal*", "*Rute*", "*Estimasi Tarif*", "*Catatan*"]
  )
  assert.deepEqual(lines.map((line) => line.replace(/ +: /, ": ")), [
    "Nama: Budi",
    "No. WA: 0812",
    "Mobil: Innova Zenix",
    "Paket: All In — Dengan Driver",
    "Tanggal: 2026-09-10",
    "Durasi: 3 hari",
    "Penumpang: 5 orang",
    "Jemput: Bandara Silangit",
    "Tujuan: Balige"
  ])
  assert.match(message, /\*Estimasi Tarif\*\nRp2\.100\.000 \(belum termasuk biaya di luar paket\)/)
  assert.match(message, /\*Catatan\*\nKursi anak\n/)
  assert.match(message, /Mohon konfirmasi ketersediaan unit, rute, syarat, dan harga finalnya\. Terima kasih!$/)
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

  assert.doesNotMatch(message, /Estimasi|(?:Rp|IDR)\s*\d/i)
  assert.match(message, /Mohon info ketersediaan dan harganya/)
  assert.match(message, /^\*PERMINTAAN SEWA AMBULANS\*/)
  assert.deepEqual(
    message.match(/^\*.+\*$/gm),
    ["*PERMINTAAN SEWA AMBULANS*", "*Penghubung*", "*Waktu & Lokasi*", "*Kebutuhan Khusus*"]
  )
  assert.deepEqual(detailLines(message).map((line) => line.replace(/ +: /, ": ")), [
    "Nama: Budi",
    "No. WA: 0812",
    "Perkiraan: 2026-09-10 10:00",
    "Jemput: Silangit",
    "Tujuan: Balige"
  ])
  assert.match(message, /\*Kebutuhan Khusus\*\nAntar pasien\n/)
  assert.equal(
    new Set(detailLines(message).map((line) => line.indexOf(":"))).size,
    1
  )
})
