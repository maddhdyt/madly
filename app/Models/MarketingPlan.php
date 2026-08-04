<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketingPlan extends Model
{
    protected $fillable = [
        'month_year', 'title', 'objective', 'strategies', 'status'
    ];

    protected $casts = [
        'strategies' => 'array',
        'month_year' => 'date',
    ];
}
