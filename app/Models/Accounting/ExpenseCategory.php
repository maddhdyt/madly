<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpenseCategory extends Model
{
    protected $fillable = [
        'name',
        'type',
        'description',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function calculationRules(): HasMany
    {
        return $this->hasMany(CalculationRule::class);
    }

    public function allocationRules(): HasMany
    {
        return $this->hasMany(AllocationRule::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(AccountingExpense::class);
    }
}
