import { fleet } from "./fleet.js"
import { formatRupiah } from "../utils/booking.js"

const priceOf = (id, packageType) => {
  const vehicle = fleet.find((item) => item.id === id)
  return formatRupiah(packageType === "self-drive" ? vehicle.selfDrivePrice : vehicle.allInPrice)
}

export const servicePages = [
  {
    path: "/rental-mobil-silangit-lepas-kunci/",
    title: "Rental Mobil Silangit Lepas Kunci | PodaRentCar",
    description: "Rental mobil Silangit lepas kunci: bandingkan Avanza, Veloz, Rush/Terios, dan Innova Reborn. Lihat tarif harian, durasi, serta cara konfirmasi syarat sewa.",
    heading: "Rental Mobil Silangit Lepas Kunci",
    navLabel: "Rental mobil lepas kunci Silangit",
    intro: "Atur perjalanan dari Silangit dengan mengemudi sendiri. Pilih mobil keluarga sesuai jumlah penumpang dan barang bawaan, lalu sepakati jadwal serah terima, rute, dan persyaratan dengan PodaRentCar sebelum berangkat.",
    packageType: "self-drive",
    vehicleIds: ["avanza-all-new", "avanza-veloz", "rush-terios", "innova-reborn"],
    sections: [
      {
        heading: "Pilih mobil berdasarkan penumpang dan bagasi",
        paragraphs: [
          "Pilihan lepas kunci dalam katalog mencakup Avanza All New, Avanza Veloz, Rush / Terios, dan Innova Reborn. Bandingkan harga harian dan kapasitas sebelum menentukan unit. Kapasitas kursi lepas kunci mencakup orang yang mengemudi.",
          "Jumlah kursi bukan satu-satunya pertimbangan. Bila membawa beberapa koper besar, sampaikan jumlah serta perkiraan ukurannya. Kursi yang terisi penuh dapat mengurangi ruang barang, sehingga pilihan unit perlu disesuaikan dengan kebutuhan perjalanan."
        ]
      },
      {
        heading: "Pemakaian 24 jam dan jadwal pengembalian",
        paragraphs: [
          "Paket lepas kunci mencakup unit kendaraan selama durasi yang disepakati dengan pemakaian 24 jam per hari. Tarif dasar dihitung dari harga harian mobil dikalikan jumlah hari. Jadwal mulai, lokasi serah terima, dan waktu pengembalian perlu disepakati dalam konfirmasi pemesanan.",
          "Jika mengambil mobil setelah tiba di Bandara Silangit, kirim tanggal, perkiraan waktu kedatangan, serta nomor penerbangan. Konfirmasikan titik pertemuan dan hubungi PodaRentCar bila jadwal penerbangan berubah. Tanyakan aturan keterlambatan atau perpanjangan sebelum menggunakan kendaraan."
        ]
      },
      {
        heading: "Syarat sewa dan jaminan perlu dikonfirmasi",
        paragraphs: [
          "Persyaratan lepas kunci, jaminan, dan ketersediaan unit dikonfirmasi melalui WhatsApp. Jangan menganggap seluruh kendaraan atau setiap rute otomatis dapat dipesan dengan paket ini. Siapkan pertanyaan berikut agar ketentuannya jelas sebelum menyepakati sewa."
        ],
        items: [
          "Dokumen identitas dan dokumen pengemudi yang perlu disiapkan.",
          "Deposit atau jaminan, cara penyerahan, dan ketentuan pengembaliannya.",
          "Batas wilayah penggunaan, batas kilometer, dan aturan perjalanan ke luar kota.",
          "Ketentuan keterlambatan, kerusakan, serta perlindungan kendaraan.",
          "Izin dan ketentuan jika kendaraan dibawa menyeberang ke Samosir."
        ]
      },
      {
        heading: "Rencanakan biaya perjalanan di luar sewa unit",
        paragraphs: [
          "Lepas kunci tidak mencakup driver, parkir, tol, tiket ferry, tiket masuk destinasi, dan biaya operasional perjalanan lainnya. Bila rute meliputi Balige, Parapat, atau Samosir, tuliskan urutan tujuan dan lokasi menginap agar batas pemakaian dapat diperiksa.",
          "Untuk penyeberangan ke Samosir, pastikan lebih dahulu apakah unit diizinkan ikut menyeberang. Tiket ferry dihitung di luar tarif sewa. Jadwal penyeberangan dan rencana pengembalian mobil perlu dipertimbangkan bersama, terutama jika Anda melanjutkan penerbangan dari Silangit."
        ]
      }
    ],
    faqs: [
      {
        question: "Berapa harga rental mobil lepas kunci di Silangit?",
        answer: `Tarif katalog Avanza All New lepas kunci adalah ${priceOf("avanza-all-new", "self-drive")}/hari, Avanza Veloz ${priceOf("avanza-veloz", "self-drive")}/hari, Rush / Terios ${priceOf("rush-terios", "self-drive")}/hari, serta Innova Reborn ${priceOf("innova-reborn", "self-drive")}/hari. Harga akhir, syarat, dan ketersediaan dikonfirmasi melalui WhatsApp.`
      },
      {
        question: "Apakah mobil bisa diserahterimakan di Bandara Silangit?",
        answer: "Ajukan lokasi serah terima di Bandara Silangit saat menghubungi PodaRentCar. Kirim tanggal dan waktu kedatangan, lalu konfirmasikan titik pertemuan, jadwal pengembalian, dan biaya yang mungkin berlaku sebelum pemesanan disepakati."
      },
      {
        question: "Apakah ada deposit untuk lepas kunci?",
        answer: "Konfirmasikan ketentuan deposit atau jaminan melalui WhatsApp sebelum menyepakati sewa. Tanyakan jumlah, bentuk jaminan, persyaratan dokumen, serta proses pengembaliannya agar semua ketentuan jelas sebelum serah terima."
      },
      {
        question: "Bolehkah mobil lepas kunci dibawa ke Samosir?",
        answer: "Rencana membawa mobil ke Samosir harus dikonfirmasi terlebih dahulu, termasuk izin penyeberangan dan batas wilayah penggunaan. Tiket ferry dan biaya perjalanan di luar sewa unit tidak termasuk tarif lepas kunci."
      }
    ]
  },
  {
    path: "/sewa-mobil-silangit-dengan-driver/",
    title: "Sewa Mobil Silangit dengan Driver | PodaRentCar",
    description: "Sewa mobil Silangit dengan driver untuk penjemputan bandara dan perjalanan Danau Toba. Bandingkan tarif, kapasitas, batas 12 jam, dan biaya di luar paket.",
    heading: "Sewa Mobil Silangit dengan Driver",
    navLabel: "Sewa mobil Silangit dengan driver",
    intro: "Mulai perjalanan dari Bandara Silangit dengan pilihan mobil dan driver. Paket All In PodaRentCar mencakup penggunaan dalam area Danau Toba; sampaikan jadwal kedatangan dan tujuan Anda agar rute serta estimasi dapat dikonfirmasi.",
    packageType: "all-in",
    vehicleIds: ["avanza-all-new", "avanza-veloz", "innova-reborn", "innova-zenix", "fortuner", "alphard"],
    sections: [
      {
        heading: "Koordinasi penjemputan di Bandara Silangit",
        paragraphs: [
          "Kirim tanggal kedatangan, nomor penerbangan, jumlah penumpang, dan barang bawaan saat meminta penjemputan. Cantumkan tujuan pertama, misalnya penginapan di Balige atau perjalanan menuju Parapat, agar kebutuhan kendaraan dan rute dapat diperiksa sejak awal.",
          "Paket mencakup satu kali penjemputan bandara di awal pemakaian dan satu kali pengantaran bandara di akhir. Titik bertemu, waktu jemput, serta kontak saat tiba disepakati melalui WhatsApp. Sampaikan perubahan penerbangan agar penjemputan dapat dikoordinasikan kembali."
        ]
      },
      {
        heading: "Pilih mobil keluarga, SUV, atau MPV premium",
        paragraphs: [
          "Avanza All New dan Veloz dapat menjadi pilihan untuk perjalanan keluarga, sedangkan Innova Reborn dan Zenix memberi alternatif MPV dalam tingkatan tarif berbeda. Fortuner dan Alphard tersedia dalam katalog untuk kebutuhan SUV atau MPV premium.",
          "Angka kapasitas pada halaman ini menunjukkan penumpang di luar driver. Tetap sampaikan kebutuhan bagasi meskipun jumlah penumpang masih sesuai kapasitas. Untuk rombongan yang membutuhkan lebih banyak kursi, lihat layanan Hiace Silangit pada tautan layanan terkait."
        ]
      },
      {
        heading: "Batas pemakaian driver dan cakupan rute",
        paragraphs: [
          "Layanan driver berlaku maksimal 12 jam perjalanan per hari. Susun jam mulai, tujuan kunjungan, tempat menginap, serta rencana selesai setiap hari. Batas ini berbeda dari paket lepas kunci yang memiliki pemakaian 24 jam per hari.",
          "Tarif All In yang tercantum mencakup area Danau Toba. Perjalanan ke luar cakupan, perubahan rute, atau kebutuhan di luar batas waktu harus dikonfirmasi beserta penyesuaian biayanya. Website tidak menetapkan tarif overtime; mintalah rinciannya sebelum menyepakati jadwal."
        ]
      },
      {
        heading: "Biaya yang perlu disiapkan di luar paket",
        paragraphs: [
          "Nama All In tetap memiliki pengecualian. Selain tarif harian kendaraan dengan driver, anggarkan biaya perjalanan berikut sesuai rute dan kebutuhan Anda."
        ],
        items: [
          "Parkir dan tol.",
          "Tiket ferry jika menyeberang ke Pulau Samosir.",
          "Makan dan penginapan driver.",
          "Tiket masuk destinasi wisata."
        ]
      }
    ],
    faqs: [
      {
        question: "Berapa tarif sewa mobil Silangit dengan driver?",
        answer: `Pilihan dalam katalog dimulai dari Avanza All New ${priceOf("avanza-all-new", "all-in")}/hari. Innova Reborn tercantum ${priceOf("innova-reborn", "all-in")}/hari dan Innova Zenix ${priceOf("innova-zenix", "all-in")}/hari. Tarif akhir mengikuti konfirmasi unit, jadwal, dan rute.`
      },
      {
        question: "Apakah paket dengan driver berlaku 24 jam?",
        answer: "Tidak. Paket All In mencakup driver maksimal 12 jam perjalanan per hari. Jika membutuhkan waktu lebih lama, konfirmasikan jadwal dan biaya tambahan melalui WhatsApp sebelum pemesanan."
      },
      {
        question: "Apakah penjemputan dan pengantaran bandara termasuk?",
        answer: "Paket All In mencakup satu kali penjemputan bandara di awal pemakaian serta satu kali pengantaran bandara di akhir. Jam, titik pertemuan, dan detail penerbangan perlu disepakati terlebih dahulu."
      },
      {
        question: "Apakah makan dan penginapan driver sudah termasuk harga?",
        answer: "Makan dan penginapan driver termasuk biaya di luar paket. Parkir, tol, tiket ferry, serta tiket masuk destinasi wisata juga tidak termasuk. Bahas rincian kebutuhan menginap dan rute sebelum menyepakati harga akhir."
      }
    ]
  },
  {
    path: "/sewa-hiace-silangit/",
    title: "Sewa Hiace Silangit: Commuter & Premio | PodaRentCar",
    description: "Sewa Hiace Silangit untuk rombongan ke Danau Toba. Bandingkan tarif dan kapasitas Hiace Commuter serta Premio, lalu konfirmasi bagasi, jadwal, dan rute.",
    heading: "Sewa Hiace Silangit untuk Rombongan",
    navLabel: "Sewa Hiace Silangit",
    intro: "Rencanakan perjalanan rombongan dari Bandara Silangit dalam satu kendaraan. Bandingkan Hiace Commuter dan Hiace Premio untuk kebutuhan wisata Danau Toba, keluarga besar, atau perjalanan bersama rekan kerja.",
    packageType: "all-in",
    vehicleIds: ["hiace-commuter", "hiace-premio"],
    sections: [
      {
        heading: "Hiace Commuter atau Hiace Premio?",
        paragraphs: [
          "Perbandingan di atas menampilkan harga paket dengan driver serta kapasitas penumpang masing-masing pilihan. Commuter dan Premio memiliki kapasitas katalog berbeda; jangan menyimpulkan kapasitas hanya dari nama atau kelas kendaraan.",
          "Konfigurasi kursi dapat berbeda tergantung unit. Pastikan jumlah kursi aktual dan ruang barang melalui WhatsApp sebelum memesan. Jika seluruh kursi akan digunakan dan rombongan membawa banyak koper, sampaikan kebutuhan tersebut sejak awal agar kesesuaian unit dapat dikonfirmasi."
        ]
      },
      {
        heading: "Satu daftar penumpang, satu rencana penjemputan",
        paragraphs: [
          "Tentukan satu penghubung rombongan untuk mengirim jumlah peserta, tanggal perjalanan, nomor penerbangan, serta jumlah koper. Jika peserta datang dengan penerbangan berbeda, cantumkan seluruh jadwalnya dan ajukan rencana titik kumpul.",
          "Paket All In mencakup satu kali penjemputan bandara di awal pemakaian dan satu kali pengantaran di akhir. Penjemputan tambahan atau titik kumpul yang berbeda perlu dibahas saat konfirmasi. Jangan menganggap seluruh perpindahan atau tambahan titik jemput sudah tercakup otomatis."
        ]
      },
      {
        heading: "Susun rute rombongan ke Danau Toba",
        paragraphs: [
          "Tuliskan urutan tujuan dan lokasi menginap, misalnya dari Silangit menuju Balige, dilanjutkan ke Parapat atau Samosir sesuai rencana rombongan. Daftar ini membantu pembahasan kebutuhan kendaraan, jadwal driver, dan cakupan tarif; bukan jadwal perjalanan yang dijamin selesai dalam satu hari.",
          "Layanan driver maksimal 12 jam perjalanan per hari. Perhitungkan waktu berkumpul, berhenti, makan, dan kunjungan dalam pembahasan jadwal. Bila rute mencakup penyeberangan ke Samosir, konfirmasikan rencana membawa kendaraan serta kebutuhan tiket ferry secara terpisah."
        ]
      },
      {
        heading: "Rincian biaya untuk dibagikan ke rombongan",
        paragraphs: [
          "Tarif Hiace dihitung per kendaraan per hari, bukan per orang. Untuk menyusun anggaran bersama, mulai dari tarif harian dikalikan jumlah hari, kemudian tambahkan biaya di luar paket sesuai rencana perjalanan.",
          "Parkir, tol, tiket ferry, tiket masuk wisata, serta makan dan penginapan driver tidak termasuk tarif paket. Minta rincian biaya dan konfirmasi harga akhir sebelum membagikan estimasi per peserta agar anggota rombongan memahami apa saja yang sudah dan belum dihitung."
        ]
      }
    ],
    faqs: [
      {
        question: "Berapa harga sewa Hiace di Silangit?",
        answer: `Tarif katalog Hiace Commuter adalah ${priceOf("hiace-commuter", "all-in")}/hari dan Hiace Premio ${priceOf("hiace-premio", "all-in")}/hari untuk paket All In dengan driver. Harga tersebut per kendaraan; ketersediaan, rute, serta harga akhir dikonfirmasi melalui WhatsApp.`
      },
      {
        question: "Berapa kapasitas Hiace Commuter dan Premio?",
        answer: `Katalog menampilkan Hiace Commuter hingga ${fleet.find((item) => item.id === "hiace-commuter").passengerCapacityWithDriver} penumpang dan Hiace Premio hingga ${fleet.find((item) => item.id === "hiace-premio").passengerCapacityWithDriver} penumpang di luar driver. Konfirmasi konfigurasi kursi unit aktual dan ruang bagasi, terutama jika membawa banyak koper.`
      },
      {
        question: "Apakah Hiace dapat disewa lepas kunci?",
        answer: "Hiace Commuter dan Hiace Premio dalam katalog PodaRentCar hanya ditawarkan dengan paket All In bersama driver. Keduanya tidak memiliki pilihan lepas kunci."
      },
      {
        question: "Apakah harga Hiace termasuk tiket ferry ke Samosir?",
        answer: "Tiket ferry tidak termasuk tarif sewa Hiace. Sampaikan rencana penyeberangan sejak awal agar penggunaan kendaraan, jadwal rombongan, serta biaya di luar paket dapat dikonfirmasi."
      }
    ]
  },
  {
    path: "/sewa-mobil-danau-toba/",
    title: "Sewa Mobil Danau Toba dari Silangit | PodaRentCar",
    description: "Sewa mobil Danau Toba dari Bandara Silangit untuk rute Balige, Parapat, dan Samosir. Lihat tarif, pilihan kendaraan, serta panduan menyiapkan perjalanan.",
    heading: "Sewa Mobil Danau Toba dari Bandara Silangit",
    navLabel: "Sewa mobil Danau Toba",
    intro: "Sesuaikan kendaraan dengan rencana perjalanan Danau Toba Anda. PodaRentCar menyediakan pilihan mobil dengan driver untuk keluarga hingga rombongan, dengan titik awal perjalanan yang dapat diajukan dari Bandara Silangit.",
    packageType: "all-in",
    vehicleIds: ["avanza-all-new", "innova-reborn", "innova-zenix", "hiace-commuter", "hiace-premio"],
    sections: [
      {
        heading: "Mulai dari tempat menginap dan tujuan utama",
        paragraphs: [
          "Sebelum memilih mobil, tentukan tanggal tiba, lokasi menginap, serta tujuan yang ingin dikunjungi. Untuk rencana ke Balige, Parapat, atau Samosir, kirim urutan perjalanan yang Anda inginkan. Rute yang jelas membantu PodaRentCar mengecek cakupan tarif dan kebutuhan kendaraan.",
          "Pisahkan rencana hari kedatangan, hari berkunjung, dan hari kembali ke bandara. Tidak semua tujuan perlu digabung dalam satu hari. Jam penerbangan, waktu berhenti, lokasi penginapan, serta penyeberangan perlu dibahas saat menyusun jadwal final."
        ]
      },
      {
        heading: "Sesuaikan pilihan mobil dengan cara bepergian",
        paragraphs: [
          "Untuk keluarga, bandingkan Avanza dan Innova berdasarkan jumlah penumpang, bagasi, serta anggaran. Jika bepergian dalam rombongan lebih besar, bandingkan Hiace Commuter dan Premio. Kapasitas yang tercantum adalah hingga jumlah tertentu dan perlu dicocokkan dengan unit aktual.",
          "Pilihan pada halaman ini memakai paket dengan driver. Jika ingin mengemudi sendiri, tersedia halaman khusus rental mobil Silangit lepas kunci dengan daftar unit yang memenuhi pilihan paket tersebut. Persyaratan, batas wilayah, dan izin membawa kendaraan ke Samosir tetap harus dikonfirmasi."
        ]
      },
      {
        heading: "Rencana ke Samosir dan biaya penyeberangan",
        paragraphs: [
          "Bila perjalanan melibatkan penyeberangan ke Pulau Samosir, jelaskan apakah kendaraan akan ikut menyeberang dan di mana Anda berencana menginap. Tiket ferry berada di luar tarif sewa. Minta konfirmasi rute, ketentuan penggunaan kendaraan, dan kebutuhan biaya tambahan sebelum menetapkan anggaran.",
          "Jadwal ferry tidak ditampilkan sebagai jadwal tetap di website ini. Pastikan rencana penyeberangan yang berlaku untuk tanggal perjalanan Anda, lalu sesuaikan dengan waktu penggunaan driver dan jadwal penerbangan pulang."
        ]
      },
      {
        heading: "Hitung estimasi sewa dan kebutuhan harian",
        paragraphs: [
          "Estimasi dasar sewa dihitung dari tarif kendaraan per hari dikalikan durasi. Paket All In mencakup jasa driver, penggunaan dalam area Danau Toba, maksimal 12 jam perjalanan per hari, serta satu kali penjemputan bandara di awal dan satu kali pengantaran bandara di akhir.",
          "Biaya parkir, tol, tiket ferry, tiket masuk wisata, serta makan dan penginapan driver berada di luar paket. Untuk perjalanan ke luar cakupan atau perubahan tujuan, konfirmasikan penyesuaian tarif. Harga akhir dan ketersediaan unit disepakati melalui WhatsApp."
        ],
        items: [
          "Tanggal mulai, durasi, dan jadwal kedatangan serta kepulangan.",
          "Jumlah penumpang dan perkiraan barang bawaan.",
          "Lokasi jemput, tujuan harian, serta tempat menginap.",
          "Rencana penyeberangan atau perjalanan di luar area Danau Toba."
        ]
      }
    ],
    faqs: [
      {
        question: "Apakah bisa menyewa mobil dari Silangit untuk wisata Danau Toba?",
        answer: "Anda dapat mengajukan perjalanan dari Bandara Silangit menuju area Danau Toba. Kirim tujuan seperti Balige, Parapat, atau Samosir beserta jadwal dan lokasi menginap agar unit, rute, serta harga akhir dapat dikonfirmasi."
      },
      {
        question: "Mobil apa yang bisa dipilih untuk perjalanan keluarga ke Danau Toba?",
        answer: "Pilihan katalog antara lain Avanza All New, Innova Reborn, dan Innova Zenix. Bandingkan tarif serta kapasitas, lalu sampaikan jumlah koper agar kesesuaian unit dapat diperiksa. Rombongan lebih besar dapat mempertimbangkan Hiace Commuter atau Premio."
      },
      {
        question: "Apakah tarif yang tercantum berlaku untuk seluruh rute?",
        answer: "Tarif All In yang tercantum mencakup penggunaan dalam area Danau Toba. Detail rute, perjalanan di luar cakupan, dan kebutuhan tambahan dikonfirmasi melalui WhatsApp. Parkir, tol, ferry, tiket wisata, serta makan dan penginapan driver tidak termasuk."
      },
      {
        question: "Apakah bisa memesan perjalanan beberapa hari?",
        answer: "Ajukan tanggal mulai dan jumlah hari yang dibutuhkan beserta rencana menginap. Estimasi dasar dihitung dari tarif harian dikalikan durasi. Pemakaian driver maksimal 12 jam perjalanan per hari; ketersediaan dan rincian harga akhir perlu dikonfirmasi."
      }
    ]
  }
]
