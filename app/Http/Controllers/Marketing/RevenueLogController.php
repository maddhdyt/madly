<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\RevenueLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RevenueLogController extends Controller
{
    public function index()
    {
        $logs = RevenueLog::orderBy('date', 'desc')->get();
        return Inertia::render('Marketing/RevenueLogs/Index', [
            'logs' => $logs
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'revenue_amount' => 'nullable|numeric',
            'trend' => 'required|string|in:up,down,stable',
            'reason' => 'required|string',
        ]);

        RevenueLog::create($validated);
        return back()->with('success', 'Revenue Log created successfully.');
    }

    public function update(Request $request, RevenueLog $revenueLog)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'revenue_amount' => 'nullable|numeric',
            'trend' => 'required|string|in:up,down,stable',
            'reason' => 'required|string',
        ]);

        $revenueLog->update($validated);
        return back()->with('success', 'Revenue Log updated successfully.');
    }

    public function destroy(RevenueLog $revenueLog)
    {
        $revenueLog->delete();
        return back()->with('success', 'Revenue Log deleted.');
    }
}
