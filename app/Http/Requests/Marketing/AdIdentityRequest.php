<?php

namespace App\Http\Requests\Marketing;

use Illuminate\Foundation\Http\FormRequest;

class AdIdentityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'marketing_brand_id' => 'required|exists:marketing_brands,id',
            'ad_platform' => 'required|string|max:255',
            'landing_page_url' => 'nullable|url',
            'sales_id' => 'nullable|exists:users,id',
            'is_active' => 'boolean',
        ];
    }
}
