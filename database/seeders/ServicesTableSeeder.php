<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('services')->delete();
        
        \DB::table('services')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Journal Publication',
                'slug' => 'journal-publication',
                'description' => 'National & International Journal Publications',
                'icon' => 'book',
            'form_config' => '{"includes_label": "Included Features (✅)", "footer_text_label": "Footer Text", "promo_header_label": "Promo Header Text", "includes_placeholder": "e.g., Editing Mendeley", "footer_text_placeholder": "e.g., Price excludes VAT", "promo_header_placeholder": "e.g., Pricelist Spesial Promo :"}',
            'product_schema' => '[{"name": "hpp_usd", "type": "text", "label": "Base HPP (USD) - Opsional", "placeholder": "Misal: 1500"}, {"name": "focus_scope", "type": "tags", "label": "Focus & Scope", "placeholder": "Hukum Pidana, Perdata, dll"}, {"name": "links", "type": "link_builder", "label": "Daftar Link Jurnal"}, {"name": "publication_months", "type": "text", "label": "Bulan Terbit", "placeholder": "Jan, Mar, May"}, {"name": "estimated_time", "type": "text", "label": "Estimasi Waktu", "placeholder": "Internal LoA 1-2 hari"}, {"name": "accreditation_type", "type": "tags", "label": "Akreditasi", "placeholder": "SINTA 4 / Scopus Q3"}, {"name": "available_slots", "type": "text", "label": "Slot Tersedia", "placeholder": "Vol 4 No 2 Juli: 1 slot"}, {"name": "notes", "type": "textarea", "label": "Keterangan Tambahan", "placeholder": "FT LoA & Publish"}]',
                'created_at' => '2026-07-29 03:00:28',
                'updated_at' => '2026-07-30 06:53:44',
                'includes' => '["Editing Mendeley"]',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Pembuatan Website',
                'slug' => 'website',
                'description' => 'Jasa Pembuatan Website Company Profile / Toko Online',
                'icon' => 'monitor',
                'form_config' => NULL,
                'product_schema' => '[{"name": "tech_stack", "type": "text", "label": "Tech Stack / CMS", "placeholder": "WordPress / Laravel / React"}, {"name": "hosting_capacity", "type": "text", "label": "Kapasitas Hosting", "placeholder": "Unlimited / 5GB"}, {"name": "free_domain", "type": "text", "label": "Free Domain", "placeholder": ".com / .co.id"}, {"name": "maintenance", "type": "text", "label": "Masa Maintenance", "placeholder": "1 Bulan / 1 Tahun"}]',
                'created_at' => '2026-07-29 03:00:28',
                'updated_at' => '2026-07-29 03:00:28',
                'includes' => NULL,
            ),
        ));
        
        
    }
}