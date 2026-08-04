<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Competitor extends Model
{
    protected $fillable = [
        'name', 'strengths', 'weaknesses', 'logo_url',
        'website_url', 'instagram_url', 'tiktok_url', 'tier',
        'service_type', 'specific_services'
    ];

    public function battlecards()
    {
        return $this->hasMany(Battlecard::class);
    }
}
