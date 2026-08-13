<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfitSharingItem extends Model
{
    protected $fillable = [
        'profit_sharing_scheme_id',
        'profit_participant_id',
        'share_percentage',
    ];

    protected $casts = [
        'share_percentage' => 'decimal:4',
    ];

    public function scheme(): BelongsTo
    {
        return $this->belongsTo(ProfitSharingScheme::class, 'profit_sharing_scheme_id');
    }

    public function participant(): BelongsTo
    {
        return $this->belongsTo(ProfitParticipant::class, 'profit_participant_id');
    }
}
