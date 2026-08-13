<?php

namespace App\Services\Accounting;

use App\Models\Accounting\AccountingProject;
use App\Models\Accounting\CalculationRule;
use App\Models\Accounting\AccountingExpense;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CalculationService
{
    /**
     * Resolve rule-based expenses for a project on a specific date.
     * Calculates things like "Advertising 4% of Revenue".
     */
    public function resolveRuleBasedExpenses(AccountingProject $project, Carbon $date, int $userId): array
    {
        $resolvedExpenses = [];
        
        $rules = CalculationRule::with('expenseCategory')->where('is_active', true)->get();
        
        // Get total revenue for the project on this date
        $dailyRevenue = $project->revenues()
            ->where('status', 'posted')
            ->whereDate('transaction_date', $date->toDateString())
            ->sum('amount');

        foreach ($rules as $rule) {
            $activeVersion = $rule->getActiveVersion($date->toDateString());
            
            if (!$activeVersion) {
                continue;
            }

            $amount = 0;

            if ($rule->calculation_type === 'percentage_of_revenue') {
                $amount = ($dailyRevenue * $activeVersion->value) / 100;
            } elseif ($rule->calculation_type === 'fixed_amount') {
                $amount = $activeVersion->value;
            }

            if ($amount > 0) {
                $expense = AccountingExpense::create([
                    'accounting_project_id' => $project->id,
                    'expense_category_id' => $rule->expense_category_id,
                    'transaction_date' => $date->toDateString(),
                    'amount' => $amount,
                    'description' => "Auto-calculated: {$rule->rule_name}",
                    'expense_type' => 'rule_based',
                    'status' => 'posted',
                    'is_auto_calculated' => true,
                    'calculation_rule_id' => $rule->id,
                    'recorded_by' => $userId,
                ]);

                // Reduce project balance
                $project->current_balance -= $amount;
                $project->save();

                $resolvedExpenses[] = $expense;
            }
        }

        return $resolvedExpenses;
    }
}
