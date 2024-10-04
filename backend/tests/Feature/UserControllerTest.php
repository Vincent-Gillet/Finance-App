<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/auth/users');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'users' => [
                         '*' => [
                             'id',
                             'name',
                             'email',
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

        $response = $this->getJson('/api/auth/users/' . $user->id);

        $response->assertStatus(200)
                 ->assertJson([
                     'user' => [
                         'id' => $user->id,
                         'name' => $user->name,
                         'email' => $user->email,
                     ]
                 ]);
    }

    public function test_edit()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/auth/users/' . $user->id . '/edit');

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'User edit form',
                     'user' => [
                         'id' => $user->id,
                         'name' => $user->name,
                         'email' => $user->email,
                     ]
                 ]);
    }

    public function test_update()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->putJson('/api/auth/users/' . $user->id, [
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'User updated successfully',
                     'user' => [
                         'id' => $user->id,
                         'name' => 'Jane Doe',
                         'email' => 'jane.doe@example.com',
                     ]
                 ]);
    }

    public function test_delete()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->deleteJson('/api/auth/users/' . $user->id);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'User deleted successfully',
                 ]);
    }
}