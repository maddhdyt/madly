<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class BrochureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = (bool) $this->route('brochure');

        return [
            'title' => 'required|string|max:255',
            'brand_id' => 'nullable|exists:brands,id',
            'file' => $isUpdate ? 'nullable|file|mimes:pdf,jpg,jpeg,png|max:10240' : 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ];
    }
}
