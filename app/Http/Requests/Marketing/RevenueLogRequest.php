<?php

namespace App\Http\Requests\Marketing;

use Illuminate\Foundation\Http\FormRequest;

class RevenueLogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => 'required|date',
            'revenue_amount' => 'nullable|numeric',
            'trend' => 'required|string|in:up,down,stable',
            'reason' => 'required|string',
        ];
    }
}
