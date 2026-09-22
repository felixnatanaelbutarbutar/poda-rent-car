# Panduan operasional SEO PodaRentCar

Perubahan SEO tersedia di repository; publikasi perubahan, pengiriman sitemap, dan pengelolaan Google Business Profile belum dilakukan. Akses Search Console dan Google Business Profile belum digunakan. Optimasi ini tidak menjamin posisi pertama untuk “rental mobil Silangit” atau kueri lain.

## Halaman yang diterbitkan oleh build

Domain canonical: `https://www.podarentcar.com`, sesuai redirect domain live ke `www` yang telah diperiksa. Gunakan domain dan path yang sama pada tautan, canonical, sitemap, dan profil bisnis.

| Path | Fokus pencarian dan isi |
|---|---|
| `/` | Rental mobil Silangit, jemput Bandara Silangit, katalog armada |
| `/rental-mobil-silangit-lepas-kunci/` | Sewa tanpa driver, tarif dan konfirmasi persyaratan |
| `/sewa-mobil-silangit-dengan-driver/` | Mobil dengan driver, cakupan paket dan rencana perjalanan |
| `/sewa-hiace-silangit/` | Hiace Commuter/Premio untuk rombongan |
| `/sewa-mobil-danau-toba/` | Rencana perjalanan Danau Toba, Balige, Parapat, dan Samosir |

Setiap URL memiliki HTML awal, judul, deskripsi, canonical, dan tautan internal. `404.html` diberi `noindex` dan tidak masuk sitemap. Lima halaman ini disiapkan untuk pengindeksan; status terindeks tetap harus diperiksa setelah publikasi.

## Sebelum dan saat publikasi

Jalankan berurutan dari direktori proyek:

```bash
npm test
npm run build
npm run test:seo
npm run preview
```

`build` menjalankan Vite lalu `scripts/prerender.mjs`. Publikasikan seluruh `dist/`, termasuk direktori layanan, aset, `404.html`, `robots.txt`, dan `sitemap.xml`. File robots dan sitemap dibuat otomatis; jangan membuat salinan manual di `public/` atau mengedit hasil `dist/` sebagai sumber data.

1. Pastikan setiap URL pada tabel dapat dibuka langsung dan di-refresh, serta mengembalikan HTTP 200 dengan isi halaman yang tepat.
2. Pertahankan direktori statis dan tautan native. Hindari wildcard rewrite SPA ke beranda. URL yang tidak ada harus mengembalikan HTTP 404 dan halaman kesalahan, bukan HTTP 200 berisi beranda.
3. Periksa redirect HTTP ke HTTPS dan domain tanpa `www` ke versi `www`. Pertahankan path. URL layanan tanpa garis miring akhir sebaiknya dialihkan permanen ke versi dengan garis miring akhir sesuai canonical.
4. Periksa sumber HTML: satu H1, canonical yang sesuai URL, judul dan deskripsi unik, serta konten dan harga sudah tersedia sebelum JavaScript berjalan.
5. Buka `/robots.txt` dan `/sitemap.xml` pada domain produksi. Pastikan berisi domain canonical dan lima URL yang benar, tanpa URL 404 atau domain preview.
6. Uji kembali tampilan ponsel, pemilihan armada, formulir pemesanan, dan tautan WhatsApp. Jalankan pengukuran performa pada produksi untuk menemukan masalah jaringan/aset yang tidak terlihat pada build lokal.

## Setelah publikasi: Search Console

1. Pemilik memverifikasi properti domain `podarentcar.com` di Search Console, atau memakai properti yang sudah terverifikasi.
2. Kirim `https://www.podarentcar.com/sitemap.xml` melalui menu Sitemaps. Periksa hasil pemrosesannya; pengiriman sitemap merupakan petunjuk bagi Google, bukan jaminan pengindeksan. [Panduan sitemap Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
3. Gunakan Inspeksi URL untuk kelima URL canonical. Periksa apakah crawling diizinkan, HTML dapat diambil, dan canonical pilihan Google sesuai. Jalankan pengujian URL aktif lalu ajukan pengindeksan bila halaman siap. Status pengujian aktif tidak sama dengan status indeks. [Panduan Inspeksi URL](https://support.google.com/webmasters/answer/9012289?hl=id).
4. Catat URL yang belum terindeks, redirect yang salah, dan halaman error. Perbaiki penyebabnya, lalu periksa ulang; jangan hanya mengirim permintaan indeks berulang.

## Profil bisnis dan keakuratan informasi

Pemilik perlu memeriksa nama bisnis sesuai penggunaan nyata, kategori, telepon, alamat atau area layanan yang sesuai, jam operasional, serta URL website pada Google Business Profile. Lengkapi verifikasi dan foto armada asli; minta ulasan dari pelanggan nyata dan tanggapi dengan wajar. Informasi lengkap, akurat, dan ulasan membantu pencarian lokal, yang juga dipengaruhi relevansi, jarak, serta popularitas. [Panduan peringkat lokal Google](https://support.google.com/business/answer/7091?hl=id).

Alamat lengkap belum terverifikasi. Jangan mengarang alamat, rating, jumlah ulasan, jam operasional, atau jaminan layanan di website maupun schema. `AutoRental` saat ini menggambarkan bisnis dari data yang tersedia, tetapi tidak menjamin rich result LocalBusiness; persyaratan Google mencakup alamat fisik. Tambahkan informasi hanya setelah pemilik mengesahkan dan informasi yang sama tampil di halaman. [Persyaratan LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Mengukur hasil dan memperbarui konten

- Simpan tanggal publikasi dan baseline Search Console untuk 28 hari sebelum perubahan bila tersedia. Bandingkan dengan periode 28 hari berikutnya saat data telah terkumpul; bila belum ada data, simpan periode pertama sebagai baseline.
- Pantau klik, impresi, CTR, dan posisi rata-rata per halaman serta kueri: “rental mobil Silangit”, “sewa mobil Bandara Silangit”, “rental mobil Silangit lepas kunci”, “sewa Hiace Silangit”, dan “sewa mobil Danau Toba”. Gunakan filter negara/perangkat yang sama agar perbandingan masuk akal. Posisi rata-rata bukan posisi tetap yang dilihat semua orang.
- Prioritaskan perbaikan berdasarkan hasil: periksa pengindeksan bila impresi sangat rendah; perjelas judul/deskripsi bila halaman relevan mendapat impresi tetapi sedikit klik; perbarui isi untuk pertanyaan pelanggan yang belum terjawab.
- `src/seo.js` menyusun metadata dan schema dari `siteConfig`, data halaman layanan, serta `fleet`. Ubah domain/kontak di `src/data/site.js`, harga per kendaraan di `src/data/fleet.js`, dan konten layanan di `src/data/services.js`. Nominal FAQ layanan dibaca dari data armada; jangan mengasumsikan dua kendaraan selalu memiliki harga sama.
- Setelah harga, armada, atau cakupan layanan berubah dan disetujui pemilik, perbarui data serta `CONTEXT.md`, jalankan tiga pemeriksaan di atas, lalu publikasikan ulang. Periksa tabel harga, FAQ, dan penawaran schema agar tetap sesuai.
