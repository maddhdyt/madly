<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyMetric extends Model
{
    use HasFactory;

    protected $fillable = [
        'marketing_brand_id',
        'date',
        'ad_spend',
        'clicks',
        'leads',
        'revenue',
    ];

    protected $casts = [
        'date' => 'date',
        'ad_spend' => 'decimal:2',
        'revenue' => 'decimal:2',
    ];

    public function marketingBrand()
    {
        return $this->belongsTo(MarketingBrand::class);
    }
}
