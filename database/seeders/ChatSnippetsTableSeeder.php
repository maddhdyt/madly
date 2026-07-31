<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ChatSnippetsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('chat_snippets')->delete();
        
        \DB::table('chat_snippets')->insert(array (
            0 => 
            array (
                'id' => 1,
                'shortcut' => '/salam',
                'title' => 'Salam Pembuka',
                'content_text' => 'Halo kak! Ada yang bisa kami bantu terkait produk kami?',
                'created_at' => '2026-07-29 03:00:28',
                'updated_at' => '2026-07-29 03:00:28',
            ),
            1 => 
            array (
                'id' => 2,
                'shortcut' => '/order',
                'title' => 'Format Order',
                'content_text' => 'Silakan isi format berikut:
Nama:
Alamat:
Pesanan:
Metode Pembayaran:',
                'created_at' => '2026-07-29 03:00:28',
                'updated_at' => '2026-07-29 03:00:28',
            ),
        ));
        
        
    }
}