<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountingClosingItem extends Model
{
    protected $fillable = [
        'accounting_closing_id',
        'expense_category_id',
        'label',
        'amount',
        'item_type',
        'rule_value_snapshot',
        'sort_order',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'rule_value_snapshot' => 'decimal:4',
    ];

    public function closing(): BelongsTo
    {
        return $this->belongsTo(AccountingClosing::class, 'accounting_closing_id');
    }

    public function expenseCategory(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class);
    }
}
