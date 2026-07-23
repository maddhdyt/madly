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
        // 1. Create Brands
        $brandA = \App\Models\Brand::create(['name' => 'Brand A', 'slug' => 'brand-a']);
        $brandB = \App\Models\Brand::create(['name' => 'Brand B', 'slug' => 'brand-b']);

        // 2. Create Products and Prices
        $productSinta = \App\Models\Product::create([
            'brand_id' => $brandA->id,
            'name' => '🔥SINTA 3🔥',
            'description_snippet' => 'Paket publikasi jurnal nasional Sinta 3.',
            'category' => 'Hukum',
            'promo_header' => 'Pricelist Spesial Promo Sinta :',
            'footer_text' => "Terimakasih \n✨Nusa Education✨",
            'includes' => json_encode([
                'Editing Penyesuaian Template Jurnal',
                'Editing Mendeley',
                'Plagiarisme Checker (Turnitin)',
                'Editing Proofreading',
                'Screening Substansi',
                'Translating Naskah',
                'Bukti Submit',
                'Revisi minor',
                'Revisi Mayor',
                'Full Review & Hasil Review',
                'LoA Resmi dari Pihak Jurnal',
                'Korespondensi Resmi',
                'APC Jurnal',
                'Transparansi Alur Jurnal',
                'Jaminan Publish',
                'MoU Perjanjian',
                'DOI Aktif',
                'Akses Langsung Jurnal',
                'Link Publish'
            ])
        ]);

        \App\Models\ProductPrice::create([
            'product_id' => $productSinta->id,
            'package_name' => 'Paket ALL IN',
            'normal_price' => 6000000,
            'promo_price' => 3000000,
        ]);

        \App\Models\ProductPrice::create([
            'product_id' => $productSinta->id,
            'package_name' => 'Paket REGULER',
            'normal_price' => 5399000,
            'promo_price' => 2800000,
            'notes' => 'Tidak termasuk revisi mayor dan minor'
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
    }
}
