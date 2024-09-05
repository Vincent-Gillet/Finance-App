<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Economy;

class EconomySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Economy::factory()->create([
            'title' => 'Title economy',
            'description' => 'Description economy',
            'economy_money' => 1000,
        ]);
    }
}
