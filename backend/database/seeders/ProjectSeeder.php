<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::factory()->create([
            'title' => 'Test User',
            'description' => 'Test User',
            'goal_money' => 1000,
            'state_money' => 100,
        ]);
    }
}
