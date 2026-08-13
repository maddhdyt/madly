<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CalculationRuleVersion extends Model
{
    protected $fillable = [
        'calculation_rule_id',
        'value',
        'effective_from',
        'effective_until',
        'notes',
    ];

    protected $casts = [
        'value' => 'decimal:4',
        'effective_from' => 'date',
        'effective_until' => 'date',
    ];

    public function calculationRule(): BelongsTo
    {
        return $this->belongsTo(CalculationRule::class);
    }
}
