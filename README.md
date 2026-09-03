# PodaRentCar

Website rental mobil statis untuk area Bandara Silangit dan Danau Toba. Pengguna memilih kendaraan, memilih paket yang tersedia, mengisi durasi dan rencana perjalanan, melihat estimasi, lalu mengirim detail pemesanan ke WhatsApp PodaRentCar.

## Dokumen acuan

- [CONTEXT.md](./CONTEXT.md) — sumber kebenaran untuk data armada, harga, paket, kontak, aturan bisnis, dan kriteria penerimaan.
- [DESIGN.md](./DESIGN.md) — arah visual, UI/UX style guide, tokens, layout, komponen, responsivitas, aksesibilitas, dan QA.
- [README.md](./README.md) — arsitektur teknis dan panduan implementasi.

Jika terdapat perbedaan:

1. fakta bisnis dan harga mengikuti CONTEXT.md;
2. keputusan tampilan mengikuti DESIGN.md;
3. struktur kode mengikuti README.md.

## Tujuan rilis pertama

- Menampilkan sepuluh pilihan kendaraan dan harga per hari.
- Menjelaskan All In dan Lepas Kunci secara terpisah.
- Menampilkan kapasitas dan jenis BBM setiap kendaraan.
- Menghitung estimasi harga dari paket × jumlah hari.
- Membatasi Lepas Kunci hanya pada kendaraan yang diizinkan.
- Mengirim ringkasan permintaan ke WhatsApp +62 813-7624-2320.
- Menampilkan layanan sewa ambulans dengan harga negosiasi.
- Menampilkan lokasi Google Maps, TikTok, dan Instagram.
- Memberikan pengalaman terbaik pada ponsel.

## Stack

Rilis awal sengaja sederhana:

- ReactJS dengan JavaScript/JSX.
- Vite sebagai development server dan bundler.
- CSS biasa dengan custom properties/design tokens.
- Lucide React untuk ikon antarmuka.
- Native HTML form, dialog, details/summary bila sesuai.
- Tanpa backend.
- Tanpa database.
- Tanpa login.
- Tanpa payment gateway.
- Tanpa state-management library.
- Tanpa React Router untuk rilis satu halaman.

Dependensi runtime yang disarankan hanya:

~~~text
react
react-dom
lucide-react
~~~

Pure function penting diuji dengan test runner bawaan Node.js agar tidak menambah dependensi pengujian yang tidak diperlukan.

## Menjalankan proyek

Pastikan Node.js LTS dan npm tersedia.

~~~bash
npm install
npm run dev
~~~

Perintah pengecekan dan production build:

~~~bash
npm test
npm run build
npm run preview
~~~

## Arsitektur

Gunakan arsitektur data-driven. Harga dan eligibility paket berada di data, bukan tersebar di komponen.

~~~text
poda-rent-car/
├── public/
│   ├── favicon.svg
│   ├── hero.mp4
│   ├── img/
│   │   └── car/
│   │       ├── README.md
│   │       └── *.png / *.jpg / *.jpeg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── AmbulanceDialog.jsx
│   │   ├── BookingDialog.jsx
│   │   ├── HeroIllustration.jsx
│   │   ├── Logo.jsx
│   │   ├── VehicleArtwork.jsx
│   │   └── VehicleCard.jsx
│   ├── data/
│   │   ├── fleet.js
│   │   ├── faq.js
│   │   └── site.js
│   ├── utils/
│   │   ├── booking.js
│   │   └── booking.test.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── app.css
│   ├── App.jsx
│   └── main.jsx
├── CONTEXT.md
├── DESIGN.md
├── README.md
├── index.html
├── package.json
└── vite.config.js
~~~

## Tanggung jawab tiap lapisan

### data

Menjadi satu-satunya tempat untuk:

- harga;
- kapasitas;
- jenis BBM;
- kategori;
- ketersediaan All In/Lepas Kunci;
- kontak dan tautan eksternal;
- isi FAQ.

