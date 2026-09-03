import test from "node:test"
import assert from "node:assert/strict"
import {
  buildAmbulanceMessage,
  calculateEstimate,
  createWhatsAppUrl,
  formatRupiah,
  getDailyRate,
  isPackageAvailable
} from "./booking.js"

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

test("membuat URL WhatsApp ke nomor tujuan dan meng-encode pesan", () => {
  const url = createWhatsAppUrl("6281376242320", "Halo & terima kasih\nPoda")
  assert.match(url, /^https:\/\/wa\.me\/6281376242320\?text=/)
  assert.match(url, /%26/)
  assert.match(url, /%0A/)
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
})
