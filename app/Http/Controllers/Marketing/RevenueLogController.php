<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Marketing\RevenueLogRequest;
use App\Models\RevenueLog;
use App\Services\Marketing\RevenueLogService;
use Inertia\Inertia;

class RevenueLogController extends Controller
{
    protected RevenueLogService $revenueLogService;

    public function __construct(RevenueLogService $revenueLogService)
    {
        $this->revenueLogService = $revenueLogService;
    }

    public function index()
    {
        return Inertia::render('Marketing/RevenueLogs/Index', [
            'logs' => $this->revenueLogService->getAllLogs()
        ]);
    }

    public function store(RevenueLogRequest $request)
    {
        $this->revenueLogService->createLog($request->validated());
        return back()->with('success', 'Revenue Log created successfully.');
    }

    public function update(RevenueLogRequest $request, RevenueLog $revenueLog)
    {
        $this->revenueLogService->updateLog($revenueLog, $request->validated());
        return back()->with('success', 'Revenue Log updated successfully.');
    }

    public function destroy(RevenueLog $revenueLog)
    {
        $this->revenueLogService->deleteLog($revenueLog);
        return back()->with('success', 'Revenue Log deleted.');
    }
}
