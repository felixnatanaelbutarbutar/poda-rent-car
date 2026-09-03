# Design & UI/UX Style Guide — PodaRentCar

Versi: 1.0  
Terakhir diperbarui: 3 September 2026  
Platform: website responsif, ReactJS, mobile-first

## 1. Arah desain

### Konsep

**Trusted Local Journey**

PodaRentCar harus terasa seperti layanan perjalanan lokal yang sigap dan dapat dipercaya: tenang seperti Danau Toba, hangat seperti keramahan tuan rumah, dan lugas saat menjelaskan harga. Visual tidak boleh terasa seperti marketplace kendaraan generik atau situs otomotif yang agresif.

### Kata kunci visual

- terpercaya;
- lokal;
- tenang;
- hangat;
- bersih;
- lapang;
- praktis;
- premium secukupnya;
- mobile-friendly;
- conversion-focused.

### Arah gaya

Gunakan minimalisme modern dengan sentuhan editorial perjalanan:

- latar terang dengan ruang kosong yang cukup;
- biru danau sebagai warna kepercayaan;
- terracotta sebagai aksen hangat dan CTA;
- kartu putih dengan border lembut, bukan bayangan berat;
- foto kendaraan asli di lingkungan Silangit/Danau Toba;
- motif garis kontur danau atau rute sebagai elemen dekoratif tipis;
- sudut membulat sedang, bukan “bubble UI” berlebihan;
- hierarki harga dan paket sangat jelas.

### Hal yang harus dihindari

- carousel hero otomatis;
- parallax berat dan animasi dekoratif panjang;
- efek glassmorphism berlebihan;
- terlalu banyak gradient;
- gambar mobil generik yang tidak sama dengan unit;
- klaim rating, testimoni, atau jumlah pelanggan yang dibuat-buat;
- pop-up langsung saat halaman baru dibuka;
- tabel harga yang memaksa scroll horizontal di ponsel;
- tombol dengan lebih dari satu aksi utama dalam satu konteks;
- ikon emoji untuk fitur atau navigasi;
- istilah “All In” tanpa penjelasan “Driver + BBM”.

## 2. Prinsip pengalaman

### 2.1 Harga dulu, detail secukupnya

Harga harian, paket, kapasitas, dan BBM harus terlihat tanpa membuka halaman lain. Detail lanjutan boleh dibuka melalui accordion atau panel.

### 2.2 Satu keputusan per langkah

Alur pemesanan mengikuti tiga tahap:

1. pilih kendaraan;
2. pilih paket dan jadwal;
3. tinjau lalu kirim ke WhatsApp.

### 2.3 Jujur terhadap ketidakpastian

Gunakan “Estimasi” sampai operator mengonfirmasi. Data yang bergantung pada unit menggunakan kata “hingga”, “tergantung unit”, atau “konfirmasi”.

### 2.4 Mobile adalah pengalaman utama

Desain dimulai dari layar 320–375 px. Desktop adalah perluasan layout, bukan versi yang menentukan struktur mobile.

### 2.5 WhatsApp adalah penyelesaian, bukan jalan pintas

Pengguna harus sudah membawa informasi yang cukup ke WhatsApp. Tombol chat generik tetap tersedia, tetapi CTA dari form mengirim pesan terstruktur.

### 2.6 Tidak ada hambatan palsu

Tidak ada akun, OTP, pembayaran, unggah dokumen, atau multi-page checkout di rilis pertama.

## 3. Brand personality dan voice

### Kepribadian

| Sifat | Makna | Lakukan | Hindari |
|---|---|---|---|
| Ramah | Berbicara seperti tuan rumah lokal | “Ceritakan rute Anda, kami bantu cek mobilnya.” | Bahasa terlalu santai atau panggilan berlebihan |
| Jelas | Transparan tentang harga dan cakupan | “Estimasi Rp1.400.000 untuk 1 hari.” | “Mulai dari” tanpa alasan atau biaya tersembunyi |
| Sigap | CTA langsung dan instruksi singkat | “Kirim detail ke WhatsApp” | Paragraf panjang sebelum pengguna bisa bertindak |
| Tepercaya | Tidak melebih-lebihkan | “Ketersediaan dikonfirmasi via WhatsApp.” | “Pasti tersedia”, “termurah”, “nomor satu” tanpa bukti |
| Lokal | Mengerti konteks Silangit–Danau Toba | Sebut Bandara Silangit, Balige, Parapat, Samosir secara relevan | Bahasa travel generik tanpa konteks daerah |

### Skala tone

- Formal ↔ kasual: 40/100, ramah tetapi tetap profesional.
- Sederhana ↔ teknis: 20/100, pakai bahasa konsumen.
- Serius ↔ playful: 35/100, hangat tanpa bercanda pada harga atau ambulans.
- Tenang ↔ ekspresif: 45/100.

### Contoh copy

Hero:

> Jelajahi Danau Toba, berangkat dengan tenang.

Subjudul:

