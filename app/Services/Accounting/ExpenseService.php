<?php

namespace App\Services\Accounting;

use App\Models\Accounting\AccountingExpense;
use Illuminate\Support\Facades\DB;

class ExpenseService
{
    /**
     * Create a new expense entry and update project/cash account balances.
     */
    public function recordExpense(array $data, int $userId): AccountingExpense
    {
        return DB::transaction(function () use ($data, $userId) {
            $data['recorded_by'] = $userId;
            
            $expense = AccountingExpense::create($data);

            if ($expense->status === 'posted') {
                $this->updateBalances($expense, 'subtract');
            }

            return $expense;
        });
    }

    /**
     * Update an existing expense entry.
     */
    public function updateExpense(AccountingExpense $expense, array $data): AccountingExpense
    {
        return DB::transaction(function () use ($expense, $data) {
            // Revert old balances if it was posted
            if ($expense->status === 'posted') {
                $this->updateBalances($expense, 'add');
            }

            $expense->update($data);

            // Apply new balances if it is posted
            if ($expense->status === 'posted') {
                $this->updateBalances($expense, 'subtract');
            }

            return $expense;
        });
    }

    /**
     * Void an expense transaction.
     */
    public function voidExpense(AccountingExpense $expense): void
    {
        DB::transaction(function () use ($expense) {
            if ($expense->status === 'posted') {
                $this->updateBalances($expense, 'add');
            }

            $expense->update(['status' => 'voided']);
        });
    }

    /**
     * Adjust the balances of the project and cash account.
     */
    private function updateBalances(AccountingExpense $expense, string $operation): void
    {
        $amount = $expense->amount;
        if ($operation === 'subtract') {
            $amount = -$amount;
        }

        // Expenses reduce project balance, so 'add' means reversing the expense (increasing balance)
        if ($expense->project) {
            $project = $expense->project;
            $project->current_balance += $amount;
            $project->save();
        }

        // Update Cash Account Balance if associated with one
        if ($expense->cashAccount) {
            $cashAccount = $expense->cashAccount;
            $cashAccount->current_balance += $amount;
            $cashAccount->save();
        }
    }
}
