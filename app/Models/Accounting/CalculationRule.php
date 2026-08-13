<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CalculationRule extends Model
{
    protected $fillable = [
        'rule_name',
        'expense_category_id',
        'calculation_type',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function expenseCategory(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class);
    }

    public function versions(): HasMany
    {
        return $this->hasMany(CalculationRuleVersion::class);
    }

    /**
     * Get the active version for a given date.
     */
    public function getActiveVersion(?string $date = null): ?CalculationRuleVersion
    {
        $date = $date ?? now()->toDateString();

        return $this->versions()
            ->where('effective_from', '<=', $date)
            ->where(function ($q) use ($date) {
                $q->whereNull('effective_until')
                  ->orWhere('effective_until', '>=', $date);
            })
            ->orderBy('effective_from', 'desc')
            ->first();
    }
}
