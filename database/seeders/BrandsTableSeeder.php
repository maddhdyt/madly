<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class BrandsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('brands')->delete();
        
        \DB::table('brands')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Arka Global Academy',
                'slug' => 'arka-global-academy',
                'logo' => NULL,
                'description' => NULL,
                'created_at' => '2026-07-29 03:00:28',
                'updated_at' => '2026-07-30 06:21:11',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Ghanim Publisher',
                'slug' => 'ghanim-publisher',
                'logo' => NULL,
                'description' => NULL,
                'created_at' => '2026-07-29 03:00:28',
                'updated_at' => '2026-07-30 06:21:20',
            ),
        ));
        
        
    }
}