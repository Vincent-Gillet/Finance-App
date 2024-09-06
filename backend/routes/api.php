<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return 'API';
});




Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']); 

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);

        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');



        Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');

        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');



        //     Route::post('logout', [AuthController::class, 'logout']);
        //     Route::get('user', [AuthController::class, 'user']);


    //         Route::get('/users', [UserController::class, 'index'])->name('users.index');
    //         Route::post('/users', [UserController::class, 'store'])->name('users.store');
    //         Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    //         Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    //         Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');


    //         // Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    //         // Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    //         // Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    //         // Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    //         // Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');


    //         // Route::get('/economies', [EconomyController::class, 'index'])->name('economies.index');
    //         // Route::post('/economies', [EconomyController::class, 'store'])->name('economies.store');
    //         // Route::get('/economies/{economy}', [EconomyController::class, 'show'])->name('economies.show');
    //         // Route::get('/economies/{economy}/edit', [EconomyController::class, 'edit'])->name('economies.edit');
    //         // Route::delete('/economies/{economy}', [EconomyController::class, 'destroy'])->name('economies.destroy');





    });
});