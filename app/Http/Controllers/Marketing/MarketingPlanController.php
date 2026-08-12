<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Marketing\MarketingPlanRequest;
use App\Models\MarketingPlan;
use App\Services\Marketing\MarketingPlanService;
use Inertia\Inertia;

class MarketingPlanController extends Controller
{
    protected MarketingPlanService $marketingPlanService;

    public function __construct(MarketingPlanService $marketingPlanService)
    {
        $this->marketingPlanService = $marketingPlanService;
    }

    public function index()
    {
        return Inertia::render('Marketing/Plans/Index', [
            'plans' => $this->marketingPlanService->getAllPlans()
        ]);
    }

    public function store(MarketingPlanRequest $request)
    {
        $this->marketingPlanService->createPlan($request->validated());
        return back()->with('success', 'Marketing Plan created successfully.');
    }

    public function update(MarketingPlanRequest $request, MarketingPlan $marketingPlan)
    {
        $this->marketingPlanService->updatePlan($marketingPlan, $request->validated());
        return back()->with('success', 'Marketing Plan updated successfully.');
    }

    public function destroy(MarketingPlan $marketingPlan)
    {
        $this->marketingPlanService->deletePlan($marketingPlan);
        return back()->with('success', 'Marketing Plan deleted.');
    }
}
