# MASTER BRIEF: MADLY (SALES MODULE MVP)

## 1. PROJECT CONTEXT & OBJECTIVE
- **App Name:** Madly (Sales Module)
- **Description:** Aplikasi SaaS B2B internal bergaya minimalis (Notion-esque) untuk asisten operasional sales. Fokus utama memecahkan pain point repetitif: mencari harga, menyalin deskripsi produk, dan membalas chat.
- **Target Device:** Desktop/Web-based (Dioptimalkan untuk split-screen berdampingan dengan WhatsApp Web) dan bisa juga diakses melalui smartphone.

## 2. INFRASTRUCTURE & TECH STACK
- **Backend:** Laravel (PHP). Arsitektur routing standar dan Eloquent ORM.
- **Frontend:** Blade Templates, Vanilla JS, dan Tailwind CSS. CSS Grid wajib untuk layout utama.
- **Database:** MySQL.
- **Deployment:** Shared hosting (cPanel), Cloudflare. Konfigurasi `.htaccess` dan struktur `public` folder Laravel harus standar.

## 3. VISUAL & UI/UX GUIDELINES (STRICT)
- **Theme:** Monochrome Minimalist (Hitam & Putih). Tanpa warna aksen cerah, tanpa drop shadow tebal, maksimal `border-radius: rounded-md`.
- **Typography:** Sans-serif (Inter/System UI). Hierarki murni mengandalkan ukuran teks dan font-weight.
- **Borders:** Garis pemisah tipis (`border-gray-200` atau `border-gray-300`) ala Notion/tabel DB.
- **Interactive Elements:** Hover state dengan `bg-gray-50`. Toggle/Accordion untuk menyembunyikan detail panjang.

## 4. DATABASE SCHEMA (CONCEPTS)
- **brands / categories:** `id`, `name`, `slug`, `timestamps` (Fungsi: Memisahkan katalog per bisnis/kategori).
- **products:** `id`, `brand_id`, `name`, `description_snippet`, `timestamps`.
- **product_prices (Pricelist):** `id`, `product_id`, `package_name`, `normal_price`, `promo_price`, `timestamps`.
- **chat_snippets (Canned Responses):** `id`, `shortcut` (e.g. "/salam"), `title`, `content_text`, `timestamps`.

## 5. LAYOUT ARCHITECTURE (UI STRUCTURE)
- CSS Grid untuk 2 area absolut (tanpa header tebal di atas):
  - **Area Kiri (Sidebar):** Lebar tetap (ex: `w-64`). Logo "Madly", list Brand/Kategori, menu "Pricelist", menu "Chat Snippets".
  - **Area Kanan (Main Content):** Sisa layar, scrollable.
    - **Search Bar:** Sticky di atas ("Press / to search").
    - **Data View:** List bertingkat (bukan kartu/grid).
- **Click-to-Copy Action:** Baris harga/teks di-klik -> copy ke clipboard via Vanilla JS.

## 6. CORE USER FLOW (COPY-PASTE ENGINE)
1. Split-screen: WA (kiri) & Madly (kanan).
2. Sales cari produk di Search Bar Madly.
3. Klik baris data ("Produk A - Paket Basic - Rp150.000").
4. Sistem otomatis copy & memunculkan toast "Tersalin!".
5. Sales paste (Ctrl+V) di WA.

## CRITICAL UI/UX INSTRUCTIONS (ANTI-SLOP RULES)
Strict brutalist-minimalist (Notion-esque):
1. **BANNED TAILWIND CLASSES:** 
   - No drop shadows (`shadow-sm`, `md`, etc.).
   - No large border radii (`rounded-lg`, `xl`, etc.). Max `rounded-sm` atau `rounded`.
   - No primary brand colors (`blue-500`, etc.).
   - No gradients (`bg-gradient-*`).
2. **COLOR PALETTE:** `bg-white` (main), `bg-gray-50` (sidebar/hover), `text-gray-900` (primary), `text-gray-500` (secondary), `border-gray-200` (borders).
3. **STRUCTURAL DESIGN:** 
   - Separation via thin lines (`border-b border-gray-200`) and whitespace (`py-4`, `gap-4`). No bordered cards.
   - Subtle hover (`hover:bg-gray-50`).
   - Inputs/Buttons: `bg-transparent`, `border border-gray-200`, `focus:ring-1 focus:ring-gray-900 focus:border-gray-900`.
4. **IMAGE ATTACHMENTS (OBSERVATION RULE):**
   - Wajib jeli dan sangat teliti ketika pengguna melampirkan gambar, baik itu sebagai referensi desain, tata letak, ukuran font, maupun pelaporan _bug_ visual. Pastikan semua detail di dalam gambar dianalisis dan diterapkan/diperbaiki dengan presisi yang sama.
5. **NATIVE UI BANNED:**
   - Dilarang keras menggunakan antarmuka bawaan sistem operasi atau browser (seperti `confirm()`, `alert()`, `prompt()`, atau native `<select>` / dropdown). 
   - Semua elemen interaktif (modals, dropdowns, toasts) wajib menggunakan komponen UI kustom (React/Tailwind) yang sesuai dengan tema monokrom dan minimalis aplikasi ini.
6. **ACTION FEEDBACK (TOASTS):**
   - Wajib memberikan *feedback* visual (seperti *toast notification* global) setelah pengguna berhasil atau gagal melakukan operasi CRUD (Create, Update, Delete) agar status aksi jelas tanpa menggunakan pesan *alert* bawaan browser.
