<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function index (Resquest $resquest) : View {
        return view('user.index', [
            'users' => $request->user()->users,
        ]);
    }

    public function show (Request $request) : View {
        return view(('user.show'), [
            'user' => $request->user(),
        ]);
    }


    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    public function delete(Request $request): RedirectResponse {

        $user = $request->project();

        $user->delete();

        return Redirect::to('/users');
    }

}
