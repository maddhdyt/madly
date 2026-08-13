<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountingClosing extends Model
{
    protected $fillable = [
        'closing_date',
        'total_revenue',
        'total_expense',
        'daily_settlement',
        'status',
        'closed_by',
        'closed_at',
        'notes',
        'snapshot_rules',
    ];

    protected $casts = [
        'closing_date' => 'date',
        'total_revenue' => 'decimal:2',
        'total_expense' => 'decimal:2',
        'daily_settlement' => 'decimal:2',
        'closed_at' => 'datetime',
        'snapshot_rules' => 'json',
    ];

    public function closedBy(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'closed_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(AccountingClosingItem::class);
    }
}
