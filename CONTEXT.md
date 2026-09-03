# Product Context — PodaRentCar

Versi: 1.0  
Terakhir diperbarui: 3 September 2026  
Status: acuan produk dan konten untuk implementasi awal

## 1. Ringkasan produk

PodaRentCar adalah website katalog dan pemesanan rental mobil statis untuk wisatawan, keluarga, rombongan, dan pelanggan lokal di sekitar Bandara Silangit dan kawasan Danau Toba. Tujuan utamanya bukan melakukan pembayaran di website, tetapi membantu calon pelanggan:

1. menemukan mobil yang sesuai;
2. memahami perbedaan paket All In dan Lepas Kunci;
3. menghitung estimasi harga berdasarkan jumlah hari;
4. mengirim permintaan pemesanan yang sudah terstruktur ke WhatsApp.

Website harus terasa lokal, tepercaya, mudah dipahami, dan sangat nyaman digunakan dari ponsel dengan koneksi yang tidak selalu cepat.

## 2. Sasaran bisnis

- Meningkatkan jumlah percakapan WhatsApp yang berkualitas.
- Mengurangi pertanyaan berulang mengenai harga, kapasitas, BBM, dan fasilitas paket.
- Mengurangi kesalahan pemesanan antara paket All In dan Lepas Kunci.
- Memperkuat visibilitas PodaRentCar untuk pencarian sewa mobil Bandara Silangit dan Danau Toba.
- Memperkenalkan layanan ambulans dengan harga melalui negosiasi WhatsApp.

## 3. Sasaran pengguna

- Mengetahui harga harian tanpa harus bertanya satu per satu.
- Memilih kendaraan berdasarkan jumlah penumpang, kenyamanan, dan anggaran.
- Mengetahui biaya yang termasuk dan tidak termasuk.
- Memahami mobil mana yang boleh disewa tanpa driver.
- Mengirim detail perjalanan ke WhatsApp dalam kurang dari dua menit.
- Menemukan lokasi dan kanal sosial bisnis dengan mudah.

## 4. Audiens utama

| Segmen | Kebutuhan | Kekhawatiran | Respons produk |
|---|---|---|---|
| Wisatawan Bandara Silangit | Penjemputan bandara dan perjalanan Danau Toba | Tidak dijemput, harga berubah, kendaraan tidak sesuai | Harga transparan, cakupan paket, form tanggal dan lokasi jemput |
| Keluarga | Mobil nyaman dan cukup untuk penumpang/barang | Kapasitas sempit dan biaya tersembunyi | Kapasitas nyaman, jenis BBM, detail termasuk/tidak termasuk |
| Rombongan | Hiace dan koordinasi rute | Kendaraan kurang besar | Filter kapasitas dan rekomendasi Hiace |
| Pelanggan lokal | Pilihan lepas kunci yang hemat | Syarat dan deposit tidak jelas | Label khusus Lepas Kunci dan CTA konfirmasi syarat |
| Perjalanan bisnis/VIP | Mobil premium dan komunikasi cepat | Ketepatan waktu dan kondisi kendaraan | Fortuner, Pajero, Alphard, serta pesan WhatsApp terstruktur |
| Kebutuhan ambulans | Respons cepat dan informasi rute | Harga dan ketersediaan | Form ringkas khusus ambulans, harga “Hubungi WhatsApp” |

## 5. Positioning

### Pernyataan positioning

PodaRentCar adalah layanan sewa mobil lokal untuk perjalanan dari Bandara Silangit dan menjelajahi Danau Toba, dengan pilihan kendaraan yang jelas, harga harian transparan, dan pemesanan praktis melalui WhatsApp.

### Nilai utama

- Lokal dan relevan untuk rute Silangit–Danau Toba.
- Pilihan kendaraan dari mobil keluarga hingga rombongan dan premium.
- Paket All In yang mudah dipahami.
- Opsi Lepas Kunci hanya pada kendaraan yang memenuhi ketentuan.
- Tidak perlu akun, pembayaran online, atau proses panjang.

### Pesan utama

“Jelajahi Danau Toba, berangkat dengan tenang.”

Pesan pendukung:

