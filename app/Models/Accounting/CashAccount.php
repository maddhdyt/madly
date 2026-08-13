<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CashAccount extends Model
{
    protected $fillable = [
        'account_name',
        'type',
        'account_number',
        'current_balance',
        'is_active',
    ];

    protected $casts = [
        'current_balance' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function revenues(): HasMany
    {
        return $this->hasMany(AccountingRevenue::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(AccountingExpense::class);
    }
}
