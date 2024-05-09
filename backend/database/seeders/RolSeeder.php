<?php

namespace Database\Seeders;

use App\Models\Rol\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create two users
        Rol::create([
            'rol' => 'Admin',
        ]);

        Rol::create([
            'rol' => 'User',
        ]);

        Rol::create([
            'rol' => 'Provider',
        ]);
    }
}
