<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Project;

/**
 * @OA\Schema(
 *     schema="Project",
 *     type="object",
 *     title="Project",
 *     required={"title", "description", "goal_money", "state_money"},
 *     @OA\Property(property="id", type="integer", readOnly=true),
 *     @OA\Property(property="user_id", type="integer"),
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="goal_money", type="integer"),
 *     @OA\Property(property="state_money", type="integer"),
 *     @OA\Property(property="created_at", type="string", format="date-time", readOnly=true),
 *     @OA\Property(property="updated_at", type="string", format="date-time", readOnly=true)
 * )
 */
class ProjectController extends Controller
{
    /**
     * @OA\Get(
     *     path="/auth/projects",
     *     summary="Liste tous les projets",
     *     @OA\Response(
     *         response=200,
     *         description="Liste des projets",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Project")
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $projects = Project::all();

        return response()->json([
            'projects' => $projects,
        ]);
    }

    /**
     * @OA\Get(
     *     path="/auth/projects/{project}",
     *     summary="Affiche un projet spécifique",
     *     @OA\Parameter(
     *         name="project",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Détails du projet",
     *         @OA\JsonContent(ref="#/components/schemas/Project")
     *     )
     * )
     */
    public function show(Project $project): JsonResponse
    {
        return response()->json([
            'project' => $project,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/auth/projects",
     *     summary="Crée un nouveau projet",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Project")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Projet créé avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Project")
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal_money' => 'required|numeric',
            'state_money' => 'required|numeric',
        ]);

        $project = new Project($validated);
        $project->user_id = $request->user()->id; 
        $project->save();

        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project,
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/auth/projects/{project}/edit",
     *     summary="Met à jour un projet existant",
     *     @OA\Parameter(
     *         name="project",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Project")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Projet mis à jour avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Project")
     *     )
     * )
     */
    public function edit(Request $request, Project $project): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal_money' => 'required|numeric',
            'state_money' => 'required|numeric',
        ]);
    
        $project->update($validated);
    
        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project,
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/auth/projects/{project}",
     *     summary="Supprime un projet",
     *     @OA\Parameter(
     *         name="project",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Projet supprimé avec succès",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string")
     *         )
     *     )
     * )
     */
    public function delete(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully',
        ]);
    }
}