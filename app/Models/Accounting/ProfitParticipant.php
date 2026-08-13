<?php

namespace App\Models\Accounting;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProfitParticipant extends Model
{
    protected $fillable = [
        'name',
        'type',
        'contact_info',
        'notes',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function sharingItems(): HasMany
    {
        return $this->hasMany(ProfitSharingItem::class);
    }

    public function distributions(): HasMany
    {
        return $this->hasMany(AccountingProfitDistribution::class);
    }
}
