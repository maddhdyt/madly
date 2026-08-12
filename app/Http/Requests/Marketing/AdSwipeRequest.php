<?php

namespace App\Http\Requests\Marketing;

use Illuminate\Foundation\Http\FormRequest;

class AdSwipeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'marketing_brand_id' => 'nullable|exists:marketing_brands,id',
            'title' => 'required|string|max:255',
            'platform' => 'nullable|string|max:255',
            'url' => 'nullable|url',
            'angle' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ];
    }
}
