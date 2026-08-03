<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UtmLink extends Model
{
    protected $fillable = [
        'user_id',
        'marketing_brand_id',
        'target_url',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'generated_url'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function marketingBrand()
    {
        return $this->belongsTo(MarketingBrand::class);
    }
}