> Pilih mobil dari Bandara Silangit, lihat harga harian, lalu kirim detail perjalanan langsung ke WhatsApp.

CTA utama:

> Lihat Armada

CTA sekunder:

> Tanya via WhatsApp

Disclaimer estimasi:

> Estimasi belum termasuk biaya di luar paket. Ketersediaan dan harga final dikonfirmasi melalui WhatsApp.

Empty state filter:

> Belum ada kendaraan pada kategori ini. Lihat semua armada atau tanyakan kebutuhan Anda lewat WhatsApp.

Error durasi:

> Masukkan durasi minimal 1 hari.

Lepas Kunci tidak tersedia:

> Mobil ini hanya tersedia dengan paket All In — Driver + BBM.

## 4. Identitas visual

### 4.1 Logo final

Website menggunakan aset resmi `public/img/logo/logo.png`. File sudah memuat simbol dan wordmark “PodaRentCar”, sehingga antarmuka tidak boleh menambahkan nama merek sebagai teks terpisah di samping logo.

Jangan menggunakan ornamen budaya Batak secara dekoratif sebelum makna, izin, dan ketepatan penerapannya dikonfirmasi dengan pemilik atau pihak budaya yang memahami konteks.

### Aturan logo

- Clear space minimum sama dengan tinggi simbol.
- Lebar minimum logo lengkap: 120 px digital.
- Ukuran minimum simbol: 24 px.
- Jangan diregangkan, diputar, diberi shadow, atau diubah warnanya di luar palet.
- Pada foto, letakkan logo di atas bidang solid atau overlay yang lolos kontras.
- Favicon memakai simbol, bukan wordmark penuh.

### 4.2 Palet warna

Palet terinspirasi air Danau Toba, langit pegunungan, batu gelap, dan aksen tanah hangat.

#### Primitive tokens

| Token | Nilai | Nama | Penggunaan |
|---|---|---|---|
| --blue-50 | #F0F9FF | Lake Mist | Area informatif sangat ringan |
| --blue-100 | #E0F2FE | Morning Lake | Latar badge/panel |
| --blue-700 | #0369A1 | Lake Blue | Link dan elemen sekunder |
| --blue-800 | #075985 | Deep Lake | Warna merek utama |
| --blue-900 | #0C4A6E | Toba Depth | Hover dan bidang gelap |
| --orange-50 | #FFF7ED | Warm Mist | Latar info harga/CTA ringan |
| --orange-700 | #C2410C | Terracotta | CTA utama |
| --orange-800 | #9A3412 | Burnt Earth | Hover CTA |
| --green-700 | #047857 | WhatsApp Green | Aksi kirim WhatsApp |
| --green-800 | #065F46 | Deep Green | Hover WhatsApp |
| --slate-50 | #F8FAFC | Cloud | Latar halaman |
| --slate-100 | #F1F5F9 | Soft Surface | Surface sekunder |
| --slate-200 | #E2E8F0 | Border Soft | Border dan divider |
| --slate-500 | #64748B | Muted | Teks nonkritis |
| --slate-600 | #475569 | Secondary Text | Teks pendukung |
| --slate-900 | #0F172A | Ink | Heading dan body utama |
| --red-700 | #B91C1C | Error | Error dan destructive |
| --white | #FFFFFF | White | Kartu dan teks di warna gelap |

#### Semantic tokens

| Token | Referensi |
|---|---|
| --color-background | var(--slate-50) |
| --color-surface | var(--white) |
| --color-surface-subtle | var(--blue-50) |
| --color-text | var(--slate-900) |
| --color-text-muted | var(--slate-600) |
| --color-primary | var(--blue-800) |
| --color-primary-hover | var(--blue-900) |
| --color-primary-foreground | var(--white) |
| --color-accent | var(--orange-700) |
| --color-accent-hover | var(--orange-800) |
| --color-accent-foreground | var(--white) |
| --color-whatsapp | var(--green-700) |
| --color-whatsapp-hover | var(--green-800) |
| --color-border | var(--slate-200) |
| --color-error | var(--red-700) |
| --color-focus | var(--blue-700) |

#### Kontras yang telah diperiksa

| Pasangan | Rasio | Status |
|---|---:|---|
| #075985 di atas #FFFFFF | 7,56:1 | WCAG AAA untuk teks normal |
| #0C4A6E di atas #FFFFFF | 9,46:1 | WCAG AAA |
| #C2410C di atas #FFFFFF | 5,18:1 | WCAG AA |
| #0F172A di atas #F8FAFC | 17,06:1 | WCAG AAA |
| #475569 di atas #FFFFFF | 7,58:1 | WCAG AAA |

Gunakan warna putih sebagai foreground CTA terracotta dan hijau. Jangan memakai hitam pada CTA hanya karena suatu generator palet menyarankannya; pasangan akhir harus mengikuti tabel kontras di atas.

#### Proporsi warna

- 70% netral terang dan putih;
- 20% biru danau;
- maksimum 10% aksen terracotta/hijau.

