<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EconomySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Economy::factory()->create([
            'title' => 'Test User',
            'description' => 'test@example.com',
            'economy_money' => 1000,
        ]);
    }
}
