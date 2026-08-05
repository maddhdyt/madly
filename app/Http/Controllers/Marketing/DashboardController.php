<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\DailyMetric;
use App\Models\AdIdentity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Quick Stats Data
        $startDate = Carbon::now()->subDays(6)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $metrics = DailyMetric::whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'asc')
            ->get();

        $totalSpend = $metrics->sum('ad_spend');
        $totalRevenue = $metrics->sum('revenue');
        $totalLeads = $metrics->sum('leads');
        
        $roas = $totalSpend > 0 ? round($totalRevenue / $totalSpend, 2) : 0;
        $cpa = $totalLeads > 0 ? round($totalSpend / $totalLeads, 0) : 0;

        // 2. Chart Data (Last 7 Days)
        $dates = [];
        $chartData = [];
        
        for ($i = 6; $i >= 0; $i--) {
            $dateStr = Carbon::now()->subDays($i)->format('Y-m-d');
            $dates[] = Carbon::now()->subDays($i)->format('M d');
            
            $dayMetrics = $metrics->filter(fn($m) => $m->date->format('Y-m-d') === $dateStr);
            $chartData[] = $dayMetrics->sum('revenue');
        }

        // Active Campaigns
        $activeIdentitiesCount = AdIdentity::where('is_active', true)->count();

        // 3. Leaderboard & Recent Ads
        $identities = AdIdentity::with('marketingBrand')->get();
        $totalPower = $identities->sum('power_points');
        $totalBrands = $identities->pluck('marketing_brand_id')->unique()->count();

        $leaderboard = $identities->groupBy('marketing_brand_id')->map(function ($group) {
            $totalPower = $group->sum('power_points');
            
            // Determine Level
            $levelName = 'Iron';
            $levelColor = 'text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
            
            if ($totalPower >= 500) {
                $levelName = 'Platinum';
                $levelColor = 'text-slate-800 bg-slate-200 dark:bg-slate-300 dark:text-slate-900 shadow-[0_0_10px_rgba(203,213,225,0.5)]';
            } elseif ($totalPower >= 300) {
                $levelName = 'Gold';
                $levelColor = 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.2)]';
            } elseif ($totalPower >= 150) {
                $levelName = 'Silver';
                $levelColor = 'text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-300';
            } elseif ($totalPower >= 50) {
                $levelName = 'Bronze';
                $levelColor = 'text-orange-800 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400';
            }

            return [
                'brand' => $group->first()->marketingBrand,
                'total_power' => $totalPower,
                'campaign_count' => $group->count(),
                'level' => [
                    'name' => $levelName,
                    'colorClass' => $levelColor
                ]
            ];
        })->sortByDesc('total_power')->take(5)->values();

        $recentAds = \App\Models\AdIdentity::with(['marketingBrand', 'sales'])->latest()->take(5)->get();

        $activeCampaigns = $identities->where('is_active', true)->count();

        return Inertia::render('Marketing/Dashboard', [
            'stats' => [
                'totalPower' => $totalPower,
                'activeCampaigns' => $activeCampaigns,
                'totalBrands' => $totalBrands,
            ],
            'quickStats' => [
                'totalSpend' => $totalSpend,
                'totalRevenue' => $totalRevenue,
                'roas' => $roas,
                'cpa' => $cpa,
                'activeIdentitiesCount' => $activeIdentitiesCount,
            ],
            'chartData' => [
                'labels' => $dates,
                'data' => $chartData
            ],
            'leaderboard' => $leaderboard,
            'recentAds' => $recentAds
        ]);
    }
}
