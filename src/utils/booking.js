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
    ? "Lepas Kunci — Tanpa Driver"
    : "All In — Dengan Driver"
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
  const lines = [
    "*PERMINTAAN SEWA MOBIL*",
    "_PodaRentCar — Rental Mobil Silangit_",
    "",
    "Halo, saya ingin mengecek ketersediaan kendaraan.",
    "",
    "*Pemesan*",
    "Nama         : " + booking.name,
    "No. WA       : " + booking.phone,
    "",
    "*Kendaraan*",
    "Mobil        : " + booking.vehicleName,
    "Paket        : " + booking.packageLabel,
    "",
    "*Jadwal*",
    "Tanggal      : " + booking.startDate,
    "Durasi       : " + booking.days + " hari",
    "Penumpang    : " + booking.passengers + " orang",
    "",
    "*Rute*",
    "Jemput       : " + booking.pickupLocation,
    "Tujuan       : " + booking.destination,
    "",
    "*Estimasi Tarif*",
    booking.formattedEstimate + " (belum termasuk biaya di luar paket)",
  ]

  if (booking.notes) {
    lines.push("", "*Catatan*", booking.notes)
  }

  lines.push("", "Mohon konfirmasi ketersediaan unit, rute, syarat, dan harga finalnya. Terima kasih!")

  return lines.join("\n")
}

export function buildAmbulanceMessage(values) {
  const lines = [
    "*PERMINTAAN SEWA AMBULANS*",
    "_PodaRentCar — Layanan Khusus_",
    "",
    "Halo, saya ingin menanyakan layanan sewa ambulans.",
    "",
    "*Penghubung*",
    "Nama         : " + values.name,
    "No. WA       : " + values.phone,
    "",
    "*Waktu & Lokasi*",
    "Perkiraan    : " + values.dateTime,
    "Jemput       : " + values.pickupLocation,
    "Tujuan       : " + values.destination,
  ]

  if (values.needs) {
    lines.push("", "*Kebutuhan Khusus*", values.needs)
  }

  lines.push("", "Mohon info ketersediaan dan harganya. Terima kasih!")

  return lines.join("\n")
}

export function createWhatsAppUrl(number, message) {
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message)
}
