<?php

use App\Http\Controllers\RolController\RolController;
use App\Http\Controllers\UserController\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'Rol', 'controller' => RolController::class], function () {
    Route::post('/CreateRol', 'createRol');
});

Route::group(['prefix' => 'User', 'controller' => UserController::class], function () {
    Route::post('/CreateUser', 'createUser');
});

