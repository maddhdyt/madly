# Development Log

## [2026-08-14] - Accounting Module UI Overhaul & Bug Fixes
**Added:**
- **CurrencyInput Component**: Membuat komponen reusable khusus untuk input nominal uang dan persentase di form dengan format ribuan (menggunakan titik) secara *real-time* dengan dukungan *prefix* (`Rp`) dan *suffix* (`%`).

**Modified:**
- **Accounting UI Refactor**: Mengaudit dan menyelaraskan antarmuka pengguna (UI) di modul Akuntansi agar sesuai (konsisten) dengan modul Sales. Menghapus warna non-monokrom, memperbaiki micro-interactions, memperbarui styling tombol, side panel, dan *cards* menjadi lebih modern (Monochrome/Dark Mode ready).
- **Accounting Forms**: Mengintegrasikan `CurrencyInput` ke semua input bernilai uang/persentase di seluruh form (Cash Accounts, Projects, Revenues, Expenses, Profit Sharing, Allocation Rules, Calculation Rules).

**Fixed:**
- **Closing & Reports Crash**: Memperbaiki *blank screen* (React render crash) yang muncul saat melihat riwayat tabel Closing & Laporan karena bentrok serialisasi objek relasi `closed_by` di Laravel dan render anak React. 
- **Project total_budget null error**: Memperbaiki masalah database *Integrity Constraint Violation* yang membuat *error* saat field *Total Budget* dibiarkan kosong, sekarang akan *default* ke nilai `0`.

## [2026-08-05] - UI/UX Improvements & Feature Enhancements
**Added:**
- **Pricelists Bulk Update**: Menambahkan opsi "Hapus/Clear" pada fitur *Bulk Edit* untuk mereset/mengosongkan nilai harga.
- **Product Specifications (SpecsModal)**: Mengubah label dan *tags* (seperti Akreditasi, Focus & Scope) menjadi tautan (*clickable*). Saat diklik, sistem akan langsung melakukan pencarian otomatis (deep search) ke dalam kolom atribut JSON produk, memfilter daftar produk secara instan. Fitur ini berlaku di menu *Quick Quotation* dan *Products Database*.

**Modified:**
- **Quick Quotation (Live WA Generator)**: Menyembunyikan panel *Live WA Generator* jika tidak ada produk yang dipilih agar layar pencarian lebih lega. Menambahkan transisi (*slide-in*) dengan *dynamic gap* ketika produk dipilih.
- **Z-Index Modal & Sidebar**: Mengaplikasikan teknik `createPortal()` (z-index 110) pada pop-up *SpecsModal* dan *Bulk Edit Modal* (Pricelists) agar tidak tertimpa/terbocorkan oleh Sidebar (`MainLayout`).
- **ProductController**: Memperluas logika pencarian di backend agar tidak hanya membaca `name` produk, tapi juga isi dari kolom JSON `attributes` (deep search).


## [2026-08-04] - Digital Marketing Module Updates
**Added:**
- **Competitor Research (Battlecards)**: 
  - Model `Competitor` dengan kapabilitas CRUD dan profil (*Service Type*, *Tier*, *Social Media URLs*).
  - Tampilan UI berbasis React/Inertia bergaya minimalis.
  - Relasi dengan fitur `Battlecards` (*Objection & Response*) untuk digunakan oleh tim Sales.
- **Ad Swipe File (Library Iklan)**:
  - Model `AdSwipe` dengan dukungan unggah/upload gambar untuk *screenshot* iklan.
  - Tampilan *Gallery/Grid* dengan label platform dan angle iklan.
- Menambahkan tautan/link di sidebar `MarketingLayout` untuk kedua fitur baru di atas.
- *Fix*: Menyesuaikan *bug* library icon `lucide-react` dengan mengganti render SVG manual untuk menghindari layar kosong/blank.
- *Fix*: Mengubah modal form agar menutupi sidebar secara penuh menggunakan teknik `createPortal` (React).

**Modified:**
- `app/Models/MarketingBrand.php`: Menambahkan properti `$fillable` untuk `name` dan `is_active` guna memperbaiki error *MassAssignmentException*.
