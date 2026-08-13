<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountingProject extends Model
{
    protected $fillable = [
        'project_name',
        'description',
        'start_date',
        'end_date',
        'total_budget',
        'current_balance',
        'status',
        'is_profit_sharing_enabled',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_budget' => 'decimal:2',
        'current_balance' => 'decimal:2',
        'is_profit_sharing_enabled' => 'boolean',
    ];

    public function revenues(): HasMany
    {
        return $this->hasMany(AccountingRevenue::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(AccountingExpense::class);
    }

    public function allocationRules(): HasMany
    {
        return $this->hasMany(AllocationRule::class);
    }

    public function profitSharingSchemes(): HasMany
    {
        return $this->hasMany(ProfitSharingScheme::class);
    }
}
