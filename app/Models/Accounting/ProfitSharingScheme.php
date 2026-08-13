<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProfitSharingScheme extends Model
{
    protected $fillable = [
        'scheme_name',
        'accounting_project_id',
        'effective_from',
        'effective_until',
        'is_active',
        'notes',
    ];

    protected $casts = [
        'effective_from' => 'date',
        'effective_until' => 'date',
        'is_active' => 'boolean',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(AccountingProject::class, 'accounting_project_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(ProfitSharingItem::class);
    }
}