Hijau hanya untuk tindakan yang benar-benar membuka WhatsApp atau status berhasil. Jangan jadikan hijau sebagai dekorasi umum.

### 4.3 Tipografi

Gunakan satu keluarga font agar ringan dan konsisten:

**Plus Jakarta Sans**, fallback system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.

Alasan:

- dirancang oleh desainer Indonesia;
- hangat tetapi tetap profesional;
- angka harga mudah dibaca;
- satu keluarga mengurangi beban font;
- mendukung hierarki kuat tanpa memasangkan banyak font.

Muat hanya bobot 400, 500, 600, dan 700 dengan font-display: swap. Jika font web gagal, fallback sistem harus tetap rapi.

#### Type scale

| Gaya | Mobile | Desktop | Weight | Line height | Penggunaan |
|---|---:|---:|---:|---:|---|
| Display | 36 px | 64 px | 700 | 1,08 | Hero |
| H1 | 36 px | 56 px | 700 | 1,12 | Judul halaman |
| H2 | 28 px | 40 px | 700 | 1,2 | Judul section |
| H3 | 22 px | 28 px | 600 | 1,3 | Judul kartu/kelompok |
| Title | 18 px | 20 px | 600 | 1,4 | Nama kendaraan |
| Body large | 18 px | 18 px | 400 | 1,6 | Intro |
| Body | 16 px | 16 px | 400 | 1,6 | Teks utama |
| Label | 14 px | 14 px | 600 | 1,45 | Form/badge |
| Caption | 13 px | 13 px | 500 | 1,45 | Catatan singkat |

Aturan:

- Body tidak lebih kecil dari 16 px.
- Angka harga memakai font-variant-numeric: tabular-nums.
- Batasi paragraf desktop sekitar 65–72 karakter per baris.
- Gunakan text-wrap: balance hanya sebagai enhancement pada heading; jangan memaksa line break.
- Jangan memakai all caps untuk kalimat.

### 4.4 Ikon

- Gunakan Lucide React, gaya outline, stroke 2 px.
- Ukuran baku: 16, 20, dan 24 px.
- Ikon dekoratif di samping teks memakai aria-hidden="true".
- Tombol icon-only wajib mempunyai aria-label.
- Jangan memakai emoji sebagai ikon kapasitas, BBM, lokasi, kalender, atau WhatsApp.
- Logo resmi WhatsApp, TikTok, dan Instagram harus memakai aset resmi atau ikon merek yang sesuai pedoman masing-masing.

### 4.5 Fotografi

Prioritaskan foto asli unit PodaRentCar.

- Sudut 3/4 depan untuk kartu armada.
- Latar bersih, cahaya pagi/sore, kendaraan menjadi fokus.
- Hero memakai video asli `public/hero.mp4`, dipotong dengan `object-fit: cover`, mempunyai kontrol putar/jeda, dan berhenti otomatis bila pengguna memilih reduced motion.
- Frame video asli digunakan sebagai poster awal agar perpindahan menuju autoplay terasa mulus tanpa ilustrasi fallback.
- Hero hanya memuat satu pesan utama, CTA, dan harga awal; penjelasan layanan yang lebih panjang ditempatkan setelah hero.
- Frasa “Danau Toba” pada judul hero memakai aksen Playfair Display italic berwarna vermilion dan garis geometris tipis. Aksen ini memberi rasa lokal tanpa menyalin motif gorga tertentu atau memenuhi halaman dengan ornamen.
- Jangan mengganti tipe mobil hanya karena stok foto terlihat lebih menarik.
- Hindari plat nomor terbaca jika ada pertimbangan privasi.
- Jika menampilkan orang, pastikan ada izin penggunaan.
- Rasio media kendaraan adalah 16:10. Video hero menjadi background penuh dengan overlay gelap adaptif agar copy tetap terbaca pada desktop dan mobile.
- Simpan AVIF/WebP dan fallback JPEG jika dibutuhkan.
- Tetapkan width, height, atau aspect-ratio untuk mencegah layout shift.

Alt text contoh:

> Toyota Hiace Premio PodaRentCar untuk rombongan di kawasan Danau Toba

Jangan memulai alt text dengan “gambar” atau “foto”.

### 4.6 Shape, border, dan shadow

| Token | Nilai | Penggunaan |
|---|---:|---|
| --radius-sm | 8 px | Badge, input kecil |
| --radius-md | 12 px | Button, input |
| --radius-lg | 16 px | Kartu |
| --radius-xl | 24 px | Hero panel, bottom sheet |
| --radius-pill | 999 px | Filter chip |
| --border-default | 1 px solid #E2E8F0 | Kartu/input |
| --shadow-sm | 0 1px 2px rgba(15,23,42,.06) | Kartu diam |
| --shadow-md | 0 10px 30px rgba(15,23,42,.10) | Panel mengambang |
| --shadow-focus | 0 0 0 3px rgba(3,105,161,.25) | Focus ring tambahan |

Tidak boleh ada lebih dari tiga level elevation. Kartu armada mengandalkan border; shadow hanya bertambah halus saat hover/focus.