- Pilih mobil sesuai rombongan dan kebutuhan perjalanan.
- Lihat harga, fasilitas, dan pengecualian sebelum menghubungi.
- Kirim detail perjalanan langsung ke WhatsApp.

## 6. Data kontak dan kanal

| Kanal | Nilai |
|---|---|
| Nama usaha | PodaRentCar |
| WhatsApp tampilan | +62 813-7624-2320 |
| WhatsApp format tautan | 6281376242320 |
| Tautan WhatsApp dasar | https://wa.me/6281376242320 |
| TikTok | https://www.tiktok.com/@rentalbandarasilangit28?_r=1&_t=ZS-99NAYKeqf6S |
| Instagram | https://www.instagram.com/andresilalahi28/ |
| Handle Instagram | @andresilalahi28 |
| Area layanan utama | Bandara Silangit dan Danau Toba |

## 7. Lokasi

Koordinat lokasi dari embed yang diberikan pemilik tetap digunakan. Parameter `pb` asli ditolak Google Maps, sehingga implementasi memakai embed berbasis koordinat yang lebih stabil:

~~~html
<iframe
  src="https://www.google.com/maps?q=2.262573890513539,98.98723886710006&z=17&output=embed"
  width="600"
  height="450"
  style="border:0"
  allowfullscreen
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  title="Lokasi PodaRentCar di sekitar Bandara Silangit"
></iframe>
~~~

Pada implementasi, lebar harus responsif 100%, rasio visual sekitar 4:3, dan iframe dimuat secara lazy.

## 8. Katalog armada dan harga

Semua nominal di bawah dinormalisasi sebagai harga per hari berdasarkan konteks daftar yang diberikan. Harga akhir, ketersediaan, varian unit, dan rute tetap dikonfirmasi melalui WhatsApp.

Kapasitas “All In” dihitung sebagai penumpang di luar driver. Untuk unit 7-seater, tampilan aman adalah “hingga 6 penumpang + driver”. Kapasitas bagasi dapat berkurang ketika semua kursi terisi.

| ID | Kendaraan | Kategori | Kapasitas nyaman All In | BBM yang ditampilkan | All In / hari | Lepas Kunci / hari |
|---|---|---|---:|---|---:|---:|
| hiace-premio | Hiace Premio | Rombongan premium | Hingga 14 penumpang | Diesel | Rp1.700.000 | Tidak tersedia |
| hiace-commuter | Hiace Commuter | Rombongan | Hingga 15 penumpang* | Diesel | Rp1.500.000 | Tidak tersedia |
| fortuner | Toyota Fortuner | SUV premium | Hingga 6 penumpang + driver | Diesel* | Rp1.700.000 | Tidak tersedia |
| pajero | Mitsubishi Pajero Sport | SUV premium | Hingga 6 penumpang + driver | Diesel | Rp1.700.000 | Tidak tersedia |
| alphard | Toyota Alphard | MPV luxury | Hingga 6 penumpang + driver | Bensin / Hybrid* | Rp2.700.000 | Tidak tersedia |
| innova-zenix | Innova Zenix | MPV premium | Hingga 6 penumpang + driver | Bensin / Hybrid* | Rp1.400.000 | Tidak tersedia |
| innova-reborn | Innova Reborn | MPV keluarga | Hingga 6 penumpang + driver | Diesel | Rp1.000.000 | Rp500.000 |
| avanza-veloz | Avanza Veloz | MPV keluarga | Hingga 6 penumpang + driver | Bensin* | Rp800.000 | Rp400.000 |
| avanza-all-new | Avanza All New | MPV ekonomis | Hingga 6 penumpang + driver | Bensin | Rp700.000 | Rp350.000 |
| rush-terios | Rush / Terios | SUV keluarga | Hingga 6 penumpang + driver | Bensin | Rp800.000 | Rp400.000 |

\* Harus dikonfirmasi terhadap unit aktual milik operator sebelum situs dipublikasikan. Konfigurasi kursi dan jenis mesin dapat berbeda menurut tahun, tipe, modifikasi kabin, atau unit yang tersedia.

### Catatan data armada

