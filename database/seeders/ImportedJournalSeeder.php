<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\Product;

class ImportedJournalSeeder extends Seeder
{
    public function run()
    {
        $service = Service::where('name', 'like', '%Journal%')->orWhere('name', 'like', '%Jurnal%')->first();
        if (!$service) return;

        $products = [
            [
                'service_id' => $service->id,
                'name' => 'EDUVEST | Journal of Universal Studies',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://eduvest.greenvest.co.id/index.php/edv/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA , Jurnal Syntax | Akreditasi/Masa Berlaku: 2021 - 2026',
                  'focus_scope' => 'Multidisiplin,Hukum,Humaniora dan ilmu sosial,ilmu politik kontemporer,ilmu pendidikan,ilmu agama dan filsafat,ekonomi,ilmu teknik,ilmu kesehatan,ilmu kedokteran,ilmu seni desain dan media',
                  'estimated_time' => 'LoA maks 7 hari (KONFIRMASI SAJA DULU) JURNAL SYNTAX',
                  'available_slots' => 'Vol. 6 No. 9 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Amalee (Indonesian Journal of Community Research and Engagement)',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.insuriponorogo.ac.id/index.php/amalee',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA | Akreditasi/Masa Berlaku: 2020-2029',
                  'focus_scope' => 'Multidisiplin,Penelitian dan pemberdayaan masyarakat (baik di pedesaan maupun perkotaan) dalam bidang sosial,ekonomi,budaya,dan sebagainya,Pelayanan kesehatan masyarakat dan lingkungan,Pengembangan dan pelatihan teknologi tepat guna di kalangan masyarakat,Pemberdayaan masyarakat di daerah terpencil dan kurang berkembang yang membangun akses sosial,Pendidikan untuk pembangunan berkelanjutan.',
                  'estimated_time' => 'Normal Track : Rp. 1,5jt Terbit Juli-Desember Fasstrack : Rp. 2,5jt Terbit bisa menyesuaikan kebutuhan',
                  'available_slots' => 'Vol 7 No 2 (2026)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'April dan Oktober',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Educenter',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.arkainstitute.co.id/index.php/educenter',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA | Akreditasi/Masa Berlaku: Vol 1 No 1 2022- Vol 5 No 2 2026',
                  'focus_scope' => 'Pendidikan,,Pendekatan & Pedagogi Pendidikan,Pengajaran & Pembelajaran Lintas Jenjang,Teknologi dalam Pendidikan,Psikologi & Pengembangan Pendidikan,Pendidikan Spesialis & Inklusif,Penelitian dan Metodologi Pendidikan,Bahasa & Linguistik,Manajemen Pendidikan',
                  'estimated_time' => 'Internal LoA 1-2 hari Terbit sesuai bulannya (sedang re-akreditasi)',
                  'available_slots' => 'full slot tahun 2026',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'January, Mei, and September',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Tadrib: Jurnal Pendidikan Agama Islam',
                'hpp' => 2800000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.radenfatah.ac.id/index.php/Tadrib',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA & Publish | Akreditasi/Masa Berlaku: 2019-2027',
                  'focus_scope' => 'Pendidikan Islam,Materi Pendidikan Agama Islam,Strategi Pembelajaran Pendidikan Agama Islam,Metode Pembelajaran Pendidikan Agama Islam,Media Pembelajaran Pendidikan Agama Islam,Evaluasi Pembelajaran Pendidikan Agama Islam,Pengembangan dan Implementasi Kurikulum Pendidikan Agama Islam,Manajemen Pembelajaran Pendidikan Agama Islam (PAI),Pendidikan Inklusif dalam Pendidikan Islam,Penelitian Aksi dalam Pendidikan Islam,Sejarah dan Pemikiran Tokoh Pendidikan Islam,Pendidikan Islam dalam Konteks Politik,Politik dan Mutu Pendidikan Islam,Filsafat Pendidikan Islam,Pendidikan Karakter.',
                  'estimated_time' => 'LoA 1-3 hari setelah payment Terbit 2 Minggu',
                  'available_slots' => 'Vol 12 No 4 (2026) (Terbit Desember)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Maret, Juni, September dan Desember',
                  'harga_jual_minimum_info' => '4200000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Ners',
                'hpp' => 1300000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.universitaspahlawan.ac.id/index.php/ners',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA | Akreditasi/Masa Berlaku: 2023-2027',
                  'focus_scope' => 'Kesehatan,Keperawatan Medikal Bedah,Keperawatan Maternitas,Keperawatan Gawat Darurat,Keperawatan Anak,Keperawatan Lansia,Keperawatan Jiwa,Keperawatan Keluarga,Keperawatan Masyarakat,Manajemen Keperawatan,Terapi Komplementer,Kesehatan Masyarakat,Kesehatan Lingkungan',
                  'estimated_time' => 'LoA 1-3 hari setelah payment',
                  'available_slots' => 'Vol 10 No 4 (2026)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Januari, April, Juli dan Oktober',
                  'harga_jual_minimum_info' => '1950000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Astonjadro',
                'hpp' => 1500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.uika-bogor.ac.id/index.php/ASTONJADRO',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA | Akreditasi/Masa Berlaku: 2020-2027',
                  'focus_scope' => 'Teknik sipil,,Struktur,,Transportasi,,Material,,Arsitektur,,Sumber Daya Air dan Pesisir,,Teknik Lingkungan,,Infrastruktur,,Teknologi Informasi dan Rekayasa,,Mekanika Tanah.',
                  'estimated_time' => 'LoA 1-2 Minggu setelah payment',
                  'available_slots' => 'sudah full untuk edisi tahun ini',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Maret, Juni, September dan Desember',
                  'harga_jual_minimum_info' => '2250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'INOVTEK Polbeng - Seri Informatika',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.polbeng.ac.id/index.php/ISI/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT Review | Akreditasi/Masa Berlaku: Vol 8 No 1 2023 - Vol 12 No 2 2027',
                  'focus_scope' => 'Web and Mobile Computing,Image Processing,Expert System,Information System,Database,Decision Support System,Machine Learning,Artificial Intelligence,IT Project Management,Geographical Information System,Information Technology,Computer Network and Security,Wireless Sensor Network',
                  'estimated_time' => 'LoA 1-2 minggu setelah payment',
                  'available_slots' => 'Vol 11 No 4 (2026) Terbit November',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Februari, Mei, Agustus dan November',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Economics and Management Scienties (JEMS)',
                'hpp' => 2000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jems.ink/index.php/JEMS/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'LoA setelah revisi menurut jurnal nya | Akreditasi/Masa Berlaku: 2022-2027',
                  'focus_scope' => 'Manajemen,Ekonomi Politik,Hukum dan Ekonomi,Ekonomi Lingkungan,Ekonomi Inovasi,Ekonomi Kesehatan,Ekonomi Gender,Perdagangan & Pembangunan Internasional,Organisasi Industri,Ekonomi Internasional,Ekonomi Ketenagakerjaan,Keuangan,Uang dan Perbankan,dan Pertumbuhan Hijau',
                  'estimated_time' => 'LoA 1 Minggu',
                  'available_slots' => 'Vol 8 No 4 (2026) (Terbit September)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Maret , Juni, September dan Desember',
                  'harga_jual_minimum_info' => '3000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'JMM/ Jurnal Manajemen Motivsi',
                'hpp' => 2000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://openjurnal.unmuhpnk.ac.id/index.php/jm_motivasi',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA & FT Publish | Akreditasi/Masa Berlaku: 2018-2026',
                  'focus_scope' => 'Manajemen,,Manajemen Pemasaran,Manajemen Keuangan,Manajemen Sumber Daya Manusia,Manajemen Operasional,Manajemen Perbankan dan Lembaga Keuangan,E,Commerce,Manajemen Lintas Batas,Manajemen Koperasi dan UKM,Sistem Informasi Manajemen,Manajemen Akuntansi,Manajemen Strategi,Perilaku Konsumen,Manajemen Investasi dan Portofolio,Layanan Pemasaran',
                  'estimated_time' => 'LoA 1- 3 hari setelah dinyatakan diterima dan pembayaran Publish 1 bulan',
                  'available_slots' => 'Vol. 22 No. 2 (2026) Desember',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Juni dan Oktober',
                  'harga_jual_minimum_info' => '3000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Cetta: Jurnal Ilmu Pendidikan',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jayapanguspress.penerbit.org/index.php/cetta',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT Review Ada perubahan biaya hpp, ada biaya 500ribu untuk submission dan 2jt publikasi | Akreditasi/Masa Berlaku: 2022-2027',
                  'focus_scope' => 'Pendidikan,,Kajian kurikulum pendidikan,,Kajian materi pembelajaran,,Media dan alat peraga,,Metode dan strategi pembelajaran,,Kompetensi guru,,Kajian pengembangan peserta didik dan guru,,Kajian manajemen lembaga pendidikan,,Karakter,gender,dan evaluasi pendidikan.',
                  'estimated_time' => 'Review 1-2 Minggu Tidak ada LoA hanya ada notifikasi accepted di email Terbit Sesuai Edisi Terdekat',
                  'available_slots' => 'Vol 9 No 4 (2026) (Terbit Oktober)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Januari, April, Juli dan Oktober',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Onoma',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://e-journal.my.id/onoma',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA | Akreditasi/Masa Berlaku: Vol 8 No 1 2022 - Vol 12 No 2 2026',
                  'focus_scope' => 'Pendidikaan,bahasa dan sastra,Pengajaran,pembelajaran,dan penilaian bahasa Linguistik dan linguistik terapan Isu,isu budaya dalam studi bahasa tradisi lisan Studi sastra modern dan klasik',
                  'estimated_time' => 'LoA 1-2 Minggu Akreditasi habis di Vol 12 No 2 (2026)',
                  'available_slots' => 'Vol 12 No 3 (2026) (Terbit Agustus)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Februari, Mei, Agustus dan November',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'ISM (Intisari Sains Medis) : Jurnal Kedokteran',
                'hpp' => 7050000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://isainsmedis.id/index.php/ism/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA | Akreditasi/Masa Berlaku: 2018-2028',
                  'focus_scope' => 'Kedokteran research related to human health,disease,and medical interventions',
                  'estimated_time' => 'jurnalnya kurang merespon',
                  'available_slots' => 'jurnal kurang responsif',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'April, August, and December',
                  'harga_jual_minimum_info' => '10575000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Ganaya : Jurnal Ilmu Sosial dan Humaniora',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jayapanguspress.penerbit.org/index.php/ganaya',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT Review ada biaya Submission 500rb | Akreditasi/Masa Berlaku: 2022-2027',
                  'focus_scope' => 'Sosial humaniora,Ilmu sosial Sosiologi Politik Politik Akuntansi Audit Ekonomi Geografi Sejarah Publik Pariwisata Budaya dan masyarakat Budaya dan bahasa Multikulturalisme,dan bidang terkait lainnya.',
                  'estimated_time' => 'Review 1-2 Minggu Tidak ada LoA hanya ada notifikasi accepted di email Terbit Sesuai Edisi Terdekat',
                  'available_slots' => 'Vol 9 No 4 (2026) Terbit November',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Februari, Mei, Agustus dan November',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Sistem Informasi dan Informatika (SIMIKA)',
                'hpp' => 1200000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.lppm-unbaja.ac.id/index.php/jsii/about',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Ft LoA 2 minggu | Akreditasi/Masa Berlaku: 2023-2027',
                  'focus_scope' => 'Sistem Informasi dan Informatika',
                  'estimated_time' => 'FT LoA, 2 minggu setelah submit dan payment',
                  'available_slots' => 'edisi full tahun 2026',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Februari dan Agustus',
                  'harga_jual_minimum_info' => '1800000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Keperawatan',
                'hpp' => 1500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal3.stikeskendal.ac.id/index.php/keperawatan/issue/archive',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT Review 1-7 hari | Akreditasi/Masa Berlaku: 2019-2028',
                  'focus_scope' => 'child nursing,maternity nursing,medical,surgical nursing,critical nursing,emergency nursing,mental nursing,community nursing,gerontik nursing,family nursing,and nursing leadership and management.',
                  'estimated_time' => 'Review 1-7 hari, LoA setelah selesai revisi dan payment',
                  'available_slots' => 'Vol. 18 No 4 ( 2026) Terbit Desember',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Maret, Juni, September dan Desember',
                  'harga_jual_minimum_info' => '2250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Manajemen Terapan dan Keuangan',
                'hpp' => 3000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://online-journal.unja.ac.id/mankeu/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'LoA setelah revisi menurut jurnal nya dan payment lunas | Akreditasi/Masa Berlaku: 2023-2027',
                  'focus_scope' => 'Bidang Manajemen Pemerintahan,Bidang Manajemen Operasional,Bidang Manajemen Sumber Daya Manusia,Bidang Manajemen Pemasaran,Bidang Manajemen Keuangan,Bidang Perpajakan,Bidang Akuntansi,Bidang Kewirausahaan,Bidang Keuangan Daerah dan Bidang Pembangunan Daerah.',
                  'estimated_time' => 'Fast review 1-7 hari',
                  'available_slots' => 'Vol 15 No 3 (2026) September',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Maret, Juni, September dan Desember.',
                  'harga_jual_minimum_info' => '4500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Edu Cendikia: Jurnal Ilmiah Kependidikan',
                'hpp' => 1800000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.itscience.org/index.php/educendikia/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'multi,disciplinary education,both online and offline learning,independent learning,and independent campus,the development of the latest learning methods that refer to all age levels and are related to educational policies,school systems,and learning strategies carried out by teachers,lecturers,and independent researchers.',
                  'estimated_time' => 'FT LoA, 1-5 hari setelah payment',
                  'available_slots' => 'Vol. 6 No.2 (2026) Terbit Agustus',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'April, Agustus, dan Desember',
                  'harga_jual_minimum_info' => '2700000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Multidiciplinary Output Research For Actual and International Issue (MORFAI)',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://radjapublika.com/index.php/MORFAI/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'Economics,Political Science,Law,Human Right,International Business and Management,Agricultural Research,Medical Research,Public Health,Engineering,Sociology,Accounting,Anthropology,Ethnography,Communication,Education and Religious Studies.',
                  'estimated_time' => 'FT LoA, 1-5 hari setelah payment',
                  'available_slots' => 'Vol. 6 No.6 (2026) Terbit November',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Januari, Maret, Mei, Juli, September, dan November',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Daulat Hukum',
                'hpp' => 3000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.unissula.ac.id/index.php/RH/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Criminal Law,Civil Law,International Law,Constitutional Law,Administrative Law,Agrarian Law,Criminal Procedural Law,Civil Procedural Law,Constitutional Law,Islamic Law,Akhwalus Syakhsyiyah Law,Munakahat Law,Faraidh/Mawaris Law,Army/Military Law,Sea Law,Economic Law,Medical Law,Custom Law,Environmental Law.',
                  'estimated_time' => 'FT LoA, 1-5 hari setelah payment',
                  'available_slots' => 'sudah full untuk edisi tahun ini',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Maret, Juni, September, dan Desember',
                  'harga_jual_minimum_info' => '4500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Edusoshum: Jurnal Pendidikan Islam dan Sosial Humaniora',
                'hpp' => 1000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://edusoshum.org/index.php/EDU',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Islamic education,Educational management and administration,curriculum,organizations,educational psychology and development psychology.',
                  'estimated_time' => 'FT LoA, 3-7 hari setelah payment',
                  'available_slots' => 'Vol. 6 No. 3 (2026) Terbit Desember',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'April, Agustus, dan Desember',
                  'harga_jual_minimum_info' => '1500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Pakem : Jurnal Pengabdian Kepada Masyarakat',
                'hpp' => 850000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ojs3.unpatti.ac.id/index.php/pakem',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'jurnal nya sudah tidak ada kontak WA yg aktif | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'Education,Social,and Politics,Agriculture and Fisheries,Science,Sports,Languages,Business and Economics,Engineering,and Vocational Education,Arts,Medicine,Community Empowerment.',
                  'estimated_time' => 'LoA diberikan setelah revisi dan payment selesai',
                  'available_slots' => '',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Maret, Juni, September, dan Desember',
                  'harga_jual_minimum_info' => '1275000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'EKOMBIS REVIEW: Jurnal Ilmiah Ekonomi dan Bisnis',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.unived.ac.id/index.php/er/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'jurnalnya slow respon dan tidak pro publihser | Akreditasi/Masa Berlaku: 2022-2027',
                  'focus_scope' => 'economics,management,and accounting',
                  'estimated_time' => 'FT LoA 3-7 hari setelah payment',
                  'available_slots' => '',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Januari, April, Juli, dan Oktober',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Minfo Polgan (JMP)',
                'hpp' => 1500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.polgan.ac.id/index.php/jmp',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'Sistem Pendukung Keputusan (SPK/DSS),Sistem Informasi Geografis (GIS/SIG),Sistem Informasi Skala Enterprise (ERP,EAI,CRM,SCM),Keamanan Sistem Informasi,Sistem Informasi Berbasis Web,Sistem Berbasis Pengetahuan dan Data Mining,Mobile Computing,Multimedia,Manajemen,Desain dan Manajemen Arsitektur Perusahaan,Manajemen Inovasi/Technopreneurship.',
                  'estimated_time' => 'FT Review setelah payment LoA 4-10 hari setelah payment dan revisi oleh penulis(mengetahui kita publisher)',
                  'available_slots' => 'Vol 15 No 3 (2026)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => '(Januari-April), (Mei - Agustus) dan (September - Desember)',
                  'harga_jual_minimum_info' => '2250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Value Added : Majalah Ekonomi dan Bisnis',
                'hpp' => 2000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.unimus.ac.id/index.php/vadded',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'Ekonomi dan Manajemen',
                  'estimated_time' => 'FT LoA 3-10 hari Tersedia back issue 2024 dan 2025.',
                  'available_slots' => 'Vol 22 No 2 (2026) Slot terbatas, konfirmasi dulu aja',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'April dan Oktober',
                  'harga_jual_minimum_info' => '3000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Ilmiah Hukum dan Hak Asasi Manusia',
                'hpp' => 1400000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://penerbitgoodwood.com/index.php/JIHHAM',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal Goodwood Proses dari submit artikel sampai dapat LoA dan terbit sekitar 2 bulan sesuai alur dan terbit edisi terdekat (mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Law,Human right,Legal Studies,Constitutional Law,International Human Rights Law,Access to Justice,Legal Reform',
                  'estimated_time' => 'LoA setelah proses review dan revisi selesai. Jika mau LoA sementara dari jurnal nya bisa didapatkan jika sudah melewari screaning awal, revisi dari screaning awal dan melakukan pembayaran',
                  'available_slots' => 'Vol 6 No 2 (2026) Terbit Oktober & Ada Terbitan Back Issue 2025 edisi Januari 2026',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Juli, Oktober, Januari dan April.',
                  'harga_jual_minimum_info' => '2100000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'SEIKAT: Jurnal Ilmu Sosial, Politik dan Hukum',
                'hpp' => 1500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.45mataram.ac.id/index.php/seikat',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'LoA 1-3 hari setelah payment | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Gender Politics and Identity,Digital Society and Disruption,Civil Society Movement,Community Welfare,Social Development,Citizenship and Public Management,Public Policy Innovation,International Politics and Security,Media,Information and Literacy,Politics,Governance and Democracy,Radicalism and Terrorism,Legal Theory,Civil Law,Administrative Law,Indonesian Law,Canonic Law,Philosophy Law,Constitutional Law,Criminal Law,International Law,Religion Law,Legal Philosophy,Customary Law,Human Rights Law',
                  'estimated_time' => '(mengetahui kita publisher) Ada perbedaan APC untuk terbitan back issue yaitu menjadi Rp. 1.700.000 bisa terbit maks 7 hari',
                  'available_slots' => 'Vol 5 No 5 (2026) Terbit Oktober & Terbit back issue 2025 di edisi Oktober dan Desember',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Februari, April, Juni, Agustus, Oktober, dan Desember',
                  'harga_jual_minimum_info' => '2250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Accounting, Management, Economics and Social Sciences (IJAMESC)',
                'hpp' => 2050000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ijamesc.com/index.php/go',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Accounting,Management,Economic,Social Sciences: Education,Law,Islamic Studies,Communication and Journalism,Political Science,Philosophy,Psychology,Sociology,History,Visual Arts,Public Administration,Population Studies,Library and Information Science,Human Right,and Tourism.',
                  'estimated_time' => '(mengetahui kita publisher)LoA 1-3 hari setelah payment . Paymnet bisa full atau 2 termin setelah submit 1jt dan saat akan di publish 1,05jt',
                  'available_slots' => 'Vol 4 No 4 (2026) Terbit Agustus. Konfirmasi saja dulu',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Februari, April, Juni, Agustus, Oktober, dan Desember',
                  'harga_jual_minimum_info' => '3075000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Kesehatan Mahardika (JKM)',
                'hpp' => 2500000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.mahardika.ac.id/index.php/jkm/issue/archive',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'LoA 7 hari setelah submit dan payment | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'Nursing,Midwifery,Medical records,Public health,Medicine,Pharmacy,Radiology,Hospital management,Medical management',
                  'estimated_time' => 'Note: Biaya Publikasi Rp. 1.500.000 dan Biaya Fasttrack Rp. 2.500.000 (mengetahui kita publisher)',
                  'available_slots' => 'Vol 13 No 2 (2026) Terbit September. Konfirmasi saja dulu',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Maret dan September',
                  'harga_jual_minimum_info' => '3750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal USM Law Review (JULR)',
                'hpp' => 2000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journals.usm.ac.id/index.php/julr/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2018-2026',
                  'focus_scope' => 'Hukum,Hukum Pidana Hukum Perdata Hukum Tata Negara Hukum Internasional Hukum Administrasi Hukum Islam Hukum Bisnis Hukum Kedokteran Hukum Lingkungan Hukum Adat Hukum Agraria Filsafat Hukum',
                  'estimated_time' => 'FT Review',
                  'available_slots' => 'Vol 9 No 2 2026 (Terbit inpress Mei/Juni)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'LoA Setelah Revisi Terbit Sesuai Edisi Terdekat',
                  'harga_jual_minimum_info' => '3000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Business, Social and Technology/ BUSTECHNO',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://bustechno.polteksci.ac.id/index.php/jbt',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Information technology,environmental engineering,computer engineering,industrial engineering,mechanical engineering,electrical engineering,information systems,agricultural technology,law,communication,theology,government,environment,computer social and political sciences,and economics that belong to the business,social,and technological context covering Investment,Finance,Accounting,Insurance,Marketing,Taxation,Banking,Management',
                  'estimated_time' => 'LoA 7 hari setelah submit dan payment',
                  'available_slots' => 'Vol 7 No 5 (2026) Terbit Oktober',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Februari, April, Juni, Agustus, Oktober dan Desember LoA maks 7 hari (KONFIRMASI SAJA DULU) JURNAL SYNTAX',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Locus Penelitian dan Pengabdian',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://locus.rivierapublishing.id/index.php/jl',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2022-2027',
                  'focus_scope' => 'Communication,management,economics,culture,Education,law,Social Health and religion that belong to the social context.',
                  'estimated_time' => 'LoA 7 hari setelah submit dan payment',
                  'available_slots' => 'Vol 5 No 9 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Monthly LoA maks 7 hari (KONFIRMASI SAJA DULU) JURNAL SYNTAX',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Cakrawala Repositori IMWI',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://cakrawala.imwi.ac.id/index.php/cakrawala',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Economics and Business,covering Investment,Finance,Accounting,Insurance,Marketing,Taxation,Banking,Management',
                  'estimated_time' => 'LoA 7 hari setelah submit dan payment',
                  'available_slots' => 'Vol 9 No 5 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Januari, Maret, Mei, Juli, September dan November LoA maks 7 hari (KONFIRMASI SAJA DULU) JURNAL SYNTAX',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jendela Pendidikan : Jurnal Ilmiah Keguruan dan Pendidikan',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.unigres.ac.id/index.php/JendelaPendidikan/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2024-2028',
                  'focus_scope' => 'Pendidikan',
                  'estimated_time' => 'LoA 7 hari setelah submit dan payment',
                  'available_slots' => 'Vol 16 No 2 (2026)',
                  'accreditation_type' => 'Sinta 3',
                  'publication_months' => 'Januari dan Juli LoA maks 7 hari (KONFIRMASI SAJA DULU) JURNAL SYNTAX',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'INVEST: Journal Inovasi Bisnis dan Akuntansi',
                'hpp' => 5500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.al-matani.com/index.php/invest',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'Business,Management,Accounting,and Islamic Business Studies.',
                  'estimated_time' => 'LoA 1-7 hari setelah payment ke Jurnalnya',
                  'available_slots' => 'slot full di tahun 2026',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Mei dan November',
                  'harga_jual_minimum_info' => '8250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Inkubis: Jurnal Ekonomi dan Bisnis',
                'hpp' => 10000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://inkubis.polteksci.ac.id/index.php/ink',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA , terbit 2-3 bulan setelah submit artikel (jurnalnya mengetahui kita publisher). JURNAL SYNTAX | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Economics and Business,covering Investment,Finance,Accounting,Insurance,Marketing,Taxation,Banking,Management',
                  'estimated_time' => 'LoA 1-7 hari setelah payment ke Jurnalnya',
                  'available_slots' => 'Vol 8 No 3 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Maret, Juni, September, Desember',
                  'harga_jual_minimum_info' => '15000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Equivalent: Jurnal Ilmiah Sosial Teknik',
                'hpp' => 10000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnalequivalent.id/index.php/jequi',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA , terbit 2-3 bulan setelah submit artikel (jurnalnya mengetahui kita publisher). JURNAL SYNTAX | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Civil Engineering,Environmental Engineering,computer Engineering,Industrial Engineering,Mechanical Engineering,Electrical Engineering,Information Systems,Communication Technology,Social and Political Sciences,Education,Economics,Management,Sociology,Religion,Law that belong to the social and engineering context.',
                  'estimated_time' => 'LoA 1-7 hari setelah payment ke Jurnalnya',
                  'available_slots' => 'Vol 8 No 5 (2026) Terbit Oktober',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Februari, April, Juni, Agustus, Oktober dan Desember',
                  'harga_jual_minimum_info' => '15000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Edukasia: Jurnal Pendidikan dan Pembelajaran',
                'hpp' => 6500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnaledukasia.org/index.php/edukasia',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA, publish sesuai jadwal | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'Pendidikan dan pembelajaran,khususnya di bidang teknologi pendidikan',
                  'estimated_time' => 'LoA 1-7 hari setelah payment ke Jurnalnya',
                  'available_slots' => 'Vol 7 No 2 (2026)',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Juni and Desember',
                  'harga_jual_minimum_info' => '9750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Scaffolding: Jurnal Pendidikan Islam dan Multikulturalisme',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.insuriponorogo.ac.id/index.php/scaffolding',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Bisa Backdate, Keputusan cepat, FT LoA | Akreditasi/Masa Berlaku: 2024-2028',
                  'focus_scope' => 'Pendidikan,Pendidikan Islam,pendidikan bahasa,pendidikan dasar,pendidikan anak,pendidikan inklusif,pembentukan karakter,pendidikan sains,pendidikan sosial,manajemen pendidikan,dan multikulturalisme.',
                  'estimated_time' => 'LoA 1-7 hari setelah payment ke Jurnalnya',
                  'available_slots' => 'Vol 8 No 3 (2026) Terbit September-Desember',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => '(Januari-April), (Mei - Agustus), dan (September-Desember)',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'CONTAGION: Scientific Periodical Journal of Public Health and Coastal Health',
                'hpp' => 4500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.uinsu.ac.id/index.php/contagion',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA : 1-7 hari setelah payment | Akreditasi/Masa Berlaku: 2024-2028',
                  'focus_scope' => 'Kesehatan,Kesehatan Masyarakat. Kesehatan Masyarakat Pesisir. Ilmu Kesehatan. Kesehatan Mental. Islam dan Ilmu Kesehatan.',
                  'estimated_time' => 'LoA 1 Minggu Terbit Sesuai Edisi Terdekat',
                  'available_slots' => 'Vol 8 No 4 (2026) Terbit Desember',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => '(Januari-Maret), (April-Juni), (Juli- September), dan (Oktober- December)',
                  'harga_jual_minimum_info' => '6750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Bulletin of Counseling and Psychotherapy',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.kurasinstitute.com/index.php/bocp',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA : 3-7 hari setelah payment ke jurnal | Akreditasi/Masa Berlaku: 2023-2027',
                  'focus_scope' => 'Psikologi,Psikoterapi dan Konseling',
                  'estimated_time' => 'Terbit sesuai edisi terdekat, LoA 1-5 hari setelah payment',
                  'available_slots' => 'Vol 8 No 3 (2026) November',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Maret, Juli dan November',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Natapraja: Kajian Ilmu Administrasi Negara',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.uny.ac.id/index.php/natapraja/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT Review | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Administrasi Publik dan Kebijakan Publik',
                  'estimated_time' => 'Review 2 minggu',
                  'available_slots' => 'Vol 14 No 2 (2026)',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Mei dan Desember',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Cakrawala: Jurnal Pendidikan',
                'hpp' => 3500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://cakrawala.upstegal.ac.id/index.php/cakrawala/en/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'Pendidikan',
                  'estimated_time' => 'LoA 1-5 hari setelah payment. Terbit sesuai Edisi Terdekat',
                  'available_slots' => 'Edisi terbit 2026 sudah full open submission lagi untuk publikasi di Mei 2027',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Mei dan November',
                  'harga_jual_minimum_info' => '5250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Penelitian Sekolah Tinggi Transportasi Darat',
                'hpp' => 5500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.ptdisttd.ac.id/index.php/jpsttd',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal Rekanan | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'a. Sustainable Transport b. Road Safety Transport c. Public Transport d. Traffic Engineering e. Economic of Transportation f. Law and Policy of Transport g. Inteligent Transport System h. Integrated Transport System i. Multimoda and Logistic j. Material Science & Engineering',
                  'estimated_time' => 'FT LoA & Publish',
                  'available_slots' => 'Backdate Vol 16 No 2 Desember 2025 & Vol 17 No 2 (2026)',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Juni dan December',
                  'harga_jual_minimum_info' => '8250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'JANH (Journal of Applied Nursing and Health)',
                'hpp' => 4800000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://janh.candle.or.id/index.php/janh',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT Review dan LoA lama lebih dari 1 bulan karena banyak revisi | Akreditasi/Masa Berlaku: 2022-2026',
                  'focus_scope' => 'Kesehatan,medis,bedah,perawatan kritis,kesehatan ibu dan anak,kesehatan mental,kesehatan masyarakat dan keluarga,geriatri,onkologi,dan perawatan paliatif dan akhir hayat,epidemiologi,promosi kesehatan,pencegahan penyakit,kesehatan kerja,kebidanan,gizi,fisioterapi dan rehabilitasi,psikologi,informatika dan teknologi kesehatan,serta praktik pelengkap dengan evaluasi yang ketat.',
                  'estimated_time' => 'Review 1 Minggu Terbit cukup lama lebih dari 6 bulan karena revisi nya berkali kali',
                  'available_slots' => '-',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'March, July, and November',
                  'harga_jual_minimum_info' => '7200000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'KURIOS: Jurnal Teologi dan Pendidikan Agama Kristen',
                'hpp' => 3000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://sttpb.ac.id/e-journal/index.php/kurios/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2018-2027',
                  'focus_scope' => 'Teologi,Teologi Sistematika,Konstruktif Teologi Biblikal,Kontekstual Teologi Kontemporer Teologi,Religiositas,dan Spiritualitas Pelayanan dan Pemberdayaan Masyarakat Gereja Pendidikan Kristiani Gereja dan Masyarakat Kepemimpinan Kristen dan Gerejawi Misiologi Isu,isu Pentakostalisme',
                  'estimated_time' => 'FT Review',
                  'available_slots' => '-',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'April, Agustus, Desember',
                  'harga_jual_minimum_info' => '4500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'DUNAMIS: Jurnal Teologi dan Pendidikan Kristiani',
                'hpp' => 800000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://sttintheos.ac.id/e-journal/index.php/dunamis',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019-2027',
                  'focus_scope' => 'Teologi',
                  'estimated_time' => 'FT LoA 7-10 hari setelah payment ke jurnal nya',
                  'available_slots' => 'edisi tahun 2026 nya full, edisi tersedia april 2027',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'April, Oktober',
                  'harga_jual_minimum_info' => '1200000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Minds: Manajemen Ide dan Inspirasi',
                'hpp' => 8000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                  ),
                  'notes' => '2020-2028 | Akreditasi/Masa Berlaku: Vol. 12 No 2 (2025) Terbit Backdate',
                  'focus_scope' => 'Manajemen,Manajemen Sumber Daya Manusia,Perilaku Organisasi,Manajemen Organisasi Bisnis',
                  'estimated_time' => 'FT LoA setelah payment',
                  'available_slots' => '',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'LoA 2-4 Hari setelah payment ke jurnalnya. Terbit sesuai edisi',
                  'harga_jual_minimum_info' => '12000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Muharrik: Jurnal Dakwah dan Sosial',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.insuriponorogo.ac.id/index.php/muharrik/about',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'FT LoA 1 minggu setelah payment | Akreditasi/Masa Berlaku: 2023-2027',
                  'focus_scope' => 'Metode dan strategi dakwah kontemporer,Peran media digital dalam penyebaran pesan Islam,Fenomena sosial,keagamaan,Moderasi beragama dan multikulturalisme,Transformasi dakwah (termasuk pesantren),Isu gender dalam dakwah,Respons terhadap masalah sosial (kemiskinan,konflik,lingkungan),Peran dakwah dalam membangun harmoni sosial dan pemberdayaan masyarakat',
                  'estimated_time' => 'LoA 2-4 Hari setelah payment ke jurnalnya. Terbit sesuai edisi',
                  'available_slots' => 'Vol. 9 No. 2 (2026) Inpress September dan ada Edisi Back issue',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Juni dan Desember',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Harmoni Sosial: Jurnal Pendidikan IPS',
                'hpp' => 3500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.uny.ac.id/index.php/hsjpi/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Social sciences,history,economics,sociology,geography,anthropology,social gender,learning in social studies,and other relevant social sciences (Sosial Humaniora)',
                  'estimated_time' => 'Fasttrack Review',
                  'available_slots' => '-',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Maret dan September',
                  'harga_jual_minimum_info' => '5250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'JURNAL TEKNIK INFORMATIKA',
                'hpp' => 7000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.uinjkt.ac.id/index.php/ti',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(mengetahui kita publisher) memprioritaskan ada author LN | Akreditasi/Masa Berlaku: 2022-2027',
                  'focus_scope' => 'software engineering,system design methodology,artificial intelligence,big data and data mining,human,computer interaction,mobile computing,computational linguistics,cybersecurity,and computer networking.',
                  'estimated_time' => 'Fasttrack Review 1-2 minggu. LoA setelah accepted',
                  'available_slots' => 'Vol. 19 No. 2 (2026) terbit Oktober',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'April dan Oktober',
                  'harga_jual_minimum_info' => '10500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Akta',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.unissula.ac.id/index.php/akta/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'LoA setelah payment | Akreditasi/Masa Berlaku: 2022-2026 (sampai edisi ke 4, Desember 2026)',
                  'focus_scope' => 'Agrarian law,Family Law,Waqf Law,Waris/Inheritance Law,Contract Law,Auction Law,Code Ethic of Notary,Land Law,Intellectual Property Rights,Tax Law,Politics of Notarial Law,State Administrative,Land Administrative',
                  'estimated_time' => '- Untuk kenaikan pangkat dosen min. 2-3 bulan terbit. - LoA dikeluarkan setelah dipastikan artikel sesuai scope jurnal',
                  'available_slots' => 'sedang close submission, nanti open lagi 1 Juli 2026',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Maret, Juni, September, Desember',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Implementasi Manajemen & Kewirausahaan',
                'hpp' => 4000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.uwp.ac.id/feb/index.php/manajemen',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'edisi tahun 2026 april dan oktober full | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'Human resource management,Financial Management and Accounting,Marketing Management and Consumer Behavior,Operation Management and Logistics,Management of Information Systems and User Behavior,Strategic Management,Islamic Issues related with Management',
                  'estimated_time' => 'FT LoA, 1-5 hari setelah payment',
                  'available_slots' => 'edisi tahun 2026 nya full',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'April dan Oktober',
                  'harga_jual_minimum_info' => '6000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Diktum: Jurnal Syariah dan Hukum',
                'hpp' => 7000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejurnal.iainpare.ac.id/index.php/diktum/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'konfirmasi aja dulu karena per edisi nya hanya 10 artikel dan per 17/06/2026 sudah ada 4 artikel yang diterbitkan di edisi no 2 | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Islamic Comparative law,,Family Law,Islamic Family Law,Islamic Criminal Law,Sharia Economic Law,Islamic Constitutional Law,Anthropological Law,Sociological Law,Marriage and Gender Issues,History of Islamic Family Law and Islamic Law,Social Sciences (Miscellaneous),Islamic Political Jurisprudence,Contemporary Issues on Islamic Law and Islamic Astronomy (Ilmu Falak)',
                  'estimated_time' => '-FT LoA setelah Payment -Priority Fast Review (sebulan) -Bantuan penerjemahan bahasa -Bantuan teknis revisi bahasa dan substansi',
                  'available_slots' => 'edisi tahun 2026 nya full',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Januari dan Juli',
                  'harga_jual_minimum_info' => '10500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal SASI',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://fhukum.unpatti.ac.id/jurnal/sasi',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Konfirmasi aja dulu karena per edisi hanya 8 artikel | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'Legal Pluralism Theory,Customary Law and Local Wisdom,Religious and Community Law,Legal Pluralism in Specific Sectors,Legal System Interaction,Legal Pluralism and Human Rights,Legal Pluralism in Global and Regional Contexts,Public Policy and Legal Pluralism,Legal Pluralism Research Methodology',
                  'estimated_time' => 'LoA 1-5 hari setelah payment',
                  'available_slots' => 'Vol 32. No 4 (2026) Terbit Desember',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'March, June, September, and December.',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal TEKNIMEDIA : Teknologi Informasi dan Multimedia',
                'hpp' => 2000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.stmiksznw.ac.id/index.php/teknimedia',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'LoA 2-3 hari setelah payment (mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'Information Systems,Cloud Computing,Bioinformatics,E,Commerce,Mobile Application,Network and Security,Strategic Information System,Geographic Information Systems,Computer Network,Technopreneur,Risk Management,Human,Computer Interaction,E,Government,Customer Relationship Management,Computer Vision,Database Management,Web Application,Decision Support System,Semantic,E,Learning,Neural Network,Game Development,Multimedia Application,Parallel Processing,Open Data,Cluster Computing,Animation,Intelligent System,Data Mining,Computer Graphic,Expert System,Software Engineering,Image Processing,Operating System,Data Center,Big Data,Internet of Things (IoT),Computation System,Machine Learning',
                  'estimated_time' => 'LoA 1-5 hari setelah payment',
                  'available_slots' => 'edisi tahun 2026 nya full',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Juni dan Desember',
                  'harga_jual_minimum_info' => '3000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Studi Ilmu Manajemen dan Organisasi',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://penerbitgoodwood.com/index.php/simo',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal Goodwood Proses dari submit artikel sampai dapat LoA dan terbit sekitar 2 bulan sesuai alur dan terbit edisi terdekat (mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'Financial Management,Marketing Management,Strategic Management,Human Resource Management,Business Management,Educational Management',
                  'estimated_time' => 'LoA setelah proses review dan revisi selesai. Jika mau LoA sementara dari jurnal nya bisa didapatkan jika sudah melewari screaning awal, revisi dari screaning awal dan melakukan pembayaran',
                  'available_slots' => 'Vol 7 No 3(2026) Terbit Oktober',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'April, Juli, Oktober dan Januari',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Akuntansi, Keuangan, dan Manajemen (Jakman)',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://penerbitgoodwood.com/index.php/Jakman',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal Goodwood Proses dari submit artikel sampai dapat LoA dan terbit sekitar 2 bulan sesuai alur dan terbit edisi terdekat (mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Human Resource Management,Operations Management,Financial Management,Strategic Management,Public Sector Management,Risk Management,Management Accounting,Public Sector Accounting,Social Accounting,Sharia Accounting,Taxation,Financial Accounting,Auditing,Banking',
                  'estimated_time' => 'LoA setelah proses review dan revisi selesai. Jika mau LoA sementara dari jurnal nya bisa didapatkan jika sudah melewari screaning awal, revisi dari screaning awal dan melakukan pembayaran',
                  'available_slots' => 'Vol. 7 No. 4 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Maret , Juni, September, dan Desember',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Teknik Industri : Jurnal Hasil Penelitian dan Karya Ilmiah dalam Bidang Teknik Industri',
                'hpp' => 6800000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.uin-suska.ac.id/index.php/jti/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Publish 1-2 minggu setelah payment | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'Work System and Ergonomic,Supply Chain and Logistic,Marketing and Financial,Sustainable Energy,Production Planning and Inventory Control Management,Modeling and Simulation System,Manufacturing facility Design,Management of Information Systems and Design,Optimization and mathematical modeling,Halal Supply Chain',
                  'estimated_time' => 'LoA 1-5 hari setelah payment',
                  'available_slots' => 'Vol 12. No 2 (2026) Terbit Desember',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Juni dan Desember',
                  'harga_jual_minimum_info' => '10200000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'JIMPS: Jurnal Ilmiah Pendidikan dan Sejarah (Scientific Journal of Education and History).',
                'hpp' => 7000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.yaydi.com/index.php/jimps',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'jurnal baru dan belum ada konfirmasi lanjutan dari jurnal nya',
                  'focus_scope' => 'Multidisiplin',
                  'estimated_time' => 'LoA 1-3 hari setelah payment k jurnal nya',
                  'available_slots' => '',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Februari, Mei, Agustus, Desember',
                  'harga_jual_minimum_info' => '10500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Educational Review, Law And Social Sciences (IJERLAS)',
                'hpp' => 7500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://radjapublika.com/index.php/IJERLAS/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Education: Instrument Development,Evaluation of Educational Programs,Education issues,Assessment in Education,Measurement in Education,Social Sciences: Management,Accounting,Economy,Human Resources,Political,Psychology,Communication,Field of Applied Social Sciences,Law: This journal features on the intersection of law and society,which includes law relating to political science,criminology,history,human rights,gender studies and political economy',
                  'estimated_time' => 'FT LoA, 1-5 hari setelah payment dan Publish Sesuai Edisi Terdekat',
                  'available_slots' => 'Vol 6 No 5 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Januari, Maret, Mei, Juli, September, November',
                  'harga_jual_minimum_info' => '11250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Invoice : Jurnal Ilmu Akuntansi',
                'hpp' => 5500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.unismuh.ac.id/index.php/invoice/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Edisi Maret Sudah full | Akreditasi/Masa Berlaku: 2025-2029',
                  'focus_scope' => 'Financial Accounting,Auditing,Islamic Financial Accounting,Cost Accounting,Management Accounting,Tax Accounting,International Accounting,Non,Profit Accounting,Budgeting Accounting,Government and Public Sector Accounting,Accounting Information Systems.',
                  'estimated_time' => 'LoA 7-14 hari setelah payment',
                  'available_slots' => 'edisi tahun 2026 full , open submission jika ingin terbit di Maret 2027',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Maret dan September',
                  'harga_jual_minimum_info' => '8250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Ilmiah Kesehatan Sandi Husada',
                'hpp' => 3500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.edi.or.id/index.php/jiksh',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Inpress terbit di Juli/Agustus dengan apc Rp. 4jt | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'Nursing,Public health,Public Health Nursing,Home care nursing,Midwifery,Medical Health,Health Policy Administration,and Pharmaceutical Nursing.',
                  'estimated_time' => 'FT Review, LoA 1-7 hari setelah payment',
                  'available_slots' => 'edisi tahun 2026 nya sudah full',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Juni dan Desember',
                  'harga_jual_minimum_info' => '5250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Indonesian Psychological Research',
                'hpp' => 2300000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnalfpk.uinsa.ac.id/index.php/IPR',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2023-2027',
                  'focus_scope' => 'Work and Organizational Psychology,Clinical Psychology,Educational Psychology,Developmental Psychology,and Social Psychology',
                  'estimated_time' => 'LoA 1-7 hari setelah payment, terbit sesuai edisi terdekat',
                  'available_slots' => 'sudah full untuk edisi 2026, edisi juli hanya menerima untuk penulis diluar pulau jawa',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Januari dan Juli',
                  'harga_jual_minimum_info' => '3450000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Al Qodiri : Jurnal Pendidikan, Sosial dan Keagamaan',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://al-qodiri.unikhams.ac.id/index.php/alqodiri/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Terbit inpress juni APC 6jt, terbit juli 5jt, terbit agustus 4,25jt (mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Education,Social,and Religious',
                  'estimated_time' => 'LoA 1-7 hari setelah payment, terbit sesuai jadwal',
                  'available_slots' => 'Vol. 24 No 2 (2026)',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => '(Januari-April), (Mei-Agustus), dan (September-Desember)',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Prima Edukasia',
                'hpp' => 4500000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://journal.uny.ac.id/index.php/jpe/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal nya tidak Pro Publisher Pembayaran Termin 1 : Terbit LoA Rp.2jt Pembayaran Termin 2 : Sebelum Publish Rp. 2,5jt sudah pengalaman 1 kali sampai publish ke jurnal ini | Akreditasi/Masa Berlaku: 2019-2028',
                  'focus_scope' => 'Education,Social,and Religious',
                  'estimated_time' => 'LoA 1-7 hari setelah payment, terbit sesuai jadwal',
                  'available_slots' => 'Vol. 14 No . 3 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Januari, Mei, dan September',
                  'harga_jual_minimum_info' => '6750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Nucleus Journal',
                'hpp' => 2300000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://ejournal.undar.or.id/index.php/Nucleus',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2023-2027',
                  'focus_scope' => 'Electrical and Electronics Engineering,Information and Communication Technology (ICT),Natural Sciences and Mathematics,Mechanical,Civil,and Industrial Engineering,Agricultural and Life Sciences,New Technologies and other Technologies',
                  'estimated_time' => 'LoA 1-7 hari setelah payment, terbit sesuai jadwal',
                  'available_slots' => 'Vol. 5 No 2 (2026) Terbit November',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Mei dan November',
                  'harga_jual_minimum_info' => '3450000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Archives of Medical Sciences and Public Health (IAMSPH)',
                'hpp' => 4000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://pcijournal.org/index.php/iamsph',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Public health,Clinical and medical sciences,Epidemiology,Health promotion and disease prevention,Health policy and management',
                  'estimated_time' => 'LoA 1-7 hari setelah payment, terbit sesuai jadwal',
                  'available_slots' => 'Vol. 7 No 2 (2026) Terbit November',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Mei dan November',
                  'harga_jual_minimum_info' => '6000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Reviu Akuntansi, Manajemen, dan Bisnis',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://penerbitgoodwood.com/index.php/rambis',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal Goodwood Proses dari submit artikel sampai dapat LoA dan terbit sekitar 2 bulan sesuai alur dan terbit edisi terdekat (mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2024-2029',
                  'focus_scope' => 'Accounting,Management,and Business',
                  'estimated_time' => 'LoA setelah proses review dan revisi selesai. Jika mau LoA sementara dari jurnal nya bisa didapatkan jika sudah melewari screaning awal, revisi dari screaning awal dan melakukan pembayaran',
                  'available_slots' => 'Vol. 5 No 5 (2026) Terbit Desember',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Maret, Juni dan Desember',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Annals of Human Resource Management Research (AHRMR)',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://goodwoodpub.com/index.php/ahrmr',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal Goodwood Proses dari submit artikel sampai dapat LoA dan terbit sekitar 2 bulan sesuai alur dan terbit edisi terdekat (mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2022-2027',
                  'focus_scope' => 'Human Resource Management,Strategic Human Resource Management,Talent Management,Performance Management,Employee Relations,Training and Development,Compensation and Benefits,Labor Relations,Organizational Behavior,Workforce Planning',
                  'estimated_time' => 'LoA setelah proses review dan revisi selesai. Jika mau LoA sementara dari jurnal nya bisa didapatkan jika sudah melewari screaning awal, revisi dari screaning awal dan melakukan pembayaran',
                  'available_slots' => 'Vol. 6 No 3 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Maret, Juni, September dan Desember.',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Annals of Management and Organization Research',
                'hpp' => 6000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://goodwoodpub.com/index.php/amor',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal Goodwood Proses dari submit artikel sampai dapat LoA dan terbit sekitar 2 bulan sesuai alur dan terbit edisi terdekat (mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Business,Management and Accounting Organizational,Behaviour Human Resource,Management Marketing,Management Strategy and Management Financial,Management Business and International,Management Communication Management',
                  'estimated_time' => 'LoA setelah proses review dan revisi selesai. Jika mau LoA sementara dari jurnal nya bisa didapatkan jika sudah melewari screaning awal, revisi dari screaning awal dan melakukan pembayaran',
                  'available_slots' => 'Vol. 8 No 2 (2026) Terbit November',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Agustus, November, Februari, dan Mei',
                  'harga_jual_minimum_info' => '9000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'JPPI (Jurnal Penelitian Pendidikan Indonesia)',
                'hpp' => 5000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.iicet.org/index.php/jppi',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2020-2029',
                  'focus_scope' => 'Education,Economics and Management,Law and Public Policy,Social Sciences,Humanities',
                  'estimated_time' => 'LoA 2x24 jam setelah payment (Jam Operasioanl Kerja )',
                  'available_slots' => 'Vol. 12 No 3 (2026) Terbit September',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Februari, Juni, September dan December',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Manajemen Industri dan Logistik (JMIL)',
                'hpp' => 8000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jurnal.poltekapp.ac.id/index.php/JMIL/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(mengetahui kita publisher) | Akreditasi/Masa Berlaku: 2023-2028',
                  'focus_scope' => 'Logistics Management,Industrial Marketing,and International Trade',
                  'estimated_time' => 'LoA maks 3x24 jam setelah payment (Jam Operasioanl Kerja )',
                  'available_slots' => 'Vol. 10 No 2 (2026) Terbit November',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Mei dan November',
                  'harga_jual_minimum_info' => '12000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Glosains: Jurnal Sains Global Indonesia',
                'hpp' => 10000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://glosains.staiku.ac.id/index.php/Glosains/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(mengetahui kita publisher) JURNAL SYNTAX | Akreditasi/Masa Berlaku: 2025-2030',
                  'focus_scope' => 'Education and Learning Innovation,Psychology and Human Development,Health Sciences and Public Health,Law,Governance,and Public Policy,Religion,Ethics,and Social Studies',
                  'estimated_time' => 'LoA 1-7 hari setelah payment ke Jurnalnya',
                  'available_slots' => 'Vol. 7 No 5 (2026) Terbit Oktober',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Bi Monthly (terbit 2 bulan sekali) Februari, April, Juni, Agustus, Oktober, Desember',
                  'harga_jual_minimum_info' => '15000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Law and Social Politics/JLSP',
                'hpp' => 10000000.00,
                'status_note' => 'SINTA 2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://jolastic.id/index.php/jlsp/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(mengetahui kita publisher) JURNAL SYNTAX | Akreditasi/Masa Berlaku: 2024-2028',
                  'focus_scope' => 'Human Rights and Minority Protection,Law,and Social Inequality,Law,Criminal Law,Policy,and Governance,Constitutional Law and Social Change',
                  'estimated_time' => 'LoA 1-7 hari setelah payment ke Jurnalnya',
                  'available_slots' => 'Vol. 4 No 5 (2026) Terbit Oktober',
                  'accreditation_type' => 'Sinta 2',
                  'publication_months' => 'Bi Monthly (terbit 2 bulan sekali) Februari, April, Juni, Agustus, Oktober, Desember',
                  'harga_jual_minimum_info' => '15000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Education and Learning',
                'hpp' => 910.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101162692',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101162692&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://edulearn.intelektual.org/index.php/EduLearn/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'APC: - 455 USD ( maksimal 8 page) kalau lebih ada charge 50 USD per page untuk artikel kolaborasi atau bukan penulis tunggal -910 USD (maksimal 8 page) jika lebih ada charge 100 USD per page untuk artikel dengan penulis tunggal | Akreditasi/Masa Berlaku: 2023 - 2026',
                  'focus_scope' => 'Career development and training in education and learning,Experiences in education and learning,Experiences in education and learning research,International projects in education and learning,Pedagogical innovations in education and learning,General issues in education and learning,Computer supported collaborative work,E,content management and development,Educational software & serious games,E,Learning,Emerging technologies in education',
                  'estimated_time' => 'Proses penjadwalan publikasi tergantung pada: - Urutan antrean naskah, - Kualitas dan kelengkapan artikel, - Kelancaran proses review, serta - Keputusan akhir dari editor Berdasarkan pengalaman di naskah yang pernah diterbitkan di jurnal ini dari submit - selesai revisi: 8 bulan-1 tahun dan dari accepted-publish : 1 bulan',
                  'available_slots' => 'Vol 21 No 2 (2027) Terbit Mei',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => 'Februari, Mei, Agustus, November',
                  'harga_jual_minimum_info' => '1365',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Research Journal of Multidisciplinary Scope (IRJMS)',
                'hpp' => 1250.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101184716#tabs=2',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101184716&tip=sid&exact=no',
                      'label' => 'Scimago',
                    ),
                  ),
                  'notes' => 'Submit- Accepted : 4-6 bulan LoA Tidak bisa dipastikan (Sesuai Alur) 1250 USD ( kalau ultrafastrack) dan jika fasttrack biasa 650 USD | Akreditasi/Masa Berlaku: 2020-2026',
                  'focus_scope' => 'Multidisiplin,medical science,engineering,pharmacy,nursing,biology,physical science,chemical science,arts,social sciences,humanities,and robotics',
                  'estimated_time' => 'Fasttrack: -Fisrt Decision: 4-6 bulan, Final Decision (Accept/Reject): 20-30 hari, Proofreading: 1 bulan, Terbit Sesuai edisi terdekat Ultrafasttrack: -First Decision: < 3 bulan, Final Decision (Accept/Reject): <15 hari, Proofreading: 14- 21 hari, Terbit Sesuai edisi terdekat',
                  'available_slots' => 'Vol 7 No 4 (2026) jika ultra fasttrack & Vol 8 No 1 (2027) jika fasttrack biasa',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => 'Januari, April, Juli, Oktober',
                  'harga_jual_minimum_info' => '1875',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal on Stereo and Immersive Media',
                'hpp' => 120.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101133328',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101133328&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://revistas.ulusofona.pt/index.php/stereo/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Pengiriman naskah lengkap untuk Edisi No.10 ditutup pada 1 Juli. Jadi kemungkinan kalau submit di Bulan Juli 2026 dst pasti akan masuk ke terbitan tahun depan . Jurnal ini belum pernah ada penulis dari Indonesia | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Arts and Humanities and Social Sciences: Comunication',
                  'estimated_time' => 'Sesuai Alur Jurnal tidak bisa dipastikan kapan review , LoA dan Publish.',
                  'available_slots' => 'Vol 11 No 1 (2027)',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => 'Februari dan Desember',
                  'harga_jual_minimum_info' => '180',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Applied Bioanalysis',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101122745',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101122745&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journalofappliedbioanalysis.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'jurnal ini discontinue di scopus | Akreditasi/Masa Berlaku: 2019-2025',
                  'focus_scope' => 'Biokimia,Kimia,Ilmu Kesehatan,Ilmu Sosial',
                  'estimated_time' => 'Review awal 1-3 minggu',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Amerta Nutrition',
                'hpp' => 4500000.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101201215',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101201215&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://e-journal.unair.ac.id/AMNT',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Ada kenaikan biaya publikasi menjadi 300 USD atau Rp. 4.500.000 | Akreditasi/Masa Berlaku: 2023-2025',
                  'focus_scope' => 'Public Health Nutrition,Community Nutrition,Clinical Nutrition,Dietetics,Food and Nutrition,Food Service Management',
                  'estimated_time' => 'Review sampai accepted 8-12 bulan. Tidak ada fasttrack jurnal diproses sesuai alur',
                  'available_slots' => 'Vol 11 No 3 (2027)',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => 'March, June, September, and December',
                  'harga_jual_minimum_info' => '6750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Egyptian Journal of Community Medicine',
                'hpp' => 5210400.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101149321',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101149321&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ejcm.journals.ekb.eg/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2020-2025',
                  'focus_scope' => 'Epidemiology,Health Policy,Infectious Diseases,Psychiatry and Mental Health,Public Health Environmental and Occupational Health.',
                  'estimated_time' => 'Proses review 8-10 minggu, abstrak muncul di in press section 10-12 minggu (muncul DOI). Sampai publish 6-8 bulan.',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => '4 edisi pertahun',
                  'harga_jual_minimum_info' => '7815600',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Pakistan Armed Forces Medical Journal',
                'hpp' => 2500992.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101064803',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101064803&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.pafmj.org/PAFMJ/about',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019- 2025',
                  'focus_scope' => 'Health Professions Medicine Public Health,Environmental and Occupational Health',
                  'estimated_time' => 'Payment harus dibayar oleh penulis . Scopus Content Coverage nya sudah sampai 2026',
                  'available_slots' => 'Sesuai edisi terdekat',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => '(Jan-Feb), (Mar-Apr), (Mei-Jun),(Juli,-Agt),(Sept-Okt) dan (Nov-Des)',
                  'harga_jual_minimum_info' => '3751488',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Veredas do Direito',
                'hpp' => 16650000.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100845376',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100845376&tip=sid&exact=no',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://revista.domhelder.edu.br/index.php/veredas/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Tidak Semua Artikel yang Publish di Veredas Sitasi ke Scopus, jadi kalau authornya butuh Scopus ID jangan di Veredas | Akreditasi/Masa Berlaku: 2017-2025',
                  'focus_scope' => 'Environmental Science: Management,Monitoring,Policy and Law Social Sciences: Law',
                  'estimated_time' => 'first decision : 5 hari Review : 5 hari Publish: Setelah dinyatakan Accepted dan payment dalam 7 hari',
                  'available_slots' => '-',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => '5x setahun',
                  'harga_jual_minimum_info' => '24975000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Review of Management and Marketing (IRMM)',
                'hpp' => 18549024.00,
                'status_note' => 'SCOPUS Q4',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100408192',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100408192&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://econjournals.com/index.php/irmm/publicationethics',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2017-2025',
                  'focus_scope' => 'Business,Management and Accounting',
                  'estimated_time' => 'First decision : 4-12 minggu',
                  'available_slots' => '-',
                  'accreditation_type' => 'Scopus Q4',
                  'publication_months' => 'January, March, May, July, September, November',
                  'harga_jual_minimum_info' => '27823536',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Cogent Business and Management',
                'hpp' => 46621800.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100855822',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100855822&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.tandfonline.com/toc/oabm20/current',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2014 - 2026',
                  'focus_scope' => 'Accounting,Business and International Management,Business,Management and Accounting (miscellaneous),Marketing,Organizational Behavior and Human Resource Management,Strategy and Management',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '69932700',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Evaluation and Research in Education',
                'hpp' => 14148000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100934092',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100934092&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ijere.iaescore.com/index.php/IJERE',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Biaya Publikasi 455 USD maksimal 8 halaman untuk penulis kolaborasi. Jika halaman lebih dari 8 maka ada charge 50 USD per page. Biaya Publikasi 910 USD maksimal 8 halaman untuk penulis tunggal. Jika halaman lebih dari 8 maka ada charge 100 USD per page | Akreditasi/Masa Berlaku: 2021 - 2025',
                  'focus_scope' => 'Education',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Februari, April, Juni, Agustus, Oktober, and Desember',
                  'harga_jual_minimum_info' => '21222000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Qubahan Academic Journal',
                'hpp' => 52500000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101173094',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101173094&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journal.qubahan.com/index.php/qaj',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'jurnal ini naik jadi Q1 Fasttrack Review | Akreditasi/Masa Berlaku: 2021 - 2025',
                  'focus_scope' => 'Business,Management and Accounting Business,Management and Accounting (miscellaneous) Computer Science Artificial Intelligence Computational Theory and Mathematics Social Sciences Education',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Januari, April, Juli, Agustus',
                  'harga_jual_minimum_info' => '78750000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Munaddhomah',
                'hpp' => 17000000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101257043',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101257043&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://pasca.jurnalikhac.ac.id/index.php/munaddhomah/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2020 - 2026',
                  'focus_scope' => 'Pendidikan Islam,Pendidikan,Filsafat Islam,Sejarah Islam,Budaya Islam',
                  'estimated_time' => 'Submit- Publish : 6-12 bulan & Ft LoA',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Januari, April, Juli, dan Oktober',
                  'harga_jual_minimum_info' => '25500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Lex Scientia Law Review',
                'hpp' => 7500000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101097254',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101097254&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journal.unnes.ac.id/journals/lslr',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Tidak menyediakan LoA dan jika artikel sudah publish maka riwayat di ojs nya hilang jadi harus di pantau dan di screenshoot tiap tahapan nya | Akreditasi/Masa Berlaku: 2017 - 2025',
                  'focus_scope' => 'Hukum,technology and law,emerging human rights challenges,environmental law dynamics,corporate governance nuances,and the ongoing reforms in criminal justice systems',
                  'estimated_time' => 'Submit- Ada Review : 6 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Mei dan November',
                  'harga_jual_minimum_info' => '11250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'South African Journal of Economic and Management Sciences',
                'hpp' => 1877040.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/15900154750',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=15900154750&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://sajems.org/index.php/sajems',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'orchid id penulis harus update/aktif, harus melampirkan ethical clearence dalam bahasa inggris dari kampus, dan belum pernah ada yang sampai publish Proses dari submit nya banyak tahapan dan terkesan buang waktu karena jurnal sangat selektif dan ujungnya decline | Akreditasi/Masa Berlaku: 1998-2025 (tapi scopus content coverage nya sudah sampai 2026)',
                  'focus_scope' => 'Ekonomi & Manajemen,accounting,economics,finance,future studies,human capital,management,marketing',
                  'estimated_time' => 'First Decision (Uji Kesesuaian Scope) : 14 hari Review : 6 bulan- 1 tahun LoA Tidak bisa dipastikan (Sesuai Alur)',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'continuous',
                  'harga_jual_minimum_info' => '2815560',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'IAES International Journal of Artificial Intelligence',
                'hpp' => 9282000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100901206',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100901206&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ijai.iaescore.com/index.php/IJAI/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2018- 2025',
                  'focus_scope' => 'Sistem Informasi (AI),Neural networks...',
                  'estimated_time' => 'Review : 2-4 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'February, April, June, August, October, and December',
                  'harga_jual_minimum_info' => '13923000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Educational Process: International Journal (EDUPIJ)',
                'hpp' => 30960000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101041842',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101041842&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.edupij.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Fasttrack Review coverage discontinued in Scopus',
                  'focus_scope' => 'Educational technology,Educational psychology...',
                  'estimated_time' => 'Review : 5-7 minggu Terbit 8-12 minggu',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => '',
                  'harga_jual_minimum_info' => '46440000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Trends in Sciences / TiS',
                'hpp' => 10200000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101068817',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://tis.wu.ac.th/tishome/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Fasttrack Review | Akreditasi/Masa Berlaku: 2021 - 2026',
                  'focus_scope' => 'Multidisciplin (Science),Biological Sciences and Medicine Physical Sciences,Applied Sciences',
                  'estimated_time' => 'First Decision : 2 hari Review : 1 bulan LoA : 2 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '15300000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Cakrawala Pendidikan',
                'hpp' => 14280000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100888509',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100888509&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journal.uny.ac.id/index.php/cp',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'masih di Q2 di cek per 21/4/2026 | Akreditasi/Masa Berlaku: 2018 - 2025',
                  'focus_scope' => 'Pendidikan',
                  'estimated_time' => 'belum pernah ada artikel yang sampai dapat review.',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'February, June, & October',
                  'harga_jual_minimum_info' => '21420000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Asian Journal of University Education',
                'hpp' => 5179200.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100942342',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100942342&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://education.uitm.edu.my/ajue/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019-2025',
                  'focus_scope' => 'Pendidikan',
                  'estimated_time' => 'submission harus menunggu call for paper',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Januari, April, Juli, & Oktober',
                  'harga_jual_minimum_info' => '7768800',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Pendidikan Agama Islam',
                'hpp' => 5000000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101214763',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101214763&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ejournal.uin-suka.ac.id/tarbiyah/jpai',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '(naik ke Q1) | Akreditasi/Masa Berlaku: 2019-2025',
                  'focus_scope' => 'Pendidikan Agama Islam',
                  'estimated_time' => 'Tidak bisa dipastikan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Juni dan Desember',
                  'harga_jual_minimum_info' => '7500000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Curriculum Studies Research',
                'hpp' => 38760000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101155951',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101155951&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://curriculumstudies.org/index.php/CS',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019-2025',
                  'focus_scope' => 'Pendidikan',
                  'estimated_time' => 'Review 2-3 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => '2 edisi pertahun (tidak ada jadwal bulan terbit reguler)',
                  'harga_jual_minimum_info' => '58140000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Indonesian Journal of Applied Linguistics',
                'hpp' => 7350000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100368214',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100368214&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ijal.upi.edu/index.php/ijal',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'jurnal naik jadi Q1 | Akreditasi/Masa Berlaku: 2021-2025',
                  'focus_scope' => 'Social Sciences: Linguistics and Language',
                  'estimated_time' => 'Tidak bisa dipastikan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Januari, Mei dan September',
                  'harga_jual_minimum_info' => '9555000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Cybernetics and Information Technologies',
                'hpp' => 17280000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100199814',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100199814&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://cit.iict.bas.bg/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2011-2025',
                  'focus_scope' => 'Computer Science (miscellaneous)',
                  'estimated_time' => 'Kalau artikel diterima dengan review positif bisa diterbitkan di edisi terdekat (dengan syarat: artikel disubmit maksimal 1 bulan sebelum edisi yang dituju). Kalau tidak memenuhi syarat artikel akan diterbitkan dalam jangka waktu 6 bulan.',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Maret, Juni, September, dan Desember',
                  'harga_jual_minimum_info' => '25920000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Industrial Engineering and Management',
                'hpp' => 11880000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/19700188349',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=19700188349&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.jiem.org/index.php/jiem/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2008-2025',
                  'focus_scope' => 'Business,Management and Accounting:Strategy and Management,Engineering: Industrial and Manufacturing Engineering',
                  'estimated_time' => 'Initial Review 2-4 bulan dan LoA diberikan 1-2 minggu jika sudah accepted dan pembayaran',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => '',
                  'harga_jual_minimum_info' => '17820000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jambura Law Review',
                'hpp' => 7500000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101209166',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101209166&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ejurnal.ung.ac.id/index.php/jalrev',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai kelayakan artikel | Akreditasi/Masa Berlaku: 2020-2025',
                  'focus_scope' => 'Hukum',
                  'estimated_time' => 'Tidak bisa dipastikan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Januari dan Juli',
                  'harga_jual_minimum_info' => '11250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Karbala International Journal of Modern Science',
                'hpp' => 6120000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100897136#tabs=0',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100897136&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://kijoms.uokerbala.edu.iq/home/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2015-2026',
                  'focus_scope' => 'Multidisiplin',
                  'estimated_time' => 'Submit - Proses Review 2-4 bulan Diterima- Publish : 1-2 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Februari, Mei, Agustus, dan November',
                  'harga_jual_minimum_info' => '9180000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Media Hukum',
                'hpp' => 7500000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101179113',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101179113&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journal.umy.ac.id/index.php/jmh/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai alur | Akreditasi/Masa Berlaku: 2019-2026',
                  'focus_scope' => 'Hukum',
                  'estimated_time' => 'Tidak bisa dipastikan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Juni dan Desember',
                  'harga_jual_minimum_info' => '11250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Ecologies',
                'hpp' => 31680000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101175797',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101175797&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.mdpi.com/journal/ecologies',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Tidak ada FT | Akreditasi/Masa Berlaku: 2022-2025',
                  'focus_scope' => 'Ecology,Ecology,Evolution,Behavior and Systematics,Biochemistry,Genetics and Molecular Biology (miscellaneous)',
                  'estimated_time' => 'Rata-rata (perkiraan) proses publikasi 6-10 minggu',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Maret, Juni, September, dan Desember',
                  'harga_jual_minimum_info' => '47520000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Advanced Journal of Chemistry, Section A',
                'hpp' => 17136000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101172929',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101172929&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.ajchem-a.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019-2026',
                  'focus_scope' => 'Chemical Engineering (miscellaneous) Physical and Theoretical Chemistry',
                  'estimated_time' => 'FT Review 30-40 hari, publish 2-4 minggu setelah payment',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '25704000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Multidisciplinary Applied Natural Science',
                'hpp' => 6120000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101147602',
                      'label' => 'Scopus',
                    ),
                  ),
                  'notes' => 'Naik ke Q1, apc berubah | Akreditasi/Masa Berlaku: 2021-2025',
                  'focus_scope' => 'Multidisiplin',
                  'estimated_time' => 'Terbit online 1-3 minggu setelah accepted dalam bentuk in press, akan masuk issue secara bertahap',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'Januari, Mei, dan September',
                  'harga_jual_minimum_info' => '12240000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'TEM Journal',
                'hpp' => 28800000.00,
                'status_note' => 'SCOPUS Q2',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100831441',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100831441&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.tem-journal.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Submit- Peer Review (Uji Kesesuaian Scope): 2 minggu , pengalaman sebelumnya ada yg accepted itu dari november 2025 submit nya, revisi 1 kali tapi dijadwalkan publish di november 2026 | Akreditasi/Masa Berlaku: 2017 - 2025',
                  'focus_scope' => 'Business,Management and Accounting Computer Science Information Systems and Management Education',
                  'estimated_time' => 'Submit- Diterima: 4-8 bulan (tergantung revisi artikel) Diterima- Publish: 1 tahun (tergantung edisi terdekat)',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q2',
                  'publication_months' => 'February, May, August, November',
                  'harga_jual_minimum_info' => '43200000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Al Risalah: Forum Kajian Hukum dan Sosial Kemasyarakatan',
                'hpp' => 20000000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101206093',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101206093&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://shariajournals-uinjambi.ac.id/index.php/al-risalah',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Hukum Islam',
                  'estimated_time' => 'Sesuai Kualitas & Kebaruan Topik Naskah Uji Kelayakan ( Screaning Awal: 14-20 hari ) Sedang Ada Naskah yang diproses',
                  'available_slots' => 'Close Submission (Karena Masih ada Naskah yang sedang di proses)',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Juni dan Desember',
                  'harga_jual_minimum_info' => '30000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Pendidikan Islam (JPI)',
                'hpp' => 15750000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101105751',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101105751&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journal.uinsgd.ac.id/index.php/jpi',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Harus kirim naskah nya ke email jurnal nya untuk cek pre submission (kesesuaian naskah) belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Pendidikan Islam',
                  'estimated_time' => 'Sesuai Kualitas & Kebaruan Topik Naskah',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '23625000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Global Health Action',
                'hpp' => 83790000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/17500154705',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=17500154705&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.tandfonline.com/journals/zgha20',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2008- 2025',
                  'focus_scope' => 'Kesehatan,Kebijakan Kesehatan,Kesehatan Lingkungan,Kesehatan Masyarakat',
                  'estimated_time' => 'first decision : 17 hari review decision : 2-3 bulan LoA : 5-6 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '125685000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Qualitative Health Research',
                'hpp' => 92400000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/17712',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=17712&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journals.sagepub.com/home/qhr',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 1991- 2026',
                  'focus_scope' => 'Kesehatan,Kebijakan Kesehatan,Kesehatan Lingkungan,Kesehatan Masyarakat,Kesehatan Kerja',
                  'estimated_time' => 'first decision : 23 hari review decision : 2-3 bulan LoA : 4-6 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '138600000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Global Health Research and Policy',
                'hpp' => 39690000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101041403',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101041403&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ghrp.biomedcentral.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2016- 2025',
                  'focus_scope' => 'Kesehatan,Sosial Sains,Kebijakan Kesehatan,Kesehatan Lingkungan,Kesehatan Masyarakat,Epidemiologi',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '59535000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Global Health Journal',
                'hpp' => 29190000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101082052',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101082052&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.keaipublishing.com/en/journals/global-health-journal/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2017 - 2025',
                  'focus_scope' => 'Kesehatan,Epidemiology,Public health,Global health,governance and health assistance,Health system and policy,Health economics,Global health practice,Human resource in health,Population health,Environmental health,Ageing and health care,Maternal and child health,Global health education,Rehabilitation and health Intelligent medicine,Medicines and vaccines,Non,communicable diseases,Mental health,Nutrition and food security,Substance abuse and tobacco control',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '43785000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'SIELE (Studies in English Language and Education)',
                'hpp' => 7000000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101019622',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101019622&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://jurnal.usk.ac.id/SiELE',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Teaching and Learning of English Linguistics Literature',
                  'estimated_time' => 'first decision : 1 bulan review decision : 3-6 bulan LoA : 6-7 bulan Terbit : 9 bulan/ lebih tergantung kualitas naskah',
                  'available_slots' => 'Sedang Close Submission',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'January, May, and September',
                  'harga_jual_minimum_info' => '40000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Heliyon',
                'hpp' => 47670000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100411756',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100411756&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.cell.com/heliyon/home',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2015 - 2026',
                  'focus_scope' => 'Multidisiplin,physical,applied,life,social and medical sciences',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '71505000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Ianna Journal of Interdisciplinary Studies',
                'hpp' => 42000000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101171778',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101171778&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://iannajournalofinterdisciplinarystudies.com/index.php/1/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Multidisiplin sosial,communication,psychology,sociology,management,and economy.',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '63000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Ikenga',
                'hpp' => 3150000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101048550',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101048550&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.ikengajournal.com.ng/apc.php',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Sosial Humaniora,Arts and Humanities,Archeology (arts and humanities),Philosophy,Religious Studies',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '40000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Pharos Journal of Theology',
                'hpp' => 10080000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101073951',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101073951&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.pharosjot.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Sesuai Kualitas & Kebaruan Topik Naskah. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Teologi,Agama,History and philosophy of religious,Inter,faith harmony,Abrahamic religions (Christianity,Islam,Judaism),Systematic Theology,Christian Ethics,Biblical Studies,Church History,New Testament,Old Testament,Pastoral Theology,Religious Education,Propagating faith through Artificial Intelligence,Biblical and Christian Archaeology,Pilgrimage and Religious Tourism,Education and Religion,Liturgics and Spiritual Practice,Eco Theology,Missiology/Gospel and Culture,Comparative Religion and Inter,Faith Studies,Psychology and Faith,Ethnic religions,beliefs associated with particular ethnic groups,Liturgics,Theolinguistic Research in World Religious Studies,Religion and the use of Art,African Traditional Religion (ATR),African Instituted Churches (AIC),Indigenous Religions,Pneumatology,Gospel and Culture,and Comparative Religious Studies,Jewish Studies,Hinduism,Islam,Buddhism,Esotericism,Post,Secular Spirituality,Law and Theology,Politics and Theology,The scriptures of Islam,Qur\'an and the hadiths,Religion and Socio,Cultural Identity,Religion and AI,Religious Consciousness.',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Yearly (Ngga ada bulan spesifik)',
                  'harga_jual_minimum_info' => '40000000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Jurnal Ilmiah Peuradeun',
                'hpp' => 14700000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101176849',
                      'label' => 'Scopus',
                    ),
                  ),
                  'notes' => 'Close Submission. Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Education,Politics,Law,Economic,Humanities and Cultural Studies',
                  'estimated_time' => 'Review 2-4 bulan Submit-Publish: 7 bulan - 1 tahun (Rata rata 6 bulan )',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Januari, Mei, dan September',
                  'harga_jual_minimum_info' => '22050000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Multidisciplinary Applied Natural Science (JMANS)',
                'hpp' => 18900000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101147602#tabs=0',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101147602&tip=sid&exact=no',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journal.pandawainstitute.com/index.php/jmans/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'biaya submission ( fasttrack review) : 300 USD dan pada saat akan terbit : 600 USD . Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2021 - 2025',
                  'focus_scope' => 'Multidisciplin (Science),Biological and Environmental Sciences: Zoology,Ecology,Plant Science,Microbiology,Agricultural Science,Environmental Science,Biomolecular Science,Medical and Health Science,Forestry,Chemical and Material Sciences: Inorganic Chemistry,Organic Chemistry,Analytical Chemistry,Electrochemistry,Physical Chemistry,Computational Chemistry,Catalyst,Ceramics and Composite,Nanoscience and Nanotechnology,Electronic,Optical and Magnetic materials,Polymers and Plastics,Physical Science: Dielectrics,Ferroelectrics,and Multiferroics,Optics,Condensed Matter Physics,Instrumentation,Devices and Sensors,Soft matter,Fluids,and Biophysics,Thin Films,Interfaces,and Surfaces,Quantum science and technology,Artificial intelligence,machine learning,Nonlinear physics,complex system,pattern formation,econophysics,and sociophysics,Mathematical Science: Applied Statistics,Mathematical Economy,Mathematical Biology,Mathematical Chemistry,Mathematical Physics,Experimental Mathematics.',
                  'estimated_time' => 'Terbit 3,5 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'January, May, and September',
                  'harga_jual_minimum_info' => '28350000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Nazhruna: Jurnal Pendidikan Islam',
                'hpp' => 15750000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101185196',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101185196&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://nazhruna.uacmjk.ac.id/index.php/nzh/issue/view/5',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2023 - 2026',
                  'focus_scope' => 'Pendidikan Islam',
                  'estimated_time' => 'Submit - Review : 5 bulan Revisi-Diterima: 3 bulan (hanya estimasi dari riwayat naskah orang lain yang pernah submit di jurnal ini bisa lebih cepat dan lambat tergantung kualitas artikel)',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Februari, Juni, dan Oktober',
                  'harga_jual_minimum_info' => '23625000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Cultura. International Journal of Philosophy of Culture and Axiology',
                'hpp' => 25200000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/19700182214',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=19700182214&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://culturajournal.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Belum pernah ada yang sampai dapat review apalagi publish | Akreditasi/Masa Berlaku: 2009-2026',
                  'focus_scope' => 'Philosophy,Cultural Studies',
                  'estimated_time' => '(estimasi) Initial screening : 1-7 hari Peer review : 1 bulan Publikasi : 1 bulan setelah acceptance',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'beberapa terbitan edisi (regular dan spesial) di tahun-tahun sebelumnya',
                  'harga_jual_minimum_info' => '37800000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Machine Learning and Knowledge Extraction',
                'hpp' => 48492000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101109601',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101109601&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.mdpi.com/journal/make',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019-2026',
                  'focus_scope' => 'Engineering (miscellaneous)',
                  'estimated_time' => '1) Screening Awal : 2–5 days setelah submission 2)Review keputusan awal: Sekitar 20–30 hari , tergantung reviewer 3) Deadline Revisi: 10 hari untuk revisi mayor dan 5 hari untuk minor revisi. 4) Revisi setelah 2 kali version review: around 3~5 days',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '72738000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Lexikos',
                'hpp' => 9030000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/16100154756',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=16100154756&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://lexikos.journals.ac.za/pub',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2002-2025',
                  'focus_scope' => 'Social Sciences: Linguistic and Language',
                  'estimated_time' => 'Menyediakan LoA jika artikel diterima untuk publish',
                  'available_slots' => 'Publish 2027 (jika submit sebelum april)',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Oktober / November',
                  'harga_jual_minimum_info' => '15351000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Scientific Culture',
                'hpp' => 42660000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101061822#tabs=2',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101061822&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://sci-cult.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jika reguler GBP 1200, dengan proses review pertama sekitar 4 minggu | Akreditasi/Masa Berlaku: 2019-2026',
                  'focus_scope' => 'Archeology,Archeology (arts and humanities),Conservation,History',
                  'estimated_time' => 'Fasttrack Review : 1 minggu, LoA : ditberikan jika sudah bayar APC, Terbit : 2 minggu setelah naskah dinyatakan accepted dan melunasi biaya publikasi',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Desember, Februari, dan Januari',
                  'harga_jual_minimum_info' => '63990000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'APTISI Transactions on Technopreneurship',
                'hpp' => 31500000.00,
                'status_note' => 'SCOPUS Q1',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101196736',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101196736&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://att.aptisi.or.id/index.php/att',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Saat ini sudah ada naskah yang sudah akan terbit (masiih revisi) dan akan publish di jurnal APTISI tinggal menunggu publish di Juli | Akreditasi/Masa Berlaku: 2001-2026',
                  'focus_scope' => 'Business,Management and Accounting,Computer Science',
                  'estimated_time' => 'Submit- Review pertama: 2-3 bulan tergantung artikel',
                  'available_slots' => '-',
                  'accreditation_type' => 'Scopus Q1',
                  'publication_months' => 'Maret, Juli dan November',
                  'harga_jual_minimum_info' => '47250000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Scientific Contributions Oil and Gas (SCOG)',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101144419',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101144419&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journal.lemigas.esdm.go.id/index.php/SCOG/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'LoA Setelah Accepted reviewer dan payment | Akreditasi/Masa Berlaku: 2019-2025',
                  'focus_scope' => 'pengembangan rekayasa teknologi dan pengujian laboratorium di bidang minyak dan gas',
                  'estimated_time' => 'Initial Review (Uji Kesesuaian Scope) : 1-5 hari Revisi sampai artikel dinyatakan layak submit < 1 bulan Revisi- Publish : sesuai edisi terdekat',
                  'available_slots' => 'Vol.49 No 1 (2026)',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'April, Agustus, dan Desember',
                  'harga_jual_minimum_info' => '5950000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Quality - Access to Success',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/17700156709',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=17700156709&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.calitatea.ro/EN/DefaultCalitatea.aspx',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2009-2026',
                  'focus_scope' => 'Business,Management and Accounting Business and International Management Management Information Systems Strategy and Management',
                  'estimated_time' => 'Review 1 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Januari, Maret, Mei, Juli, September, dan November',
                  'harga_jual_minimum_info' => '28560000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Learning, Teaching and Educational Research',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100897703',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100897703&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ijlter.org/index.php/ijlter/announcement',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => '- Batas Submit Artikel: 25 Maret 2026 -Pemberitahuan Artikel Diterima :30 April 2026 -Deadline submit revisi : 15 Mei 2026 - Online Publication di edisi Mei 2026 : 30 Juni 2026 | Akreditasi/Masa Berlaku: 2018 - 2025 (tapi scopus content coverage nya sudah sampai 2026)',
                  'focus_scope' => 'International Journal of Learning,Teaching and Educational Research',
                  'estimated_time' => 'Submit - Diterima : 2- 4 bulan (tergantung revisi artikel) Accepted- Publish : 1 bulan',
                  'available_slots' => 'Edisi Juni Vol. 25 No 6 (2026)',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '55488000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Advances in Science and Technology Research Journal',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101070987',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101070987&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.astrj.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019 - 2026',
                  'focus_scope' => 'Ilmu Komputer,Teknik,Ilmu Lingkungan',
                  'estimated_time' => 'Submit- Diterima: 2-5 bulan (tergantung revisi artikel) Diterima - Publish : 1 bulan LoA diberikan jika sudah accepted',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '18360000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Southeast Asian Journal of Economics (SAJE)',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100931378',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100931378&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Business,Management and Accounting Economic and Finance',
                  'estimated_time' => 'Review 1 bulan LoA 1-3 bulan Terbit sesuai edisi terdekat',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'April, Agustus dan Desember',
                  'harga_jual_minimum_info' => '24480000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Edelweiss Applied Science and Technology',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101018315',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101018315&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://learning-gate.com/index.php/2576-8484',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'turun ke Q4 | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Multidisiplin,Applied Sciences: Research in areas like biotechnology,environmental sciences,chemistry,and physics,with a focus on technological advancements that can be applied to real,world problems. Applied Social Sciences: The journal also highlights the intersection of science and society... Engineering and Technology... Interdisciplinary Research...',
                  'estimated_time' => 'Review 1-2 minggu LoA 1-2 minggu Terbit beberapa hari setelah payment',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '45174168',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Pure and Applied Microbiology (JPAM)',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/11700154322',
                      'label' => 'Scopus',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2007-2025',
                  'focus_scope' => 'Bioteknologi dan Mikrobiologi,Microbiology Medical Microbiology Bacteriology Pharmaceutical Microbiology Mycology Industrial Microbiology Protozoology Public Health Microbiology Phycology Microbial Biotechnology Parasitology Food Microbiology Immunology Agriculture Microbiology Virology Plant Microbiology Nematology Plant Pathology Microbial Cytology Soil Microbiology Microbial Physiology Veterinary Microbiology Microbial Ecology Environmental Microbiology Microbial Genetics Microbial Ecology Molecular Biology Geomicrobiology Cellular Microbiology Microbial Biodegradation Microbial Taxonomy Water Microbiology Generation Microbiology Biotechnology Systems Microbiology Viruses Molecular Microbiology Enzymology and Protein Engineering Microbial Biochemistry Evolutionary and Genomic Microbiology',
                  'estimated_time' => 'Review 8-12 minggu LoA 13 minggu Terbit sesuai edisi terdekat',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Maret, Juni, September, dan Desember',
                  'harga_jual_minimum_info' => '30345000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Electrical and Electronic Engineering and Telecommunications (IJEETC)',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100838789',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100838789&tip=sid&exact=no',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.ijeetc.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2017 - 2025',
                  'focus_scope' => 'Electrical engineering,Electronics,Telecommunications,Electrical Systems and Engineering Advanced Power System Approaches New Energy Technology Renewable Energy Electricity Market and Energy Strategy Electronics Fundamentals and Methods Functional Circuits and Systems RF and Electromagnetic Systems Photonic and Optoelectronic Techniques Signal Processing and Its Applications Image Processing and Its Applications Advanced Communication Technology Wireless and Mobile Networks 5G and 6G Technologies Satellite and Space Communications High Reliability Communication Systems Advanced Computational Approaches Deeep Learning and Machine Learning Artificial Neural Networks Artificial Intelligence Technology AI,Based Solusions',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Januari, Maret, Mei, Juli, September, dan November',
                  'harga_jual_minimum_info' => '27744000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Acta Logistica',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100912227',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100912227&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.actalogistica.eu/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019 - 2025',
                  'focus_scope' => 'Algorithmization and Programming Application and Practical Research Autonomous Systems Business and Commercial Services CAD/CAM Systems Clarke,Wright savings algorithm Combined Transport Controlling Design of Logistic and Transport Systems Discrete and Continuous Systems Distribution and Transport Economy and the Sectoral Economy Education and Pedagogy Electric Cars Electronic Data Interchange E,Logistics and E,Business Ergonomics and Workplace Design Financial Flows Management Forecasting Freight Transport Human Resources Management Industrial Engineering Industrial Management Information Flows Management Inside Transportation Inventory Management Job,Shop and Flow,Shop Systems Layout Location Tasks Logistic Information Systems Logistics Material Handling Measurement Methodology and Theory Milk Run Logistics Multi,Criteria Decision Making Operating Processes Operational Research Optimization and Streamlining Outside Transportation Production and Manufacturing Production Planning and Control Project Management Public Transport Purchase and Supply Quality,Reliability,Maintenance Engineering Queuing Systems Rail,Air,Truck,Sea Transportation Reverse Logistics Salesman Tasks Service Engineering Simulation and Modelling Statistical Analysis Strategy and Orders Management Supply Chain Management Systems of Automatic Identification Traffic Systems Vehicle Routing Problem Waste Management Work and Case Studies',
                  'estimated_time' => 'Review 1 bulan LoA 1-2 bulan Terbit sesuai edisi terdekat',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'March, June, September, December',
                  'harga_jual_minimum_info' => '40392000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'African Journal of Hospitality, Tourism and Leisure',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100829917',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100829917&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.ajhtl.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2017 - 2025',
                  'focus_scope' => 'Business,Management and Accounting Tourism,Leisure and Hospitality Management Social Sciences Geography,Planning and Development',
                  'estimated_time' => '2-3 bulan review',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => '4 edisi pertahun',
                  'harga_jual_minimum_info' => '13802640',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Ingenierie des Systemes d\'Information',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100202935',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100202935&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.iieta.org/Journals/ISI',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2017 - 2025',
                  'focus_scope' => 'Computer sceince,Data mining Data management Information retrieval Process management Machine learning Scientific computing Data science Audiovisual information systems Fault detection Fault tolerance Parallel data management Distributed data management General purpose hardware Special purpose hardware Cloud platform Internet of Things (IoT) Peer,to,peer environment',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'initial decision 1–3 bulan, sampai publikasi 3–6 bulan',
                  'harga_jual_minimum_info' => '20808000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Applied Mathematics (IJAM)',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100841738',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100841738&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://ijamjournal.org/ijam/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2017-2025',
                  'focus_scope' => 'Computer Science: Computational Theory and Mathematics Mathematics: Mathematics (miscellaneous)',
                  'estimated_time' => 'Tidak bisa dipastikan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => '6 edisi pertahun',
                  'harga_jual_minimum_info' => '52020000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Industrial Engineering and Engineering Management',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101073268',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101073268&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.jiem.org/index.php/jiem',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Ada biaya tambahan 20 EUR / Rp 395.022 setiap kali revisi | Akreditasi/Masa Berlaku: 2019-2025',
                  'focus_scope' => 'Supply chain Lean manufacturing Operations improvement Innovation management in operations Operations in service industry Operational Research Total Quality Management Innovation in Engineering/Management Education Total Productive Maintenance How to manage workforce in operations Logistic in general',
                  'estimated_time' => 'Initial review 2-3 bulan, LoA 2-4 minggu after payment.',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Januari, Maret, dan Mei',
                  'harga_jual_minimum_info' => '18360000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Advances in Science and Technology Research Journal',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101070987',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101070987&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.astrj.com/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019-2026',
                  'focus_scope' => 'Computer Science,Engineering,Environmental Science',
                  'estimated_time' => 'Submit- Diterima: 3-6 bulan Diterima - Publish : 1-2 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '18360000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Problems and Perspectives in Management',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/19700170105',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=19700170105&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.businessperspectives.org/journals/problems-and-perspectives-in-management?category_id=30',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2003-2025',
                  'focus_scope' => 'Business,Management and Accounting (miscellaneous)',
                  'estimated_time' => 'Proses review: 1,5-3 bulan Submit-Keputuasan publikasi: 3-4 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => '4 edisi pertahun',
                  'harga_jual_minimum_info' => '56916000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Journal of Advanced Mechanical Design, Systems and Manufacturing',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/19900193618',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=19900193618&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.jsme.or.jp/publish/jamdsm/index.html',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'HPP untuk artikel maksimal 12 halaman, akan ada biaya tambahan Rp 2.112.000 / halaman jika lebih dari 12 halaman | Akreditasi/Masa Berlaku: 2010-2025',
                  'focus_scope' => 'Industrial and Manufacturing Engineering Mechanical Engineering',
                  'estimated_time' => 'Proses review bisa 2-6 bulan lebih tergantung kualitas naskah dan ketersediaan reviewer',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => '4 edisi pertahun',
                  'harga_jual_minimum_info' => '17952000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Psychiatry and Clinical Neurosciences Reports',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101199201',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101199201&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://onlinelibrary.wiley.com/journal/27692558',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'turun ke Q4 di scopus, scimago belum update | Akreditasi/Masa Berlaku: 2022-2025',
                  'focus_scope' => 'Medicine:Neurology (clinical) Psychiatry and Mental Health,Neuroscience: Biological Psychiatry and Neurology',
                  'estimated_time' => 'Tidak bisa dipastikan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Maret, Juni, September dan Desember',
                  'harga_jual_minimum_info' => '52020000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'CommIT Journal',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101070780',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101227032&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journal.binus.ac.id/index.php/commit/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019-2025',
                  'focus_scope' => 'Computer Networks and Communications Computer Science (miscellaneous) Information Systems Electrical and Electronic Engineering',
                  'estimated_time' => 'Review sekitar 3-4 bulan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Mei dan Oktober',
                  'harga_jual_minimum_info' => '3400000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Management and Accounting Review (MAR)',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101041870',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101041870&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://mar.uitm.edu.my/index.php',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Naik jadi Q3 di scopus preview tapi di scimago masih Q4 | Akreditasi/Masa Berlaku: 2018- 2025',
                  'focus_scope' => 'auditing taxation financial accounting management accounting corporate governance accounting information systems financial management public sector accounting social and environmental accounting forensic accounting interdisciplinary studies',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => '3 edisi pertahun',
                  'harga_jual_minimum_info' => '13260000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'E a M: Ekonomie a Management',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/5400152710',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=5400152710&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.ekonomie-management.cz/home/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2007-2025',
                  'focus_scope' => 'Economics,Econometrics and Finance (miscellaneous)',
                  'estimated_time' => 'Tidak dapat diperkirakan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Maret, Juni, September, dan Desember',
                  'harga_jual_minimum_info' => '26520000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Scientific Papers of the University of Pardubice, Series D: Faculty of Economics and Administration',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100390414',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100390414&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://editorial.upce.cz/scipap',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2014-2025',
                  'focus_scope' => 'Business,Management and Accounting (miscellaneous) Economics,Econometrics and Finance (miscellaneous)',
                  'estimated_time' => 'Tidak dapat diperkirakan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Maret, Juni, September, dan Desember',
                  'harga_jual_minimum_info' => '16320000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Prabandhan: Indian Journal of Management',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100417501',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100417501&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.indianjournalofmanagement.com/index.php/pijom/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'sedang close submission | Akreditasi/Masa Berlaku: 2010-2026',
                  'focus_scope' => 'Business,Management and Accounting (miscellaneous)',
                  'estimated_time' => 'Tidak dapat diperkirakan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '14280000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Business: Theory and Practice',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/1000147123',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=1000147123&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journals.vilniustech.lt/index.php/BTP',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'naik ke Q2 di scopus, di scimago belum update | Akreditasi/Masa Berlaku: 2005-2026',
                  'focus_scope' => 'Business,Management and Accounting (miscellaneous)',
                  'estimated_time' => 'Tidak dapat diperkirakan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Januari dan Juli',
                  'harga_jual_minimum_info' => '24684000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'South African Journal of Business Management',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/12100155425',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=12100155425&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://sajbm.org/index.php/sajbm',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2008-2026',
                  'focus_scope' => 'Business,Management and Accounting (miscellaneous)',
                  'estimated_time' => 'Tidak dapat diperkirakan',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => '1 edisi pertahun (satu edisi pertahun)',
                  'harga_jual_minimum_info' => '2769047',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'International Journal of Occupational Safety and Health',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101049089',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101049089&tip=sid',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://nepjol.info/index.php/IJOSH',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal jadi susah dihubungi',
                  'focus_scope' => 'Medicine Public Health,Environmental and Occupational Health Social Sciences Safety Research',
                  'estimated_time' => 'LoA 2-3 bulan dari review jika revisi lancar dan accepted OJS sering eror',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Februari, Mei ,Oktober dan November.',
                  'harga_jual_minimum_info' => '10404000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Asian Journal of Interdisciplinary Research',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101266479',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101266479&tip=sid&exact=no',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://journals.asianresassoc.org/index.php/ajir/index',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'Jurnal jadi susah dihubungi | Akreditasi/Masa Berlaku: 2022- 2025',
                  'focus_scope' => 'Multidisiplin Sosial,Arts,Humanities and Social Sciences including Business and management,Economics,Education,Language and Linguistics,Political science,Psychology,Sociology',
                  'estimated_time' => '',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'March, June, September, December',
                  'harga_jual_minimum_info' => '20808000',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Multidisciplinary Science Journal',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101133576',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101133576&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://malque.pub/ojs/index.php/msj',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => 'HPP Reguler (Review 1-3 bulan) : $1.100 (reguler) dan $ 1.600 (fasttrack berdasrkan informasi sebelumnya di email ) | Akreditasi/Masa Berlaku: 2019-2026',
                  'focus_scope' => 'Multidisciplin,Agricultural Sciences,Health Sciences,Biological Sciences,Engineering and Exact Sciences,Social and Human Sciences',
                  'estimated_time' => 'Initial Review: 5 hari Review : 10 hari LoA Setelah Revisi, Accepted dan Payment. Berdasarkan riwayat penulis yang pernah publish di jurnal ini dari submit artikel- accepted : 3-4 bulan dan accepted- publish : 1 bulan',
                  'available_slots' => 'Vol 9 No 4 (2027) Terbit Inpress di Oktober 2026 karena Vol 8 No 12 (2026) sudah diterbitkan di Juni 2026',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'Monthly',
                  'harga_jual_minimum_info' => '2720',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Advance Sustainable Science, Engineering and Technology (ASSET)',
                'hpp' => 27115420.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21101238563',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21101238563&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                  ),
                  'notes' => 'JURNAL INI NAIK JADI Q3 tapi di scimago nya masih Q4 | Akreditasi/Masa Berlaku: 2020 - 2025',
                  'hpp_usd' => '1500',
                  'focus_scope' => 'Engineering,Chemistry,Biology and Application Chemistry and Application Mechanical Engineering Physics and Application Information Technology Electrical Engineering Mathematics Pharmacy Statistics',
                  'estimated_time' => 'LoA 2-3 Hari Kerja (setelah payment ke jurnal) jika pihak jurnal menyepakati fasttrack ,artikel sesuai ketentuan dan scope jurnal nya Dari submit - revisi : 6- 8 bulan. Tidak menerima artikel review, SLR, Bibliometric analysis',
                  'available_slots' => 'Vol 9 No 4 (2027) jika artikel nya bagus',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => '(November-Januari), (Februari-April), (Mei-Juli) dan (Agustus-Oktober)',
                  'harga_jual_minimum_info' => '425',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Polish Review',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21473',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21473&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://www.press.uillinois.edu/journals/?id=pr',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2019-2025',
                  'focus_scope' => 'Humaniora dan Ilmu Sosial',
                  'estimated_time' => 'Review 2-3 Bulan LoA Setelah Revisi. Terbit Sesuai Edisi Terdekat',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'April, Juli, Oktober, dan Desember',
                  'harga_jual_minimum_info' => '26573040',
                ),
            ],
            [
                'service_id' => $service->id,
                'name' => 'Kesmas: Jurnal Kesehatan Masyarakat Nasional',
                'hpp' => 0.00,
                'status_note' => 'SCOPUS Q3',
                'attributes' => array (
                  'links' => 
                  array (
                    0 => 
                    array (
                      'url' => 'https://www.scopus.com/sourceid/21100934559',
                      'label' => 'Scopus',
                    ),
                    1 => 
                    array (
                      'url' => 'https://www.scimagojr.com/journalsearch.php?q=21100934559&tip=sid&clean=0',
                      'label' => 'Scimago',
                    ),
                    2 => 
                    array (
                      'url' => 'https://scholarhub.ui.ac.id/kesmas/',
                      'label' => 'Homepage',
                    ),
                  ),
                  'notes' => ' | Akreditasi/Masa Berlaku: 2016-2025',
                  'focus_scope' => 'Epidemiology,Health Policy,Public Health,Environmental and Occupational Health.',
                  'estimated_time' => 'Proses review rata-rata 3-4 bulan.',
                  'available_slots' => '',
                  'accreditation_type' => 'Scopus Q3',
                  'publication_months' => 'February, May, August, and November',
                  'harga_jual_minimum_info' => '595',
                ),
            ],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(
                ['name' => $product['name']],
                $product
            );
        }
    }
}
