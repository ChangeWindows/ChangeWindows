<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\ReleaseController;
use App\Http\Controllers\FlagController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ChannelController as AdminChannelController;
use App\Http\Controllers\Admin\FlightController as AdminFlightController;
use App\Http\Controllers\Admin\FlagController as AdminFlagController;
use App\Http\Controllers\Admin\FeatureStoreController as AdminFeatureStoreController;
use App\Http\Controllers\Admin\PermissionController as AdminPermissionController;
use App\Http\Controllers\Admin\PlatformController as AdminPlatformController;
use App\Http\Controllers\Admin\ReleaseChannelController as AdminReleaseChannelController;
use App\Http\Controllers\Admin\ReleaseController as AdminReleaseController;
use App\Http\Controllers\Admin\RoleController as AdminRoleController;
use App\Http\Controllers\Admin\TweetStreamController as AdminTweetStreamController;
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
});

Route::get('/admin', function () {
    return redirect()->route('admin.flights');
});

Route::prefix('')->as('front')->group(function() {
    Route::controller(TimelineController::class)->prefix('timeline')->as('.timeline')->group(function() {
        Route::get('', 'index')->name('');
        Route::get('/{platform}', 'show')->name('.show');
    });

    Route::controller(SearchController::class)->prefix('search')->as('.search')->group(function() {
        Route::get('', 'index')->name('');
        Route::post('', 'results')->name('.find');
        Route::get('/flags', 'index')->name('.flags');
        Route::post('/flags', 'flagResults')->name('.find.flags');
    });

    Route::controller(FlagController::class)->prefix('flags')->as('.flags')->group(function() {
        Route::get('', 'index')->name('');
        Route::get('/active', 'active')->name('.active');
        Route::get('/removed', 'removed')->name('.removed');
        Route::get('/about', 'about')->name('.about');
        Route::get('/{flag}', 'show')->name('.show');
        Route::post('/{flag}/suggestion', 'suggestion')->name('.suggestion');
        Route::patch('/{flag}/suggestion/{flag_content}', 'suggestionPatch')->name('.suggestionPatch');
    });

    Route::controller(ChannelController::class)->prefix('channels')->as('.channels')->group(function() {
        Route::get('', 'index')->name('');
        Route::get('/{platform}', 'show')->name('.show');
    });

    Route::prefix('platforms')->as('.platforms')->group(function() {
        Route::get('', [PlatformController::class, 'index'])->name('');
        Route::get('/{platform}', [PlatformController::class, 'show'])->name('.show');

        Route::prefix('{platform}/releases')->name('.releases')->group(function() {
            Route::get('/{release}', [ReleaseController::class, 'show'])->name('');
        });
    });

    Route::middleware(['auth'])->prefix('profile')->name('.profile')->group(function() {
        Route::get('', [ProfileController::class, 'index'])->name('');
        Route::get('/password', [ProfileController::class, 'password'])->name('.password');
        Route::patch('/{user}', [ProfileController::class, 'update'])->name('.update');
        Route::patch('/{user}/password', [ProfileController::class, 'updatePassword'])->name('.password.update');
    });

    Route::controller(SettingsController::class)->prefix('settings')->as('.settings')->group(function() {
        Route::get('', 'index')->name('');
        Route::get('/about', 'index');
        Route::get('/privacy', 'privacy');
    });
});

