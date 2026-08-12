<?php

namespace App\Services\Marketing;

use App\Models\MarketingBrand;
use Illuminate\Database\Eloquent\Collection;

class BudgetAllocatorService
{
    public function getActiveBrands(): Collection
    {
        return MarketingBrand::where('is_active', true)->get();
    }
}
