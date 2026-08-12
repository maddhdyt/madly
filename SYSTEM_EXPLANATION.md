# 🚀 Dokumentasi Sistem: Zeasy (Sales & CRM + Digital Marketing Ecosystem)

> **Zeasy** adalah platform internal SaaS terpadu yang memadukan **Sales Operations & CRM Engine** dengan **Digital Marketing AI & Strategy Command Center**. Platform ini dirancang khusus dengan filosofi *monochrome minimalist (Notion-esque)* untuk mengeliminasi pekerjaan repetitif, mempercepat proses penawaran penjualan, serta mengoptimalkan alokasi *budget* iklan berbasis data riil.

---

## 📐 Arsitektur Sistem & Filosofi Desain

- **Tech Stack**: Laravel 11 (Backend PHP), React + Inertia.js (Frontend SPA), Tailwind CSS, MySQL.
- **Filosofi UI/UX**: *Monochrome Minimalist* (Hitam-Putih-Abu), bebas dari *popup alert* bawaan browser, mengutamakan efisiensi navigasi keyboard (`Press / to search`) dan antarmuka *split-screen* berdampingan dengan WhatsApp Web.
- **Keamanan & Peran (Role-Based Access Control)**:
  - **Sales**: Akses ke pencarian harga, copy chat snippet, dan generator penawaran (Quotation).
  - **Manager**: Akses ke manajemen katalog produk, harga, paket layanan, dan brosur.
  - **Admin**: Akses penuh ke manajemen pengguna (*User*) dan konfigurasi aplikasi (*Settings*).
  - **Marketing**: Akses khusus ke dashboard & alat strategi Digital Marketing.

---

## 💼 MODUL 1: Sales & CRM System (Operations & Knowledge Engine)

Modul Sales & CRM berfokus pada kecepatan respon (*response rate*) tim sales dan kemudahan menyajikan data produk/harga saat melayani prospek.

```
       [ WhatsApp Web / Live Chat ] (Kiri Layar)
                   ▲
                   │ (Copy-Paste Instan / Ctrl+V)
                   ▼
         [ Zeasy Sales Engine ] (Kanan Layar)
  ┌──────────────────────────────────────────────┐
  │ 1. Instant Global Search (`/`)               │
  │ 2. Chat Snippets (/salam, /rekening, dll)    │
  │ 3. Product & Service Price Calculator        │
  │ 4. PDF Quotation Generator                   │
  └──────────────────────────────────────────────┘
```

### 1. Instant Global Search (`Press / to Search`)
- **Cara Kerja**: Sales menekan tombol `/` pada keyboard dari halaman mana pun untuk membuka *Search Bar* global.
- **Fungsi**: Pencarian kilat pencocokan nama produk, varian paket, layanan, hingga *shortcut* chat snippet tanpa perlu melakukan *reload* halaman.

### 2. Chat Snippets (Canned Responses & Fast Copy)
- **Cara Kerja**: Menyediakan daftar templat balasan teks umum (contoh: `/salam`, `/rekening`, `/faq-ongkir`, `/garansi`).
- **Fungsi**: Cukup 1-Klik pada baris teks untuk otomatis menyalin (*copy-to-clipboard*) beserta notifikasi *toast*, siap dipaste (`Ctrl+V`) ke WhatsApp Web lawan bicara.

### 3. Centralized Product & Service Catalog
- **Cara Kerja**: Katalog terpusat memisahkan antara **Produk Fisik** (dengan varian harga/paket) dan **Layanan/Service** (berdasarkan tipe jam/manpower/modul).
- **Fungsi**: Mencegah kesalahan sales memberikan harga diskon/lama kepada calon pembeli.

### 4. Quick Quotation & PDF Generator (Kalkulator Penawaran)
- **Cara Kerja**:
  1. Sales memilih Brand & kombinasi Produk/Jasa yang diminati calon pembeli.
  2. Sistem menghitung kalkulasi total harga, diskon, dan pajak secara otomatis.
  3. Sales dapat mengklik **Generate PDF** untuk mengunduh penawaran resmi/draft invoice bersurat resmi secara instan.

### 5. Media & Brochure Manager
- **Cara Kerja**: Penyimpanan terorganisir untuk materi pendukung jualan (brosur PDF, gambar spesifikasi, dan panduan produk).
- **Fungsi**: Sales dapat mengambil tautan atau mengunduh media pendukung dalam hitungan detik.

---

## 📈 MODUL 2: Digital Marketing Ecosystem (AI & Strategy Command Center)

Modul Digital Marketing menggeser peran pencatatan manual menjadi pusat kendali strategi periklanan (*Ads Command Center*) yang berbasis pada data **Brand** sebagai inti ekosistem.

