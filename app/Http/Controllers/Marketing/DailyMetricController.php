<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Marketing\DailyMetricRequest;
use App\Models\DailyMetric;
use App\Services\Marketing\DailyMetricService;
use Inertia\Inertia;

class DailyMetricController extends Controller
{
    protected DailyMetricService $dailyMetricService;

    public function __construct(DailyMetricService $dailyMetricService)
    {
        $this->dailyMetricService = $dailyMetricService;
    }

    public function index()
    {
        return Inertia::render('Marketing/DailyMetrics/Index', $this->dailyMetricService->getDailyMetricPageData());
    }

    public function store(DailyMetricRequest $request)
    {
        $this->dailyMetricService->upsertMetric($request->validated());
        return back()->with('success', 'Metrik harian berhasil disimpan.');
    }

    public function destroy(DailyMetric $dailyMetric)
    {
        $this->dailyMetricService->deleteMetric($dailyMetric);
        return back()->with('success', 'Metrik harian berhasil dihapus.');
    }
}
