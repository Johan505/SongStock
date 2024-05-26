<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Johan',
            'lastname' => 'Avendaño',
            'identification' => '1024921432',
            'email' => 'johan@gmail.com',
            'phone' => '3443242354',
            'address' => 'cll137',
            'id_rol' => '1',
            'password' => Hash::make('123')
        ]);

        User::create([
            'name' => 'Santiago',
            'lastname' => 'Rojas',
            'identification' => '1023921432',
            'email' => 'santiago@gmail.com',
            'phone' => '3423242354',
            'address' => 'cll138',
            'id_rol' => '2',
            'password' => Hash::make('123')
        ]);

        User::create([
            'name' => 'Diego',
            'lastname' => 'Parra',
            'identification' => '1124921432',
            'email' => 'diego@gmail.com',
            'phone' => '3443242654',
            'address' => 'cll139',
            'id_rol' => '3',
            'password' => Hash::make('123')
        ]);
    }
}
