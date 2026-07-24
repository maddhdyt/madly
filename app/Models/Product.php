<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

    protected $casts = [
        'hpp' => 'decimal:2',
        'attributes' => 'array'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function prices()
    {
        return $this->hasMany(ProductPrice::class);
    }
}
