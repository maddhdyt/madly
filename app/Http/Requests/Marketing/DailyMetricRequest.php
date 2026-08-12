<?php

namespace App\Http\Requests\Marketing;

use Illuminate\Foundation\Http\FormRequest;

class DailyMetricRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'marketing_brand_id' => 'required|exists:marketing_brands,id',
            'date' => 'required|date',
            'ad_spend' => 'required|numeric|min:0',
            'clicks' => 'required|integer|min:0',
            'leads' => 'required|integer|min:0',
            'revenue' => 'required|numeric|min:0',
        ];
    }
}