### 4.7 Spacing

Sistem dasar 4 px dengan ritme utama 8 px:

| Token | Nilai |
|---|---:|
| --space-1 | 4 px |
| --space-2 | 8 px |
| --space-3 | 12 px |
| --space-4 | 16 px |
| --space-5 | 20 px |
| --space-6 | 24 px |
| --space-8 | 32 px |
| --space-10 | 40 px |
| --space-12 | 48 px |
| --space-16 | 64 px |
| --space-20 | 80 px |
| --space-24 | 96 px |

Gutter halaman:

- 320–479 px: 16 px;
- 480–767 px: 20 px;
- 768–1023 px: 32 px;
- 1024 px ke atas: 40 px;
- max-width konten: 1200 px.

Jarak section:

- mobile: 64 px;
- tablet: 80 px;
- desktop: 96 px.

## 5. Arsitektur informasi halaman

Urutan halaman satu layar panjang:

1. skip link;
2. announcement bar opsional, hanya untuk informasi penting;
3. header;
4. hero;
5. trust strip berbasis fakta;
6. armada dan harga;
7. perbandingan paket;
8. cara pesan;
9. layanan ambulans;
10. alasan memilih PodaRentCar;
11. FAQ;
12. lokasi dan kontak;
13. footer;
14. mobile sticky CTA.

### Header

- Logo di kiri.
- Desktop nav: Armada, Paket, Cara Pesan, Lokasi.
- Tombol kanan: “Pesan via WhatsApp”.
- Mobile: logo, tombol WhatsApp ringkas, menu.
- Header sticky hanya setelah pengguna melewati hero.
- Tinggi minimum 64 px dan tidak menutupi anchor target.

### Hero

Konten utama:

- eyebrow: “Rental Mobil Bandara Silangit & Danau Toba”;
- H1: “Jelajahi Danau Toba, berangkat dengan tenang.”;
- subcopy singkat;
- CTA utama “Lihat Armada”;
- CTA sekunder “Tanya via WhatsApp”;
- tiga proof point faktual: harga harian jelas, pilihan driver/lepas kunci, antar-jemput bandara sesuai ketentuan.

Hero memakai komposisi full-bleed: video mengisi seluruh area, sedangkan copy, harga awal, dan CTA berada pada lapisan depan. Desktop memakai overlay lebih kuat di sisi kiri; mobile memakai overlay merata agar tidak tergantung posisi frame video.

### Trust strip

Gunakan fakta layanan, bukan angka tanpa bukti:

- Area Bandara Silangit & Danau Toba.
- Maksimal pemakaian All In 24 jam/hari.
- Antar-jemput bandara sesuai paket.

Jika kemudian tersedia ulasan terverifikasi, tampilkan setelah armada dan sebelum CTA final. Hindari carousel; gunakan dua atau tiga kartu statis.

### Armada

Judul:

> Pilih kendaraan untuk perjalanan Anda

Filter chip:

- Semua;
- Keluarga;
- SUV;
- Premium;
- Rombongan.

Pada mobile gunakan chip yang membungkus ke baris berikutnya, bukan horizontal scrolling tersembunyi.

Urutan kartu yang disarankan:

1. Avanza All New;
2. Avanza Veloz;
3. Rush / Terios;
4. Innova Reborn;
5. Innova Zenix;
6. Fortuner;
7. Pajero Sport;
8. Alphard;
9. Hiace Commuter;
10. Hiace Premio.

Urutan tersebut memudahkan pengguna dari opsi ekonomis ke premium/rombongan. Jika prioritas penjualan berbeda, gunakan field sortOrder pada data.

### Perbandingan paket

Pada ponsel, tampilkan dua kartu vertikal:

- All In — Driver + BBM;
- Lepas Kunci — Tanpa Driver & BBM.

Pada desktop, gunakan dua kolom yang sejajar. Daftar “Termasuk” dan “Tidak termasuk” memakai ikon plus/check dan minus/x disertai label teks, bukan warna saja.

### Cara pesan

Tiga langkah sederhana:

1. Pilih mobil.
2. Isi rencana perjalanan.
3. Kirim ke WhatsApp dan tunggu konfirmasi.

Jangan menjanjikan booking selesai sebelum operator mengonfirmasi.

### Ambulans

Gunakan section dengan tone lebih tenang, latar blue-50, tanpa elemen merah besar yang terasa menakutkan. Label “Harga melalui WhatsApp”, CTA khusus, dan disclaimer tidak membuat klaim layanan medis.

### Lokasi

Desktop: detail kontak 5 kolom dan peta 7 kolom.  
Mobile: detail kontak, tombol buka Maps, lalu iframe.

Tampilkan nama lokasi, area layanan, WhatsApp, TikTok, dan Instagram. Gunakan title pada iframe.

### Footer

- Logo dan deskripsi satu kalimat.
- Navigasi anchor.
- Kontak.
- Sosial.
- Disclaimer harga.
- Copyright menggunakan tahun dinamis.