Komponen tidak boleh menyimpan angka harga sebagai literal.

### utils

Pure functions untuk:

- format rupiah;
- mengambil tarif paket;
- menghitung estimasi;
- membentuk pesan WhatsApp;
- membentuk URL wa.me.

Pure functions memudahkan pengujian tanpa browser.

### components

Komponen presentasi menerima data dan callback. BookingDialog mengelola state formulir lokal, sedangkan tarif selalu dibaca dari fleet.js dan dihitung melalui booking.js.

### App

App mengelola state lintas bagian yang benar-benar diperlukan:

- filter kategori armada;
- kendaraan dan paket awal yang dipilih;
- status dialog mobil atau ambulans;
- navigasi seluler dan sticky CTA.

Tidak perlu Redux, Zustand, atau Context global untuk scope ini.

## Model data armada

Gunakan integer rupiah agar perhitungan aman dan sederhana.

~~~js
export const fleet = [
  {
    id: "innova-reborn",
    name: "Innova Reborn",
    category: "family",
    passengerCapacityWithDriver: 6,
    totalSeatsSelfDrive: 7,
    capacityLabel: "Hingga 6 penumpang + driver",
    fuelLabel: "Diesel",
    fuelNeedsConfirmation: false,
    allInPrice: 1000000,
    selfDrivePrice: 500000,
    bodyType: "mpv",
    visualTone: "slate",
    featured: false,
    sortOrder: 40
  }
]
~~~

Aturan data:

- allInPrice selalu integer positif.
- selfDrivePrice bernilai null jika Lepas Kunci tidak tersedia.
- hasSelfDrive tidak perlu disimpan karena dapat diturunkan dari selfDrivePrice !== null.
- passengerCapacityWithDriver tidak menghitung kursi driver.
- capacityLabel menjadi copy yang tampil kepada pengguna.
- fuelNeedsConfirmation membuat UI menampilkan catatan “tergantung unit”.
- Jangan memakai float untuk rupiah.

## Konfigurasi situs

~~~js
export const siteConfig = {
  name: "PodaRentCar",
  whatsappDisplay: "+62 813-7624-2320",
  whatsappNumber: "6281376242320",
  instagramHandle: "@andresilalahi28",
  instagramUrl: "https://www.instagram.com/andresilalahi28/",
  tiktokUrl:
    "https://www.tiktok.com/@rentalbandarasilangit28?_r=1&_t=ZS-99NAYKeqf6S",
  serviceArea: "Bandara Silangit dan Danau Toba"
}
~~~

Nomor dan tautan boleh disimpan di source karena memang informasi publik. Jangan menaruh secret/API key di variabel VITE_ karena seluruh nilai Vite client dapat dibaca pengguna.

## Logika paket

~~~js
export function isPackageAvailable(vehicle, packageType) {
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
  const rate = getDailyRate(vehicle, packageType)
  const normalizedDays = Number(days)

  if (rate === null) return null
  if (!Number.isInteger(normalizedDays) || normalizedDays < 1) return null

  return rate * normalizedDays
}
~~~

Jika kendaraan diganti saat paket Lepas Kunci aktif:

~~~js
const nextPackage =
  nextVehicle.selfDrivePrice === null ? "all-in" : currentPackage
~~~

Tampilkan pemberitahuan ramah ketika paket otomatis berubah.

## Format rupiah

~~~js
const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
})

export function formatRupiah(value) {
  return rupiahFormatter.format(value).replace(/\s/g, "")
}
~~~

Target tampilan: Rp1.700.000.

## Integrasi WhatsApp

Tidak memerlukan WhatsApp Business API. Website hanya membuka deep link wa.me dengan pesan yang sudah diisi.

~~~js
export function createWhatsAppUrl(number, message) {
  return (
    "https://wa.me/" +
    number +
    "?text=" +
    encodeURIComponent(message)
  )
}

