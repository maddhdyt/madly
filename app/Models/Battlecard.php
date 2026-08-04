<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Battlecard extends Model
{
    protected $fillable = ['competitor_id', 'category', 'objection', 'response'];

    public function competitor()
    {
        return $this->belongsTo(Competitor::class);
    }
}
