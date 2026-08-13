<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountingPeriodClosingItem extends Model
{
    protected $fillable = [
        'period_closing_id',
        'closing_id',
        'closing_date',
        'daily_settlement',
    ];

    protected $casts = [
        'closing_date' => 'date',
        'daily_settlement' => 'decimal:2',
    ];

    public function periodClosing(): BelongsTo
    {
        return $this->belongsTo(AccountingPeriodClosing::class, 'period_closing_id');
    }

    public function dailyClosing(): BelongsTo
    {
        return $this->belongsTo(AccountingClosing::class, 'closing_id');
    }
}
