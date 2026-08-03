<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\DailyMetric;
use App\Models\MarketingBrand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DailyMetricController extends Controller
{
    public function index(Request $request)
    {
        $brands = MarketingBrand::where('is_active', true)->orderBy('name')->get();
        
        // Fetch recent metrics to display in a table
        $metrics = DailyMetric::with('marketingBrand')
            ->orderBy('date', 'desc')
            ->take(50)
            ->get();

        return Inertia::render('Marketing/DailyMetrics/Index', [
            'brands' => $brands,
            'metrics' => $metrics,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'marketing_brand_id' => 'required|exists:marketing_brands,id',
            'date' => 'required|date',
            'ad_spend' => 'required|numeric|min:0',
            'clicks' => 'required|integer|min:0',
            'leads' => 'required|integer|min:0',
            'revenue' => 'required|numeric|min:0',
        ]);

        DailyMetric::updateOrCreate(
            [
                'marketing_brand_id' => $validated['marketing_brand_id'],
                'date' => $validated['date'],
            ],
            [
                'ad_spend' => $validated['ad_spend'],
                'clicks' => $validated['clicks'],
                'leads' => $validated['leads'],
                'revenue' => $validated['revenue'],
            ]
        );

        return back()->with('success', 'Metrik harian berhasil disimpan.');
    }

    public function destroy(DailyMetric $dailyMetric)
    {
        $dailyMetric->delete();
        return back()->with('success', 'Metrik harian berhasil dihapus.');
    }
}
