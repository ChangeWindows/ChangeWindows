<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\PlatformController;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'horizonVersion' => config('app.version')
    ]);
})->name('home');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware(['auth:sanctum', 'verified'])->prefix('admin')->name('admin')->group(function() {
    Route::prefix('platforms')->name('.platforms')->group(function() {
        Route::get('/', [PlatformController::class, 'index'])->name('');
        Route::get('/create', [PlatformController::class, 'create'])->name('.create');
        Route::get('/edit/{platform}', [PlatformController::class, 'edit'])->name('.edit');
    });
});