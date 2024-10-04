<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class ProjectControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Project::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/auth/projects');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'projects' => [
                         '*' => [
                             'id',
                             'title',
                             'description',
                             'goal_money',
                             'state_money',
                             'created_at',
                             'updated_at',
                         ]
                     ]
                 ]);
    }

    public function test_show()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $project = Project::factory()->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/auth/projects/' . $project->id);

        $response->assertStatus(200)
                 ->assertJson([
                     'project' => [
                         'id' => $project->id,
                         'title' => $project->title,
                         'description' => $project->description,
                         'goal_money' => $project->goal_money,
                         'state_money' => $project->state_money,
                     ]
                 ]);
    }

    public function test_store()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/auth/projects', [
            'title' => 'New Project',
            'description' => 'Project Description',
            'goal_money' => 1000,
            'state_money' => 100,
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'message' => 'Project created successfully',
                     'project' => [
                         'title' => 'New Project',
                         'description' => 'Project Description',
                         'goal_money' => 1000,
                         'state_money' => 100,
                     ]
                 ]);
    }

    public function test_edit()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
    
        $project = Project::factory()->create(['user_id' => $user->id]);
    
        $response = $this->putJson('/api/auth/projects/' . $project->id .'/edit', [
            'title' => 'Updated Project',
            'description' => 'Updated Description',
            'goal_money' => 2000,
            'state_money' => 200,
        ]);
    
        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Project updated successfully',
                     'project' => [
                         'id' => $project->id,
                         'title' => 'Updated Project',
                         'description' => 'Updated Description',
                         'goal_money' => 2000,
                         'state_money' => 200,
                     ]
                 ]);
    }

    public function test_delete()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $project = Project::factory()->create(['user_id' => $user->id]);

        $response = $this->deleteJson('/api/auth/projects/' . $project->id);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Project deleted successfully',
                 ]);
    }
}