- Penulisan “Innova rebon” dinormalisasi menjadi “Innova Reborn”.
- Penulisan “hair” dinormalisasi menjadi “hari”.
- Harga yang semula tidak diikuti “/hari” diperlakukan sebagai tarif per hari karena pola daftar seluruh armada.
- Fortuner tersedia dalam varian diesel dan bensin di pasar; jangan menjanjikan diesel sebelum unit PodaRentCar dipastikan.
- Alphard dan Zenix memiliki varian mesin berbeda; tampilkan varian unit sebenarnya setelah dikonfirmasi.
- Hiace memiliki konfigurasi kursi yang dapat berbeda. Jangan memakai angka maksimum pabrikan apabila unit rental telah dimodifikasi.
- Untuk mobil All In berkapasitas tujuh kursi, angka enam penumpang sudah memperhitungkan satu kursi driver.

## 9. Paket Sewa Mobil All In

Nama tampilan: **All In — Driver + BBM**

### Termasuk

- Harga sewa sudah termasuk jasa driver dan BBM.
- Penggunaan dalam area Danau Toba.
- Layanan driver maksimal 12 jam perjalanan per hari.
- Gratis satu kali penjemputan di bandara pada awal pemakaian.
- Gratis satu kali pengantaran ke bandara pada akhir pemakaian.

### Tidak termasuk

- Biaya parkir.
- Tiket ferry jika ingin menyeberang ke Pulau Samosir.
- Biaya makan dan penginapan driver.
- Biaya tol.
- Tiket masuk destinasi wisata.

### Aturan tampilan

- Badge paket harus selalu menulis “Driver + BBM”, bukan hanya “All In”.
- Ringkasan termasuk/tidak termasuk muncul sebelum tombol kirim WhatsApp.
- Estimasi harga dihitung dari tarif harian dikali durasi.
- Tambahkan catatan bahwa biaya di luar paket dan rute khusus dikonfirmasi melalui WhatsApp.

## 10. Paket Lepas Kunci

Nama tampilan: **Lepas Kunci — Tanpa Driver & BBM**

### Tersedia untuk

- Innova Reborn.
- Avanza Veloz.
- Avanza All New.
- Rush / Terios.

### Termasuk

- Unit kendaraan selama durasi yang disepakati.
- Pemakaian bebas 24 jam per hari.

### Tidak termasuk

- Driver.
- BBM.
- Parkir.
- Tol.
- Tiket ferry.
- Tiket masuk destinasi.
- Biaya operasional perjalanan lainnya.

### Ketentuan yang wajib dikonfirmasi operator

Website belum boleh menyatakan detail berikut sebagai fakta sampai pemilik mengesahkannya:

- dokumen identitas yang diminta;
- kewajiban SIM A aktif;
- deposit atau jaminan;
- batas wilayah penggunaan;
- batas kilometer;
- kebijakan keterlambatan;
- kebijakan kerusakan, kehilangan, kecelakaan, dan asuransi;
- usia minimum penyewa;
- aturan membawa kendaraan ke Pulau Samosir atau ke luar kota.

Sebelum data tersebut lengkap, gunakan teks aman:

“Syarat, jaminan, area pemakaian, dan ketersediaan Lepas Kunci dikonfirmasi melalui WhatsApp.”

## 11. Cakupan dalam dan luar kota

Permintaan awal menyebut penggunaan kendaraan bebas untuk dalam dan luar kota, sedangkan rincian paket All In menyebut harga mencakup area Danau Toba. Agar tidak menimbulkan janji harga yang saling bertentangan, gunakan kebijakan konten sementara:

“Melayani perjalanan dalam dan luar kota. Tarif All In yang tercantum mencakup area Danau Toba; rute di luar cakupan tersebut dikonfirmasi melalui WhatsApp.”

Kalimat ini harus diganti jika pemilik memberikan aturan harga luar kota yang lebih pasti.

## 12. Layanan ambulans

