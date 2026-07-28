<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\PricelistController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ChatSnippetController;
use App\Http\Controllers\Admin\BrochureController;
use App\Http\Controllers\Admin\CalculatorController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\GlobalSearchController;
use App\Http\Controllers\AuthController;

Route::get('login', [AuthController::class, 'create'])->name('login')->middleware('guest');
Route::post('login', [AuthController::class, 'store'])->middleware('guest');
Route::post('logout', [AuthController::class, 'destroy'])->name('logout')->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('calculator', [CalculatorController::class, 'index'])->name('calculator.index');
        Route::post('calculator', [CalculatorController::class, 'store'])->name('calculator.store');
        Route::get('quotations/{id}/pdf', [CalculatorController::class, 'generatePdf'])->name('quotations.pdf');
        
        Route::get('search', [GlobalSearchController::class, 'search'])->name('search');

        // Sales can only access the above. Manager can access below:
        Route::middleware('role:manager')->group(function () {
            Route::resource('chat-snippets', ChatSnippetController::class)->except(['create', 'edit', 'show']);
            Route::resource('products', ProductController::class)->except(['create', 'edit']);
            Route::resource('services', ServiceController::class)->except(['show']);
            Route::resource('pricelists', PricelistController::class)->except(['create', 'edit', 'show']);
            Route::resource('brands', BrandController::class)->except(['create', 'edit', 'show']);
            Route::resource('brochures', BrochureController::class)->except(['show']);
        });

        // Admin only
        Route::middleware('role:admin')->group(function () {
            Route::resource('users', UserController::class)->except(['create', 'edit', 'show']);
            Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
            Route::post('settings', [SettingController::class, 'store'])->name('settings.store');
        });
    });
});
