<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\PricelistController;
use App\Http\Controllers\Admin\FeatureController;
use App\Http\Controllers\Admin\QuotationController;
use App\Http\Controllers\Admin\ChatSnippetController;
use App\Http\Controllers\Admin\BrochureController;
use App\Http\Controllers\Admin\CalculatorController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\GlobalSearchController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Marketing\DashboardController as MarketingDashboardController;
use App\Http\Controllers\Marketing\AdIdentityController;
use App\Http\Controllers\Marketing\BrandController as MarketingBrandController;
use App\Http\Controllers\Marketing\QuotationController as MarketingQuotationController;
use App\Http\Controllers\Marketing\SettingController as MarketingSettingController;
use App\Http\Controllers\Marketing\RoasCalculatorController;
use App\Http\Controllers\Marketing\UtmBuilderController;
use App\Http\Controllers\Marketing\BudgetAllocatorController;
use App\Http\Controllers\Marketing\DailyMetricController;
use App\Http\Controllers\Marketing\PowerRankController;
use App\Http\Controllers\Marketing\CompetitorController;
use App\Http\Controllers\Marketing\BattlecardController;
use App\Http\Controllers\Marketing\AdSwipeController;
use App\Http\Controllers\Marketing\MarketingPlanController;
use App\Http\Controllers\Marketing\RevenueLogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;

Route::get('login', [AuthController::class, 'create'])->name('login')->middleware('guest');
Route::post('login', [AuthController::class, 'store'])->middleware('guest');
Route::post('logout', [AuthController::class, 'destroy'])->name('logout')->middleware('auth');

Route::post('language', function (\Illuminate\Http\Request $request) {
    $request->validate(['locale' => 'required|in:en,id']);
    session(['locale' => $request->locale]);
    return back();
})->name('language.switch');

// Marketing Login Routes
Route::get('marketing/login', [\App\Http\Controllers\Marketing\AuthController::class, 'create'])->name('marketing.login')->middleware('guest');
Route::post('marketing/login', [\App\Http\Controllers\Marketing\AuthController::class, 'store'])->middleware('guest');

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('calculator', [CalculatorController::class, 'index'])->name('calculator.index');
        Route::post('calculator', [CalculatorController::class, 'store'])->name('calculator.store');
        Route::get('quotations/{id}/pdf', [CalculatorController::class, 'generatePdf'])->name('quotations.pdf');
        
        Route::get('search', [GlobalSearchController::class, 'search'])->name('search');
        Route::resource('chat-snippets', ChatSnippetController::class)->except(['create', 'edit', 'show']);

        // Sales can only access the above. Manager can access below:
        Route::middleware('role:manager')->group(function () {
            Route::resource('products', ProductController::class)->except(['create', 'edit']);
            Route::resource('services', ServiceController::class)->except(['show']);
            Route::get('pricelists', [PricelistController::class, 'index'])->name('pricelists.index');
            Route::post('pricelists/bulk-update', [PricelistController::class, 'bulkUpdate'])->name('pricelists.bulk-update');
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

    // Marketing Module
    Route::prefix('marketing')->name('marketing.')->middleware('role:marketing')->group(function () {
        Route::get('/', [\App\Http\Controllers\Marketing\DashboardController::class, 'index'])->name('home');
        Route::resource('ad-identities', \App\Http\Controllers\Marketing\AdIdentityController::class)->except(['create', 'show', 'edit']);
        Route::resource('brands', \App\Http\Controllers\Marketing\MarketingBrandController::class)->except(['create', 'show', 'edit']);
        Route::resource('utm-builder', \App\Http\Controllers\Marketing\UtmBuilderController::class)->only(['index', 'store', 'destroy']);
        Route::get('roas-calculator', [\App\Http\Controllers\Marketing\RoasCalculatorController::class, 'index'])->name('roas-calculator.index');
        Route::get('budget-allocator', [\App\Http\Controllers\Marketing\BudgetAllocatorController::class, 'index'])->name('budget-allocator.index');
        Route::get('power-rank', [\App\Http\Controllers\Marketing\PowerRankController::class, 'index'])->name('power-rank.index');
        Route::resource('daily-metrics', \App\Http\Controllers\Marketing\DailyMetricController::class)->only(['index', 'store', 'destroy']);
        
        // Competitor Research
        Route::resource('competitors', \App\Http\Controllers\Marketing\CompetitorController::class)->except(['create', 'edit', 'show']);
        Route::post('competitors/{competitor}/battlecards', [\App\Http\Controllers\Marketing\CompetitorController::class, 'storeBattlecard'])->name('competitors.battlecards.store');
        Route::put('battlecards/{battlecard}', [\App\Http\Controllers\Marketing\CompetitorController::class, 'updateBattlecard'])->name('battlecards.update');
        Route::delete('battlecards/{battlecard}', [\App\Http\Controllers\Marketing\CompetitorController::class, 'destroyBattlecard'])->name('battlecards.destroy');

        // Ad Swipes
        Route::resource('ad-swipes', \App\Http\Controllers\Marketing\AdSwipeController::class)->except(['create', 'edit', 'show']);

        // Planner & Logs
        Route::resource('marketing-plans', \App\Http\Controllers\Marketing\MarketingPlanController::class)->except(['create', 'edit', 'show']);
        Route::resource('revenue-logs', \App\Http\Controllers\Marketing\RevenueLogController::class)->except(['create', 'edit', 'show']);
    });
});
