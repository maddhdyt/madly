<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $guarded = [];

    protected $casts = [
        'form_config' => 'array',
        'product_schema' => 'array',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