Route::middleware(['auth'])->prefix('admin')->name('admin')->group(function() {
    Route::controller(AdminUserController::class)->prefix('users')->as('.users')->group(function() {
        Route::get('', 'index')->name('');
        Route::get('/edit/{user}', 'edit')->name('.edit');
        Route::patch('/edit/{user}', 'update')->name('.update');
        Route::delete('{user}', 'destroy')->name('.destroy');
    });

    Route::controller(AdminRoleController::class)->prefix('roles')->as('.roles')->group(function() {
        Route::get('', 'index')->name('');
        Route::post('', 'store')->name('.store');
        Route::delete('{role}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{role}/edit', 'edit')->name('.edit');
        Route::patch('/{role}/edit', 'update')->name('.update');
    });

    Route::controller(AdminPermissionController::class)->prefix('permissions')->as('.permissions')->group(function() {
        Route::get('', 'index')->name('');
        Route::post('', 'store')->name('.store');
        Route::delete('{permission}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{permission}/edit', 'edit')->name('.edit');
        Route::patch('/{permission}/edit', 'update')->name('.update');
    });

    Route::controller(AdminFlagController::class)->prefix('flags')->as('.flags')->group(function() {
        Route::get('', 'index')->name('');
        Route::get('/history', 'history')->name('history');
        Route::post('', 'store')->name('.store');
        Route::post('/batch', 'batch')->name('.batch');
        Route::delete('{flag}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{flag}/edit', 'edit')->name('.edit');
        Route::patch('/{flag}/edit', 'update')->name('.update');
        Route::patch('/{flag_content}/moderateApprove', 'moderateApprove')->name('.moderate.approve');
        Route::patch('/{flag_content}/moderateDiscard', 'moderateDiscard')->name('.moderate.discard');
    });

    Route::controller(AdminFeatureStoreController::class)->prefix('features')->as('.features')->group(function() {
        Route::get('', 'index')->name('');
        Route::get('/directory', 'direct')->name('directory');
        Route::post('', 'store')->name('.store');
        Route::post('/batch', 'batch')->name('.batch');
        Route::delete('{flag}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{flag}/edit', 'edit')->name('.edit');
        Route::patch('/{flag}/edit', 'update')->name('.update');
        Route::patch('/{flag_content}/moderateApprove', 'moderateApprove')->name('.moderate.approve');
        Route::patch('/{flag_content}/moderateDiscard', 'moderateDiscard')->name('.moderate.discard');
    });

    Route::controller(AdminReleaseController::class)->prefix('releases')->as('.releases')->group(function() {
        Route::get('', 'index')->name('');
        Route::post('', 'store')->name('.store');
        Route::delete('{release}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{release}/edit', 'edit')->name('.edit');
        Route::patch('/{release}/edit', 'update')->name('.update');
        Route::get('/{release}/changelog/edit', 'editChangelog')->name('.changelog.edit');
        Route::patch('/{release}/changelog/edit', 'updateChangelog')->name('.changelog.update');
    });

    Route::controller(AdminPlatformController::class)->prefix('platforms')->as('.platforms')->group(function() {
        Route::get('', 'index')->name('');
        Route::post('', 'store')->name('.store');
        Route::delete('{platform}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{platform}/edit', 'edit')->name('.edit');
        Route::patch('/{platform}/edit', 'update')->name('.update');
    });

    Route::controller(AdminTweetStreamController::class)->prefix('tweet_streams')->as('.tweet_streams')->group(function() {
        Route::get('', 'index')->name('');
        Route::post('', 'store')->name('.store');
        Route::delete('{tweet_stream}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{tweet_stream}/edit', 'edit')->name('.edit');
        Route::patch('/{tweet_stream}/edit', 'update')->name('.update');
    });

    Route::controller(AdminChannelController::class)->prefix('channels')->as('.channels')->group(function() {
        Route::post('', 'store')->name('.store');
        Route::delete('{channel}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{channel}/edit', 'edit')->name('.edit');
        Route::patch('/{channel}/edit', 'update')->name('.update');
    });

    Route::controller(AdminReleaseChannelController::class)->prefix('releasechannels')->as('.releasechannels')->group(function() {
        Route::get('', 'index')->name('');
        Route::post('', 'store')->name('.store');
        Route::delete('{release_channel}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{release_channel}/edit', 'edit')->name('.edit');
        Route::patch('/{release_channel}/edit', 'update')->name('.update');
        Route::patch('/{release_channel}/toggle', 'toggleSupported')->name('.toggleSupported');
    });

    Route::controller(AdminFlightController::class)->prefix('flights')->as('.flights')->group(function() {
        Route::get('', 'index')->name('');
        Route::post('', 'store')->name('.store');
        Route::delete('{flight}', 'destroy')->name('.destroy');
        Route::get('/create', 'create')->name('.create');
        Route::get('/{flight}/edit', 'edit')->name('.edit');
        Route::patch('/{flight}/edit', 'update')->name('.update');
    });
});

require __DIR__.'/auth.php';
