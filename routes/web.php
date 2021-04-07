<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PlatformController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\ReleaseController;
use App\Http\Controllers\Admin\ChannelController as AdminChannelController;
use App\Http\Controllers\Admin\FlightController as AdminFlightController;
use App\Http\Controllers\Admin\PlatformController as AdminPlatformController;
use App\Http\Controllers\Admin\ReleaseChannelController as AdminReleaseChannelController;
use App\Http\Controllers\Admin\ReleaseController as AdminReleaseController;
use App\Http\Controllers\Admin\RoleController as AdminRoleController;
use App\Http\Controllers\Admin\UserController as AdminUserController;


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
    return redirect()->route('front.timeline');
})->name('home');

Route::prefix('')->name('front')->group(function() {
    Route::prefix('timeline')->name('.timeline')->group(function() {
        Route::get('', [TimelineController::class, 'index'])->name('');
        Route::get('/{platform}', [TimelineController::class, 'show'])->name('.show');
    });
    
    Route::prefix('platforms')->name('.platforms')->group(function() {
        Route::get('', [PlatformController::class, 'index'])->name('');
        Route::get('/{platform}', [PlatformController::class, 'show'])->name('.show');
    });
    
    Route::prefix('releases')->name('.releases')->group(function() {
        Route::get('', [ReleaseController::class, 'index'])->name('');
        Route::get('/{release}', [ReleaseController::class, 'show'])->name('.show');
    });
    
    Route::prefix('about')->name('.about')->group(function() {
        Route::get('', function () {
            return Inertia::render('About/Show');
        })->name('');
    });
});

Route::middleware(['auth'])->prefix('admin')->name('admin')->group(function() {
    Route::prefix('users')->name('.users')->group(function() {
        Route::get('', [AdminUserController::class, 'index'])->name('');
        Route::get('/edit/{user}', [AdminUserController::class, 'edit'])->name('.edit');
        Route::patch('/edit/{user}', [AdminUserController::class, 'update'])->name('.update');
        Route::delete('{user}', [AdminUserController::class, 'destroy'])->name('.destroy');
    });
    
    Route::prefix('roles')->name('.roles')->group(function() {
        Route::get('', [AdminRoleController::class, 'index'])->name('');
        Route::post('', [AdminRoleController::class, 'store'])->name('.store');
        Route::delete('{role}', [AdminRoleController::class, 'destroy'])->name('.destroy');
        Route::get('/create', [AdminRoleController::class, 'create'])->name('.create');
        Route::get('/{role}/edit', [AdminRoleController::class, 'edit'])->name('.edit');
        Route::patch('/{role}/edit', [AdminRoleController::class, 'update'])->name('.update');
    });
    
    Route::prefix('releases')->name('.releases')->group(function() {
        Route::get('', [AdminReleaseController::class, 'index'])->name('');
        Route::post('', [AdminReleaseController::class, 'store'])->name('.store');
        Route::delete('{release}', [AdminReleaseController::class, 'destroy'])->name('.destroy');
        Route::get('/create', [AdminReleaseController::class, 'create'])->name('.create');
        Route::get('/{release}/edit', [AdminReleaseController::class, 'edit'])->name('.edit');
        Route::patch('/{release}/edit', [AdminReleaseController::class, 'update'])->name('.update');
    });
    
    Route::prefix('platforms')->name('.platforms')->group(function() {
        Route::get('', [AdminPlatformController::class, 'index'])->name('');
        Route::post('', [AdminPlatformController::class, 'store'])->name('.store');
        Route::delete('{platform}', [AdminPlatformController::class, 'destroy'])->name('.destroy');
        Route::get('/create', [AdminPlatformController::class, 'create'])->name('.create');
        Route::get('/{platform}/edit', [AdminPlatformController::class, 'edit'])->name('.edit');
        Route::patch('/{platform}/edit', [AdminPlatformController::class, 'update'])->name('.update');
    });
    
    Route::prefix('channels')->name('.channels')->group(function() {
        Route::post('', [AdminChannelController::class, 'store'])->name('.store');
        Route::delete('{channel}', [AdminChannelController::class, 'destroy'])->name('.destroy');
        Route::get('/create', [AdminChannelController::class, 'create'])->name('.create');
        Route::get('/{channel}/edit', [AdminChannelController::class, 'edit'])->name('.edit');
        Route::patch('/{channel}/edit', [AdminChannelController::class, 'update'])->name('.update');
    });
    
    Route::prefix('releasechannels')->name('.releasechannels')->group(function() {
        Route::get('', [AdminReleaseChannelController::class, 'index'])->name('');
        Route::post('', [AdminReleaseChannelController::class, 'store'])->name('.store');
        Route::delete('{release_channel}', [AdminReleaseChannelController::class, 'destroy'])->name('.destroy');
        Route::get('/create', [AdminReleaseChannelController::class, 'create'])->name('.create');
        Route::get('/{release_channel}/edit', [AdminReleaseChannelController::class, 'edit'])->name('.edit');
        Route::patch('/{release_channel}/edit', [AdminReleaseChannelController::class, 'update'])->name('.update');
    });
    
    Route::prefix('flights')->name('.flights')->group(function() {
        Route::get('', [AdminFlightController::class, 'index'])->name('');
        Route::post('', [AdminFlightController::class, 'store'])->name('.store');
        Route::delete('{flight}', [AdminFlightController::class, 'destroy'])->name('.destroy');
        Route::get('/create', [AdminFlightController::class, 'create'])->name('.create');
        Route::get('/{flight}/edit', [AdminFlightController::class, 'edit'])->name('.edit');
        Route::patch('/{flight}/edit', [AdminFlightController::class, 'update'])->name('.update');
    });
});

require __DIR__.'/auth.php';
