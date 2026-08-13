<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AllocationRule extends Model
{
    protected $fillable = [
        'expense_category_id',
        'accounting_project_id',
        'allocation_method',
        'allocation_value',
        'effective_from',
        'effective_until',
    ];

    protected $casts = [
        'allocation_value' => 'decimal:4',
        'effective_from' => 'date',
        'effective_until' => 'date',
    ];

    public function expenseCategory(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(AccountingProject::class, 'accounting_project_id');
    }
}
