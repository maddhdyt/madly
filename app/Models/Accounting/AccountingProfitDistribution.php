<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountingProfitDistribution extends Model
{
    protected $fillable = [
        'period_closing_id',
        'profit_sharing_scheme_id',
        'profit_participant_id',
        'share_percentage',
        'distributed_amount',
        'notes',
    ];

    protected $casts = [
        'share_percentage' => 'decimal:4',
        'distributed_amount' => 'decimal:2',
    ];

    public function periodClosing(): BelongsTo
    {
        return $this->belongsTo(AccountingPeriodClosing::class, 'period_closing_id');
    }

    public function scheme(): BelongsTo
    {
        return $this->belongsTo(ProfitSharingScheme::class, 'profit_sharing_scheme_id');
    }

    public function participant(): BelongsTo
    {
        return $this->belongsTo(ProfitParticipant::class, 'profit_participant_id');
    }
}
