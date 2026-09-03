const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
})

export function formatRupiah(value) {
  return rupiahFormatter.format(value).replace(/\s/g, "")
}

export function isPackageAvailable(vehicle, packageType) {
  if (!vehicle) return false
  if (packageType === "all-in") return vehicle.allInPrice > 0
  if (packageType === "self-drive") return vehicle.selfDrivePrice !== null
  return false
}

export function getDailyRate(vehicle, packageType) {
  if (!isPackageAvailable(vehicle, packageType)) return null
  return packageType === "all-in"
    ? vehicle.allInPrice
    : vehicle.selfDrivePrice
}

export function calculateEstimate(vehicle, packageType, days) {
  const dailyRate = getDailyRate(vehicle, packageType)
  const normalizedDays = Number(days)

  if (dailyRate === null) return null
  if (!Number.isInteger(normalizedDays) || normalizedDays < 1) return null

  return dailyRate * normalizedDays
}

export function getPackageLabel(packageType) {
  return packageType === "self-drive"
    ? "Lepas Kunci — Tanpa Driver & BBM"
    : "All In — Driver + BBM"
}

export function getPackageUsageLabel(packageType) {
  return packageType === "self-drive"
    ? "Bebas 24 jam per hari"
    : "Driver maksimal 12 jam perjalanan per hari"
}

export function getLocalDateMinimum(date = new Date()) {
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - offset * 60 * 1000)
  return localDate.toISOString().slice(0, 10)
}

export function validateBooking(values, vehicle) {
  const errors = {}
  const days = Number(values.days)
  const passengers = Number(values.passengers)

  if (!vehicle) errors.vehicleId = "Pilih kendaraan."
  if (!values.packageType) errors.packageType = "Pilih paket sewa."
  if (
    values.packageType === "self-drive" &&
    vehicle &&
    vehicle.selfDrivePrice === null
  ) {
    errors.packageType =
      "Kendaraan ini tidak tersedia untuk Lepas Kunci."
  }
  if (!values.startDate) {
    errors.startDate = "Pilih tanggal mulai."
  } else if (values.startDate < getLocalDateMinimum()) {
    errors.startDate = "Tanggal mulai tidak boleh sebelum hari ini."
  }
  if (!Number.isInteger(days) || days < 1) {
    errors.days = "Masukkan durasi minimal 1 hari."
  }
  if (!Number.isInteger(passengers) || passengers < 1) {
    errors.passengers = "Masukkan jumlah penumpang minimal 1."
  } else if (
    vehicle &&
    passengers >
      (values.packageType === "self-drive"
        ? vehicle.totalSeatsSelfDrive
        : vehicle.passengerCapacityWithDriver)
  ) {
    errors.passengers =
      "Jumlah penumpang melebihi kapasitas nyaman. Pilih kendaraan yang lebih besar."
  }
  if (!values.name.trim()) errors.name = "Masukkan nama pemesan."
  if (!values.phone.trim()) errors.phone = "Masukkan nomor WhatsApp."
  if (!values.pickupLocation.trim()) {
    errors.pickupLocation = "Masukkan lokasi jemput."
  }
  if (!values.destination.trim()) {
    errors.destination = "Masukkan tujuan atau rute."
  }

  return errors
}

function formatMessageDetails(rows) {
  const longestLabel = Math.max(...rows.map(([label]) => label.length))

  return rows
    .map(([label, value]) => label.padEnd(longestLabel) + " : " + value)
    .join("\n")
}

export function buildCarBookingMessage(booking) {
  const details = formatMessageDetails([
    ["Nama", booking.name],
    ["No. WhatsApp", booking.phone],
    ["Mobil", booking.vehicleName],
    ["Paket", booking.packageLabel],
    ["Waktu pemakaian", booking.usageLabel],
    ["Tanggal mulai", booking.startDate],
    ["Durasi", booking.days + " hari"],
    ["Jumlah penumpang", booking.passengers],
    ["Lokasi jemput", booking.pickupLocation],
    ["Tujuan/rute", booking.destination],
    ["Estimasi tarif sewa", booking.formattedEstimate],
    ["Catatan", booking.notes || "-"]
  ])

  return [
    "*PERMINTAAN SEWA MOBIL*",
    "_Halo PodaRentCar, saya ingin mengecek ketersediaan kendaraan._",
    "",
    "*DETAIL PEMESANAN*",
    "```",
    details,
    "```",
    "",
    "_Mohon konfirmasi ketersediaan, cakupan rute, syarat, dan harga final. Terima kasih._"
  ].join("\n")
}

export function buildAmbulanceMessage(values) {
  const details = formatMessageDetails([
    ["Nama", values.name],
    ["No. WhatsApp", values.phone],
    ["Tanggal dan waktu", values.dateTime],
    ["Lokasi jemput", values.pickupLocation],
    ["Tujuan", values.destination],
    ["Kebutuhan singkat", values.needs || "-"]
  ])

  return [
    "*PERMINTAAN SEWA AMBULANS*",
    "_Halo PodaRentCar, saya ingin menanyakan layanan sewa ambulans._",
    "",
    "*DETAIL KEBUTUHAN*",
    "```",
    details,
    "```",
    "",
    "_Mohon info ketersediaan dan harganya. Terima kasih._"
  ].join("\n")
}

export function createWhatsAppUrl(number, message) {
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message)
}
