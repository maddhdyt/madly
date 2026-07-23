<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\PricelistController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ChatSnippetController;

Route::get('/', [DashboardController::class, 'index'])->name('home');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('products', ProductController::class)->except(['create', 'edit']);
    Route::resource('services', ServiceController::class)->except(['show']);
    Route::resource('pricelists', PricelistController::class)->except(['create', 'edit', 'show']);
    Route::resource('brands', BrandController::class)->except(['create', 'edit', 'show']);
    Route::resource('chat-snippets', ChatSnippetController::class)->except(['create', 'edit', 'show']);
});
