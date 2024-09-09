<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use App\Models\Project;

class ProjectController extends Controller
{

    public function index (): JsonResponse
    {
        $projects = Project::all();

        return response()->json([
            'projects' => $projects,
        ]);
    }

    public function show(Project $project): JsonResponse
    {
        return response()->json([
            'project' => $project,
        ]);
    }

    // public function create (): JsonResponse
    // {
    //     return response()->json([
    //         'message' => 'Create endpoint hit',
    //     ]);    
    // }

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
        ]);
    }
    
    public function edit(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal_money' => 'required|numeric',
            'state_money' => 'required|numeric',
        ]);

        $project->edit($validated);

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project,
        ]);
    }

    public function delete($id): JsonResponse 
    { 
        $project = Project::find($id);
        $project->delete();
    }
}
