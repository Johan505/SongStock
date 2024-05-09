<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    private $seeders = [
        // Otros seeders aquí
        RolSeeder::class
    ];


    public function run(): void
    {
        $this->call($this->seeders);
    }
}
