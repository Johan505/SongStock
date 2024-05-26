<?php

use App\Http\Controllers\CartController\CartController;
use App\Http\Controllers\RolController\RolController;
use App\Http\Controllers\SongController\SongController;
use App\Http\Controllers\UserController\UserController;
use App\Http\Controllers\VinylDiscController\VinylDiscController;
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
    Route::post('/Login', 'loginUser');
});


Route::group(['prefix' => 'Song', 'controller' => SongController::class], function () {
    Route::get('/GetAllSongs', 'getAllSongs');
    Route::post('/CreateSong', 'createSong');
    Route::get('/GetSongById/{id}', 'showSong');
    Route::post('/UpdateSong/{id}', 'updateSong');
    Route::delete('/DeleteSong/{id}', 'deleteSong');
});

Route::group(['prefix' => 'VinylDisc', 'controller' => VinylDiscController::class], function () {
    Route::get('/GetAllVinylDisc', 'getAllVinylDisc');
    Route::post('/CreateVinylDisc', 'createVinylDisc');
    Route::get('/GetVinylById/{id}', 'showVinylDisc');
    Route::post('/UpdateVinylDisc/{id}', 'updateVinylDisc');
    Route::delete('/DeleteVinylDisc/{id}', 'deleteVinylDisc');
    Route::get('/GetVinylByUserId/{id}', 'getVinylDiscsByUserId');
});

Route::group(['prefix' => 'Favorite', 'controller' => SongController::class], function () {
    Route::post('/addFavorite', 'addFavorite');
    Route::delete('/removeFavorite', 'removeFavorite');
    Route::get('/getFavorites/{id}', 'getFavorites');
});

Route::group(['prefix' => 'Cart', 'controller' => CartController::class], function () {
    Route::post('/AddCartSong', 'addCartSong');
    Route::post('/AddCartVinyl', 'addCartVinyl');
    Route::get('/GetCartSong/{id}', 'getCartSong');
    Route::get('/GetCartVinyl/{id}', 'getCartVinyl');
});
