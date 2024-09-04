<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

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

    public function store (Request $request): RedirectResponse 
    {
        
    }
    
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    public function delete(Request $request): RedirectResponse {

        $project = $request->project();

        $project->delete();

        return Redirect::to('/projects');
    }



}
