<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BudgetAllocatorController extends Controller
{
    public function index()
    {
        $brands = \App\Models\MarketingBrand::where('is_active', true)->get();
        return inertia('Marketing/BudgetAllocator/Index', [
            'brands' => $brands
        ]);
    }
}
