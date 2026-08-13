<?php

namespace App\Services\Accounting;

use App\Models\Accounting\AccountingPeriodClosing;
use App\Models\Accounting\ProfitSharingScheme;
use Illuminate\Support\Facades\DB;

class ProfitDistributionService
{
    /**
     * Calculate and apply profit distribution for a given period.
     */
    public function distributeProfit(AccountingPeriodClosing $periodClosing): void
    {
        DB::transaction(function () use ($periodClosing) {
            $totalProfit = $periodClosing->total_daily_settlements;

            // Clear old distributions if recalculating
            $periodClosing->distributions()->delete();

            if ($totalProfit <= 0) {
                return; // Nothing to distribute
            }

            // Find active schemes for all projects during this period
            // Note: Zeasy Accounting System Explanation #28: 
            // The profit sharing scheme is based on total daily settlements (Period Total)
            
            // For simplicity, we assume one global active scheme for the period 
            // (or multiple active schemes if project-based).
            // Let's get the active schemes at the end of the period.
            $schemes = ProfitSharingScheme::with('items.participant')
                ->where('is_active', true)
                ->where('effective_from', '<=', $periodClosing->period_end)
                ->where(function ($q) use ($periodClosing) {
                    $q->whereNull('effective_until')
                      ->orWhere('effective_until', '>=', $periodClosing->period_end);
                })
                ->get();

            if ($schemes->isEmpty()) {
                return; // No active scheme, company keeps everything
            }

            // If we have multiple projects, we should ideally calculate per project.
            // For now, if there's a global scheme, we apply it to the total.
            // Let's apply the first active scheme found for simplicity,
            // or iterate if we are splitting period totals per project.
            
            $activeScheme = $schemes->first();

            foreach ($activeScheme->items as $item) {
                $distributedAmount = ($totalProfit * $item->share_percentage) / 100;

                $periodClosing->distributions()->create([
                    'profit_sharing_scheme_id' => $activeScheme->id,
                    'profit_participant_id' => $item->profit_participant_id,
                    'share_percentage' => $item->share_percentage,
                    'distributed_amount' => $distributedAmount,
                    'notes' => 'Period distribution',
                ]);
            }
        });
    }
}
