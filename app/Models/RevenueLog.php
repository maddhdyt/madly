<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RevenueLog extends Model
{
    protected $fillable = [
        'date', 'revenue_amount', 'trend', 'reason'
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