```
                    ┌──────────────────────────────┐
                    │     BRAND ENGINE CENTER      │
                    └──────────────┬───────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  TRACKING & UTM  │     │   ROAS & BUDGET  │     │ COMPETITOR & AD  │
│     BUILDER      │     │    ALLOCATOR     │     │    SWIPE BANK    │
└────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
         │                        │                        │
         ▼                        ▼                        ▼
 ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
 │ GA4 & Meta    │        │ Optimization  │        │ Battlecards   │
 │ Campaign URL  │        │  & BEP Target │        │  & Positioning│
 └───────────────┘        └───────────────┘        └───────────────┘
```

### 1. UTM Tracking Builder
- **Cara Kerja**: Membangun URL link campaign terstandarisasi untuk Google Ads, Meta Ads, TikTok Ads, atau Email Marketing.
- **Fungsi**: Menyeragamkan parameter `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, dan `utm_term` agar data performa di Google Analytics 4 & CRM tercatat rapi.

### 2. ROAS & BEP Calculator (Produk & Layanan)
- **Cara Kerja**: Input data biaya produk (COGS/HPP) atau biaya jasa (*Cost of Service/Manpower*), harga jual, dan estimasi biaya iklan.
- **Fungsi**: Menghitung secara rinci:
  - **Break-Even Point (BEP) ROAS**: Batas minimum ROAS agar kampanye tidak rugi.
  - **Net Profit Margin**: Margin keuntungan bersih per transaksi.
  - **Target CPA (Cost Per Acquisition)**: Biaya maksimal yang boleh dikeluarkan per penjualan.

### 3. Smart AI Budget Allocator
- **Cara Kerja**: Menggunakan algoritma simulasi untuk mengevaluasi metrik performa (ROAS saat ini & *Closing Rate* tim sales) dari setiap channel iklan.
- **Fungsi**: Memberikan rekomendasi alokasi *budget* harian/bulanan yang optimal—memindahkan *budget* dari iklan yang tidak efisien (*underperforming*) ke iklan yang menghasilkan profit tertinggi.

### 4. Power Rank System (Ad Identities Gamification)
- **Cara Kerja**: Sistem pemeringkatan (klasemen) untuk materi iklan (*Ad Identities / Creatives*).
- **Fungsi**: Memberikan skor dan peringkat pada materi iklan terbaik berdasarkan efisiensi konversi, sehingga tim kreatif tahu jenis konten mana yang harus diproduksi ulang.

### 5. Competitor Intelligence & Battlecards
- **Cara Kerja**: Bank data riset kompetitor yang dilengkapi dengan modul **Battlecards**.
- **Fungsi**:
  - Memetakan kekuatan, kelemahan, dan penawaran harga kompetitor.
  - **Battlecards**: Menyediakan panduan praktis bagi tim Sales & Marketing saat berhadapan langsung dengan klaim atau perbandingan dari produk kompetitor.

### 6. Ad Swipe File (Creative Inspiration Bank)
- **Cara Kerja**: Galeri repositori ide dan contoh materi iklan (*angle headline*, *hook*, visual) yang sukses di pasaran.
- **Fungsi**: Menjadi referensi cepat bagi tim Copywriter dan Media Buyer sebelum meluncurkan kampanye baru.

### 7. Marketing Planner & Revenue Logs
- **Cara Kerja**: Pencatatan rencana kerja strategi pemasaran jangka pendek/panjang serta jurnal realisasi *revenue* (omzet) harian.
- **Fungsi**: Memastikan semua rencana eksekusi pemasaran terpantau dan sejalan dengan target omzet yang ditetapkan.

---

## 🔄 Alur Kolaborasi Antar Modul (End-to-End Workflow)

1. **Tahap 1 (Digital Marketing)**: Tim Marketing membuat link campaign dengan **UTM Builder**, mensimulasikan target iklan di **ROAS Calculator**, dan mengalokasikan anggaran via **Smart Budget Allocator**.
2. **Tahap 2 (Traffic & Lead Generation)**: Iklan berjalan dan mendatangkan calon pembeli ke WhatsApp / Channel Penjualan.
3. **Tahap 3 (Sales & CRM Operations)**: Tim Sales membuka **Zeasy** di sebelah WhatsApp Web, menggunakan **Instant Search** & **Chat Snippets** untuk membalas cepat, serta membuatkan **Quick Quotation PDF**.
4. **Tahap 4 (Evaluation & Strategy)**: Tim Marketing meninjau **Power Rank** iklan dan memperbarui **Battlecards** kompetitor berdasarkan *feedback* kendala yang ditemui sales di lapangan.

---

## 📝 Ringkasan Nilai Tambah (Business Benefits)

- ⚡ **Respon Super Cepat**: Mengurangi waktu pengetikan balasan pesan dari menit menjadi hitungan detik.
- 🎯 **Keputusan Marketing Berbasis Data**: Tidak ada lagi spekulasi *budget* iklan berkat kalkulasi BEP dan alokasi AI.
- 🛡️ **Penjualan Lebih Tepat**: Tim Sales selalu mengacu pada katalog harga dan *battlecard* kompetitor yang paling terupdate.
- 🧼 **UI Bersih & Tanpa Distraksi**: Tampilan monokrom minim distraksi yang nyaman digunakan berjam-jam oleh tim operasional.
