<?php

namespace App\Services\Accounting;

use App\Models\Accounting\AccountingProject;
use App\Models\Accounting\AccountingRevenue;
use App\Models\Accounting\CashAccount;
use Illuminate\Support\Facades\DB;

class RevenueService
{
    /**
     * Create a new revenue entry and update project and cash account balances.
     */
    public function recordRevenue(array $data, int $userId): AccountingRevenue
    {
        return DB::transaction(function () use ($data, $userId) {
            $data['recorded_by'] = $userId;
            
            $revenue = AccountingRevenue::create($data);

            if ($revenue->status === 'posted') {
                $this->updateBalances($revenue, 'add');
            }

            return $revenue;
        });
    }

    /**
     * Update an existing revenue entry.
     */
    public function updateRevenue(AccountingRevenue $revenue, array $data): AccountingRevenue
    {
        return DB::transaction(function () use ($revenue, $data) {
            // Revert old balances if it was posted
            if ($revenue->status === 'posted') {
                $this->updateBalances($revenue, 'subtract');
            }

            $revenue->update($data);

            // Apply new balances if it is posted
            if ($revenue->status === 'posted') {
                $this->updateBalances($revenue, 'add');
            }

            return $revenue;
        });
    }

    /**
     * Void a revenue transaction.
     */
    public function voidRevenue(AccountingRevenue $revenue): void
    {
        DB::transaction(function () use ($revenue) {
            if ($revenue->status === 'posted') {
                $this->updateBalances($revenue, 'subtract');
            }

            $revenue->update(['status' => 'voided']);
        });
    }

    /**
     * Adjust the balances of the project and cash account.
     */
    private function updateBalances(AccountingRevenue $revenue, string $operation): void
    {
        $amount = $revenue->amount;
        if ($operation === 'subtract') {
            $amount = -$amount;
        }

        // Update Project Balance
        $project = $revenue->project;
        $project->current_balance += $amount;
        $project->save();

        // Update Cash Account Balance
        $cashAccount = $revenue->cashAccount;
        $cashAccount->current_balance += $amount;
        $cashAccount->save();
    }
}
