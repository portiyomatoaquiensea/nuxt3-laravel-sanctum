<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MetaController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\AmpController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'me']);

Route::get('/head-config', [MetaController::class, 'headMeta']);
Route::get('/robots-txt', [SeoController::class, 'robotText']);
Route::get('/sitemap-xml', [SeoController::class, 'sitemap']);
Route::get('/amp', [AmpController::class, 'index']);

// Home
Route::get('/home/slider', [HomeController::class, 'slider']);
