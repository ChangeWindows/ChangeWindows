<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\RoleController as AdminRoleController;


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
    return Inertia::render('Timeline/Show');
})->middleware(['auth'])->name('home');

Route::get('/timeline', function () {
    return Inertia::render('Timeline/Show');
})->middleware(['auth'])->name('timeline');

Route::get('/platforms', function () {
    return Inertia::render('Platforms/Show');
})->middleware(['auth'])->name('platforms');

Route::get('/releases', function () {
    return Inertia::render('Releases/Show');
})->middleware(['auth'])->name('releases');

Route::get('/about', function () {
    return Inertia::render('About/Show');
})->middleware(['auth'])->name('about');

Route::get('/about', function () {
    return Inertia::render('About/Show');
})->middleware(['auth'])->name('about');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');


Route::middleware(['auth'])->prefix('admin')->name('admin')->group(function() {
    Route::prefix('users')->name('.users')->group(function() {
        Route::get('', [AdminUserController::class, 'index'])->name('');
        Route::get('/edit/{user}', [AdminUserController::class, 'edit'])->name('.edit');
        Route::patch('/edit/{user}', [AdminUserController::class, 'update'])->name('.update');
    });
    
    Route::prefix('roles')->name('.roles')->group(function() {
        Route::get('', [AdminRoleController::class, 'index'])->name('');
        Route::get('/edit/{role}', [AdminRoleController::class, 'edit'])->name('.edit');
        Route::patch('/edit/{role}', [AdminRoleController::class, 'update'])->name('.update');
    });
});

require __DIR__.'/auth.php';
