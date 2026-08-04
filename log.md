# Development Log

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
