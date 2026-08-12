<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Services\Marketing\BudgetAllocatorService;
use Inertia\Inertia;

class BudgetAllocatorController extends Controller
{
    protected BudgetAllocatorService $budgetAllocatorService;

    public function __construct(BudgetAllocatorService $budgetAllocatorService)
    {
        $this->budgetAllocatorService = $budgetAllocatorService;
    }

    public function index()
    {
        return Inertia::render('Marketing/BudgetAllocator/Index', [
            'brands' => $this->budgetAllocatorService->getActiveBrands()
        ]);
    }
}
