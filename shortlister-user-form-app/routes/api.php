<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/count', [UserController::class, 'userCount']);
Route::get('/users/{id}', [UserController::class, 'show']);