- Nama: Sewa Ambulans.
- Harga: Negosiasi melalui WhatsApp.
- Jangan menampilkan estimasi numerik.
- CTA: “Tanyakan Ambulans via WhatsApp”.
- Field ringkas: nama, tanggal, waktu, lokasi jemput, tujuan, kebutuhan singkat, nomor yang dapat dihubungi.
- Jangan membuat klaim medis, fasilitas, jenis ambulans, tenaga kesehatan, atau waktu respons sebelum dikonfirmasi pemilik.
- Jika layanan bukan layanan darurat 24 jam, jangan menggunakan kata “darurat 24 jam”.

## 13. Alur pemesanan utama

1. Pengguna memilih kendaraan dari kartu armada.
2. Website membuka panel pemesanan dan membawa nama kendaraan yang dipilih.
3. Pengguna memilih paket:
   - All In selalu tersedia untuk seluruh mobil;
   - Lepas Kunci hanya muncul aktif jika kendaraan memiliki harga Lepas Kunci.
4. Pengguna mengisi tanggal mulai, durasi hari, jumlah penumpang, lokasi jemput, tujuan/rute, nama, nomor WhatsApp, dan catatan opsional.
5. Website menampilkan estimasi tarif sewa.
6. Pengguna meninjau ringkasan paket.
7. Tombol utama menyusun pesan dan membuka WhatsApp ke 6281376242320.
8. PodaRentCar mengonfirmasi ketersediaan, rute, syarat, dan harga final melalui WhatsApp.

Tidak ada checkout, akun, pembayaran, atau penyimpanan data di fase pertama.

## 14. Aturan kalkulasi

~~~text
tarifDipilih =
  paket == "all-in" ? vehicle.allInPrice : vehicle.selfDrivePrice

estimasiSewa = tarifDipilih × jumlahHari
~~~

Aturan:

- Jumlah hari adalah bilangan bulat minimum 1.
- Jangan izinkan Lepas Kunci jika selfDrivePrice bernilai null.
- Estimasi hanya mencakup tarif paket dasar.
- Estimasi tidak memasukkan parkir, tol, ferry, makan/penginapan driver, tiket wisata, dan penyesuaian rute.
- Gunakan format mata uang Indonesia tanpa angka desimal, misalnya Rp1.700.000.
- Ambulans tidak menjalankan kalkulasi harga.
- Semua hasil diberi label “Estimasi”, bukan “Total yang harus dibayar”.

## 15. Field formulir

| Field | Wajib | Tipe | Aturan |
|---|---|---|---|
| Kendaraan | Ya | Select/read-only dari kartu | Harus berasal dari data armada |
| Paket | Ya | Radio/segmented control | Lepas Kunci hanya untuk unit eligible |
| Tanggal mulai | Ya | Date | Tidak boleh sebelum tanggal hari ini |
| Durasi | Ya | Number/stepper | Bilangan bulat, minimal 1 |
| Jumlah penumpang | Ya | Number/select | Minimal 1; validasi terhadap kapasitas tampilan |
| Lokasi jemput | Ya | Text | Contoh: Bandara Silangit |
| Tujuan/rute | Ya | Text | Contoh: Balige – Parapat – Samosir |
| Nama | Ya | Text | Minimal 2 karakter |
| Nomor WhatsApp pelanggan | Ya | Tel | Terima format lokal atau internasional |
| Catatan | Tidak | Textarea | Kebutuhan kursi anak, bagasi, waktu penerbangan, dll. |

Label harus selalu terlihat; placeholder hanya menjadi contoh, bukan pengganti label.

## 16. Template pesan WhatsApp

### Sewa mobil

~~~text
*PERMINTAAN SEWA MOBIL*
_Halo PodaRentCar, saya ingin mengecek ketersediaan kendaraan._

*DETAIL PEMESANAN*
```
Nama                 : {nama}
No. WhatsApp         : {telepon}
Mobil                : {kendaraan}
Paket                : {All In — Driver + BBM | Lepas Kunci — Tanpa Driver & BBM}
Waktu pemakaian      : {Driver maksimal 12 jam perjalanan per hari | Bebas 24 jam per hari}
Tanggal mulai        : {tanggal}
Durasi               : {jumlahHari} hari
Jumlah penumpang     : {jumlahPenumpang}
Lokasi jemput        : {lokasiJemput}
Tujuan/rute          : {tujuan}
Estimasi tarif sewa  : {estimasi}
Catatan              : {catatan atau "-"}
```

