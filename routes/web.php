<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ProjectController::class, 'index'])->name('projects.index');

Route::resource('projects', ProjectController::class)->only([
    'store',
    'update',
    'destroy',
]);

Route::redirect('/projects', '/');
