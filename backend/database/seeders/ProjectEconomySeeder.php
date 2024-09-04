<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectEconomySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::factory()->create([
            'projet_id' => 'Test User',
            'economy_id' => 'Test User',
            'date' => '2024-09-04',
        ]);
    }
}
