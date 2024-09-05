<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\EconomyController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
Route::patch('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');


Route::get('/economies', [EconomyController::class, 'index'])->name('economies.index');
Route::get('/economy/create', [EconomyController::class, 'create'])->name('economies.create');
Route::post('/economies', [EconomyController::class, 'store'])->name('economies.store');
Route::get('/economies/{economy}', [EconomyController::class, 'show'])->name('economies.show');
Route::get('/economies/{economy}/edit', [EconomyController::class, 'edit'])->name('economies.edit');
Route::patch('/economies/{economy}', [EconomyController::class, 'update'])->name('economies.update');
Route::delete('/economies/{economy}', [EconomyController::class, 'destroy'])->name('economies.destroy');


require __DIR__.'/auth.php';
