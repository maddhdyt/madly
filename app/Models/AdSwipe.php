<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdSwipe extends Model
{
    protected $fillable = ['marketing_brand_id', 'title', 'platform', 'url', 'angle', 'image_path', 'notes'];

    public function marketingBrand()
    {
        return $this->belongsTo(MarketingBrand::class);
    }
}
