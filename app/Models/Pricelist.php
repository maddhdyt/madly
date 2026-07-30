<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pricelist extends Model
{
    protected $guarded = [];

    protected $casts = [
        'includes' => 'array',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function prices()
    {
        return $this->hasMany(ProductPrice::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
