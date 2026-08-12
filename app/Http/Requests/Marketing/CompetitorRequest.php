<?php

namespace App\Http\Requests\Marketing;

use Illuminate\Foundation\Http\FormRequest;

class CompetitorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'strengths' => 'nullable|string',
            'weaknesses' => 'nullable|string',
            'website_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'tiktok_url' => 'nullable|url|max:255',
            'tier' => 'nullable|string|max:50',
            'service_type' => 'nullable|string|max:255',
            'specific_services' => 'nullable|string',
        ];
    }
}
