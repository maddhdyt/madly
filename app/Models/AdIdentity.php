<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdIdentity extends Model
{
    use HasFactory;

    protected $fillable = [
        'marketing_brand_id',
        'ad_platform',
        'landing_page_url',
        'sales_id',
        'power_points',
        'is_active',
    ];

    public function marketingBrand()
    {
        return $this->belongsTo(MarketingBrand::class);
    }

    public function sales()
    {
        return $this->belongsTo(User::class, 'sales_id');
    }
}
