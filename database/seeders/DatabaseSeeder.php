<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 0. Create Default Admin
        \App\Models\User::firstOrCreate(
            ['email' => 'admin@madly.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
                'role' => 'admin'
            ]
        );

        // 1. Create Brands
        $brandA = \App\Models\Brand::create(['name' => 'Brand A', 'slug' => 'brand-a']);
        $brandB = \App\Models\Brand::create(['name' => 'Brand B', 'slug' => 'brand-b']);

        // 2. Create Services with their Product Schemas
        \App\Models\Service::create([
            'name' => 'Journal Publication',
            'slug' => 'jurnal',
            'description' => 'National & International Journal Publications',
            'icon' => 'book',
            'product_schema' => [
                ['name' => 'focus_scope', 'label' => 'Focus & Scope', 'type' => 'tags', 'placeholder' => 'Hukum Pidana, Perdata, dll'],
                ['name' => 'link', 'label' => 'Link Jurnal', 'type' => 'text', 'placeholder' => 'https://...'],
                ['name' => 'publication_months', 'label' => 'Bulan Terbit', 'type' => 'text', 'placeholder' => 'Jan, Mar, May'],
                ['name' => 'estimated_time', 'label' => 'Estimasi Waktu', 'type' => 'text', 'placeholder' => 'Internal LoA 1-2 hari'],
                ['name' => 'accreditation_type', 'label' => 'Akreditasi', 'type' => 'text', 'placeholder' => 'SINTA 4 / Scopus Q3'],
                ['name' => 'available_slots', 'label' => 'Slot Tersedia', 'type' => 'text', 'placeholder' => 'Vol 4 No 2 Juli: 1 slot'],
                ['name' => 'notes', 'label' => 'Keterangan Tambahan', 'type' => 'textarea', 'placeholder' => 'FT LoA & Publish'],
            ]
        ]);

        \App\Models\Service::create([
            'name' => 'Pembuatan Website',
            'slug' => 'website',
            'description' => 'Jasa Pembuatan Website Company Profile / Toko Online',
            'icon' => 'monitor',
            'product_schema' => [
                ['name' => 'tech_stack', 'label' => 'Tech Stack / CMS', 'type' => 'text', 'placeholder' => 'WordPress / Laravel / React'],
                ['name' => 'hosting_capacity', 'label' => 'Kapasitas Hosting', 'type' => 'text', 'placeholder' => 'Unlimited / 5GB'],
                ['name' => 'free_domain', 'label' => 'Free Domain', 'type' => 'text', 'placeholder' => '.com / .co.id'],
                ['name' => 'maintenance', 'label' => 'Masa Maintenance', 'type' => 'text', 'placeholder' => '1 Bulan / 1 Tahun'],
            ]
        ]);

        // 3. Create Chat Snippets
        \App\Models\ChatSnippet::create([
            'title' => 'Salam Pembuka',
            'shortcut' => '/salam',
            'content_text' => 'Halo kak! Ada yang bisa kami bantu terkait produk kami?'
        ]);
        
        \App\Models\ChatSnippet::create([
            'title' => 'Format Order',
            'shortcut' => '/order',
            'content_text' => "Silakan isi format berikut:\nNama:\nAlamat:\nPesanan:\nMetode Pembayaran:"
        ]);

        // 4. Seed Journal Products
        $this->call(JournalProductSeeder::class);
        $this->call(ImportedJournalSeeder::class);
    }
}
