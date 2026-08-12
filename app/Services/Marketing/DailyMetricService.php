<?php

namespace App\Services\Marketing;

use App\Models\DailyMetric;
use App\Models\MarketingBrand;

class DailyMetricService
{
    public function getDailyMetricPageData(): array
    {
        return [
            'brands' => MarketingBrand::where('is_active', true)->orderBy('name')->get(),
            'metrics' => DailyMetric::with('marketingBrand')
                ->orderBy('date', 'desc')
                ->take(50)
                ->get(),
        ];
    }

    public function upsertMetric(array $validatedData): DailyMetric
    {
        return DailyMetric::updateOrCreate(
            [
                'marketing_brand_id' => $validatedData['marketing_brand_id'],
                'date' => $validatedData['date'],
            ],
            [
                'ad_spend' => $validatedData['ad_spend'],
                'clicks' => $validatedData['clicks'],
                'leads' => $validatedData['leads'],
                'revenue' => $validatedData['revenue'],
            ]
        );
    }

    public function deleteMetric(DailyMetric $dailyMetric): ?bool
    {
        return $dailyMetric->delete();
    }
}