## 6. Wireframe

### Mobile

~~~text
┌──────────────────────────────┐
│ Logo        [WhatsApp] [Menu]│
├──────────────────────────────┤
│ Rental Silangit & Danau Toba │
│ Jelajahi Danau Toba,         │
│ berangkat dengan tenang.     │
│ [Lihat Armada]               │
│ [Tanya via WhatsApp]         │
│ [Foto kendaraan asli]        │
├──────────────────────────────┤
│ 3 fakta layanan              │
├──────────────────────────────┤
│ Pilih kendaraan              │
│ [Semua] [Keluarga] [SUV]     │
│ ┌──────────────────────────┐ │
│ │ Foto                     │ │
│ │ Avanza All New           │ │
│ │ 6 penumpang • Bensin     │ │
│ │ All In Rp700.000/hari    │ │
│ │ LK Rp350.000/hari        │ │
│ │ [Pilih mobil]            │ │
│ └──────────────────────────┘ │
│ ...                          │
├──────────────────────────────┤
│ All In vs Lepas Kunci        │
├──────────────────────────────┤
│ Cara pesan: 1 — 2 — 3        │
├──────────────────────────────┤
│ Sewa Ambulans                │
├──────────────────────────────┤
│ FAQ                          │
├──────────────────────────────┤
│ Kontak dan Maps              │
├──────────────────────────────┤
│ Footer                       │
├──────────────────────────────┤
│ [Pesan kendaraan] sticky     │
└──────────────────────────────┘
~~~

### Desktop

~~~text
┌──────────────────────────────────────────────────────────────────────┐
│ Logo      Armada  Paket  Cara Pesan  Lokasi        [WhatsApp]       │
├──────────────────────────────────────────────────────────────────────┤
│ [Hero copy + CTA 5/12]                [Foto kendaraan 7/12]         │
├──────────────────────────────────────────────────────────────────────┤
│ [Fakta layanan]     [Fakta layanan]       [Fakta layanan]           │
├──────────────────────────────────────────────────────────────────────┤
│ Armada + filter                                                      │
│ [Card 1]             [Card 2]             [Card 3]                  │
│ [Card 4]             [Card 5]             [Card 6]                  │
├──────────────────────────────────────────────────────────────────────┤
│ [All In 1/2]                           [Lepas Kunci 1/2]             │
├──────────────────────────────────────────────────────────────────────┤
│ Cara pesan 1 → 2 → 3                                                 │
├──────────────────────────────────────────────────────────────────────┤
│ Ambulans                                                              │
├──────────────────────────────────────────────────────────────────────┤
│ FAQ                                                                   │
├──────────────────────────────────────────────────────────────────────┤
│ [Kontak 5/12]                         [Google Maps 7/12]             │
├──────────────────────────────────────────────────────────────────────┤
│ Footer                                                                │
└──────────────────────────────────────────────────────────────────────┘
~~~

## 7. Spesifikasi komponen

### 7.1 Button

| Varian | Latar | Teks | Penggunaan |
|---|---|---|---|
| Primary | Terracotta | Putih | Lihat armada, pilih mobil |
| WhatsApp | Hijau | Putih | Kirim atau buka WhatsApp |
| Secondary | Putih | Deep Lake | Aksi pendukung |
| Ghost | Transparan | Deep Lake | Nav/aksi ringan |
| Destructive | Merah | Putih | Tidak dibutuhkan pada rilis awal |

Ukuran:

| Ukuran | Tinggi | Padding X | Teks | Ikon |
|---|---:|---:|---:|---:|
| Small | 40 px | 14 px | 14 px | 16 px |
| Default | 48 px | 18 px | 16 px | 20 px |
| Large | 56 px | 24 px | 16 px | 20 px |
| Icon | 48 × 48 px | 0 | — | 20 px |

State:

- hover: warna satu tingkat lebih gelap;
- active: shadow berkurang dan opacity 0,94;
- focus-visible: ring 3 px dengan offset 2 px;
- disabled: opacity 0,48 dan cursor not-allowed;
- loading: label tetap menjelaskan aksi, aria-busy="true".

Hindari transform yang menggeser layout. Feedback tekan dapat memakai perubahan opacity/warna selama 100–150 ms.

### 7.2 Filter chip

- Tinggi minimum 44 px.
- Bentuk pill.
- State aktif memakai blue-800 + putih dan ikon check opsional.
- Gunakan aria-pressed untuk tombol toggle.
- Koleksi chip wrap; jangan mengecilkan teks atau memotong label.

### 7.3 Vehicle card

Anatomi:

1. foto 16:10;
2. badge kategori;
3. nama mobil;
4. kapasitas dan BBM;
5. harga All In;
6. harga Lepas Kunci jika ada;
7. helper “harga per hari”;
8. tombol “Pilih mobil”;
9. disclosure “Lihat detail paket”.

Aturan harga:

