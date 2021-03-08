<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('timeline');
})->middleware(['auth'])->name('timeline');

Route::get('/platforms', function () {
    return view('platforms');
})->middleware(['auth'])->name('platforms');

Route::get('/releases', function () {
    return view('releases');
})->middleware(['auth'])->name('releases');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
