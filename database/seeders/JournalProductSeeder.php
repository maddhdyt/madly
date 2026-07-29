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
                    'accreditation_type' => 'Sinta 6',
                    'available_slots' => 'Vol. 17 No. 3, 2026',
                    'notes' => 'FT LoA, (2026-2029)',
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
                    'accreditation_type' => 'Sinta 6',
                    'available_slots' => 'Volume 10 Nomor 2 Tahun 2026',
                    'notes' => 'FT LoA & Publish, (2022-2027)',
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
                    'accreditation_type' => 'Sinta 6',
                    'available_slots' => 'Vol 5 No 2 (2026)',
                    'notes' => 'FT LoA & Publish (naik jadi Sinta 6), (2023-2028)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol 4 No 2 Oktober 2025: 3 slot Vol  5 No 1 April 2026: 5 slot Vol 5 No 2 Oktober 2026: 9 slot',
                    'notes' => 'FT LoA, (2022-2026)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol 4 No 4 Maret 2026: 10 slot Vol 4 No 2 September 2026:  2 slot',
                    'notes' => 'FT LoA, (2022-2026)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'close submission',
                    'notes' => 'FT LoA & Publish, (2021-2025)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Volume 8 Nomor 6 Tahun 2026 slot tersedia tidak dibatasi',
                    'notes' => 'FT LoA & Publish, (2022-2027)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'close submission',
                    'notes' => 'FT LoA, (2022-2026)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol 6 No 6 (2026)',
                    'notes' => 'FT LoA, (2022-2026)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol 7 No 6 (2026)',
                    'notes' => 'FT LoA, (2021-2026)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol 4 No 6 (2026)',
                    'notes' => 'FT LoA, (2022-2026)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol. 6 No. 3 (2026) September',
                    'notes' => 'FT LoA, (2022-2026)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol. 6 No. 2 (2026)',
                    'notes' => 'FT LoA, akreditasi habis di Vol 6 No 2 tahun 2026, (2022-2026)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol 5 No 2 (2026)',
                    'notes' => 'FT LoA, Vol 6 No 1 tahun 2027, (2022-2027)',
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
                    'accreditation_type' => 'Sinta 5',
                    'available_slots' => 'Vol 6 No 2 (2026)',
                    'notes' => 'FT LoA & FT Publish (untuk yg backdate), (2021-2026)',
                    'harga_jual_minimum_info' => '900000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Cessie',
                'hpp' => 1500000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Hukum, Hukum Pidana Hukum Perdata Hukum Internasional Hukum Tata Negara Hukum Administrasi Hukum Islam Hukum Ekonomi Hukum Kedokteran Hukum Adat Hukum Lingkungan dan bagian-bagian lain yang berkaitan dengan isu-isu hukum kontemporer.',
                    'link' => 'https://jurnal.arkainstitute.co.id/index.php/cessie',
                    'publication_months' => 'January, March, May, July, September, November',
                    'estimated_time' => 'Internal LoA 1-2 hari Terbit sesuai bulannya (sedang re-akreditasi)',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 4 No 2 Juli (2025) :1 slot lagi Vol 5 No 3 September (2026): 4 slot lagi Vol 5 no 4 November (2026): 15',
                    'notes' => 'FT LoA, Masa berlaku: 2022-2026',
                    'harga_jual_minimum_info' => '2250000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Coopetition : Jurnal Ilmiah Manajemen',
                'hpp' => 1500000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => '1) Manajemen Koperasi 2) Manajemen Sumber Daya Manusia 3) Manajemen Keuangan 4) Manajemen Perbankan 5) Manajemen Pemasaran 6) Manajemen Syariah 7) Manajemen Ekonomi Publik 8) Manajemen Pendidikan 9) Kewirausahaan',
                    'link' => 'https://journal.ikopin.ac.id/index.php/coopetition/',
                    'publication_months' => 'March, July and November',
                    'estimated_time' => 'Internal LoA 1-2 hari',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => '',
                    'notes' => 'FT LoA, Masa berlaku: 2018-2026',
                    'harga_jual_minimum_info' => '2250000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'COSTING : Journal of Economic, Business and Accounting',
                'hpp' => 1000000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Ekonomi, Manajemen & Akuntansi, Ekonomi: Ekonomi Publik, Ekonomi Internasional, Ekonomi Pembangunan, Ekonomi Moneter, Ekonomi Keuangan, Teori Permainan. Administrasi Bisnis: Keuangan, Pemasaran, Manajemen Sumber Daya Manusia, Manajemen Strategis, Operasional, Kewirausahaan, dan Etika. Akuntansi: Akuntansi Sektor Publik, Perpajakan, Akuntansi Keuangan, Akuntansi Manajemen, Audit, dan Sistem Informasi.',
                    'link' => 'https://journal.ipm2kpe.or.id/index.php/COSTING',
                    'publication_months' => 'Bi-monthly ( Jan, Mar, Mei, Sept)',
                    'estimated_time' => 'FT LoA 1-2 hari Publish 3-7 hari Setelah Payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 9 No 1 2026',
                    'notes' => 'FT LoA & Publish. Akreditasi habis di Edisi No 1 . Lebih baik ke jurnal Ekoma  (khusus penulis mahasiswa biaya apc ada diskon), Masa berlaku: 2017-2026',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Tourism Sustainability (JTOS)',
                'hpp' => 1000000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Perencanaan dan Pengembangan Destinasi Pariwisata Berkelanjutan Acara dan Manajemen Berkelanjutan Bisnis Pariwisata Hijau Masa Depan Pariwisata Keberlanjutan Sosial Budaya dalam Pariwisata',
                    'link' => 'https://jtos.polban.ac.id/jtospolban/index',
                    'publication_months' => 'April, August and December',
                    'estimated_time' => 'LoA 2-3 hari Publish 7 hari Setelah Payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 6 No 2 (2026) (Terbit Agustus)',
                    'notes' => 'FT LoA & Publish, Masa berlaku: 2022-2026',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Community Engagement & Emergence Journal (CEEJ)',
                'hpp' => 1000000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Multidisiplin, Manajemen Sumber Daya Manusia dan Sistem Pendidikan, Pendekatan Strategis Penanggulangan Kemiskinan, Manajemen Pengetahuan dan Inovasi Kearifan Lokal dalam konteks pembangunan pedesaan dan daerah. Pengembangan Ekonomi dan Bisnis, meliputi kewirausahaan, manajemen koperasi, industri kreatif, dan pertumbuhan Usaha Mikro, Kecil, dan Menengah (UMKM). Manajemen Bisnis dan Organisasi, meliputi bidang-bidang seperti manajemen keuangan, manajemen strategis, pemasaran, keunggulan operasional, perilaku organisasi, dan manajemen inovasi. Manajemen Lingkungan dan Sumber Daya Berkelanjutan, dengan fokus pada eko-inovasi dan tata kelola lingkungan berbasis masyarakat. Manajemen Kesehatan Berbasis Masyarakat, program gizi publik, dan model-model untuk meningkatkan kualitas hidup di daerah tertinggal. Kepemimpinan, Harmoni Sosial, dan Implementasi Kebijakan.',
                    'link' => 'https://journal.yrpipku.com/index.php/ceej/index',
                    'publication_months' => 'Januari, April, Juli dan Oktober',
                    'estimated_time' => 'LoA 1-3 setelah payment Terbit 1-4 Minggu',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 7 No 6 2026 (Terbit Juli)',
                    'notes' => 'FT LoA & Publish, Masa berlaku: 2024-2028',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Ilmiah Multidisiplin Indonesia (JIM-ID)',
                'hpp' => 960000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Multidisiplin, teknik, sains, pertanian, perkebunan, kehutanan, kelautan dan perikanan, kesehatan, ilmu sosial, humaniora, bisnis, dan ekonomi',
                    'link' => 'https://ejournal.seaninstitute.or.id/index.php/esaprom',
                    'publication_months' => 'Monthly',
                    'estimated_time' => 'LoA setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 5 No 7 (2026) (Terbit Juli)',
                    'notes' => 'FT LoA, Masa berlaku: 2023-2027',
                    'harga_jual_minimum_info' => '1440000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'JIIP (Jurnal Ilmiah Ilmu Pendidikan)',
                'hpp' => 750000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'manajemen pendidikan, praktik terbaik pendidikan, kurikulum, penilaian pendidikan, kebijakan pendidikan, teknologi pendidikan, bahasa, arkeologi, pendidikan',
                    'link' => 'http://jiip.stkipyapisdompu.ac.id/jiip/index.php/JIIP/index',
                    'publication_months' => 'Monthtly',
                    'estimated_time' => 'LoA setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Akreditasi Jurnal nya habis jadi lebih baik ke JELE',
                    'notes' => 'FT LoA, Masa berlaku: 2021 - Vol 9 No 6 2026',
                    'harga_jual_minimum_info' => '1125000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Publicuho',
                'hpp' => 1200000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Administrasi, administrasi publik, manajemen dan kebijakan publik, politik, pemerintahan, isu global, pengembangan masyarakat, dan isu sosial',
                    'link' => 'https://journalpublicuho.uho.ac.id/index.php/journal',
                    'publication_months' => 'February, May, August, November',
                    'estimated_time' => 'Review 2 - 4 minggu setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 9 No 2 2026 (Terbit masih di  Mei-Juli)',
                    'notes' => 'FT Review, Masa berlaku: 2021 - Vol 9 No 3 (2026)',
                    'harga_jual_minimum_info' => '1800000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'PREPOTIF: Jurnal Kesehatan Masyarakat',
                'hpp' => 1300000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Kesehatan',
                    'link' => 'https://journal.universitaspahlawan.ac.id/index.php/prepotif',
                    'publication_months' => 'April, August, and December',
                    'estimated_time' => 'LoA 1-3 hari setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 10 No 2 (2026) (Terbit Agustus)',
                    'notes' => 'FT LoA, Masa berlaku: 2022 - 2027',
                    'harga_jual_minimum_info' => '1950000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'JTIK (Jurnal Teknologi Informasi dan Komunikasi)',
                'hpp' => 500000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Teknologi informasi & Komunikasi, pengolahan data, pengembangan perangkat lunak, kecerdasan buatan, analisis algoritma, dan penerapan teknologi informasi dan komunikasi',
                    'link' => 'https://journal.lembagakita.org/index.php/jtik/index',
                    'publication_months' => 'January, April, July and October',
                    'estimated_time' => 'Review & LoA :1-7 hari setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Sudah full submission untuk terbit di tahun 2026, open submission lagi di Juli 2026 tapi untuk terbitan Januari 2027',
                    'notes' => 'FT Review & LoA setelah payment., Masa berlaku: 2018-2027',
                    'harga_jual_minimum_info' => '750000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Ilmiah Muqoddimah : Jurnal Ilmu Sosial, Politik, dan Humaniora',
                'hpp' => 1000000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Sosial, Politik, politik dan identitas gender, masyarakat digital dan disrupsi, gerakan masyarakat sipil, kesejahteraan masyarakat, pembangunan sosial, kewarganegaraan dan manajemen publik, inovasi kebijakan publik, politik dan keamanan internasional, pengembangan hukum, media, informasi dan literasi, politik, tata kelola dan demokrasi, radikalisme dan terorisme',
                    'link' => 'https://jurnal.um-tapsel.ac.id/index.php/muqoddimah/index',
                    'publication_months' => 'February, May, August and November',
                    'estimated_time' => 'Review 2-4 hari LoA 7 hari setelah payemnt k jurnal Terbit 1 edisi terdekat',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 10 No 3 2026 (Terbit Agustus)',
                    'notes' => 'FT Review & LoA, Masa berlaku: 2018-2027',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Science and Environment (IJSE)',
                'hpp' => 1200000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Multidisiplin, Science, Mathematics, Technology Information, Psychology, System Information, Administration, Social, Social Science, Education, Law, Economy, Management, Forestry and the environment',
                    'link' => 'https://ijsenet.com/index.php/IJSE',
                    'publication_months' => 'Februari, Mei, Agustus dan November',
                    'estimated_time' => 'LoA 1-3 hari setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Masih di Vol 6 No 2 (2026) (Terbit Edisi Mei 2026)',
                    'notes' => 'FT Loa, Masa berlaku: 2022- Mei Vol 6 No 2 (2026)',
                    'harga_jual_minimum_info' => '1800000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Media Elektro',
                'hpp' => 750000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => '1. Electrical Power Engineering. 2. Telecommunications. 3. Informatics 4. Electronics 5. Computer System and Control 6. Artificial Inteligence 7. Robotics',
                    'link' => 'https://ejurnal.undana.ac.id/index.php/jme',
                    'publication_months' => 'April and Oktober',
                    'estimated_time' => 'LoA 2 minggu setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 15 No 2 (2026) (Terbit Oktober)',
                    'notes' => 'FT Loa, Masa berlaku: 2019-2027',
                    'harga_jual_minimum_info' => '1125000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal RAP (Riset Aktual Psikologi Universitas Negeri Padang)',
                'hpp' => 1500000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Social Psychology, Psychometrics, Educational Psychology, Clinical Psychology, Organizational Change and Development, Life Span and Development, and Indigenous Psychology.',
                    'link' => 'https://rap.ppj.unp.ac.id/index.php/rap',
                    'publication_months' => 'Mei dan November',
                    'estimated_time' => 'LoA 1-3 hari setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 17 No. 2 (2026) Terbit November',
                    'notes' => 'LoA setelah payment dan terbit sesuai edisi terdekat, Masa berlaku: 2024-2028',
                    'harga_jual_minimum_info' => '2250000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Teknik Sipil dan Arsitektur',
                'hpp' => 1000000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Teknik sipil dan arsitektur',
                    'link' => 'https://ejournal.utp.ac.id/index.php/JTSA',
                    'publication_months' => 'Januari dan Juli',
                    'estimated_time' => 'FT LoA, 1-2 minggu setelah review dan revisi',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'sudah full untuk edisi tahun 2026',
                    'notes' => 'Publish bulan Juli 2026, Masa berlaku: 2024-2029',
                    'harga_jual_minimum_info' => '1500000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Menara: Jurnal Teknik Sipil',
                'hpp' => 2000000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Structure, construction management, transportation, water resources, environmental, geotechnical engineering, dan other development scopes in civil engineering.',
                    'link' => 'https://journal.unj.ac.id/unj/index.php/menara',
                    'publication_months' => 'Januari dan Juli',
                    'estimated_time' => 'LoA 3-5 hari setelah payment',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'sudah full untuk LoA edisi tahun 2026, kecuali mau terbit inpress di Agustus 2026 tapi LoA nya di Januari 2027',
                    'notes' => 'Fasttrack LoA3-5 hari setelah payment, Masa berlaku: 2025-2028',
                    'harga_jual_minimum_info' => '3000000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Health and Pharmaceutical (IJHP)',
                'hpp' => 1200000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'food biochemistry, food safety, food microbiology, food chemistry , nutrition, food biotechnology, food processing, and food industry management',
                    'link' => 'https://ijhp.net/index.php/IJHP',
                    'publication_months' => 'February, May, Agustus dan November',
                    'estimated_time' => '(Jurnalnya mengetahui kita publisher)',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 6 No. 3 (2026) terbit Agustus',
                    'notes' => 'FT LoA setelah payment (mengetahui kita publisher), Masa berlaku: 2025-2029',
                    'harga_jual_minimum_info' => '1800000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'EKOMA (Jurnal Ekonomi, Manajemen, Akuntansi)',
                'hpp' => 1300000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Ekonomi, Manajemen dan Akuntansi',
                    'link' => 'https://al-haramjournal.id/index.php/EKOMA',
                    'publication_months' => 'Januari, Maret, Mei, Juli, September dan November',
                    'estimated_time' => 'Fasttrack LoA setelah payment (Jurnalnya mengetahui kita publisher)',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 5 No. 6 (2026) terbit September',
                    'notes' => 'Request ada review penulis Wajib merevisi atau Request Tidak ada revisi langsung tunggu LoA 1-3 hari (mengetahui kita publisher), Masa berlaku: 2025-2030',
                    'harga_jual_minimum_info' => '1950000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of English Language and Education (JELE)',
                'hpp' => 1500000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Education, language education, applied linguistics, English education, English language teaching, English Literature, language assessment and evaluation.',
                    'link' => 'https://jele.or.id/index.php/jele',
                    'publication_months' => '(Januari- Februari), (Maret- April),(Mei-Juni), (Juli-Agustus), (September-Oktober) dan (November-Desember)',
                    'estimated_time' => 'Mode Fasttrack: Mode 1 : Rp. 1.500.000 masih bisa edisi Juni 2026 Mode 2 : Rp. 750.0000 [1 bulan terbit dari submit] Penulis melakukan proses Submit dan Revisi Prediksi waktu proses review sampai publish 1 bulan [LOA diberikan setelah proses review dimulai dalam 3-7 hari setelah pembayaran]',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol 11 No 5 Sept-Okt (TERSEDIA MODE 1 DAN 2) Vol 11 No 6 Nov-Des (TERSEDIA MODE 1 DAN 2)',
                    'notes' => 'Fasttrack LoA mode 1 maksimal 2x24 jam dan Fasttrcak LoA mode 2 maksimal 3-7 hari (mengetahui kita publisher), Masa berlaku: 2022-2027',
                    'harga_jual_minimum_info' => '2250000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Wacana Kesehatan',
                'hpp' => 600000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => '- Management in Nursing - Medical-surgical Nursing - Family and Community Health Nursing - Emergency and Trauma Nursing - Maternity Nursing - Pediatric Nursing - Mental Health Nursing - Geriatric Nursing - Holistic Nursing - Public Health - Health Information System',
                    'link' => 'https://www.jurnal.akperdharmawacana.ac.id/index.php/wacana/index',
                    'publication_months' => 'Juli dan Desember',
                    'estimated_time' => '(mengetahui kita publisher)',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Vol. 11 No. 1 (2026) Terbit Juli',
                    'notes' => 'Fasttrack LoA 5-7 hari setelah payment, Masa berlaku: 2022-2027',
                    'harga_jual_minimum_info' => '900000'
                ],
            ],
            [
                'service_id' => $service->id,
                'name' => 'Kajian Psikologi dan Kesehatan Mental',
                'hpp' => 500000,
                'status_note' => 'SINTA 4',
                'attributes' => [
                    'focus_scope' => 'Psychology, Mental Health, Clinical Psychology, Health Psychology, Cognitive Psychology, Social Psychology, Developmental Psychology, Neuropsychology',
                    'link' => 'https://penerbitgoodwood.com/index.php/kpkm',
                    'publication_months' => 'Maret dan September',
                    'estimated_time' => '(mengetahui kita publisher)',
                    'accreditation_type' => 'Sinta 4',
                    'available_slots' => 'Terbit Back issue Vol. 3 No. 2 (2025) Terbit September & Vol 4 No. 2 (2026) Terbit September',
                    'notes' => 'LoA setelah proses review dan revisi selesai. Jika mau LoA sementara dari jurnal nya bisa didapatkan jika sudah melewati screaning awal, revisi dari screaning awal dan melakukan pembayaran. Berdasarkan artikel yang pernah di publish di jurnal ini dari submit- publish 2 bulan (tergantung kualitas naskah dan seberapa cepet upload revisi), Masa berlaku: 2022-2027',
                    'harga_jual_minimum_info' => '750000'
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