- angka paling dominan setelah nama;
- gunakan tabular numerals;
- dua paket tampil sebagai baris terpisah, bukan satu rentang ambigu;
- jika Lepas Kunci tidak tersedia, jangan tampilkan harga nol atau tombol disabled permanen; cukup tampilkan “All In saja”;
- “Mulai dari” hanya dipakai jika kartu sengaja menonjolkan harga terendah dan detail kedua paket tetap terlihat.

Responsive:

- mobile: satu kolom;
- 600–959 px: dua kolom;
- 960 px ke atas: tiga kolom.

### 7.4 Package badge

- All In: blue-100, text blue-900, label “Driver + BBM”.
- Lepas Kunci: orange-50, text orange-800, label “Tanpa Driver & BBM”.
- Selalu sertakan teks; warna bukan satu-satunya pembeda.

### 7.5 Booking panel

Perilaku:

- mobile: bottom sheet hampir full screen, tinggi maksimum 92dvh;
- desktop: dialog 720–800 px atau side panel;
- header sticky berisi judul dan tombol tutup;
- footer sticky berisi estimasi dan CTA WhatsApp;
- konten mempunyai padding bawah cukup agar tidak tertutup footer;
- Escape menutup dialog pada desktop;
- fokus masuk ke judul/field pertama dan kembali ke pemicu saat ditutup;
- jika ada perubahan yang belum dikirim, penutupan tidak perlu konfirmasi karena data tidak disimpan, tetapi state dapat dipertahankan selama sesi.

Struktur tiga langkah:

1. kendaraan;
2. rencana perjalanan;
3. ringkasan.

Pengguna boleh kembali tanpa kehilangan isian.

### 7.6 Form controls

- Tinggi input/select minimum 48 px.
- Label selalu terlihat di atas kontrol.
- Helper text berada di bawah field.
- Error tampil setelah blur atau submit, bukan pada setiap ketikan.
- Error menyebut penyebab dan cara memperbaiki.
- Input telepon memakai type="tel" dan inputmode="tel".
- Durasi memakai type="number", min="1", step="1".
- Tanggal memakai type="date" dan min tanggal lokal hari ini.
- Kelompok paket menggunakan fieldset dan legend.
- Ringkasan error muncul di atas jika lebih dari satu field gagal.

### 7.7 Price summary

~~~text
Innova Reborn
All In — Driver + BBM
Rp1.000.000 × 3 hari
─────────────────────
Estimasi Rp3.000.000
~~~

Di bawahnya:

> Belum termasuk biaya di luar paket. Harga final dan ketersediaan dikonfirmasi via WhatsApp.

Jika rute terindikasi di luar area Danau Toba, tampilkan notice, bukan kalkulasi biaya tambahan yang belum diketahui.

### 7.8 Accordion

Dipakai untuk FAQ dan rincian paket panjang.

- Header berupa button semantik.
- aria-expanded dan aria-controls harus sesuai.
- Ikon chevron berputar maksimal 180 ms.
- Jangan menyembunyikan informasi harga utama di accordion.

### 7.9 Mobile sticky CTA

- Muncul setelah hero tidak lagi terlihat.
- Teks: “Pesan kendaraan”.
- Menghormati safe-area-inset-bottom.
- Tinggi area 72–80 px termasuk padding.
- Menyisakan padding bawah pada konten agar footer tidak tertutup.
- Tidak tampil saat booking panel terbuka.

### 7.10 Social link

- Ikon + label “TikTok” atau “Instagram”.
- Area sentuh minimal 48 px.
- Buka tab baru dengan rel aman.
- Jangan hanya menampilkan handle tanpa konteks platform.

## 8. Alur interaksi dan state

### State utama pemesanan

~~~text
idle
  → vehicle-selected
  → details-in-progress
  → review-ready
  → opening-whatsapp
  → whatsapp-opened
~~~

Error membuka WhatsApp:

~~~text
opening-whatsapp
  → popup-blocked
  → tampilkan tautan “Buka WhatsApp” + tombol “Salin pesan”
~~~

### Logika paket bersyarat

- Jika selfDrivePrice kosong, tampilkan hanya All In.
- Jika selfDrivePrice tersedia, tampilkan All In dan Lepas Kunci.
- Jika pengguna mengganti dari mobil eligible ke mobil non-eligible saat paket Lepas Kunci aktif:
  - ubah paket menjadi All In;
  - umumkan perubahan melalui aria-live="polite";
  - tampilkan notice: “Paket diubah ke All In karena mobil ini tidak tersedia Lepas Kunci.”

### Validasi kapasitas

Jika jumlah penumpang melebihi kapasitas:

- jangan langsung memblokir pengguna tanpa bantuan;
- tampilkan error dan rekomendasi unit lebih besar;
- contoh: “Avanza nyaman untuk hingga 6 penumpang dengan driver. Coba Hiace untuk rombongan lebih besar.”

### Pemformatan WhatsApp

- Pesan dibuat dari state form pada saat submit.
- Gunakan encodeURIComponent untuk seluruh pesan.
- Nomor tujuan: 6281376242320.
- Jangan mengirim data ke server.
- Jika perangkat memiliki WhatsApp, wa.me meneruskan ke aplikasi; jika tidak, browser membuka WhatsApp Web.

