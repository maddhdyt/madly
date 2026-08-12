<?php

namespace App\Services\Marketing;

use App\Models\AdIdentity;

class PowerRankService
{
    public function getLeaderboard(): \Illuminate\Support\Collection
    {
        $identities = AdIdentity::with(['marketingBrand', 'sales', 'dailyMetrics'])->get();

        return $identities->groupBy('marketing_brand_id')->map(function ($group) {
            $totalPower = $group->sum('power_points');
            
            $allMetrics = collect();
            foreach ($group as $identity) {
                if ($identity->dailyMetrics) {
                    $allMetrics = $allMetrics->concat($identity->dailyMetrics);
                }
            }

            $totalSpend = $allMetrics->sum('ad_spend');
            $totalRevenue = $allMetrics->sum('revenue');
            $roas = $totalSpend > 0 ? round($totalRevenue / $totalSpend, 2) : 0;
            
            $levelName = 'Iron';
            $levelColor = 'text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
            
            if ($totalPower >= 500) {
                $levelName = 'Platinum';
                $levelColor = 'text-slate-800 bg-slate-200 dark:bg-slate-300 dark:text-slate-900 border-slate-400 shadow-[0_0_15px_rgba(203,213,225,0.6)]';
            } elseif ($totalPower >= 300) {
                $levelName = 'Gold';
                $levelColor = 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-400 border-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]';
            } elseif ($totalPower >= 150) {
                $levelName = 'Silver';
                $levelColor = 'text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 border-gray-400';
            } elseif ($totalPower >= 50) {
                $levelName = 'Bronze';
                $levelColor = 'text-orange-800 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400 border-orange-300';
            }

            return [
                'brand' => $group->first()->marketingBrand,
                'total_power' => $totalPower,
                'campaign_count' => $group->count(),
                'total_spend' => $totalSpend,
                'total_revenue' => $totalRevenue,
                'roas' => $roas,
                'level' => [
                    'name' => $levelName,
                    'colorClass' => $levelColor
                ]
            ];
        })->sortByDesc('total_power')->values();
    }
}
