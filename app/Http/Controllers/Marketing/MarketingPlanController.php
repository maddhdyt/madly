<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\MarketingPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketingPlanController extends Controller
{
    public function index()
    {
        $plans = MarketingPlan::orderBy('month_year', 'desc')->get();
        return Inertia::render('Marketing/Plans/Index', [
            'plans' => $plans
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'month_year' => 'required|date',
            'title' => 'required|string|max:255',
            'objective' => 'nullable|string',
            'strategies' => 'nullable|array',
            'status' => 'required|string|in:Draft,Active,Completed',
        ]);

        MarketingPlan::create($validated);
        return back()->with('success', 'Marketing Plan created successfully.');
    }

    public function update(Request $request, MarketingPlan $marketingPlan)
    {
        $validated = $request->validate([
            'month_year' => 'required|date',
            'title' => 'required|string|max:255',
            'objective' => 'nullable|string',
            'strategies' => 'nullable|array',
            'status' => 'required|string|in:Draft,Active,Completed',
        ]);

        $marketingPlan->update($validated);
        return back()->with('success', 'Marketing Plan updated successfully.');
    }

    public function destroy(MarketingPlan $marketingPlan)
    {
        $marketingPlan->delete();
        return back()->with('success', 'Marketing Plan deleted.');
    }
}
