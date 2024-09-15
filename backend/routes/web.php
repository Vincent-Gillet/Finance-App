<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


// Route::get('/api/documentation', function () {
//     return view('vendor.l5-swagger.index', [
//         'documentation' => 'default',
//         'urlToDocs' => url('api-docs.json'),
//         'operationsSorter' => null,
//         'configUrl' => null,
//         'validatorUrl' => null,
//         'useAbsolutePath' => true,
//     ]);
// });

// Route::get('api/documentation', function () {
//     return view('swagger.index');
// });

// Route::get('api/documentation', [SwaggerController::class, 'api']);

Route::get('/api-docs.json', function () {
    return response()->file(storage_path('api-docs/swagger.json'));
});