<?php

namespace App\Services\Marketing;

use App\Models\MarketingPlan;
use Illuminate\Database\Eloquent\Collection;

class MarketingPlanService
{
    public function getAllPlans(): Collection
    {
        return MarketingPlan::orderBy('month_year', 'desc')->get();
    }

    public function createPlan(array $data): MarketingPlan
    {
        return MarketingPlan::create($data);
    }

    public function updatePlan(MarketingPlan $marketingPlan, array $data): bool
    {
        return $marketingPlan->update($data);
    }

    public function deletePlan(MarketingPlan $marketingPlan): ?bool
    {
        return $marketingPlan->delete();
    }
}