_Mohon konfirmasi ketersediaan, cakupan rute, syarat, dan harga final. Terima kasih._
~~~

### Ambulans

~~~text
*PERMINTAAN SEWA AMBULANS*
_Halo PodaRentCar, saya ingin menanyakan layanan sewa ambulans._

*DETAIL KEBUTUHAN*
```
Nama                : {nama}
No. WhatsApp        : {telepon}
Tanggal dan waktu   : {tanggalWaktu}
Lokasi jemput       : {lokasiJemput}
Tujuan              : {tujuan}
Kebutuhan singkat   : {kebutuhan}
```

_Mohon info ketersediaan dan harganya. Terima kasih._
~~~

Pesan dibentuk di browser dan di-URL-encode sebelum membuka:

~~~text
https://wa.me/6281376242320?text={pesan-yang-sudah-di-encode}
~~~

## 17. Kebutuhan fungsional

### Wajib untuk rilis awal

- Halaman satu layar panjang dengan navigasi anchor.
- Hero dengan CTA “Lihat Armada” dan “Pesan via WhatsApp”.
- Daftar seluruh kendaraan beserta harga, kapasitas, dan BBM.
- Filter Semua, Keluarga, SUV, Premium, dan Rombongan.
- Pembeda visual All In dan Lepas Kunci.
- Kalkulator estimasi berdasarkan mobil, paket, dan jumlah hari.
- Form pemesanan WhatsApp dengan validasi.
- Panel penjelasan paket.
- Kartu layanan ambulans.
- Google Maps embed.
- Tautan TikTok dan Instagram.
- Tombol WhatsApp yang mudah dijangkau di ponsel.
- FAQ statis.

### Tidak termasuk fase pertama

- Backend atau database.
- Login/registrasi.
- Pembayaran online.
- Kalender ketersediaan real-time.
- Dashboard admin.
- Pelacakan kendaraan.
- Upload dokumen Lepas Kunci.
- Integrasi WhatsApp Business API.

## 18. Kebutuhan nonfungsional

- Mobile-first, dimulai dari lebar 320–375 px.
- Tidak ada scroll horizontal.
- Target sentuh minimal 44 × 44 px; tombol utama minimal tinggi 48 px.
- Body minimum 16 px.
- Kontras teks minimum WCAG AA 4,5:1.
- Navigasi keyboard dan focus ring yang jelas.
- Semua gambar bermakna memiliki alt text.
- Hormati prefers-reduced-motion.
- Foto armada memakai JPEG berasio 16:10 dari `public/img/car/`, mempunyai ukuran eksplisit, dan lazy loading.
- Halaman tetap dapat dipahami jika animasi dan JavaScript non-esensial gagal.
- Tidak menyimpan data formulir ke server.
- Tautan eksternal menggunakan rel="noopener noreferrer" ketika membuka tab baru.

## 19. SEO dasar

### Title

Rental Mobil Silangit & Lepas Kunci | PodaRentCar

### Meta description

Rental mobil Silangit untuk jemput Bandara Silangit dan wisata Danau Toba. Tersedia sewa mobil All In driver + BBM serta lepas kunci mulai Rp350.000/hari.

### Kata kunci topikal

- rental mobil Bandara Silangit;
- sewa mobil Danau Toba;
- rental mobil Balige;
- Hiace Bandara Silangit;
- sewa mobil dengan driver Danau Toba;
- rental mobil lepas kunci Silangit;
- sewa ambulans Silangit.

Gunakan satu H1, heading berurutan, konten lokal yang nyata, dan data bisnis yang konsisten. Jangan membuat ulasan, jumlah pelanggan, rating, atau klaim “termurah” tanpa bukti.

## 20. Event analitik opsional

Jika analitik ditambahkan kemudian, cukup lacak event tanpa data pribadi:

- view_vehicle;
- select_vehicle;
- select_package;
- open_booking;
- calculate_estimate;
- click_whatsapp;
- click_map;
- click_tiktok;
- click_instagram;
- click_ambulance.

