<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ServiceController;

Route::get('/', [DashboardController::class, 'index'])->name('home');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('products', ProductController::class)->except(['create', 'edit']);
    Route::resource('services', ServiceController::class)->except(['show']);
});