export function openWhatsApp(number, message) {
  const url = createWhatsAppUrl(number, message)
  return window.open(url, "_blank", "noopener,noreferrer")
}
~~~

### Pembentuk pesan

~~~js
export function buildCarBookingMessage(booking) {
  const rows = [
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
  ]
  const longestLabel = Math.max(...rows.map(([label]) => label.length))
  const details = rows
    .map(([label, value]) => label.padEnd(longestLabel) + " : " + value)
    .join("\n")

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
~~~

Saat submit:

1. jalankan validasi;
2. fokuskan error summary jika gagal;
3. hitung ulang estimasi dari data sumber;
4. bentuk pesan;
5. buka WhatsApp;
6. jika window.open mengembalikan null, tampilkan tombol tautan biasa dan “Salin pesan”.

Jangan mempercayai angka estimasi yang berasal dari input pengguna; ambil tarif dari fleet.js.

## Form dan validasi

Validasi minimum:

~~~js
export function validateBooking(values, vehicle) {
  const errors = {}

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
  if (!values.startDate) errors.startDate = "Pilih tanggal mulai."
  if (!Number.isInteger(Number(values.days)) || Number(values.days) < 1) {
    errors.days = "Masukkan durasi minimal 1 hari."
  }
  if (!values.name.trim()) errors.name = "Masukkan nama."
  if (!values.phone.trim()) errors.phone = "Masukkan nomor WhatsApp."
  if (!values.pickupLocation.trim()) {
    errors.pickupLocation = "Masukkan lokasi jemput."
  }
  if (!values.destination.trim()) {
    errors.destination = "Masukkan tujuan atau rute."
  }

  return errors
}
~~~

Tambahkan validasi:

- tanggal tidak boleh sebelum hari ini menurut zona lokal perangkat;
- jumlah penumpang minimal 1;
- jumlah penumpang tidak melebihi kapasitas nyaman tanpa rekomendasi;
- nomor telepon menerima spasi, tanda +, dan tanda hubung, lalu dinormalisasi untuk tampilan saja;
- catatan mempunyai batas panjang wajar, misalnya 500 karakter.

Jangan memblokir paste pada input apa pun.

## Media hero dan foto kendaraan

- Logo resmi dibaca dari `public/img/logo/logo.png`; wordmark sudah menjadi bagian dari gambar logo.
- Video hero dibaca dari `public/hero.mp4` dan mengisi seluruh background hero secara responsif.
- Frame `public/hero-poster.jpg` ditampilkan saat video mulai dimuat agar tidak muncul ilustrasi atau layar kosong yang mengganggu.
- Hero mempertahankan satu pesan utama, CTA, dan harga awal; paragraf penjelas panjang ditempatkan setelah hero.
- Video menggunakan muted autoplay, loop, playsInline, preload otomatis, kontrol putar/jeda, dan menghormati prefers-reduced-motion.
- Foto kendaraan dibaca otomatis dari `public/img/car/`.
- Daftar nama file yang wajib digunakan tersedia di `public/img/car/README.md`.
- Jika foto belum tersedia, kartu menampilkan placeholder tanpa merusak layout.

## Google Maps

Simpan URL embed di site.js agar JSX tetap ringkas.

~~~jsx
<iframe
  className="location-map"
  src={siteConfig.mapsEmbedUrl}
  title="Lokasi PodaRentCar di sekitar Bandara Silangit"
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
/>
~~~

CSS dasar:

~~~css
.location-map {
  display: block;
  width: 100%;
  min-height: 360px;
  aspect-ratio: 4 / 3;
  border: 0;
  border-radius: var(--radius-lg);
}
~~~

Embed menggunakan koordinat `2.262573890513539,98.98723886710006` dengan format `q=...&output=embed` karena parameter `pb` lama ditolak Google Maps. Tombol “Buka Google Maps” memakai koordinat yang sama.

## Struktur halaman

Gunakan anchor id berikut:

~~~text
#beranda
#armada
#paket
#cara-pesan
#ambulans
#faq
#lokasi
~~~

Header nav memakai anchor native. Tidak perlu React Router.

## Urutan implementasi

### Fase 1 — Fondasi

- Scaffold Vite React.
- Buat tokens.css dan global.css dari DESIGN.md.
- Buat fleet.js dan site.js dari CONTEXT.md.
- Tambahkan format rupiah dan unit test.
- Siapkan semantic HTML utama.

### Fase 2 — Katalog

- Hero, trust strip, filter, grid, dan VehicleCard.
- Tampilkan harga paket secara eksplisit.
- Gunakan placeholder berasio tetap bila foto final belum ada.
- Uji filter dan responsive grid.

### Fase 3 — Booking

- Booking dialog/bottom sheet.
- Form dan validasi.
- Kalkulator estimasi.
- Logika eligibility Lepas Kunci.
- Pesan dan deep link WhatsApp.
- Fallback salin pesan.

### Fase 4 — Informasi pendukung

- Perbandingan paket.
- Cara pesan.
- Ambulans.
- FAQ.
- Maps dan sosial.
- Footer dan sticky CTA.

### Fase 5 — QA

- Verifikasi data.
- Test unit kalkulasi dan pesan.
- Test keyboard/screen reader.
- Test 320–1440 px.
- Audit Lighthouse.
- Optimasi gambar dan bundle.

## Strategi pengujian

### Unit test

Wajib mencakup:

- format 1700000 menjadi Rp1.700.000;
- 3 hari × Rp700.000 menjadi Rp2.100.000;
- hari 0, negatif, pecahan, atau kosong menghasilkan invalid;
- kendaraan tanpa selfDrivePrice menolak Lepas Kunci;
- perubahan kendaraan memulihkan paket All In;
- URL WhatsApp memakai nomor 6281376242320;
- karakter baris baru, ampersand, dan tanda plus ter-encode;
- pesan ambulans tidak memuat estimasi.

### Component test

- Semua kartu armada tampil.
- Filter mengubah daftar dengan benar.
- Tombol kartu mengisi kendaraan yang dipilih.
- Label form terhubung ke input.
- Error muncul dekat field.
- Error summary fokus setelah submit gagal.
- Dialog kembali fokus ke tombol pemicu.
- CTA WhatsApp disabled sampai field wajib valid.

### End-to-end manual

- Android Chrome.
- iPhone Safari.
- Desktop Chrome/Edge.
- Keyboard saja.
- Zoom browser 200%.
- prefers-reduced-motion aktif.
- Koneksi lambat.
- WhatsApp terpasang dan tidak terpasang.

## Aksesibilitas

Checklist minimum:

- Satu H1.
- Skip link.
- Heading berurutan.
- Landmark semantik.
- Target sentuh minimal 44 × 44 px.
- Body minimum 16 px.
- Kontras WCAG AA.
- Focus-visible ring.
- Alt text untuk kendaraan.
- Ikon dekoratif aria-hidden.
- aria-expanded pada accordion.
- aria-live="polite" untuk perubahan estimasi/paket.
- Tidak ada informasi yang hanya dibedakan oleh warna.
- Tidak ada hover-only content.
- Dialog dapat ditutup dengan Escape dan tombol terlihat.

## Performance budget

Target rilis:

| Area | Target |
|---|---:|
| JavaScript awal gzip | ≤ 150 KB, di luar kebutuhan khusus build |
| CSS awal gzip | ≤ 30 KB |
| Hero video | ≤ 5 MB, tanpa audio jika tidak diperlukan |
| Vehicle JPEG | ≤ 250 KB per gambar |
| CLS | < 0,1 |
| LCP | ≤ 2,5 detik |
| Lighthouse Performance mobile | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |

Jangan memaksakan skor dengan menghapus fungsi atau label yang dibutuhkan pengguna. Ukur pada build production.

## SEO dan metadata

index.html atau komponen head harus memuat:

- lang="id";
- title dari CONTEXT.md;
- meta description;
- viewport width=device-width, initial-scale=1;
- canonical setelah domain final tersedia;
- Open Graph title, description, image, dan locale id_ID;
- theme-color #075985.

Structured data `AutoRental` berisi nama, telepon, area layanan, koordinat, sosial, dan katalog layanan yang sudah dikonfirmasi. Tambahkan alamat lengkap, jam operasional, domain, dan logo absolut setelah datanya tersedia; jangan mengarang data bisnis.

### Pekerjaan SEO setelah domain aktif

Optimasi teknis di repository adalah fondasi, bukan jaminan posisi pertama. Setelah website dipublikasikan:

1. tambahkan URL domain final pada canonical, Open Graph, dan structured data;
2. buat sitemap.xml menggunakan domain final lalu daftarkan di Google Search Console;
3. verifikasi Google Business Profile dengan nama, telepon, kategori, dan lokasi yang konsisten;
4. minta pelanggan nyata memberikan ulasan di Google Business Profile;
5. unggah foto armada asli dan perbarui konten harga secara berkala;
6. bangun tautan lokal yang relevan dari bisnis wisata, penginapan, dan direktori resmi sekitar Danau Toba;
7. pantau kueri seperti “rental mobil Silangit”, “sewa mobil Bandara Silangit”, dan “rental mobil lepas kunci Silangit” melalui Search Console.

## Privasi dan keamanan

- Form tidak dikirim ke server.
- Jelaskan bahwa tombol akan membuka WhatsApp dengan detail yang diisi.
- Jangan simpan nama, telepon, rute, atau catatan ke localStorage secara default.
- Jangan memasukkan data pribadi ke analytics.
- Encode seluruh pesan WhatsApp.
- Tautan tab baru memakai noopener dan noreferrer.
- Jangan memasukkan token rahasia ke source atau VITE_ variables.
- Tidak perlu cookie banner jika tidak ada cookie/analytics non-esensial.

## Deployment

Build Vite menghasilkan file statis pada dist/. Dapat di-host di:

- Netlify;
- Vercel static;
- Cloudflare Pages;
- GitHub Pages;
- shared hosting biasa.

Konfigurasi rewrite SPA tidak wajib karena rilis awal tidak memakai client-side route. Pastikan HTTPS aktif dan domain final dicantumkan pada canonical/metadata.

## Content update workflow

Ketika harga berubah:

1. pemilik mengesahkan harga baru;
2. perbarui CONTEXT.md;
3. perbarui src/data/fleet.js;
4. jalankan test kalkulasi;
5. cek tampilan angka pada 320 px;
6. build dan deploy;
7. catat tanggal pembaruan harga pada UI bila diinginkan.

Jangan mengubah harga langsung di VehicleCard.

## Data yang masih menunggu konfirmasi

Sebelum website tayang, selesaikan daftar pada bagian “Hal yang harus dikonfirmasi sebelum publikasi” di CONTEXT.md. Poin paling penting:

- kecocokan nama lokasi Maps;
- spesifikasi unit aktual;
- aturan rute luar kota;
- syarat Lepas Kunci;
- fasilitas ambulans;
- foto kendaraan asli.

## Definition of done

Rilis pertama selesai jika:

- seluruh acceptance criteria pada CONTEXT.md lulus;
- seluruh checklist QA relevan pada DESIGN.md lulus;
- npm run build berhasil tanpa error;
- kalkulator dan WhatsApp diuji pada ponsel;
- tidak ada fakta bisnis yang belum disetujui ditampilkan sebagai kepastian;
- pemilik dapat memperbarui harga dari satu file data;
- website dapat dipakai tanpa backend.