Jangan mengirim nama, nomor WhatsApp, lokasi jemput, atau catatan perjalanan ke analitik.

## 21. Kriteria penerimaan

- Semua sepuluh kendaraan dan empat belas opsi harga tampil benar.
- Empat kendaraan eligible menampilkan opsi Lepas Kunci; kendaraan lain tidak.
- Memilih kartu kendaraan mengisi kendaraan yang benar di form.
- Mengubah paket atau jumlah hari memperbarui estimasi dengan benar.
- Estimasi diberi disclaimer dan tidak disebut sebagai harga final.
- Tombol kirim membuka chat WhatsApp ke nomor yang benar dengan isi form.
- Isi paket All In dan Lepas Kunci tidak tercampur.
- Ambulans selalu memakai harga negosiasi.
- Maps, TikTok, dan Instagram dapat diakses.
- Form dapat diselesaikan dengan keyboard dan pembaca layar.
- Tidak ada elemen penting yang hanya dapat digunakan melalui hover.
- Tampilan lolos pemeriksaan pada 320, 375, 768, 1024, dan 1440 px.

## 22. Hal yang harus dikonfirmasi sebelum publikasi

1. Apakah lokasi Google Maps bernama “Laskar Rental Bandara Silangit” memang lokasi resmi PodaRentCar.
2. Alamat teks lengkap dan jam operasional.
3. Kapasitas kursi aktual unit lain, khususnya Hiace Commuter.
4. Jenis BBM/varian mesin aktual Fortuner, Alphard, Zenix, dan Veloz.
5. Kebijakan overtime.
6. Definisi pasti area Danau Toba dan biaya rute luar area.
7. Syarat lengkap Lepas Kunci.
8. Apakah harga sudah termasuk pajak.
9. Fasilitas dan batas layanan ambulans.
10. Foto kendaraan asli yang boleh digunakan.
11. Bukti testimonial atau rating jika bagian social proof akan dipublikasikan.

Sebelum sebelas poin ini disahkan, website harus memakai bahasa “estimasi”, “hingga”, “tergantung unit”, dan “konfirmasi melalui WhatsApp”.

## 23. Referensi spesifikasi awal

Spesifikasi umum di atas digunakan hanya sebagai dasar desain informasi, bukan jaminan unit PodaRentCar:

- Toyota Hiace Premio: https://www.toyota.astra.co.id/press-room/press-release/all-new-hiace-premio-toyota-lengkapi-line-up-hiace-untuk-segmen-premium-transformasi-menuju-human-transport-yang-lebih-nyaman
- Toyota Hiace Commuter: https://pressroom.toyota.astra.co.id/toyota-hadirkan-new-hiace-dan-new-dyna-dengan-tampilan-yang-lebih-modern-sebagai-andalan-terbaik-di
- Toyota Fortuner: https://pressroom.toyota.astra.co.id/rekam-jejak-sejarah-toyota-fortuner-di-indonesia-diawali-mesin-bensin-dan-terus-berkembang-hingga
- Mitsubishi Pajero Sport: https://www.mitsubishi-motors.co.id/siaran-pers/bbm-diesel-naik-mitsubishi-pajero-sport-siap-di-berbagai-kondisi
- Toyota Innova Reborn: https://pressroom.toyota.astra.co.id/48-tahun-toyota-kijang-memang-tiada-duanya-kisah-mobil-niaga-pick-yang-bertransformasi-menjadi-mpv
- Toyota Innova Zenix: https://pressroom.toyota.astra.co.id/libur-telah-tiba-jalan-jalan-ke-luar-kota-pakai-all-new-kijang-innova-zenix-hybrid-simak-di-sini
- Toyota Veloz: https://pressroom.toyota.astra.co.id/products/veloz
- Toyota Avanza: https://pressroom.toyota.astra.co.id/50-tahun-toyota-di-indonesia-world-premiere-of-all-new-avanza-menjadi-bagian-dari-kebesaran-indonesia
- Toyota Rush: https://pressroom.toyota.astra.co.id/all-new-rush-hadir-menjawab-tantangan-urban-cruiser
- Daihatsu Terios: https://daihatsu.co.id/product/new-terios/
