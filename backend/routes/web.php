<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api-docs.json', function () {
    return response()->file(storage_path('api-docs/swagger.json'));
});