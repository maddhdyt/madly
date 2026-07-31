<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Super Admin',
                'email' => 'admin@madly.com',
                'avatar' => NULL,
                'role' => 'admin',
                'email_verified_at' => NULL,
                'password' => '$2y$12$3B/vSkrXAlhPMjJHvGB.WuD2UmGfltgVtxGhKX6HcbxeA/tfFBjWe',
                'remember_token' => 'CXsve0zHtEGcRLEJGldv5JJFkXcVVNrWqHbuvWVCsrVgMiWjTLcFNZGipDdh',
                'created_at' => '2026-07-29 03:00:28',
                'updated_at' => '2026-07-29 03:00:28',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Manager',
                'email' => 'manager@madly.com',
                'avatar' => NULL,
                'role' => 'manager',
                'email_verified_at' => NULL,
                'password' => '$2y$12$3B/vSkrXAlhPMjJHvGB.WuD2UmGfltgVtxGhKX6HcbxeA/tfFBjWe',
                'remember_token' => NULL,
                'created_at' => '2026-07-31 03:00:28',
                'updated_at' => '2026-07-31 03:00:28',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Sales',
                'email' => 'sales@madly.com',
                'avatar' => NULL,
                'role' => 'sales',
                'email_verified_at' => NULL,
                'password' => '$2y$12$3B/vSkrXAlhPMjJHvGB.WuD2UmGfltgVtxGhKX6HcbxeA/tfFBjWe',
                'remember_token' => NULL,
                'created_at' => '2026-07-31 03:00:28',
                'updated_at' => '2026-07-31 03:00:28',
            ),
        ));
        
        
    }
}