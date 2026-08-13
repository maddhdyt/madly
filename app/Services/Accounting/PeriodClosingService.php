<?php

namespace App\Services\Accounting;

use App\Models\Accounting\AccountingPeriodClosing;
use App\Models\Accounting\AccountingClosing;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PeriodClosingService
{
    protected ProfitDistributionService $profitDistributionService;

    public function __construct(ProfitDistributionService $profitDistributionService)
    {
        $this->profitDistributionService = $profitDistributionService;
    }

    /**
     * Create a period closing from daily closings.
     */
    public function closePeriod(string $periodName, Carbon $startDate, Carbon $endDate, int $userId, ?string $notes = null): AccountingPeriodClosing
    {
        return DB::transaction(function () use ($periodName, $startDate, $endDate, $userId, $notes) {
            // Validate that we don't overlap existing periods
            $existing = AccountingPeriodClosing::where('period_start', $startDate->toDateString())
                ->where('period_end', $endDate->toDateString())
                ->first();

            if ($existing && $existing->status === 'closed') {
                throw new \Exception("The period from {$startDate->toDateString()} to {$endDate->toDateString()} is already closed.");
            }

            // Get all daily closings in this range
            $dailyClosings = AccountingClosing::where('status', 'closed')
                ->whereBetween('closing_date', [$startDate->toDateString(), $endDate->toDateString()])
                ->orderBy('closing_date')
                ->get();

            if ($dailyClosings->isEmpty()) {
                throw new \Exception("No daily closings found in this period.");
            }

            $totalDailySettlements = $dailyClosings->sum('daily_settlement');
            $totalRevenue = $dailyClosings->sum('total_revenue');
            $totalExpense = $dailyClosings->sum('total_expense');

            $periodClosing = AccountingPeriodClosing::updateOrCreate(
                [
                    'period_start' => $startDate->toDateString(),
                    'period_end' => $endDate->toDateString(),
                ],
                [
                    'period_name' => $periodName,
                    'total_daily_settlements' => $totalDailySettlements,
                    'total_revenue' => $totalRevenue,
                    'total_expense' => $totalExpense,
                    'status' => 'closed',
                    'closed_by' => $userId,
                    'closed_at' => now(),
                    'notes' => $notes,
                ]
            );

            // Sync daily closing items
            $periodClosing->items()->delete();
            foreach ($dailyClosings as $daily) {
                $periodClosing->items()->create([
                    'closing_id' => $daily->id,
                    'closing_date' => $daily->closing_date,
                    'daily_settlement' => $daily->daily_settlement,
                ]);
            }

            // Run profit distribution calculation for this period
            $this->profitDistributionService->distributeProfit($periodClosing);

            return $periodClosing->load(['items', 'distributions.participant', 'distributions.scheme']);
        });
    }
}
