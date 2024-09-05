<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProjectEconomy;

class ProjectEconomySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProjectEconomy::factory()->create([
            'project_id' => 1,
            'economy_id' => 1,
            'date' => '2024-09-04',
        ]);
    }

    
}
