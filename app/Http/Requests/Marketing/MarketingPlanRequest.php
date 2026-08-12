<?php

namespace App\Http\Requests\Marketing;

use Illuminate\Foundation\Http\FormRequest;

class MarketingPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'month_year' => 'required|date',
            'title' => 'required|string|max:255',
            'objective' => 'nullable|string',
            'strategies' => 'nullable|array',
            'status' => 'required|string|in:Draft,Active,Completed',
        ];
    }
}
