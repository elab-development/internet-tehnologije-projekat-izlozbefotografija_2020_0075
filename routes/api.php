<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ArtworkController;
use App\Http\Controllers\ExhibitionArtworkController;
use App\Http\Controllers\ExhibitionController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ShowingController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::resource('exhibitions', ExhibitionController::class)->only(['index', 'show']);
Route::resource('artworks', ArtworkController::class)->only(['index', 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', [UserController::class, 'profile']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/newsletters', [NewsletterController::class, 'store']);

Route::get('/exhibitions/{id}/artworks', [ExhibitionArtworkController::class, 'index']);

Route::group(['middleware' => ['auth:sanctum', 'role:admin']], function () {
    Route::resource('exhibitions', ExhibitionController::class)->only(['update','store','destroy']);
    Route::delete('/newsletters/{id}', [NewsletterController::class, 'destroy']);
    Route::post('/artworks/{id}/upload-image', [ArtworkController::class, 'uploadImage'])->name('uploadImage');
    Route::resource('artworks', ArtworkController::class)->only(['update','store','destroy']);
    Route::post('/showings', [ShowingController::class, 'store']);
    Route::delete('/showings/{id}', [ShowingController::class, 'destroy']);
    Route::get('/showings', [ShowingController::class, 'index']);
    Route::get('/newsletters', [NewsletterController::class, 'index']);

});

Route::post('forgot-password',[AuthController::class,'forgotPassword']);

Route::get('/tickets', [TicketController::class, 'index']);

Route::post('tickets', [TicketController::class, 'store']);
