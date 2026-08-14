<?php

namespace App\Http\Requests\Accounting;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfitSharingSchemeRequest extends FormRequest
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
            'scheme_name' => 'required|string|max:255',
            'accounting_project_id' => 'nullable|exists:accounting_projects,id',
            'effective_from' => 'nullable|date',
            'effective_until' => 'nullable|date|after_or_equal:effective_from',
            'is_active' => 'boolean',
            'notes' => 'nullable|string',
            'items' => 'nullable|array',
            'items.*.profit_participant_id' => 'required_with:items|exists:profit_participants,id',
            'items.*.share_percentage' => 'required_with:items|numeric|min:0|max:100',
        ];
    }
}
