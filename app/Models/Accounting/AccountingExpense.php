<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountingExpense extends Model
{
    protected $fillable = [
        'accounting_project_id',
        'expense_category_id',
        'cash_account_id',
        'transaction_date',
        'amount',
        'description',
        'reference_number',
        'expense_type',
        'status',
        'is_auto_calculated',
        'calculation_rule_id',
        'recorded_by',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2',
        'is_auto_calculated' => 'boolean',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(AccountingProject::class, 'accounting_project_id');
    }

    public function expenseCategory(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class);
    }

    public function cashAccount(): BelongsTo
    {
        return $this->belongsTo(CashAccount::class);
    }

    public function calculationRule(): BelongsTo
    {
        return $this->belongsTo(CalculationRule::class);
    }

    public function recorder(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'recorded_by');
    }
}
