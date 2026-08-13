<?php

namespace App\Services\Accounting;

use App\Models\Accounting\AccountingClosing;
use App\Models\Accounting\AccountingClosingItem;
use App\Models\Accounting\AccountingRevenue;
use App\Models\Accounting\AccountingExpense;
use App\Models\Accounting\CalculationRule;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ClosingService
{
    /**
     * Perform daily closing for a specific date.
     */
    public function closeDay(Carbon $date, int $userId, ?string $notes = null): AccountingClosing
    {
        return DB::transaction(function () use ($date, $userId, $notes) {
            $dateString = $date->toDateString();

            // Prevent duplicate closing
            $existing = AccountingClosing::where('closing_date', $dateString)->first();
            if ($existing && $existing->status === 'closed') {
                throw new \Exception("The date {$dateString} is already closed.");
            }

            $totalRevenue = AccountingRevenue::where('status', 'posted')
                ->whereDate('transaction_date', $dateString)
                ->sum('amount');

            $expenses = AccountingExpense::with('expenseCategory', 'calculationRule.versions')
                ->where('status', 'posted')
                ->whereDate('transaction_date', $dateString)
                ->get();

            $totalExpense = $expenses->sum('amount');
            $dailySettlement = $totalRevenue - $totalExpense;

            // Capture snapshot of active rules
            $snapshotRules = CalculationRule::with(['versions' => function ($query) use ($dateString) {
                $query->where('effective_from', '<=', $dateString)
                      ->where(function ($q) use ($dateString) {
                          $q->whereNull('effective_until')
                            ->orWhere('effective_until', '>=', $dateString);
                      });
            }])->get()->toArray();

            // Create closing record
            $closing = AccountingClosing::updateOrCreate(
                ['closing_date' => $dateString],
                [
                    'total_revenue' => $totalRevenue,
                    'total_expense' => $totalExpense,
                    'daily_settlement' => $dailySettlement,
                    'status' => 'closed',
                    'closed_by' => $userId,
                    'closed_at' => now(),
                    'notes' => $notes,
                    'snapshot_rules' => $snapshotRules,
                ]
            );

            // Create closing items (aggregate by category)
            $expenseGroups = $expenses->groupBy('expense_category_id');
            
            // Clear old items if re-closing
            $closing->items()->delete();

            // Add Revenue as a line item
            $closing->items()->create([
                'expense_category_id' => null,
                'label' => 'Total Penerimaan',
                'amount' => $totalRevenue,
                'item_type' => 'revenue',
                'sort_order' => 0,
            ]);

            $sortOrder = 1;
            foreach ($expenseGroups as $categoryId => $categoryExpenses) {
                $category = $categoryExpenses->first()->expenseCategory;
                $amount = $categoryExpenses->sum('amount');
                
                // Get rule snapshot if applicable
                $ruleSnapshot = null;
                $firstRuleExpense = $categoryExpenses->whereNotNull('calculation_rule_id')->first();
                if ($firstRuleExpense && $firstRuleExpense->calculationRule) {
                    $version = $firstRuleExpense->calculationRule->getActiveVersion($dateString);
                    if ($version) {
                        $ruleSnapshot = $version->value;
                    }
                }

                $label = $category->name ?? 'Uncategorized Expense';
                if ($ruleSnapshot) {
                    $label .= " " . (float)$ruleSnapshot . "%";
                }

                $closing->items()->create([
                    'expense_category_id' => $categoryId,
                    'label' => $label,
                    'amount' => $amount,
                    'item_type' => 'expense',
                    'rule_value_snapshot' => $ruleSnapshot,
                    'sort_order' => $sortOrder++,
                ]);
            }

            return $closing->load('items');
        });
    }
}
