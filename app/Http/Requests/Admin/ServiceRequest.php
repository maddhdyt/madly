<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'required|string|max:50',
            'form_config' => 'required|array',
            'form_config.includes_label' => 'required|string',
            'form_config.includes_placeholder' => 'required|string',
            'form_config.promo_header_label' => 'required|string',
            'form_config.promo_header_placeholder' => 'required|string',
            'form_config.footer_text_label' => 'required|string',
            'form_config.footer_text_placeholder' => 'required|string',
            'product_schema' => 'nullable|array',
            'product_schema.*.name' => 'required|string',
            'product_schema.*.label' => 'required|string',
            'product_schema.*.type' => 'required|string',
            'product_schema.*.placeholder' => 'nullable|string',
            'includes' => 'nullable|array',
            'includes.*' => 'nullable|string',
        ];
    }
}
