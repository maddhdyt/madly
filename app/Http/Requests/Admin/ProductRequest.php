<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'hpp' => 'required|numeric|min:0',
            'min_price' => 'nullable|numeric|min:0',
            'status_note' => 'nullable|string',
            'service_id' => 'required|exists:services,id',
            'attributes' => 'nullable|array',
        ];
    }
}