## 9. Motion

Motion harus membantu orientasi, bukan menjadi daya tarik utama.

| Token | Durasi | Penggunaan |
|---|---:|---|
| --motion-fast | 120 ms | Press, color feedback |
| --motion-base | 180 ms | Hover, chip, accordion |
| --motion-slow | 260 ms | Bottom sheet/dialog |

Easing:

- masuk: cubic-bezier(0.22, 1, 0.36, 1);
- keluar: cubic-bezier(0.4, 0, 1, 1), lebih cepat daripada masuk.

Aturan:

- hanya transform dan opacity untuk animasi posisi;
- maksimum satu reveal lembut per section;
- tidak ada animasi scroll-scrub;
- animasi dapat diinterupsi;
- jangan menunggu animationend untuk menentukan state penting;
- pada prefers-reduced-motion: reduce, tampilkan state akhir tanpa transisi non-esensial.

## 10. Responsive behavior

| Breakpoint | Target | Layout |
|---|---|---|
| 320–479 px | ponsel kecil | 1 kolom, gutter 16 px |
| 480–767 px | ponsel besar | 1 kolom, gutter 20 px |
| 768–959 px | tablet | 2 kolom armada |
| 960–1199 px | laptop | 3 kolom armada |
| ≥1200 px | desktop | max-width 1200 px |

Aturan:

- Jangan menonaktifkan pinch-to-zoom.
- Gunakan min-height: 100dvh bila membutuhkan layar penuh.
- Tidak ada nested vertical scrolling kecuali isi dialog yang memang terbatas viewport.
- Teks dan chip boleh wrap.
- URL dan string panjang memakai overflow-wrap: anywhere.
- Uji landscape pada ponsel.
- Anchor section memakai scroll-margin-top agar tidak tertutup header.

## 11. Accessibility

Target minimum: WCAG 2.2 AA.

### Struktur

- Skip link “Lewati ke konten utama”.
- Tepat satu H1.
- Heading tidak meloncat level.
- Gunakan header, nav, main, section, form, address, dan footer secara semantik.
- Setiap section penting memiliki accessible name.

### Keyboard dan fokus

- Semua fungsi dapat digunakan dengan keyboard.
- Urutan tab mengikuti urutan visual.
- Focus ring tidak pernah dihapus.
- Sticky header/footer tidak boleh menutupi elemen yang sedang fokus.
- Dialog melakukan focus trap dan mengembalikan fokus saat ditutup.

### Form

- Label terhubung dengan htmlFor/id.
- Error terhubung memakai aria-describedby.
- Field invalid memakai aria-invalid="true".
- Ringkasan error fokus saat submit gagal.
- aria-live hanya untuk perubahan estimasi/paket yang penting; jangan terlalu cerewet.

### Visual

- Teks normal minimum 4,5:1.
- UI dan focus indicator minimum 3:1.
- Informasi tidak disampaikan dengan warna saja.
- Body minimum 16 px.
- Target sentuh minimum 44 × 44 px, dianjurkan 48 px.

### Media

- Foto bermakna memiliki alt.
- Ikon dekoratif disembunyikan dari accessibility tree.
- Maps memiliki title.
- Tidak ada media autoplay.

## 12. Performance

Target:

- Largest Contentful Paint ≤ 2,5 detik pada jaringan mobile wajar.
- Cumulative Layout Shift < 0,1.
- Interaction to Next Paint ≤ 200 ms.
- Bundle awal dijaga kecil; situs tidak memerlukan library UI besar.

Praktik:

- React + CSS biasa.
- Lazy load booking panel bila ukurannya membesar.
- Video hero berukuran sekitar 4,3 MB memakai `preload="auto"` agar autoplay lebih andal dan menyediakan fallback visual; foto armada di bawah fold memakai lazy loading.
- Gunakan srcset dan sizes.
- Preload hanya font regular/semibold yang benar-benar dipakai di atas fold.
- Iframe Maps lazy.
- Tidak memakai background video.
- Tidak memakai GSAP untuk interaksi yang dapat diselesaikan dengan CSS.
- Hindari re-render seluruh grid ketika hanya durasi berubah.

## 13. Content rules

- Gunakan “per hari”, bukan “/hair”.
- Gunakan “driver”, konsisten; jangan berganti-ganti dengan “sopir” kecuali pada kutipan. Di bagian biaya makan/penginapan, boleh tetap “driver”.
- Gunakan “Lepas Kunci”, bukan singkatan “LK” pada UI utama.
- Gunakan “BBM”, bukan “bensin” untuk isi paket; detail kendaraan boleh menulis Diesel/Bensin/Hybrid.
- Angka: Rp1.700.000, tanpa spasi setelah Rp.
- Durasi: “3 hari”, bukan “3 x hari”.
- Selalu tulis “Harga final dikonfirmasi melalui WhatsApp.”
- Jangan gunakan kata “gratis” tanpa batas yang jelas; tulis “Gratis 1× penjemputan...” dan “Gratis 1× pengantaran...”.

