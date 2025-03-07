<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/users/length', [UserController::class, 'usersLenght']);
Route::post('/users', [UserController::class, 'store']);
