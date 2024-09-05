<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use App\Models\Project;

class ProjectController extends Controller
{

    public function index (Request $request): View
    {
        return view('project.index', [
            'projects' => $request->user()->projects,
        ]);
    }

    public function show (Request $request): View
    {
        return view('project.show', [
            'project' => $request->project(),
        ]);
    }

    public function create (Request $request): View
    {
        return ('project.create');
    }

    public function store(Request $request): RedirectResponse 
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

        return Redirect::to('/projects');
    }
    
    public function edit(Request $request): View
    {
        return view('project.edit', [
            'project' => $request->project(),
        ]);
    }

    public function delete(Request $request): RedirectResponse 
    {
        $project = $request->project();
        $project->delete();

        return Redirect::to('/projects');
    }
}