## 14. Design tokens tingkat komponen

~~~css
:root {
  --button-primary-bg: var(--color-accent);
  --button-primary-bg-hover: var(--color-accent-hover);
  --button-primary-fg: var(--color-accent-foreground);
  --button-whatsapp-bg: var(--color-whatsapp);
  --button-whatsapp-bg-hover: var(--color-whatsapp-hover);
  --button-radius: var(--radius-md);
  --button-height: 48px;

  --input-bg: var(--color-surface);
  --input-fg: var(--color-text);
  --input-border: var(--color-border);
  --input-focus: var(--color-focus);
  --input-error: var(--color-error);
  --input-radius: var(--radius-md);
  --input-height: 48px;

  --card-bg: var(--color-surface);
  --card-fg: var(--color-text);
  --card-border: var(--color-border);
  --card-radius: var(--radius-lg);
  --card-shadow: var(--shadow-sm);

  --sheet-bg: var(--color-surface);
  --sheet-radius: var(--radius-xl);
  --sheet-shadow: var(--shadow-md);
}
~~~

Komponen tidak boleh mengambil primitive color secara langsung kecuali untuk membentuk semantic token. Ini memudahkan perubahan merek tanpa menyunting setiap komponen.

## 15. Mode warna

Rilis awal menggunakan light mode saja untuk menjaga kejelasan, waktu implementasi, dan konsistensi foto. Jangan menambahkan dark mode setengah jadi. Jika dark mode ditambahkan kemudian, buat pemetaan semantic token penuh dan uji ulang seluruh pasangan kontras, logo, peta, foto, border, serta semua state interaksi.

## 16. Checklist desain sebelum implementasi

- [ ] Logo/wordmark sementara atau final tersedia.
- [ ] Foto asli setiap kendaraan tersedia dan diberi izin.
- [ ] Spesifikasi unit dikonfirmasi.
- [ ] Harga dan kebijakan luar kota dikonfirmasi.
- [ ] Copy hero dan CTA disetujui.
- [ ] Nama lokasi Maps sesuai dengan identitas bisnis atau diberi penjelasan.
- [ ] Semua state kartu dan form memiliki desain.
- [ ] Booking panel mobile diuji dengan keyboard virtual terbuka.
- [ ] Tidak ada CTA yang tertutup sticky bar.
- [ ] Tidak ada text overflow pada 320 px.

## 17. Checklist QA UI/UX

### Visual

- [ ] Hanya memakai token warna.
- [ ] Harga konsisten memakai tabular numerals.
- [ ] Ikon berasal dari satu keluarga.
- [ ] Tidak ada emoji struktural.
- [ ] Foto tidak tampak pecah atau memiliki rasio campur.
- [ ] Radius, border, dan shadow konsisten.

### Interaksi

- [ ] Seluruh target sentuh minimal 44 px.
- [ ] Hover bukan satu-satunya cara membuka informasi.
- [ ] State hover, active, focus, disabled, error, dan selected terlihat.
- [ ] Lepas Kunci tidak mungkin dipilih untuk kendaraan non-eligible.
- [ ] Perubahan estimasi terasa instan.
- [ ] Fallback tersedia jika WhatsApp gagal dibuka.

### Accessibility

- [ ] Kontras lolos WCAG AA.
- [ ] Form memiliki label nyata.
- [ ] Focus ring terlihat.
- [ ] Dialog dan accordion memiliki ARIA yang benar.
- [ ] Alt text dan title Maps tersedia.
- [ ] Reduced motion dihormati.
- [ ] Alur selesai hanya dengan keyboard.

### Responsive

- [ ] Diuji pada 320, 375, 480, 768, 1024, dan 1440 px.
- [ ] Tidak ada scroll horizontal.
- [ ] Chip wrap dengan rapi.
- [ ] Grid berubah 1 → 2 → 3 kolom.
- [ ] Sticky CTA tidak menutup konten.
- [ ] Peta responsif dan tidak memperlambat above-the-fold.

### Konten dan bisnis

- [ ] Semua harga cocok dengan CONTEXT.md.
- [ ] Semua cakupan paket benar.
- [ ] Tidak ada klaim palsu.
- [ ] Nomor WhatsApp benar.
- [ ] TikTok, Instagram, dan Maps benar.
- [ ] Ambulans tidak memiliki harga numerik atau klaim medis tanpa verifikasi.

## 18. Definition of design done

Desain dianggap siap dibangun jika:

1. pemilik telah mengonfirmasi data yang ditandai di CONTEXT.md;
2. seluruh section memiliki layout mobile dan desktop;
3. komponen pemesanan memiliki semua state dan validasi;
4. kontras, keyboard, touch target, dan reduced motion sudah ditentukan;
5. pesan WhatsApp final disetujui;
6. desain dapat dibangun hanya dengan ReactJS dan CSS tanpa backend.
