<?php

namespace App\Http\Requests\Accounting;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCashAccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'account_name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,ewallet,other',
            'account_number' => 'nullable|string|max:255',
            'current_balance' => 'nullable|numeric',
            'is_active' => 'boolean',
        ];
    }
}
