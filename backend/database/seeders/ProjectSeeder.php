<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Project::factory()->create([
            'title' => 'Title Project',
            'description' => 'Description Project',
            'goal_money' => 1000,
            'state_money' => 100,
            'user_id' => 1,
        ]);
    }
}
