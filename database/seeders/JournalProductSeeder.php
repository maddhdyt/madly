<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\Product;

class JournalProductSeeder extends Seeder
{
    public function run()
    {
        // Temukan service Jurnal
        $service = Service::where('name', 'like', '%Journal%')->orWhere('name', 'like', '%Jurnal%')->first();
        if (!$service) return;

        $products = [
            // SINTA 6
            [
                'service_id' => $service->id,
                'name' => 'Eduhealth',
                'hpp' => 650000,
                'status_note' => 'SINTA 6',
                'attributes' => [
                    'focus_scope' => 'Kesehatan',
                    'link' => 'https://ejournal.stikesinstitute.or.id/index.php/health',
                    'publication_months' => '(Januari-Maret), (April-Juni), (Juli-September), (Oktober-Desember)',
                    'estimated_time' => 'LoA setelah revisi dan payment',
                    'accreditation_type' => 'Sinta 6 (2026-2029)',
                    'available_slots' => 'Vol. 17 No. 3, 2026',
                    'notes' => 'FT LoA',
                    'harga_jual_minimum_info' => '975000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Pendidikan Tambusai (JPTAM)',
                'hpp' => 500000,
                'status_note' => 'SINTA 6',
                'attributes' => [
                    'focus_scope' => 'Multidisiplin',
                    'link' => 'https://jptam.org/index.php/jptam',
                    'publication_months' => 'April, Agustus, Desember',
                    'estimated_time' => 'LoA 1 hari setelah payment',
                    'accreditation_type' => 'Sinta 6 (2022-2027)',
                    'available_slots' => 'Volume 10 Nomor 2 Tahun 2026',
                    'notes' => 'FT LoA & Publish',
                    'harga_jual_minimum_info' => '750000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Histeria',
                'hpp' => 500000,
                'status_note' => 'SINTA 6',
                'attributes' => [
                    'focus_scope' => 'Sosial Humaniora',
                    'link' => 'https://jurnal.arrainstitute.co.id/index.php/histeria',
                    'publication_months' => 'Januari dan Juli',
                    'estimated_time' => 'LoA 1 hari setelah payment',
                    'accreditation_type' => 'Sinta 6 (2023-2028)',
                    'available_slots' => 'Vol 5 No 2 (2026)',
                    'notes' => 'FT LoA & Publish (naik jadi Sinta 6)',
                    'harga_jual_minimum_info' => '750000'
                ],
            ],
            
            // SINTA 5
            [
                'service_id' => $service->id,
                'name' => 'Keynesia',
                'hpp' => 1000000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Pembangunan Ekonomi, Moneter, Keuangan, dan Perbankan, Ekonomi Internasional, Ekonomi Publik, Ekonomi Pembangunan, dan Ekonomi Regional, Ilmu Manajemen: Pemasaran, Manajemen Keuangan, Manajemen Sumber Daya Manusia, Kewirausahaan, dan Bisnis Internasional, Ilmu Akuntansi: Perpajakan dan Akuntansi Sektor Publik, Sistem Informasi Akuntansi, Audit, Akuntansi Keuangan, dan Akuntansi Perilaku Manajemen',
                    'link' => 'https://jurnal.arkainstitute.co.id/index.php/keynesia',
                    'publication_months' => 'April & Oktober',
                    'estimated_time' => 'Internal',
                    'accreditation_type' => 'Sinta 5 (2022-2026)',
                    'available_slots' => 'Vol 4 No 2 Oktober 2025: 3 slot Vol  5 No 1 April 2026: 5 slot Vol 5 No 2 Oktober 2026: 9 slot',
                    'notes' => 'FT LoA',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Co-Creation',
                'hpp' => 1000000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Ekonomi, Moneter, Keuangan dan Perbankan, Ekonomi Publik, Ekonomi Pembangunan, Ekonomi Regional, Ekonomi Internasional, Akuntansi Keuangan, Akuntansi Manajemen, Akuntansi Sektor Publik, Akuntansi Syariah, Teknologi Informasi Akuntansi, Audit, Pasar Modal, Tata Kelola Perusahaan, Manajemen Keuangan, Perpajakan, Manajemen, Manajemen Keuangan, Manajemen Sumber Daya Manusia, Kewirausahaan, Perpajakan dan Akuntansi Sektor Publik Bisnis Internasional, Sistem Informasi Akuntansi, Akuntansi Keuangan, Akuntansi Perilaku Manajemen, Koperasi dan UKM, Akuntansi Koperasi dan UKM, manajemen rumah sakit, manajemen kesehatan',
                    'link' => 'https://jurnal.arkainstitute.co.id/index.php/co-creation',
                    'publication_months' => 'Maret, Juni, September, Desember',
                    'estimated_time' => 'Internal',
                    'accreditation_type' => 'Sinta 5 (2022-2026)',
                    'available_slots' => 'Vol 4 No 4 Maret 2026: 10 slot Vol 4 No 2 September 2026:  2 slot',
                    'notes' => 'FT LoA',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Co-Value',
                'hpp' => 1000000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Sosial, ekonomi umum, manajemen, akuntansi, kewirausahaan, koperasi, bisnis, perbankan',
                    'link' => 'https://journal.ikopin.ac.id/index.php/covalue/index',
                    'publication_months' => 'Monthly',
                    'estimated_time' => 'Internal',
                    'accreditation_type' => 'Sinta 5 (2021-2025)',
                    'available_slots' => 'close submission',
                    'notes' => 'FT LoA & Publish',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Fair Value: Jurnal Ilmiah Akuntansi dan Keuangan',
                'hpp' => 1000000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Akuntansi Manajemen, Akuntansi Keuangan, Akuntansi Sektor Publik, Akuntansi Syariah, Teknologi Informasi Akuntansi, Audit, Manajemen Keuangan, Perpajakan, Perbankan, Koperasi, dan Akuntansi UKM',
                    'link' => 'https://journal.ikopin.ac.id/index.php/fairvalue',
                    'publication_months' => 'Monthly',
                    'estimated_time' => 'Internal',
                    'accreditation_type' => 'Sinta 5 (2022-2027)',
                    'available_slots' => 'Volume 8 Nomor 6 Tahun 2026 slot tersedia tidak dibatasi',
                    'notes' => 'FT LoA & Publish',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Hexatech',
                'hpp' => 1000000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Teknik, Teknik Sipil Arsitektur Teknik Kelautan Teknik Pertambangan Teknik Elektro Teknik Industri Teknik Mesin Teknik Penerbangan Informasi Teknis Biomedikorobotik Kimia Nuklir Pengiriman Perminyakan',
                    'link' => 'https://jurnal.arkainstitute.co.id/index.php/hexatech',
                    'publication_months' => 'Februari & Agustus',
                    'estimated_time' => 'Internal',
                    'accreditation_type' => 'Sinta 5 (2022-2026)',
                    'available_slots' => 'close submission',
                    'notes' => 'FT LoA',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'SOSTEK | Jurnal Sosial Teknologi',
                'hpp' => 2000000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Multidisiplin, Manajemen, Ekonomi, Budaya, Hukum, Geografi, Pendidikan, dan Teknologi',
                    'link' => 'https://sostech.greenvest.co.id/index.php/sostech',
                    'publication_months' => 'Monthly',
                    'estimated_time' => 'Internal Syntax',
                    'accreditation_type' => 'Sinta 5 (2022-2026)',
                    'available_slots' => 'Vol 6 No 6 (2026)',
                    'notes' => 'FT LoA',
                    'harga_jual_minimum_info' => '3000000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'JISS | Jurnal Indonesia Sosial Sains',
                'hpp' => 2000000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Multidisiplin, Manajemen, Ekonomi, Budaya, Hukum, Komunikasi, Kesehatan, Geografi, Pendidikan dan Teknologi',
                    'link' => 'https://jiss.publikasiindonesia.id/index.php/jiss',
                    'publication_months' => 'Monthly',
                    'estimated_time' => 'Internal Syntax',
                    'accreditation_type' => 'Sinta 5 (2021-2026)',
                    'available_slots' => 'Vol 7 No 6 (2026)',
                    'notes' => 'FT LoA',
                    'harga_jual_minimum_info' => '3000000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Pengabdian Masyarakat dan Riset Pendidikan/ JERKIN',
                'hpp' => 600000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Pengabdian & Multidisiplin, Pendidikan bahasa dan sastra, Pendidikan ilmu sosial, Pendidikan olahraga dan kesehatan, Pendidikan ekonomi dan bisnis, Pendidikan matematika dan ilmu pengetahuan alam, Pendidikan kejuruan dan teknik, Pendidikan seni visual, tari, musik, dan desain',
                    'link' => 'https://jerkin.org/index.php/jerkin',
                    'publication_months' => 'Monthly',
                    'estimated_time' => 'LoA 1-3 hari setelah payment',
                    'accreditation_type' => 'Sinta 5 (2022-2026)',
                    'available_slots' => 'Vol 4 No 6 (2026)',
                    'notes' => 'FT LoA',
                    'harga_jual_minimum_info' => '900000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Algebra',
                'hpp' => 500000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Pendidikan, Sosial, Sains, Sosiologi, Antropologi, Ilmu Politik, Komunikasi Sosial, Pendidikan Sosial, Ekonomi Sosial, Kesejahteraan Sosial, Hukum dan Hak Asasi Manusia, Isu-isu Sosial Kontemporer, Ilmu Pengetahuan Alam, Ilmu Terapan, Ilmu Lingkungan, Ilmu Interdisipliner, Ilmu Material',
                    'link' => 'https://ejournal.yana.or.id/index.php/algebra',
                    'publication_months' => 'Maret, Juni, September, Desember',
                    'estimated_time' => 'LoA 1-3 hari setelah payment',
                    'accreditation_type' => 'Sinta 5 (2022-2026)',
                    'available_slots' => 'Vol. 6 No. 3 (2026) September',
                    'notes' => 'FT LoA',
                    'harga_jual_minimum_info' => '750000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Arus Jurnal Pendidikan (Ajup)',
                'hpp' => 600000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Pendidikan, berkaitan dengan masalah pendidikan baik siswa, guru, sekolah. selain itu, media, metode, model pembelajaran sampai kepada penilaian dan evaluasi pendidikan',
                    'link' => 'https://jurnal.ardenjaya.com/index.php/ajup',
                    'publication_months' => 'April, Agustus, dan Desember',
                    'estimated_time' => 'LoA 1-2 hari setelah payment',
                    'accreditation_type' => 'Sinta 5 (2022-2026)',
                    'available_slots' => 'Vol. 6 No. 2 (2026)',
                    'notes' => 'FT LoA, akreditasi habis di Vol 6 No 2 tahun 2026',
                    'harga_jual_minimum_info' => '900000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Arus Jurnal Psikologi dan Pendidikan (Ajpp)',
                'hpp' => 600000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Psikologi, konseling, sosial dan agama serta pendidikan secara umum.',
                    'link' => 'https://jurnal.ardenjaya.com/index.php/ajpp',
                    'publication_months' => 'Ferbruari, Juni, dan Oktober',
                    'estimated_time' => 'LoA 1-2 hari setelah payment',
                    'accreditation_type' => 'Sinta 5 (2022-2027)',
                    'available_slots' => 'Vol 5 No 2 (2026)',
                    'notes' => 'FT LoA, Vol 6 No 1 tahun 2027',
                    'harga_jual_minimum_info' => '900000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Arus Jurnal Sosial dan Humaniora (AJSH)',
                'hpp' => 600000,
                'status_note' => 'SINTA 5',
                'attributes' => [
                    'focus_scope' => 'Sosial humaniora, antropologi, kajian bisnis, kajian komunikasi, tata kelola perusahaan, kriminologi, kajian lintas budaya, demografi, kajian ekonomi pembangunan, studi pendidikan dan etika, geografi sosial, studi manajemen teknologi informasi, studi manajemen, hubungan industrial, hubungan internasional, studi hukum, studi media, ilmu politik, studi dinamika kependudukan, studi psikologi, studi administrasi publik, sosial kesejahteraan, studi agama dan linguistik',
                    'link' => 'https://jurnal.ardenjaya.com/index.php/ajsh',
                    'publication_months' => 'April, Agustus, dan Desember',
                    'estimated_time' => 'LoA 1-2 hari setelah payment',
                    'accreditation_type' => 'Sinta 5 (2021-2026)',
                    'available_slots' => 'Vol 6 No 2 (2026)',
                    'notes' => 'FT LoA & FT Publish (untuk yg backdate)',
                    'harga_jual_minimum_info' => '900000'
                ],
            ],
        ];

        // Seed if not exists to avoid duplicates when running db:seed multiple times
        foreach ($products as $product) {
            Product::firstOrCreate(
                ['name' => $product['name']],
                $product
            );
        }
    }
}
