<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountingPeriodClosing extends Model
{
    protected $fillable = [
        'period_name',
        'period_start',
        'period_end',
        'total_daily_settlements',
        'total_revenue',
        'total_expense',
        'status',
        'closed_by',
        'closed_at',
        'notes',
    ];

    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'total_daily_settlements' => 'decimal:2',
        'total_revenue' => 'decimal:2',
        'total_expense' => 'decimal:2',
        'closed_at' => 'datetime',
    ];

    public function closedBy(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'closed_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(AccountingPeriodClosingItem::class, 'period_closing_id');
    }

    public function distributions(): HasMany
    {
        return $this->hasMany(AccountingProfitDistribution::class, 'period_closing_id');
    }
}
