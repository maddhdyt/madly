# 🗺️ Roadmap Ekosistem Digital Marketing (Post-Pivot)

Dokumen ini berisi daftar periksa (checklist) fitur-fitur dan arah pengembangan modul **Digital Marketing** selanjutnya, yang kini telah bergeser dari sekadar "Aplikasi Pencatatan" menjadi **AI & Strategy Command Center**.

## ✅ Selesai (Fase 1 - Fundamental & Pivot)

- [x] **UTM Builder**: Standarisasi tracking link untuk Google Analytics & Meta.
- [x] **ROAS Calculator (V1)**: Simulasi laba rugi dan BEP (Break-Even Point).
- [x] **Smart Budget Allocator (V1)**: AI Simulator untuk membagikan budget berdasarkan metrik ROAS dan Closing Rate.
- [x] **Power Rank (V1)**: Sistem klasemen gamifikasi untuk *Ad Identities*.
- [x] **Restrukturisasi Database**: Pergeseran hierarki dengan **Brand** sebagai pusat ekosistem.

---

## 🚀 Fokus Utama Selanjutnya (Next Session)

Ini adalah fitur-fitur yang harus kita kerjakan pada sesi/hari kerja berikutnya untuk menyempurnakan pivot yang telah kita lakukan:

### 1. Upgrade ROAS Calculator (Adaptasi Service/Layanan)
- **Masalah:** Saat ini kalkulator masih kaku dengan kolom *COGS* (Harga Pokok Penjualan) & *Shipping*, sehingga kurang cocok untuk *Brand* yang bergerak di bidang Jasa/Layanan (Service).
- **Rencana:** Memberikan *toggle* (Produk vs Layanan). Jika *Layanan* dipilih, kolom COGS diganti menjadi *Cost of Service* atau *Manpower Cost*, dan perhitungan marginnya disesuaikan.

### 2. Scenario & Contingency Simulator (What-If Analysis)
- **Fungsi:** Modul strategi baru untuk mengantisipasi krisis.
- **Rencana:** Anda bisa mensimulasikan krisis. Misal: *"Bagaimana jika Meta Ads CPM naik 30% hari ini?"* atau *"Bagaimana jika CS Closing Rate turun drastis?"*. Sistem akan memprediksi kebocoran *budget* dan merekomendasikan manuver iklan.

### 3. Modul Data Sync (Pengganti Daily Metrics)
- **Masalah:** Anda sudah menggunakan *trackorderflow* untuk pencatatan harian, sehingga menginput data metrik secara manual ke Madly menjadi pekerjaan berulang (*repatisi*).
- **Rencana:** Menyulap halaman "Daily Metrics" yang lama menjadi halaman **Data Sync / Import**. Nantinya, Anda cukup melempar *file* CSV/Excel dari *trackorderflow* ke sini, dan Madly akan otomatis menarik angkanya untuk memberi makan AI Budget Allocator dan grafik Dashboard.

### 4. Menghidupkan Grafik Utama Dashboard
- **Masalah:** Saat ini *Bar Chart* dan *Stat Cards* di halaman depan `/marketing` masih menggunakan *dummy data*.
- **Rencana:** Menghubungkan grafik-grafik mewah di Dashboard dengan data riil dari *Brands*, *Ad Identities*, dan *Power Rank* agar mencerminkan kondisi lapangan yang sebenarnya.
